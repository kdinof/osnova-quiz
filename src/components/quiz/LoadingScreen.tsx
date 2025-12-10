import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Check } from "lucide-react";

interface LoadingScreenProps {
  scores: { visual: number; builder: number; productivity: number };
}

const loadingPhases = [
  { text: "Анализируем ваши ответы...", targetProgress: 30, duration: 1000 },
  { text: "Подбираем оптимальный путь обучения...", targetProgress: 70, duration: 1500 },
  { text: "Формируем персональную программу...", targetProgress: 95, duration: 1000 },
  { text: "✨ Направление подобрано!", targetProgress: 100, duration: 500 },
];

const resultUrls: Record<string, string> = {
  visual: "https://osnova.edu.uz/ai-visual-creator",
  builder: "https://osnova.edu.uz/ai-digital-builder",
  productivity: "https://osnova.edu.uz/ai-productivity-master",
};

export function LoadingScreen({ scores }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const calculateResult = () => {
    const maxScore = Math.max(scores.visual, scores.builder, scores.productivity);
    if (scores.visual === maxScore) return "visual";
    if (scores.builder === maxScore) return "builder";
    return "productivity";
  };

  useEffect(() => {
    let currentPhase = 0;
    let startProgress = 0;

    const runPhase = () => {
      if (currentPhase >= loadingPhases.length) {
        setIsComplete(true);
        return;
      }

      const phase = loadingPhases[currentPhase];
      const progressIncrement = phase.targetProgress - startProgress;
      const steps = 20;
      const stepDuration = phase.duration / steps;
      let step = 0;

      const interval = setInterval(() => {
        step++;
        const easeOut = 1 - Math.pow(1 - step / steps, 3);
        setProgress(startProgress + progressIncrement * easeOut);

        if (step >= steps) {
          clearInterval(interval);
          startProgress = phase.targetProgress;
          currentPhase++;
          setPhaseIndex(currentPhase);
          
          if (currentPhase < loadingPhases.length) {
            setTimeout(runPhase, 200);
          } else {
            setIsComplete(true);
          }
        }
      }, stepDuration);
    };

    const timeout = setTimeout(runPhase, 300);
    return () => clearTimeout(timeout);
  }, []);

  const handleResultClick = () => {
    const result = calculateResult();
    window.location.href = resultUrls[result];
  };

  const currentPhase = loadingPhases[Math.min(phaseIndex, loadingPhases.length - 1)];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-[760px] mx-auto text-center">
        {/* Icon */}
        <div className="mb-8">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-osnova-lime/10 ${isComplete ? '' : 'animate-pulse'}`}>
            {isComplete ? (
              <div className="w-12 h-12 rounded-full bg-osnova-lime flex items-center justify-center animate-scale-in">
                <Check className="w-6 h-6 text-osnova-dark" />
              </div>
            ) : (
              <Sparkles className="w-10 h-10 text-osnova-lime animate-pulse" />
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-osnova-lime to-osnova-lime-hover rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">{Math.round(progress)}%</p>
        </div>

        {/* Loading Text */}
        <div className="mb-8 min-h-[80px]">
          <p className={`text-2xl font-medium text-foreground ${!isComplete ? 'animate-pulse' : ''}`}>
            {currentPhase.text}
          </p>
          {isComplete && (
            <p className="text-muted-foreground mt-2 animate-fade-in">
              Мы подготовили для вас персональный план обучения
            </p>
          )}
        </div>

        {/* CTA Button */}
        {isComplete && (
          <div className="animate-fade-in">
            <Button
              onClick={handleResultClick}
              size="lg"
              className="bg-osnova-lime text-osnova-dark font-semibold px-8 py-6 text-lg rounded-full hover:bg-osnova-lime-hover transition-all duration-200 hover:scale-105"
            >
              Посмотреть результат
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
