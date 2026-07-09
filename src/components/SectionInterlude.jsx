import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function SectionInterlude({ sectionTitle, sectionSubtitle, progress, total, onComplete }) {
  useEffect(() => {
    const t = setTimeout(onComplete, 1400); // 0.3 fade-in + 0.8 hold + 0.3 fade-out
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#0f0f0f',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 200,
        textAlign: 'center',
        padding: '0 24px',
      }}
    >
      {/* 진행바 유지 */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '3px', backgroundColor: '#2a2a2a' }}>
        <div
          style={{
            height: '100%',
            width: `${(progress / total) * 100}%`,
            backgroundColor: '#b5f23d',
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div
          style={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: '#b5f23d',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '12px',
          }}
        >
          {sectionTitle}
        </div>
        <div
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.3,
          }}
        >
          {sectionSubtitle}
        </div>
      </motion.div>
    </motion.div>
  );
}
