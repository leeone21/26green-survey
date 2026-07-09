export default function ProgressBar({ current, total }) {
  const pct = ((current + 1) / total) * 100;
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div style={{ height: '2px', backgroundColor: '#2a2a2a' }}>
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            backgroundColor: '#b5f23d',
            transition: 'width 0.4s ease',
          }}
        />
      </div>
    </div>
  );
}
