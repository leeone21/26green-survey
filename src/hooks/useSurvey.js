import { useState, useCallback } from 'react';
import { questions } from '../data/questions';

const submitSurvey = async (answers) => {
  try {
    await fetch(import.meta.env.VITE_SHEETS_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(answers),
    });
    return true;
  } catch (err) {
    console.error('제출 실패:', err);
    return false;
  }
};

export function useSurvey() {
  const [screen, setScreen] = useState('intro'); // 'intro' | 'question' | 'outro'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const currentQuestion = questions[currentIndex];
  const total = questions.length;

  const setAnswer = useCallback((qId, value) => {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  }, []);

  const toggleMulti = useCallback((qId, option, maxSelect) => {
    setAnswers((prev) => {
      const current = prev[qId] || [];
      if (current.includes(option)) {
        return { ...prev, [qId]: current.filter((o) => o !== option) };
      }
      if (maxSelect && current.length >= maxSelect) return prev;
      return { ...prev, [qId]: [...current, option] };
    });
  }, []);

  const goNext = useCallback(async () => {
    if (currentIndex < total - 1) {
      setDirection(1);
      setCurrentIndex((i) => i + 1);
    } else {
      setSubmitting(true);
      await submitSurvey(answers);
      setSubmitting(false);
      setScreen('outro');
    }
  }, [currentIndex, total, answers]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((i) => i - 1);
    } else {
      setScreen('intro');
    }
  }, [currentIndex]);

  const startSurvey = useCallback(() => {
    setDirection(1);
    setCurrentIndex(0);
    setScreen('question');
  }, []);

  const isAnswered = (q) => {
    if (!q.required) return true;
    const a = answers[q.id];
    if (q.type === 'multi') return Array.isArray(a) && a.length > 0;
    return a !== undefined && a !== '';
  };

  return {
    screen,
    currentIndex,
    direction,
    currentQuestion,
    total,
    answers,
    submitting,
    setAnswer,
    toggleMulti,
    goNext,
    goPrev,
    startSurvey,
    isAnswered,
  };
}
