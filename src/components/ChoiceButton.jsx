export default function ChoiceButton({ label, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        textAlign: 'left',
        padding: '16px 20px',
        borderRadius: '8px',
        border: `1px solid ${selected ? '#b5f23d' : '#2a2a2a'}`,
        backgroundColor: selected ? '#1e2a0a' : '#1a1a1a',
        color: selected ? '#b5f23d' : '#ffffff',
        fontSize: '1rem',
        fontFamily: 'inherit',
        cursor: 'pointer',
        transition: 'all 0.15s',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}
      onMouseEnter={(e) => {
        if (!selected) {
          e.currentTarget.style.borderColor = '#b5f23d';
          e.currentTarget.style.color = '#b5f23d';
        }
      }}
      onMouseLeave={(e) => {
        if (!selected) {
          e.currentTarget.style.borderColor = '#2a2a2a';
          e.currentTarget.style.color = '#ffffff';
        }
      }}
    >
      {selected && (
        <span style={{ flexShrink: 0, fontSize: '0.9rem' }}>✓</span>
      )}
      <span>{label}</span>
    </button>
  );
}
