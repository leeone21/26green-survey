import { useState, useCallback } from 'react';
import { questions } from '../data/questions';

// 섹션 전환 발생 시점: [이전 질문 인덱스] → 섹션 정보
const SECTION_INTERLUDES = {
  5: { title: '주말 운영', subtitle: '신설 검토 중입니다' },        // Q6(idx5) → Q7(idx6)
  8: { title: '멤버십 정책', subtitle: '회원님의 의견이 반영됩니다' }, // Q9(idx8) → Q10(idx9)
  10: { title: '스페셜 클래스', subtitle: '어떤 활동을 원하시나요?' }, // Q11(idx10) → Q12(idx11)
  12: { title: '커리큘럼 선호', subtitle: '함께 만들어가는 그린짐' }, // Q13(idx12) → Q14(idx13)
};

const WEBHOOK_URL = import.meta.env.VITE_SHEETS_WEBHOOK_URL ||
  'https://script.google.com/macros/s/AKfycbwyjanq7zm4XIYZjCZY4juBijV5Ktqx4Lfs1AWlxCLfr3q4BFouqXVIIulAZXO7f1uH4w/exec';

const submitSurvey = async (answers) => {
  try {
    await fetch(WEBHOOK_URL, {
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
  const [screen, setScreen] = useState('intro'); // 'intro' | 'question' | 'interlude' | 'outro'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [interlude, setInterlude] = useState(null); // { title, subtitle }

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
      const nextIndex = currentIndex + 1;
      const sectionChange = SECTION_INTERLUDES[currentIndex];
      setDirection(1);
      if (sectionChange) {
        setInterlude({ ...sectionChange, afterIndex: nextIndex });
        setScreen('interlude');
      } else {
        setCurrentIndex(nextIndex);
      }
    } else {
      setSubmitting(true);
      await submitSurvey(answers);
      setSubmitting(false);
      setScreen('outro');
    }
  }, [currentIndex, total, answers]);

  const interludeDone = useCallback(() => {
    if (interlude) {
      setCurrentIndex(interlude.afterIndex);
      setInterlude(null);
      setScreen('question');
    }
  }, [interlude]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    if (currentIndex > 0) {
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
    interlude,
    setAnswer,
    toggleMulti,
    goNext,
    goPrev,
    startSurvey,
    interludeDone,
    isAnswered,
  };
}
