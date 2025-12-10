import { useState, useCallback } from "react";
import { questions, motivationalScreens, trackResults, Answer } from "@/data/quizData";
import { QuestionScreen } from "./QuestionScreen";
import { MotivationalScreen } from "./MotivationalScreen";
import { ResultScreen } from "./ResultScreen";
import { LoadingScreen } from "./LoadingScreen";

type QuizState = "question" | "motivational" | "loading" | "result";

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
  };

  const handleNext = () => {
    if (!selectedAnswer) return;

    const answer = currentQuestion.answers.find(a => a.id === selectedAnswer)!;
    
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: answer }));
    
    setScores(prev => ({
      visual: prev.visual + answer.scores.visual,
      builder: prev.builder + answer.scores.builder,
      productivity: prev.productivity + answer.scores.productivity,
    }));

    if (motivationalScreens[currentQuestion.id]) {
      setState("motivational");
    } else if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      setState("loading");
    }
  };

  const handleMotivationalContinue = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setState("question");
    } else {
      setState("loading");
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
