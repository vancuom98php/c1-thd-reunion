"use client";
import React from 'react';
import { C, F } from './tokens';

export function GoldDivider({ style }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, ...style }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${C.goldMuted})` }}></div>
      <span style={{ color: C.goldMuted, fontSize: 12 }}>◆</span>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(270deg, transparent, ${C.goldMuted})` }}></div>
    </div>
  );
}

export function SectionTag({ children }) {
  return (
    <div style={{ fontFamily: F.display, fontSize: 14, fontWeight: 600, letterSpacing: '0.2em', color: C.goldMuted, textTransform: 'uppercase', marginBottom: 14 }}>
      {children}
    </div>
  );
}

export function GoldBtn({ children, onClick, ghost, style, type = 'button' }) {
  const [h, setH] = React.useState(false);
  return ghost ? (
    <button type={type} onClick={onClick} style={{ padding: '13px 28px', background: h ? 'rgba(245,215,161,0.08)' : 'transparent', color: C.gold, fontFamily: F.body, fontSize: 14, fontWeight: 500, border: `1px solid ${h ? 'rgba(245,215,161,0.6)' : 'rgba(245,215,161,0.3)'}`, borderRadius: 6, cursor: 'pointer', transition: 'all 0.2s', ...style }} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>{children}</button>
  ) : (
    <button type={type} onClick={onClick} style={{ padding: '14px 32px', background: h ? `linear-gradient(135deg,${C.goldBright},${C.goldWarm})` : `linear-gradient(135deg,${C.goldWarm},${C.goldMuted})`, color: C.bgDeep, fontFamily: F.body, fontSize: 14, fontWeight: 600, letterSpacing: '0.04em', border: 'none', borderRadius: 6, cursor: 'pointer', boxShadow: h ? '0 8px 32px rgba(245,215,161,0.4)' : '0 4px 20px rgba(200,168,108,0.3)', transition: 'all 0.2s', transform: h ? 'translateY(-2px)' : 'none', ...style }} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>{children}</button>
  );
}

export function Confetti() {
  const pieces = React.useMemo(() => [...Array(60)].map(() => ({
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 2.5 + Math.random() * 2,
    color: [C.gold, C.goldWarm, '#FF6B6B', '#6B8FFF', '#6BFFE8', C.goldBright][Math.floor(Math.random() * 6)],
    size: 6 + Math.random() * 8,
    shape: Math.random() > 0.5 ? '50%' : '2px',
  })), []);
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999, overflow: 'hidden' }}>
      {pieces.map((p, i) => (
        <div key={i} className="confetti-piece" style={{ left: `${p.left}%`, width: p.size, height: p.size, background: p.color, borderRadius: p.shape, animationDuration: `${p.duration}s`, animationDelay: `${p.delay}s` }}></div>
      ))}
    </div>
  );
}
