import { useState, useCallback } from "react";
import { questions, motivationalScreens, trackResults, Answer } from "@/data/quizData";
import { StartScreen } from "./StartScreen";
import { QuestionScreen } from "./QuestionScreen";
import { MotivationalScreen } from "./MotivationalScreen";
import { ResultScreen } from "./ResultScreen";

type QuizState = "start" | "question" | "motivational" | "result";

interface QuizAnswers {
  [questionId: number]: Answer;
}

export function Quiz() {
  const [state, setState] = useState<QuizState>("start");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [scores, setScores] = useState({ visual: 0, builder: 0, productivity: 0 });

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  const calculateResult = useCallback(() => {
    const finalScores = { ...scores };
    
    // Determine winner
    const maxScore = Math.max(finalScores.visual, finalScores.builder, finalScores.productivity);
    
    if (finalScores.visual === maxScore) {
      return trackResults.find(t => t.id === "visual")!;
    } else if (finalScores.builder === maxScore) {
      return trackResults.find(t => t.id === "builder")!;
    } else {
      return trackResults.find(t => t.id === "productivity")!;
    }
  }, [scores]);

  const handleStart = () => {
    setState("question");
  };

  const handleSelectAnswer = (answer: Answer) => {
    setSelectedAnswer(answer.id);
  };

  const handleNext = () => {
    if (!selectedAnswer) return;

    const answer = currentQuestion.answers.find(a => a.id === selectedAnswer)!;
    
    // Store answer
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: answer }));
    
    // Update scores
    setScores(prev => ({
      visual: prev.visual + answer.scores.visual,
      builder: prev.builder + answer.scores.builder,
      productivity: prev.productivity + answer.scores.productivity,
    }));

    // Check for motivational screen
    if (motivationalScreens[currentQuestion.id]) {
      setState("motivational");
    } else if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      // Final question answered - show result
      setState("result");
    }
  };

  const handleMotivationalContinue = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setState("question");
    } else {
      setState("result");
    }
  };

  const handlePostQuizAnswer = (answerId: string) => {
    // Store for analytics
    console.log("Post-quiz answer:", answerId);
    console.log("All answers:", answers);
    console.log("Final scores:", scores);
  };

  if (state === "start") {
    return <StartScreen onStart={handleStart} />;
  }

  if (state === "question") {
    return (
      <QuestionScreen
        key={currentQuestion.id}
        question={currentQuestion}
        currentStep={currentQuestionIndex + 1}
        totalSteps={totalQuestions}
        selectedAnswer={selectedAnswer}
        onSelect={handleSelectAnswer}
        onNext={handleNext}
      />
    );
  }

  if (state === "motivational") {
    const screen = motivationalScreens[currentQuestion.id];
    return (
      <MotivationalScreen
        key={`motivational-${currentQuestion.id}`}
        screen={screen}
        onContinue={handleMotivationalContinue}
      />
    );
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
