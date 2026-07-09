import { motion } from 'framer-motion';

export default function OutroScreen() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 24px',
        textAlign: 'center',
        maxWidth: '600px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: '#1e2a0a',
          border: '2px solid #b5f23d',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          marginBottom: '24px',
          color: '#b5f23d',
        }}
      >
        ✓
      </div>
      <h2
        style={{
          fontSize: 'clamp(1.5rem, 6vw, 2rem)',
          fontWeight: 700,
          marginBottom: '16px',
          color: '#ffffff',
        }}
      >
        응답 완료!
      </h2>
      <p style={{ color: '#888888', lineHeight: 1.7 }}>
        소중한 의견 감사합니다.
        <br />
        회원님의 목소리가 그린짐을 바꿉니다.
      </p>
    </motion.div>
  );
}
