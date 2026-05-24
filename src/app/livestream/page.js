"use client";
import { C, F } from '@/components/tokens';
import { useIntersectionAnim } from '@/components/hooks';

export default function PageLivestream() {
  const ref = useIntersectionAnim();
  const isLive = false;
  return (
    <div ref={ref} style={{ background: 'transparent', minHeight: '100vh', padding: '120px 24px 80px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div className="anim-in" style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: isLive ? 'rgba(192,22,28,0.2)' : 'rgba(255,255,255,0.06)', border: `1px solid ${isLive ? C.crimson : 'rgba(255,255,255,0.1)'}`, borderRadius: 999, padding: '6px 16px', marginBottom: 16 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: isLive ? C.crimson : C.white40, animation: isLive ? 'glowPulse 1s infinite' : 'none' }}></div>
            <span style={{ fontFamily: F.body, fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', color: isLive ? C.crimson : C.white40, textTransform: 'uppercase' }}>{isLive ? 'ĐANG PHÁT TRỰC TIẾP' : 'CHƯA PHÁT SÓNG'}</span>
          </div>
          <h2 style={{ fontFamily: F.display, fontSize: 'clamp(26px,3.5vw,40px)', fontWeight: 900, color: C.gold, letterSpacing: '0.06em', marginBottom: 8, textShadow: '0 0 40px rgba(245,215,161,0.25)' }}>Livestream</h2>
          <div style={{ fontFamily: F.serif, fontStyle: 'italic', fontSize: 15, color: C.white70 }}>Theo dõi buổi hội ngộ trực tiếp từ xa</div>
        </div>

        <div className="anim-in" style={{ background: 'linear-gradient(135deg,#3D0C10,#1A0B0B)', border: `1px solid ${C.goldLine}`, borderRadius: 16, overflow: 'hidden', marginBottom: 24, boxShadow: '0 16px 60px rgba(0,0,0,0.6)' }}>
          <div style={{ aspectRatio: '16/9', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, position: 'relative', background: '#0D0505' }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.04 }}>
              {[...Array(16)].map((_, i) => <div key={i} style={{ position: 'absolute', left: `${i*7}%`, top: 0, bottom: 0, width: 1, background: C.gold }}></div>)}
              {[...Array(10)].map((_, i) => <div key={i} style={{ position: 'absolute', top: `${i*11}%`, left: 0, right: 0, height: 1, background: C.gold }}></div>)}
            </div>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: `rgba(122,15,20,0.5)`, border: `2px solid ${C.goldLine}`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{ width: 0, height: 0, borderTop: '14px solid transparent', borderBottom: '14px solid transparent', borderLeft: `22px solid ${C.gold}`, marginLeft: 4, opacity: 0.6 }}></div>
            </div>
            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
              <div style={{ fontFamily: F.serif, fontSize: 18, fontWeight: 600, color: C.gold, marginBottom: 6 }}>Livestream sẽ bắt đầu lúc 18:30</div>
              <div style={{ fontFamily: F.body, fontSize: 13, color: C.white40 }}>Ngày 10/10/2026 · YouTube &amp; Facebook</div>
            </div>
          </div>
        </div>

        <div className="anim-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16 }}>
          {[
            { icon: '📺', title: 'YouTube', desc: 'Theo dõi trên kênh YouTube chính thức của lớp C1 – Trần Hưng Đạo | 2013–2016' },
            { icon: '📱', title: 'Facebook Live', desc: 'Xem trực tiếp qua trang Facebook của nhóm lớp' },
            { icon: '🔔', title: 'Nhắc nhở', desc: 'Đăng ký nhận thông báo để không bỏ lỡ buổi livestream' },
          ].map((item, i) => (
            <div key={i} style={{ background: 'linear-gradient(135deg,#4A1015,#260D0D)', border: `1px solid ${C.goldLine}`, borderRadius: 12, padding: '20px 20px', boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }}>
              <div style={{ fontSize: 24, marginBottom: 10 }}>{item.icon}</div>
              <div style={{ fontFamily: F.serif, fontSize: 15, fontWeight: 600, color: C.gold, marginBottom: 6 }}>{item.title}</div>
              <div style={{ fontFamily: F.body, fontSize: 13, color: C.white70, lineHeight: 1.65 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
