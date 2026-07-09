import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Toast({ message, onDone }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onDone, 2000);
    return () => clearTimeout(t);
  }, [message, onDone]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'fixed',
            top: '48px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#1a1a1a',
            border: '1px solid #b5f23d',
            color: '#ffffff',
            padding: '12px 20px',
            borderRadius: '8px',
            fontSize: '0.875rem',
            zIndex: 100,
            whiteSpace: 'nowrap',
            fontFamily: 'inherit',
          }}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
