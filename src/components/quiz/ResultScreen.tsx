import { TrackResult, postQuizQuestion } from "@/data/quizData";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ResultScreenProps {
  result: TrackResult;
  scores: { visual: number; builder: number; productivity: number };
  onPostQuizAnswer?: (answerId: string) => void;
}

export function ResultScreen({ result, scores, onPostQuizAnswer }: ResultScreenProps) {
  const [showPostQuiz, setShowPostQuiz] = useState(false);
  const [selectedPostAnswer, setSelectedPostAnswer] = useState<string | null>(null);

  const handleStartLearning = () => {
    const baseUrl = "https://osnova.uz/ai_bundle";
    window.location.href = `${baseUrl}?track=${result.urlSlug}`;
  };

  const handlePostQuizSubmit = () => {
    if (selectedPostAnswer && onPostQuizAnswer) {
      onPostQuizAnswer(selectedPostAnswer);
    }
    handleStartLearning();
  };

  const colorClasses = {
    "track-visual": "from-track-visual/20 to-track-visual/5 border-track-visual/30",
    "track-builder": "from-track-builder/20 to-track-builder/5 border-track-builder/30",
    "track-productivity": "from-track-productivity/20 to-track-productivity/5 border-track-productivity/30",
  };

  const iconBgClasses = {
    "track-visual": "bg-track-visual/20",
    "track-builder": "bg-track-builder/20",
    "track-productivity": "bg-track-productivity/20",
  };

  if (showPostQuiz) {
    return (
      <div className="min-h-screen flex flex-col bg-background px-4 py-8 max-w-[760px] mx-auto">
        <div className="flex-1 flex flex-col max-w-md mx-auto w-full">
          <h2 className="text-h2 text-foreground mb-6 animate-fade-up">
            {postQuizQuestion.text}
          </h2>

          <div className="space-y-3 flex-1">
            {postQuizQuestion.answers.map((answer, index) => (
              <button
                key={answer.id}
                onClick={() => setSelectedPostAnswer(answer.id)}
                className={cn(
                  "quiz-card w-full text-left flex items-center gap-4 opacity-0 animate-fade-up",
                  selectedPostAnswer === answer.id && "quiz-card-selected",
                  `stagger-${index + 1}`
                )}
              >
                <span className="text-xl">{answer.emoji}</span>
                <span className="text-body text-foreground">{answer.text}</span>
              </button>
            ))}
          </div>

          <div className="mt-6 pt-4 space-y-3">
            <button
              onClick={handlePostQuizSubmit}
              className="btn-primary w-full text-lg"
            >
              Начать обучение
            </button>
            <button
              onClick={handleStartLearning}
              className="btn-secondary w-full"
            >
              Пропустить
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background px-4 py-8 max-w-[760px] mx-auto">
      <div className="flex-1 flex flex-col max-w-md mx-auto w-full">
        {/* Result Card */}
        <div className={cn(
          "rounded-3xl p-6 bg-gradient-to-br border mb-6 animate-fade-up",
          colorClasses[result.color as keyof typeof colorClasses]
        )}>
          <div className={cn(
            "w-16 h-16 rounded-2xl flex items-center justify-center mb-4",
            iconBgClasses[result.color as keyof typeof iconBgClasses]
          )}>
            <span className="text-4xl">{result.emoji}</span>
          </div>

          <h1 className="text-h1 text-foreground mb-3">
            {result.headline}
          </h1>

          <p className="text-body text-muted-foreground">
            {result.description}
          </p>
        </div>

        {/* Modules */}
        <div className="bg-card border border-border rounded-2xl p-5 mb-4 animate-fade-up stagger-1">
          <h3 className="text-h3 text-foreground mb-3">Ключевые модули</h3>
          <div className="flex flex-wrap gap-2">
            {result.modules.map((module) => (
              <span
                key={module}
                className="bg-muted text-muted-foreground text-small px-3 py-1.5 rounded-full"
              >
                {module}
              </span>
            ))}
          </div>
        </div>

        {/* Artifact */}
        <div className="bg-card border border-border rounded-2xl p-5 mb-6 animate-fade-up stagger-2">
          <h3 className="text-h3 text-foreground mb-2">Результат обучения</h3>
          <p className="text-body text-muted-foreground">{result.artifact}</p>
        </div>

        {/* Score breakdown */}
        <div className="bg-muted/50 rounded-xl p-4 mb-6 animate-fade-up stagger-3">
          <p className="text-small text-muted-foreground text-center">
            Баллы: Visual {scores.visual} • Builder {scores.builder} • Productivity {scores.productivity}
          </p>
        </div>
      </div>

      <div className="pt-4 space-y-3 max-w-md mx-auto w-full">
        <button
          onClick={() => setShowPostQuiz(true)}
          className="btn-primary w-full text-lg animate-fade-up"
        >
          Выбрать этот путь
        </button>
        <button
          onClick={handleStartLearning}
          className="btn-secondary w-full animate-fade-up stagger-1"
        >
          Посмотреть все курсы
        </button>
      </div>
    </div>
  );
}
