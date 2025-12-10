import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "osnova_quiz_session";

interface QuizSession {
  currentQuestionIndex: number;
  answers: Record<number, any>;
  scores: { visual: number; builder: number; productivity: number };
  state: "question" | "loading" | "result";
}

const defaultSession: QuizSession = {
  currentQuestionIndex: 0,
  answers: {},
  scores: { visual: 0, builder: 0, productivity: 0 },
  state: "question",
};

export function useQuizStorage() {
  const [session, setSession] = useState<QuizSession>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : defaultSession;
    } catch {
      return defaultSession;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  }, [session]);

  const updateSession = useCallback((updates: Partial<QuizSession>) => {
    setSession((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetSession = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setSession(defaultSession);
  }, []);

  return { session, updateSession, resetSession };
}
