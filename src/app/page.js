"use client";
import React from 'react';
import Link from 'next/link';
import { C, F, EVENT } from '@/components/tokens';
import { GoldDivider, GoldBtn } from '@/components/ui';
import { useCountdown } from '@/components/hooks';

const ACCENT = '#F5D7A1';

export default function PageHome() {
  const time = useCountdown(EVENT.date);
  const [entered, setEntered] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setEntered(true), 80);
    return () => clearTimeout(t);
  }, []);

  const anim = (delay) => ({
    animation: entered ? `fadeSlideUp 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s both` : 'none',
  });

  const CountBox = ({ n, label }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 0 }}>
      <div style={{ fontFamily: F.display, fontSize: 'clamp(40px,7vw,80px)', fontWeight: 900, color: ACCENT, lineHeight: 1, textShadow: '0 0 40px rgba(245,215,161,0.35)', fontVariantNumeric: 'tabular-nums', letterSpacing: '0.02em' }}>{String(n).padStart(2, '0')}</div>
      <div style={{ fontFamily: F.body, fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.goldMuted, marginTop: 6 }}>{label}</div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', position: 'relative', background: 'linear-gradient(160deg,#7A0F14 0%,#3D0C10 45%,#1A0B0B 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 24px 80px', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '70%', background: 'radial-gradient(ellipse at 50% 0%, rgba(245,215,161,0.09) 0%, transparent 65%)', pointerEvents: 'none' }}></div>
      <div style={{ position: 'absolute', bottom: 0, left: '30%', right: '30%', height: '40%', background: 'radial-gradient(ellipse at bottom, rgba(122,15,20,0.4) 0%, transparent 70%)', pointerEvents: 'none' }}></div>

      {[...Array(12)].map((_, i) => (
        <div key={i} style={{ position: 'absolute', width: 3, height: 3, borderRadius: '50%', background: C.goldMuted, opacity: 0.4, left: `${8 + i*7.5}%`, top: `${15 + ((i%4)*20)}%`, animation: `sparkle ${1.5 + i*0.3}s ease-in-out ${i*0.2}s infinite` }}></div>
      ))}

      <div style={{ ...anim(0.1), textAlign: 'center', marginBottom: 24 }}>
        <div style={{ fontFamily: F.display, fontSize: 14, fontWeight: 600, letterSpacing: '0.24em', color: C.goldMuted, textTransform: 'uppercase' }}>✦ &nbsp; Kỷ Niệm &nbsp; ✦</div>
      </div>

      <div style={{ ...anim(0.3), textAlign: 'center', marginBottom: 8 }}>
        <h1 style={{ fontFamily: F.display, fontSize: 'clamp(32px,5vw,60px)', fontWeight: 900, color: ACCENT, letterSpacing: '0.06em', lineHeight: 1.15, textShadow: '0 0 80px rgba(245,215,161,0.35)', textWrap: 'balance', textAlign: 'center' }}>
          {EVENT.heroTitle}
        </h1>
      </div>

      <div style={{ ...anim(0.45), textAlign: 'center', marginBottom: 32 }}>
        <div style={{ fontFamily: F.serif, fontStyle: 'italic', fontSize: 'clamp(16px,2.2vw,22px)', color: C.white70, letterSpacing: '0.03em' }}>
          {EVENT.className} &ndash; Kỷ niệm 10 năm ra trường
        </div>
      </div>

      <div style={{ ...anim(0.55), width: '100%', maxWidth: 360, marginBottom: 40 }}>
        <GoldDivider />
      </div>

      <div style={{ ...anim(0.65), marginBottom: 48 }}>
        <div style={{ textAlign: 'center', marginBottom: 12 }}>
          <div style={{ fontFamily: F.serif, fontSize: 'clamp(18px,2.5vw,24px)', fontWeight: 600, color: C.gold, marginBottom: 6, letterSpacing: '0.04em' }}>25 . 07 . 2026</div>
          <span style={{ fontFamily: F.body, fontSize: 14, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.goldMuted }}>Đếm ngược đến ngày hội ngộ</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'clamp(8px,2.5vw,28px)', flexWrap: 'nowrap', justifyContent: 'center' }}>
          <CountBox n={time.days} label="Ngày" />
          <div style={{ fontFamily: F.display, fontSize: 'clamp(28px,5vw,64px)', color: C.goldMuted, lineHeight: 1, paddingTop: 6, opacity: 0.5, flexShrink: 0 }}>:</div>
          <CountBox n={time.hours} label="Giờ" />
          <div style={{ fontFamily: F.display, fontSize: 'clamp(28px,5vw,64px)', color: C.goldMuted, lineHeight: 1, paddingTop: 6, opacity: 0.5, flexShrink: 0 }}>:</div>
          <CountBox n={time.minutes} label="Phút" />
          <div style={{ fontFamily: F.display, fontSize: 'clamp(28px,5vw,64px)', color: C.goldMuted, lineHeight: 1, paddingTop: 6, opacity: 0.5, flexShrink: 0 }}>:</div>
          <CountBox n={time.seconds} label="Giây" />
        </div>
      </div>

      <div style={{ ...anim(0.8), display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/register" style={{ textDecoration: 'none' }}><GoldBtn>Đăng Ký Tham Dự</GoldBtn></Link>
        <Link href="/program" style={{ textDecoration: 'none' }}><GoldBtn ghost>Xem Chương Trình</GoldBtn></Link>
      </div>

      <div style={{ ...anim(1.1), position: 'absolute', bottom: 32, textAlign: 'center' }}>
        <div style={{ color: 'rgba(245,215,161,0.35)', fontSize: 20, animation: 'bounce 2s ease-in-out infinite' }}>↓</div>
      </div>
    </div>
  );
}
