"use client";
import React from 'react';
import { C, F, EVENT } from './tokens';

export default function MusicPlayerGlobal() {
  const [playing, setPlaying] = React.useState(false);
  const audioRef = React.useRef(null);

  React.useEffect(() => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.play().catch(() => setPlaying(false));
    } else {
      audioRef.current.pause();
    }
  }, [playing]);

  if (!EVENT.showMusicButton) return null;
  return (
    <div style={{ position: 'fixed', bottom: 28, left: 28, zIndex: 150, display: 'flex', alignItems: 'center', gap: 6 }} id="music-player-wrap">
      <audio ref={audioRef} src="/nu_cuoi_18_20.mp3" loop preload="none" />
      <button onClick={() => setPlaying(p => !p)} style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '10px 18px', background: 'rgba(26,11,11,0.92)', backdropFilter: 'blur(12px)',
        border: `1px solid ${playing ? 'rgba(245,215,161,0.4)' : 'rgba(245,215,161,0.15)'}`,
        borderRadius: 999, cursor: 'pointer', transition: 'all 0.2s',
      }}>
        <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end', height: 16 }}>
          {[6, 12, 9, 14, 6].map((h, i) => (
            <div key={i} style={{ width: 3, height: h, background: C.gold, borderRadius: 2, animation: playing ? `musicWave 0.8s ease-in-out ${i*0.1}s infinite alternate` : 'none', opacity: playing ? 1 : 0.3 }}></div>
          ))}
        </div>
        <span style={{ fontFamily: F.body, fontSize: 12, fontWeight: 500, color: C.gold, opacity: playing ? 1 : 0.5, letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
          {playing ? 'Nhạc Nền' : 'Bật Nhạc'}
        </span>
      </button>
    </div>
  );
}
