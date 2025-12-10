import { MotivationalScreen as MotivationalScreenType } from "@/data/quizData";

interface MotivationalScreenProps {
  screen: MotivationalScreenType;
  onContinue: () => void;
}

export function MotivationalScreen({ screen, onContinue }: MotivationalScreenProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background px-4 py-8">
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        {/* Decorative element */}
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 animate-fade-up">
          <span className="text-3xl">✨</span>
        </div>

        <h1 className="text-h1 text-foreground mb-4 animate-fade-up stagger-1">
          {screen.title}
        </h1>

        <p className="text-body text-muted-foreground mb-6 animate-fade-up stagger-2">
          {screen.text}
        </p>

        {screen.quote && (
          <div className="bg-card border border-border rounded-2xl p-5 mb-6 animate-fade-up stagger-3">
            <p className="text-body text-foreground italic mb-3">
              "{screen.quote}"
            </p>
            {screen.quoteAuthor && (
              <p className="text-small text-muted-foreground">
                — {screen.quoteAuthor}
              </p>
            )}
          </div>
        )}

        {screen.subtext && (
          <p className="text-small text-muted-foreground mb-8 animate-fade-up stagger-4">
            {screen.subtext}
          </p>
        )}
      </div>

      <div className="pt-4">
        <button
          onClick={onContinue}
          className="btn-primary w-full text-lg animate-fade-up"
        >
          {screen.cta}
        </button>
      </div>
    </div>
  );
}
