import { Answer } from "@/data/quizData";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  answer: Answer;
  isSelected: boolean;
  onSelect: () => void;
  index: number;
}

export function QuestionCard({ answer, isSelected, onSelect, index }: QuestionCardProps) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "quiz-card w-full text-left flex items-center gap-4 opacity-0 animate-fade-up",
        isSelected && "quiz-card-selected",
        `stagger-${index + 1}`
      )}
    >
      <span className="text-2xl flex-shrink-0">{answer.emoji}</span>
      <span className="text-body font-medium text-foreground">{answer.text}</span>
      <div className={cn(
        "ml-auto flex-shrink-0 w-5 h-5 rounded-full border-2 transition-all duration-200",
        isSelected 
          ? "bg-primary border-primary" 
          : "border-muted-foreground/30"
      )}>
        {isSelected && (
          <svg className="w-full h-full text-primary-foreground p-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>
    </button>
  );
}
