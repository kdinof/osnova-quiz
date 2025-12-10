import { useState, useCallback } from "react";
import { questions, trackResults, Answer } from "@/data/quizData";
import { QuestionScreen } from "./QuestionScreen";
import { LoadingScreen } from "./LoadingScreen";
import { ResultScreen } from "./ResultScreen";

type QuizState = "question" | "loading" | "result";

interface QuizAnswers {
  [questionId: number]: Answer;
}

export function Quiz() {
  const [state, setState] = useState<QuizState>("question");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [scores, setScores] = useState({ visual: 0, builder: 0, productivity: 0 });

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
    
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: answer }));
    
    setScores(prev => ({
      visual: prev.visual + answer.scores.visual,
      builder: prev.builder + answer.scores.builder,
      productivity: prev.productivity + answer.scores.productivity,
    }));

    setTimeout(() => {
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
      } else {
        setState("loading");
      }
    }, 300);
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      const prevQuestion = questions[currentQuestionIndex - 1];
      const prevAnswer = answers[prevQuestion.id];
      
      if (prevAnswer) {
        setScores(prev => ({
          visual: prev.visual - prevAnswer.scores.visual,
          builder: prev.builder - prevAnswer.scores.builder,
          productivity: prev.productivity - prevAnswer.scores.productivity,
        }));
        setAnswers(prev => {
          const newAnswers = { ...prev };
          delete newAnswers[prevQuestion.id];
          return newAnswers;
        });
      }
      
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedAnswer(null);
    }
  };

  const handlePostQuizAnswer = (answerId: string) => {
    console.log("Post-quiz answer:", answerId);
    console.log("All answers:", answers);
    console.log("Final scores:", scores);
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
