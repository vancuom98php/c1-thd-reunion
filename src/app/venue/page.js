"use client";
import { C, F } from '@/components/tokens';
import { GoldDivider, GoldBtn, SectionTag } from '@/components/ui';
import { useIntersectionAnim } from '@/components/hooks';

const MAPS_URL = 'https://maps.app.goo.gl/FC77Gx7HpzQySxwQ6';

export default function PageVenue() {
  const ref = useIntersectionAnim();
  return (
    <div ref={ref} style={{ background: 'transparent', minHeight: '100vh', padding: '120px 24px 80px' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <div className="anim-in" style={{ textAlign: 'center', marginBottom: 56 }}>
          <SectionTag>Hẹn Gặp Gỡ</SectionTag>
          <h2 style={{ fontFamily: F.display, fontSize: 'clamp(26px,3.5vw,40px)', fontWeight: 900, color: C.gold, letterSpacing: '0.06em', marginBottom: 16, textShadow: '0 0 40px rgba(245,215,161,0.25)' }}>NƠI THANH XUÂN TỪNG Ở LẠI</h2>
          <GoldDivider style={{ maxWidth: 300, margin: '0 auto' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 32, alignItems: 'start' }}>
          <div className="anim-in">
            <div style={{ background: 'linear-gradient(135deg,#4A1015,#260D0D)', border: `1px solid ${C.goldLine}`, borderRadius: 12, padding: 32, marginBottom: 16, boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }}>
              <div style={{ fontFamily: F.serif, fontSize: 22, fontWeight: 700, color: C.gold, marginBottom: 6 }}>Nhà hàng Không Cầm Quán</div>
              <div style={{ fontFamily: F.body, fontSize: 13, color: C.goldMuted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20 }}>TP. Đà Nẵng</div>
              <GoldDivider style={{ marginBottom: 20 }} />
              {[
                { icon: '📍', label: 'Địa chỉ', value: '20/10 đường 18 Tháng 8, phường Hội An, TP Đà Nẵng' },
                { icon: '📅', label: 'Thời gian', value: 'Thứ 7, 25/07/2026 · 17:00 – 22:00' },
                { icon: '🎫', label: 'Dress code', value: 'Smart Casual' },
                { icon: '🅿️', label: 'Đỗ xe', value: 'Bãi đỗ xe ở nhà hàng' },
              ].map((info, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>{info.icon}</span>
                  <div>
                    <div style={{ fontFamily: F.body, fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.goldMuted, marginBottom: 2 }}>{info.label}</div>
                    <div style={{ fontFamily: F.body, fontSize: 14, color: C.white90 }}>{info.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <GoldBtn onClick={() => window.open(MAPS_URL, '_blank')} style={{ width: '100%', justifyContent: 'center', textAlign: 'center' }}>
              Mở Google Maps
            </GoldBtn>
          </div>

          <div className="anim-in">
            <div style={{ background: 'linear-gradient(135deg,#3D0C10,#1A0B0B)', border: `1px solid ${C.goldLine}`, borderRadius: 12, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3837.5866782498333!2d108.31778087518887!3d15.878306284773888!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31420e6336c3cdcf%3A0xdf54eb23852d63c3!2zTmjDoCBIw6BuZyBLaMO0bmcgQ-G6p20gUXXDoW4!5e0!3m2!1svi!2s!4v1783137401309!5m2!1svi!2s"
                style={{ width: '100%', height: 320, border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{ fontFamily: F.serif, fontSize: 15, fontWeight: 600, color: C.gold, textAlign: 'center' }}>Nhà hàng Không Cầm Quán</div>
                <div style={{ fontFamily: F.body, fontSize: 12, color: C.white70, textAlign: 'center' }}>20/10 đường 18 Tháng 8, phường Hội An, TP Đà Nẵng</div>
                <GoldBtn ghost onClick={() => window.open(MAPS_URL, '_blank')} style={{ fontSize: 12, padding: '8px 20px' }}>Xem bản đồ</GoldBtn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
