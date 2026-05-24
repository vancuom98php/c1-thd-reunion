"use client";
import React from 'react';
import Image from 'next/image';
import { C } from './tokens';

const CAPTIONS = [
  'Kỷ niệm đáng nhớ',
  'Khoảnh khắc bên nhau',
  'Những ngày tháng đẹp',
  'Cùng nhau trưởng thành',
  'Ký ức không phai',
];

const PLACEHOLDER = [{ src: '/sample-photo.png', alt: 'Placeholder' }];

export default function PhotoSlideshow({ photos = [] }) {
  const items = photos.length > 0 ? photos : PLACEHOLDER;
  const total = items.length;
  const [active, setActive] = React.useState(0);
  const timerRef = React.useRef(null);

  const go = (n) => {
    setActive((n + total) % total);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setActive(a => (a + 1) % total), 4000);
  };

  React.useEffect(() => {
    if (total <= 1) return;
    timerRef.current = setInterval(() => setActive(a => (a + 1) % total), 4000);
    return () => clearInterval(timerRef.current);
  }, [total]);

  return (
    <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', border: `1px solid rgba(245,215,161,0.18)`, boxShadow: '0 8px 32px rgba(0,0,0,0.5)', background: '#1A0B0B', flexShrink: 0, width: '100%' }}>
      <div style={{ position: 'relative', width: '100%', paddingBottom: '66%', overflow: 'hidden' }}>
        {items.map((photo, i) => (
          <div key={i} style={{
            position: 'absolute', inset: 0,
            opacity: i === active ? 1 : 0,
            transition: 'opacity 0.6s cubic-bezier(0.22,1,0.36,1)',
          }}>
            <Image
              src={photo.src}
              alt={photo.alt || CAPTIONS[i % CAPTIONS.length]}
              fill
              sizes="(max-width: 768px) 100vw, 380px"
              placeholder={photo.blurDataURL ? 'blur' : 'empty'}
              blurDataURL={photo.blurDataURL || undefined}
              style={{ objectFit: 'cover', display: 'block', filter: i === active ? 'none' : 'brightness(0.7)' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(26,11,11,0.85) 100%)' }}></div>
            <div style={{ position: 'absolute', bottom: 32, left: 12, right: 12, fontFamily: "'Be Vietnam Pro',sans-serif", fontSize: 11, color: 'rgba(245,215,161,0.8)', letterSpacing: '0.06em', textAlign: 'center' }}>
              {photo.alt || CAPTIONS[i % CAPTIONS.length]} · {i + 1}/{total}
            </div>
          </div>
        ))}
        {total > 1 && (
          <>
            <button onClick={() => go(active - 1)} aria-label="Trước" style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', background: 'rgba(26,11,11,0.7)', border: '1px solid rgba(245,215,161,0.2)', borderRadius: '50%', width: 28, height: 28, color: C.gold, cursor: 'pointer', fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, transition: 'background 0.2s' }}>‹</button>
            <button onClick={() => go(active + 1)} aria-label="Sau" style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'rgba(26,11,11,0.7)', border: '1px solid rgba(245,215,161,0.2)', borderRadius: '50%', width: 28, height: 28, color: C.gold, cursor: 'pointer', fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, transition: 'background 0.2s' }}>›</button>
          </>
        )}
      </div>

      {total > 1 && (
        <div style={{ position: 'absolute', bottom: 10, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 6, zIndex: 3 }}>
          {items.map((_, i) => (
            <button key={i} onClick={() => go(i)} aria-label={`Ảnh ${i + 1}`} style={{
              width: i === active ? 20 : 7, height: 7,
              borderRadius: 999,
              background: i === active ? C.gold : 'rgba(245,215,161,0.35)',
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
            }}></button>
          ))}
        </div>
      )}
    </div>
  );
}
