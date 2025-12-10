import { useState, useCallback, useEffect } from "react";
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

  // Restore selected answer from localStorage when question changes or on mount
  useEffect(() => {
    const savedAnswer = answers[currentQuestion.id];
    if (savedAnswer) {
      setSelectedAnswer(savedAnswer.id);
    } else {
      setSelectedAnswer(null);
    }
  }, [currentQuestionIndex, currentQuestion.id, answers]);
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

    // Check if there's already an answer for this question
    const previousAnswer = answers[currentQuestion.id];

    const newAnswers = { ...answers, [currentQuestion.id]: answer };

    // If changing an existing answer, subtract old scores first
    let newScores = { ...scores };
    if (previousAnswer) {
      newScores = {
        visual: newScores.visual - previousAnswer.scores.visual,
        builder: newScores.builder - previousAnswer.scores.builder,
        productivity: newScores.productivity - previousAnswer.scores.productivity,
      };
    }

    // Add new answer scores
    newScores = {
      visual: newScores.visual + answer.scores.visual,
      builder: newScores.builder + answer.scores.builder,
      productivity: newScores.productivity + answer.scores.productivity,
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
      // Just navigate back, keep all answers and scores intact
      updateSession({
        currentQuestionIndex: currentQuestionIndex - 1,
      });
      // selectedAnswer will be restored by useEffect
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
