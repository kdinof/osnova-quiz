import { useState, useCallback } from "react";
import { questions, trackResults, Answer } from "@/data/quizData";
import { QuestionScreen } from "./QuestionScreen";
import { LoadingScreen } from "./LoadingScreen";
import { ResultScreen } from "./ResultScreen";
import { useQuizStorage } from "@/hooks/useQuizStorage";

type QuizState = "question" | "loading" | "result";

export function Quiz() {
  const { session, updateSession, resetSession } = useQuizStorage();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const { currentQuestionIndex, answers, scores, state } = session;

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  const calculateResult = useCallback(() => {
    const finalScores = { ...scores };
    
    const maxScore = Math.max(finalScores.visual, finalScores.builder, finalScores.productivity);
    
    if (finalScores.visual === maxScore) {
      return trackResults.find(t => t.id === "visual")!;
    } else if (finalScores.builder === maxScore) {
      return trackResults.find(t => t.id === "builder")!;
    } else {
      return trackResults.find(t => t.id === "productivity")!;
    }
  }, [scores]);

  const handleSelectAnswer = (answer: Answer) => {
    setSelectedAnswer(answer.id);
    
    const newAnswers = { ...answers, [currentQuestion.id]: answer };
    const newScores = {
      visual: scores.visual + answer.scores.visual,
      builder: scores.builder + answer.scores.builder,
      productivity: scores.productivity + answer.scores.productivity,
    };

    setTimeout(() => {
      if (currentQuestionIndex < totalQuestions - 1) {
        updateSession({
          answers: newAnswers,
          scores: newScores,
          currentQuestionIndex: currentQuestionIndex + 1,
        });
        setSelectedAnswer(null);
      } else {
        updateSession({
          answers: newAnswers,
          scores: newScores,
          state: "loading",
        });
      }
    }, 300);
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      const prevQuestion = questions[currentQuestionIndex - 1];
      const prevAnswer = answers[prevQuestion.id];
      
      if (prevAnswer) {
        const newAnswers = { ...answers };
        delete newAnswers[prevQuestion.id];
        
        updateSession({
          currentQuestionIndex: currentQuestionIndex - 1,
          answers: newAnswers,
          scores: {
            visual: scores.visual - prevAnswer.scores.visual,
            builder: scores.builder - prevAnswer.scores.builder,
            productivity: scores.productivity - prevAnswer.scores.productivity,
          },
        });
      } else {
        updateSession({ currentQuestionIndex: currentQuestionIndex - 1 });
      }
      setSelectedAnswer(null);
    }
  };

  const handlePostQuizAnswer = (answerId: string) => {
    console.log("Post-quiz answer:", answerId);
    console.log("All answers:", answers);
    console.log("Final scores:", scores);
    resetSession();
  };

  if (state === "question") {
    return (
        <QuestionScreen
          key={currentQuestion.id}
          question={currentQuestion}
          currentStep={currentQuestionIndex + 1}
          totalSteps={totalQuestions}
          selectedAnswer={selectedAnswer}
          onSelect={handleSelectAnswer}
          onBack={handleBack}
        />
    );
  }

  if (state === "loading") {
    return <LoadingScreen scores={scores} />;
  }

  if (state === "result") {
    const result = calculateResult();
    return (
      <ResultScreen
        result={result}
        scores={scores}
        onPostQuizAnswer={handlePostQuizAnswer}
      />
    );
  }

  return null;
}
