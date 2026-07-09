import { AnimatePresence } from 'framer-motion';
import { useSurvey, hasAlreadySubmitted } from './hooks/useSurvey';
import IntroScreen from './components/IntroScreen';
import QuestionScreen from './components/QuestionScreen';
import OutroScreen from './components/OutroScreen';
import ProgressBar from './components/ProgressBar';
import SectionInterlude from './components/SectionInterlude';
import AlreadyDone from './components/AlreadyDone';

export default function App() {
  const {
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
  } = useSurvey();

  if (hasAlreadySubmitted() && screen !== 'outro') {
    return (
      <div style={{ backgroundColor: '#0f0f0f', minHeight: '100dvh' }}>
        <AlreadyDone />
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#0f0f0f', minHeight: '100dvh', position: 'relative' }}>
      {(screen === 'question' || screen === 'interlude') && (
        <ProgressBar current={currentIndex} total={total} />
      )}

      <AnimatePresence mode="wait" custom={direction}>
        {screen === 'intro' && (
          <IntroScreen key="intro" onStart={startSurvey} />
        )}

        {screen === 'interlude' && interlude && (
          <SectionInterlude
            key={`interlude-${interlude.title}`}
            sectionTitle={interlude.title}
            sectionSubtitle={interlude.subtitle}
            progress={currentIndex + 1}
            total={total}
            onComplete={interludeDone}
          />
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
