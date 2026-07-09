export default function ProgressBar({ current, total }) {
  const pct = ((current + 1) / total) * 100;
  return (
    <>
      {/* 진행바 — fixed top */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, height: '3px', backgroundColor: '#2a2a2a' }}>
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            backgroundColor: '#b5f23d',
            transition: 'width 0.4s ease',
          }}
        />
      </div>
      {/* 진행 카운터 — 진행바 바로 아래 좌측 */}
      <div
        style={{
          position: 'fixed',
          top: '16px',
          left: '24px',
          fontSize: '0.75rem',
          fontWeight: 500,
          color: '#888888',
          zIndex: 40,
          fontFamily: 'inherit',
        }}
      >
        {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </div>
    </>
  );
}
