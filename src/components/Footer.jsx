"use client";
import Link from 'next/link';
import { C, F, NAV_ITEMS } from './tokens';
import { GoldDivider } from './ui';

export default function Footer() {
  return (
    <footer style={{ background: C.bgDeep, borderTop: `1px solid ${C.goldLine}`, padding: '48px 24px 32px' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 32, marginBottom: 40 }}>
          <div>
            <div style={{ fontFamily: F.display, fontSize: 16, fontWeight: 700, color: C.gold, marginBottom: 8 }}>Lớp C1: Niên khoá 13-16</div>
            <div style={{ fontFamily: F.body, fontSize: 13, color: C.white40, lineHeight: 1.7 }}>Kỷ niệm 10 năm ra trường.<br />Mỗi người một hành trình,<br />cùng nhau hội ngộ.</div>
          </div>
          <div>
            <div style={{ fontFamily: F.body, fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.goldMuted, marginBottom: 12 }}>Trang</div>
            {NAV_ITEMS.slice(0, 4).map(item => (
              <div key={item.href} style={{ marginBottom: 6 }}>
                <Link href={item.href} style={{ fontFamily: F.body, fontSize: 13, color: C.white70, cursor: 'pointer', textDecoration: 'none', transition: 'color 0.2s' }}>{item.label}</Link>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: F.body, fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.goldMuted, marginBottom: 12 }}>Liên Hệ</div>
            <div style={{ fontFamily: F.body, fontSize: 13, color: C.white70, lineHeight: 1.9 }}>
              <div>📧 thdc1@gmail.com</div>
              <div>📱 2016 042 043</div>
              <div>📍 TP. Đà Nẵng</div>
            </div>
          </div>
        </div>
        <GoldDivider style={{ marginBottom: 24 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontFamily: F.body, fontSize: 11, color: C.white40, letterSpacing: '0.06em' }}>© 2026 · C1 – Trần Hưng Đạo | 2013–2016 · Kỷ Niệm 10 Năm Ra Trường</div>
          <div style={{ fontFamily: F.display, fontSize: 11, color: C.goldMuted, letterSpacing: '0.12em' }}>2016 — 2026</div>
        </div>
      </div>
    </footer>
  );
}
