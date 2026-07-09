import { motion } from 'framer-motion';

export default function AlreadyDone() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
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
          border: '2px solid #2a2a2a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          marginBottom: '24px',
          color: '#888888',
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
        이미 참여하셨습니다
      </h2>
      <p style={{ color: '#888888', lineHeight: 1.7 }}>
        소중한 의견 감사합니다.
        <br />
        회원님의 목소리가 그린짐을 바꿉니다.
      </p>
    </motion.div>
  );
}
