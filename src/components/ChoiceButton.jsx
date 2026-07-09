import { useState } from 'react';

export default function ChoiceButton({ label, selected, onClick, shake }) {
  const [pressed, setPressed] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      className={shake ? 'shake' : ''}
      style={{
        width: '100%',
        minHeight: '56px',
        textAlign: 'left',
        padding: '16px 20px',
        borderRadius: '8px',
        border: `1px solid ${selected ? '#b5f23d' : '#2a2a2a'}`,
        backgroundColor: selected ? '#1e2a0a' : '#1a1a1a',
        color: selected ? '#b5f23d' : '#ffffff',
        fontSize: '1rem',
        fontFamily: 'inherit',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        transform: pressed ? 'scale(1.02)' : selected ? 'scale(1.02)' : 'scale(1)',
        WebkitTapHighlightColor: 'transparent',
      }}
      onMouseEnter={(e) => {
        if (!selected) {
          e.currentTarget.style.borderColor = '#b5f23d';
          e.currentTarget.style.color = '#b5f23d';
        }
      }}
      onMouseLeave={(e) => {
        setPressed(false);
        if (!selected) {
          e.currentTarget.style.borderColor = '#2a2a2a';
          e.currentTarget.style.color = '#ffffff';
        }
      }}
    >
      {selected && (
        <span style={{ flexShrink: 0, fontSize: '0.9rem', color: '#b5f23d' }}>✓</span>
      )}
      <span>{label}</span>
    </button>
  );
}
