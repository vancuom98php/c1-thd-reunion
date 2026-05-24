"use client";
import React from 'react';
import { C, F } from './tokens';

// Decorative fake QR — not a real scannable code, mirrors the original prototype.
function generateQR(name, seed) {
  const data = `THD-C1-2026-${name.replace(/\s/g, '-').toUpperCase()}-${seed}`;
  const size = 160;
  const cellSize = 8;
  const cells = Math.floor(size / cellSize);
  // Deterministic-ish pattern from the seed so React's hydration stays stable.
  let s = seed.charCodeAt(0) || 1;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const qrData = [];
  for (let r = 0; r < cells; r++) {
    for (let c = 0; c < cells; c++) {
      const edge = r < 2 || r >= cells - 2 || c < 2 || c >= cells - 2;
      const corner = (r < 7 && c < 7) || (r < 7 && c >= cells - 7) || (r >= cells - 7 && c < 7);
      const fill = corner ? true : edge ? false : rand() > 0.5;
      qrData.push({ r, c, fill });
    }
  }
  return { data, qrData, cellSize, size };
}

export default function QRDisplay({ name, seed }) {
  const { qrData, cellSize, size, data } = React.useMemo(
    () => generateQR(name, seed || Date.now().toString(36).toUpperCase()),
    [name, seed]
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <div style={{ background: '#fff', padding: 12, borderRadius: 8 }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {qrData.map(({ r, c, fill }, i) => fill && (
            <rect key={i} x={c*cellSize} y={r*cellSize} width={cellSize} height={cellSize} fill="#1A0B0B" />
          ))}
        </svg>
      </div>
      <div style={{ fontFamily: F.body, fontSize: 11, color: C.goldMuted, letterSpacing: '0.08em', textAlign: 'center', maxWidth: 180, wordBreak: 'break-all' }}>{data}</div>
    </div>
  );
}
