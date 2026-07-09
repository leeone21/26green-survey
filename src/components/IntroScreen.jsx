import { motion } from 'framer-motion';

export default function IntroScreen({ onStart }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35 }}
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 24px',
        maxWidth: '600px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      <div style={{ marginBottom: '8px' }}>
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 500,
            color: '#b5f23d',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          그린짐
        </span>
      </div>
      <h1
        style={{
          fontSize: 'clamp(2rem, 8vw, 3rem)',
          fontWeight: 700,
          lineHeight: 1.2,
          marginBottom: '32px',
          color: '#ffffff',
        }}
      >
        리뉴얼
        <br />
        수요조사
      </h1>
      <p
        style={{
          fontSize: '1rem',
          color: '#888888',
          lineHeight: 1.7,
          marginBottom: '48px',
        }}
      >
        안녕하세요, 그린짐입니다.
        <br />
        더 나은 그린짐으로 리뉴얼하기 위해
        <br />
        회원님들의 목소리를 듣고자 합니다.
        <br />
        <br />
        약 3~4분 소요됩니다.
      </p>
      <button
        onClick={onStart}
        style={{
          alignSelf: 'flex-start',
          padding: '16px 32px',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: '#b5f23d',
          color: '#0f0f0f',
          fontSize: '1rem',
          fontWeight: 700,
          fontFamily: 'inherit',
          cursor: 'pointer',
          transition: 'background-color 0.15s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#c8ff4f')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#b5f23d')}
      >
        시작하기 →
      </button>
    </motion.div>
  );
}
