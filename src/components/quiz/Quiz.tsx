import { useState, useCallback, useEffect } from "react";
import { questions, trackResults, Answer } from "@/data/quizData";
import { QuestionScreen } from "./QuestionScreen";
import { LoadingScreen } from "./LoadingScreen";
import { ResultScreen } from "./ResultScreen";
import { useQuizStorage } from "@/hooks/useQuizStorage";

type QuizState = "question" | "loading" | "result";

export function Quiz() {
  const { session, updateSession, resetSession } = useQuizStorage();

  const { currentQuestionIndex, answers, scores, state } = session;

  const currentQuestion = questions[currentQuestionIndex];
  
  // Get previously selected answer for current question from storage
  const storedAnswer = answers[currentQuestion?.id];
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(
    storedAnswer?.id || null
  );
  const totalQuestions = questions.length;

  // Sync selectedAnswer when question changes (e.g., on back navigation or page refresh)
  useEffect(() => {
    const stored = answers[currentQuestion?.id];
    setSelectedAnswer(stored?.id || null);
  }, [currentQuestionIndex, answers, currentQuestion?.id]);

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
    
    // Check if there was a previous answer for this question (re-answering)
    const previousAnswer = answers[currentQuestion.id];
    
    let newScores = { ...scores };
    
    // If re-answering, subtract the old scores first
    if (previousAnswer) {
      newScores.visual -= previousAnswer.scores.visual;
      newScores.builder -= previousAnswer.scores.builder;
      newScores.productivity -= previousAnswer.scores.productivity;
    }
    
    // Add new answer scores
    newScores.visual += answer.scores.visual;
    newScores.builder += answer.scores.builder;
    newScores.productivity += answer.scores.productivity;
    
    const newAnswers = { ...answers, [currentQuestion.id]: answer };

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
      // Just go back - keep answers and scores intact
      updateSession({ currentQuestionIndex: currentQuestionIndex - 1 });
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
