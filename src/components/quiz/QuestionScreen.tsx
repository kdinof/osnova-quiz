import { Question, Answer } from "@/data/quizData";
import { QuestionCard } from "./QuestionCard";
import { ProgressBar } from "./ProgressBar";

interface QuestionScreenProps {
  question: Question;
  currentStep: number;
  totalSteps: number;
  selectedAnswer: string | null;
  onSelect: (answer: Answer) => void;
}

export function QuestionScreen({
  question,
  currentStep,
  totalSteps,
  selectedAnswer,
  onSelect,
}: QuestionScreenProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background max-w-[760px] mx-auto">
      <div className="px-4 pt-6 pb-4">
        <ProgressBar current={currentStep} total={totalSteps} />
      </div>

      <div className="flex-1 px-4 pb-6 flex flex-col">
        <h1 className="text-h1 text-foreground mb-6 animate-fade-up">
          {question.text}
        </h1>

        <div className="space-y-3 flex-1">
          {question.answers.map((answer, index) => (
            <QuestionCard
              key={answer.id}
              answer={answer}
              isSelected={selectedAnswer === answer.id}
              onSelect={() => onSelect(answer)}
              index={index}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
