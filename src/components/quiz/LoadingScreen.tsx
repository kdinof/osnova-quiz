import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";

interface LoadingScreenProps {
  scores: { visual: number; builder: number; productivity: number };
}

const loadingPhases = [
  { progress: 30, duration: 1000, text: "Анализируем ваши ответы..." },
  { progress: 70, duration: 1500, text: "Подбираем оптимальный путь обучения..." },
  { progress: 95, duration: 1000, text: "Формируем персональную программу..." },
  { progress: 100, duration: 500, text: "✨ Направление подобрано!" }
];

const resultUrls = {
  visual: "https://osnova.edu.uz/ai-visual-creator",
  builder: "https://osnova.edu.uz/ai-digital-builder",
  productivity: "https://osnova.edu.uz/ai-productivity-master"
};

export function LoadingScreen({ scores }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const getPrimaryResult = useCallback(() => {
    const maxScore = Math.max(scores.visual, scores.builder, scores.productivity);
    if (scores.visual === maxScore) return "visual";
    if (scores.builder === maxScore) return "builder";
    return "productivity";
  }, [scores]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let animationFrame: number;

    const animateProgress = async () => {
      for (let i = 0; i < loadingPhases.length; i++) {
        const phase = loadingPhases[i];
        const startProgress = i === 0 ? 0 : loadingPhases[i - 1].progress;
        const targetProgress = phase.progress;
        const duration = phase.duration;
        const startTime = Date.now();

        await new Promise<void>((resolve) => {
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const t = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - t, 3);
            const currentProgress = startProgress + (targetProgress - startProgress) * easeOut;
            
            setProgress(currentProgress);
            
            if (t < 1) {
              animationFrame = requestAnimationFrame(animate);
            } else {
              setCurrentPhaseIndex(i + 1);
              if (i === loadingPhases.length - 1) {
                setIsComplete(true);
              }
              resolve();
            }
          };
          animate();
        });

        if (i < loadingPhases.length - 1) {
          await new Promise(resolve => {
            timeoutId = setTimeout(resolve, 200);
          });
        }
      }
    };

    animateProgress();

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const handleClick = () => {
    const result = getPrimaryResult();
    window.location.href = resultUrls[result];
  };

  const currentText = currentPhaseIndex < loadingPhases.length 
    ? loadingPhases[currentPhaseIndex].text 
    : loadingPhases[loadingPhases.length - 1].text;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-[760px] mx-auto flex flex-col items-center text-center">
        {/* Animated Icon */}
        <div className={`mb-8 transition-all duration-500 ${isComplete ? 'scale-110' : 'animate-pulse'}`}>
          {isComplete ? (
            <div className="w-20 h-20 rounded-full bg-osnova-lime/20 flex items-center justify-center animate-scale-in">
              <Check className="w-10 h-10 text-osnova-lime" strokeWidth={3} />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full bg-osnova-lime/10 flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-osnova-lime animate-pulse" />
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-md mb-6">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-osnova-lime to-osnova-lime-hover rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">{Math.round(progress)}%</p>
        </div>

        {/* Loading Text */}
        <p className={`text-xl font-medium text-foreground mb-2 transition-all duration-300 ${!isComplete ? 'animate-pulse' : ''}`}>
          {currentText}
        </p>

        {/* Subtext and Button - only show when complete */}
        {isComplete && (
          <div className="animate-fade-in">
            <p className="text-muted-foreground mb-8">
              Мы подготовили для вас персональный план обучения
            </p>
            <Button 
              onClick={handleClick}
              className="bg-osnova-lime hover:bg-osnova-lime-hover text-osnova-dark font-semibold px-8 py-6 text-lg rounded-full animate-scale-in"
            >
              Посмотреть результат
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
