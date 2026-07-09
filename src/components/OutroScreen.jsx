import { motion } from 'framer-motion';

function AnimatedCheck() {
  const circleLen = 2 * Math.PI * 28; // r=28
  const checkLen = 40;

  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <motion.circle
        cx="32"
        cy="32"
        r="28"
        stroke="#b5f23d"
        strokeWidth="3"
        fill="none"
        strokeDasharray={circleLen}
        initial={{ strokeDashoffset: circleLen }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        strokeLinecap="round"
        style={{ transformOrigin: '32px 32px', rotate: '-90deg' }}
      />
      <motion.path
        d="M20 32 L28 41 L44 24"
        stroke="#b5f23d"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={checkLen}
        initial={{ strokeDashoffset: checkLen }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 0.4, delay: 0.7, ease: 'easeInOut' }}
      />
    </svg>
  );
}

export default function OutroScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
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
      <div style={{ marginBottom: '24px' }}>
        <AnimatedCheck />
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.4 }}
        style={{
          fontSize: 'clamp(1.5rem, 6vw, 2rem)',
          fontWeight: 700,
          marginBottom: '16px',
          color: '#ffffff',
        }}
      >
        응답 완료!
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.25, duration: 0.4 }}
        style={{ color: '#888888', lineHeight: 1.7 }}
      >
        소중한 의견 감사합니다.
        <br />
        회원님의 목소리가 그린짐을 바꿉니다.
      </motion.p>
    </motion.div>
  );
}
