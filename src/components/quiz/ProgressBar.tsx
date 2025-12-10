import { ArrowLeft } from "lucide-react";

interface ProgressBarProps {
  current: number;
  total: number;
  onBack?: () => void;
  showBack?: boolean;
}

export function ProgressBar({ current, total, onBack, showBack = false }: ProgressBarProps) {
  const segments = Array.from({ length: total }, (_, i) => i < current - 1);

  return (
    <div className="w-full">
      <div className="flex items-center mb-3 relative">
        {showBack && (
          <button
            onClick={onBack}
            className="absolute left-0 p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Назад"
          >
            <ArrowLeft size={24} />
          </button>
        )}
        <span className="text-base font-medium text-foreground mx-auto">
          Вопрос {current} из {total}
        </span>
      </div>
      <div className="flex gap-1.5">
        {segments.map((filled, index) => (
          <div
            key={index}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
              filled ? "bg-foreground" : "bg-muted"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
