import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";

interface LoadingScreenProps {
  scores: { visual: number; builder: number; productivity: number };
}

const loadingSteps = [
  "Анализируем ваши ответы",
  "Подбираем оптимальный путь обучения",
  "Формируем персональную программу",
];

const resultUrls: Record<string, string> = {
  visual: "https://osnova.edu.uz/ai-visual-creator",
  builder: "https://osnova.edu.uz/ai-digital-builder",
  productivity: "https://osnova.edu.uz/ai-productivity-master",
};

export function LoadingScreen({ scores }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const calculateResult = () => {
    const maxScore = Math.max(scores.visual, scores.builder, scores.productivity);
    if (scores.visual === maxScore) return "visual";
    if (scores.builder === maxScore) return "builder";
    return "productivity";
  };

  useEffect(() => {
    const stepDuration = 800;
    const progressPerStep = 100 / loadingSteps.length;
    
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        const next = prev + 1;
        if (next >= loadingSteps.length) {
          clearInterval(interval);
          setTimeout(() => setIsComplete(true), 400);
          return prev;
        }
        return next;
      });
    }, stepDuration);

    // Animate progress smoothly
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const targetProgress = (currentStep + 1) * progressPerStep;
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return Math.min(prev + 1, targetProgress);
      });
    }, 30);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [currentStep]);

  const handleResultClick = () => {
    const result = calculateResult();
    window.location.href = resultUrls[result];
  };

  // Calculate stroke dash for circular progress
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center px-4">
      <div className="w-full max-w-[600px] mx-auto text-center">
        {/* Circular Progress */}
        <div className="relative inline-flex items-center justify-center mb-8">
          <svg className="w-44 h-44 -rotate-90" viewBox="0 0 160 160">
            {/* Background circle */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="8"
            />
            {/* Progress circle */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke="hsl(var(--osnova-lime))"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-300 ease-out"
            />
          </svg>
          <span className="absolute text-4xl font-bold text-foreground">
            {Math.round(progress)}%
          </span>
        </div>

        {/* Title */}
        <div className="mb-8 min-h-[100px]">
          <h1 
            className={`text-2xl md:text-3xl font-bold text-foreground transition-all duration-500 ease-out ${
              isComplete ? "animate-fade-in" : ""
            }`}
          >
            {isComplete ? "✨ Направление подобрано!" : "Мы создаём ваш персональный план!"}
          </h1>
          <p 
            className={`text-lg text-muted-foreground mt-3 transition-all duration-500 ease-out ${
              isComplete 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: isComplete ? "200ms" : "0ms" }}
          >
            Мы подготовили для вас персональный план обучения
          </p>
        </div>

        {/* Steps Card */}
        <div className="relative mb-8">
          {/* Animated glow */}
          <div 
            className={`absolute -inset-2 bg-gradient-to-r from-osnova-lime/10 via-osnova-lime/30 to-osnova-lime/10 rounded-3xl blur-2xl transition-opacity duration-700 ${
              !isComplete ? "opacity-100" : "opacity-0"
            }`}
            style={{
              animation: !isComplete ? "glow 3s ease-in-out infinite" : "none"
            }}
          />
          <style>{`
            @keyframes glow {
              0%, 100% { opacity: 0.4; transform: scale(1); }
              50% { opacity: 0.8; transform: scale(1.02); }
            }
          `}</style>
          <div className="relative bg-background rounded-2xl p-6 shadow-sm border border-border/50 text-left">
            <div className="space-y-4">
              {loadingSteps.map((step, index) => {
                const isCompleted = index < currentStep;
                const isActive = index === currentStep && !isComplete;
                const isPending = index > currentStep;

                return (
                  <div
                    key={index}
                    className={`flex items-center gap-3 transition-all duration-300 ${
                      isPending ? "opacity-50" : "opacity-100"
                    }`}
                  >
                    <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                      {isCompleted || isComplete ? (
                        <div className="w-6 h-6 rounded-full bg-osnova-lime flex items-center justify-center animate-scale-in">
                          <Check className="w-4 h-4 text-osnova-dark" />
                        </div>
                      ) : isActive ? (
                        <Loader2 className="w-5 h-5 text-osnova-lime animate-spin" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                      )}
                    </div>
                    <span
                      className={`text-base transition-colors duration-300 ${
                        isCompleted || isComplete
                          ? "text-foreground font-medium"
                          : isActive
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div 
          className={`transition-all duration-500 ease-out ${
            isComplete 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-6 pointer-events-none"
          }`}
          style={{ transitionDelay: isComplete ? "400ms" : "0ms" }}
        >
          <Button
            onClick={handleResultClick}
            size="lg"
            className="w-full bg-osnova-lime text-osnova-dark font-semibold px-8 py-6 text-lg rounded-full hover:bg-osnova-lime-hover transition-all duration-200 hover:scale-105"
          >
            Посмотреть результат
          </Button>
        </div>
      </div>
    </div>
  );
}
