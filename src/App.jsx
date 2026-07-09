import { AnimatePresence } from 'framer-motion';
import { useSurvey } from './hooks/useSurvey';
import IntroScreen from './components/IntroScreen';
import QuestionScreen from './components/QuestionScreen';
import OutroScreen from './components/OutroScreen';
import ProgressBar from './components/ProgressBar';

export default function App() {
  const {
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
  } = useSurvey();

  return (
    <div style={{ backgroundColor: '#0f0f0f', minHeight: '100dvh', position: 'relative' }}>
      {screen === 'question' && (
        <ProgressBar current={currentIndex} total={total} />
      )}

      {screen === 'question' && (
        <div
          style={{
            position: 'fixed',
            top: '12px',
            right: '24px',
            fontSize: '0.75rem',
            fontWeight: 500,
            color: '#888888',
            zIndex: 40,
          }}
        >
          {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </div>
      )}

      <AnimatePresence mode="wait" custom={direction}>
        {screen === 'intro' && (
          <IntroScreen key="intro" onStart={startSurvey} />
        )}
        {screen === 'question' && currentQuestion && (
          <QuestionScreen
            key={currentQuestion.id}
            question={currentQuestion}
            index={currentIndex}
            total={total}
            direction={direction}
            answer={answers[currentQuestion.id]}
            onSingle={setAnswer}
            onMultiToggle={toggleMulti}
            onTextChange={setAnswer}
            onNext={goNext}
            onPrev={goPrev}
            canNext={isAnswered(currentQuestion)}
            submitting={submitting}
          />
        )}
        {screen === 'outro' && <OutroScreen key="outro" />}
      </AnimatePresence>
    </div>
  );
}
