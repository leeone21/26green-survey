import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import ChoiceButton from './ChoiceButton';
import Toast from './Toast';

const variants = {
  enter: (dir) => ({ y: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { y: 0, opacity: 1 },
  exit: (dir) => ({ y: dir > 0 ? -40 : 40, opacity: 0 }),
};

export default function QuestionScreen({
  question,
  index,
  total,
  direction,
  answer,
  openFeedbackAnswer,
  onSingle,
  onMultiToggle,
  onTextChange,
  onOpenFeedbackChange,
  onNext,
  onPrev,
  canNext,
  submitting,
}) {
  const isLast = index === total - 1;
  const [shakeId, setShakeId] = useState(null);
  const [toast, setToast] = useState('');

  const handleMultiToggle = useCallback((qId, opt, maxSelect) => {
    const current = Array.isArray(answer) ? answer : [];
    if (!current.includes(opt) && maxSelect && current.length >= maxSelect) {
      setShakeId(opt);
      setToast(`최대 ${maxSelect}개까지 선택할 수 있어요`);
      setTimeout(() => setShakeId(null), 400);
      return;
    }
    onMultiToggle(qId, opt, maxSelect);
  }, [answer, onMultiToggle]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Enter' && question.type !== 'textarea' && canNext) {
        onNext();
      } else if (e.key === 'Backspace' && document.activeElement.tagName !== 'TEXTAREA' && document.activeElement.tagName !== 'INPUT') {
        onPrev();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [question.type, canNext, onNext, onPrev]);

  const handleSingle = (option) => {
    onSingle(question.id, option);
    if (!isLast && !question.openFeedback) {
      setTimeout(() => onNext(), 300);
    }
  };

  return (
    <>
      <Toast message={toast} onDone={() => setToast('')} />
      <motion.div
        key={question.id}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.35, ease: 'easeOut' }}
        style={{
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '72px 24px 80px',
          maxWidth: '600px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        {/* Section label */}
        <div style={{ marginBottom: '12px' }}>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 500,
              color: '#b5f23d',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            {question.section}
          </span>
        </div>

        {/* Question text */}
        <h2
          style={{
            fontSize: 'clamp(1.75rem, 5vw, 2.25rem)',
            fontWeight: 700,
            lineHeight: 1.3,
            marginBottom: '32px',
            color: '#ffffff',
          }}
        >
          {question.text}
        </h2>

        {/* Options */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginBottom: question.openFeedback ? '16px' : '40px',
            overflowY: 'auto',
            maxHeight: 'calc(100dvh - 320px)',
            paddingRight: '2px',
          }}
        >
          {question.type === 'single' &&
            question.options.map((opt) => (
              <ChoiceButton
                key={opt}
                label={opt}
                selected={answer === opt}
                onClick={() => handleSingle(opt)}
              />
            ))}

          {question.type === 'multi' &&
            question.options.map((opt) => {
              const selected = Array.isArray(answer) && answer.includes(opt);
              return (
                <ChoiceButton
                  key={opt}
                  label={opt}
                  selected={selected}
                  shake={shakeId === opt}
                  onClick={() => handleMultiToggle(question.id, opt, question.maxSelect)}
                />
              );
            })}

          {question.type === 'textarea' && (
            <textarea
              value={answer || ''}
              onChange={(e) => onTextChange(question.id, e.target.value)}
              placeholder={question.placeholder}
              rows={5}
              style={{
                width: '100%',
                padding: '16px 20px',
                borderRadius: '8px',
                border: '1px solid #2a2a2a',
                backgroundColor: '#1a1a1a',
                color: '#ffffff',
                fontSize: '1rem',
                fontFamily: 'inherit',
                outline: 'none',
                transition: 'border-color 0.15s',
                resize: 'none',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#b5f23d')}
              onBlur={(e) => (e.target.style.borderColor = '#2a2a2a')}
            />
          )}
        </div>

        {/* Open feedback textarea */}
        {question.openFeedback && (
          <div style={{ marginBottom: '40px' }}>
            <textarea
              value={openFeedbackAnswer || ''}
              onChange={(e) => onOpenFeedbackChange(question.id, e.target.value)}
              placeholder={question.openFeedbackPlaceholder || '추가 의견이 있다면 자유롭게 적어주세요 (선택)'}
              rows={3}
              style={{
                width: '100%',
                padding: '14px 18px',
                borderRadius: '8px',
                border: '1px solid #2a2a2a',
                backgroundColor: '#141414',
                color: '#ffffff',
                fontSize: '0.9rem',
                fontFamily: 'inherit',
                outline: 'none',
                transition: 'border-color 0.15s',
                resize: 'none',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#b5f23d')}
              onBlur={(e) => (e.target.style.borderColor = '#2a2a2a')}
            />
          </div>
        )}

        {/* Navigation */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {(question.type === 'multi' || question.type === 'textarea' || question.openFeedback || isLast) && (
            <button
              onClick={onNext}
              disabled={!canNext || submitting}
              style={{
                flex: 1,
                padding: '16px',
                minHeight: '56px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: canNext && !submitting ? '#b5f23d' : '#2a2a2a',
                color: canNext && !submitting ? '#0f0f0f' : '#888888',
                fontSize: '1rem',
                fontWeight: 700,
                fontFamily: 'inherit',
                cursor: canNext && !submitting ? 'pointer' : 'not-allowed',
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => {
                if (canNext && !submitting) e.currentTarget.style.backgroundColor = '#c8ff4f';
              }}
              onMouseLeave={(e) => {
                if (canNext && !submitting) e.currentTarget.style.backgroundColor = '#b5f23d';
              }}
            >
              {submitting ? '제출 중...' : isLast ? '제출하기 →' : '다음 →'}
            </button>
          )}
          <button
            onClick={onPrev}
            style={{
              padding: '16px 20px',
              minHeight: '56px',
              borderRadius: '8px',
              border: '1px solid #2a2a2a',
              backgroundColor: 'transparent',
              color: '#888888',
              fontSize: '1rem',
              fontFamily: 'inherit',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#b5f23d';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#2a2a2a';
              e.currentTarget.style.color = '#888888';
            }}
          >
            ← 이전
          </button>
        </div>
      </motion.div>
    </>
  );
}
