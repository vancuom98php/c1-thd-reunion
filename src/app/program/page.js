"use client";
import { C, F } from '@/components/tokens';
import { GoldDivider, SectionTag } from '@/components/ui';
import { useIntersectionAnim } from '@/components/hooks';

const typeColors = {
  open: '#F5D7A1',
  speech: '#E8B4B8',
  performance: '#C9A86C',
  meal: '#D4956A',
  game: '#B4A8E8',
  memory: '#F5D7A1',
  party: '#E8B4B8',
  close: '#C9A86C',
};

const PROGRAM_ITEMS = [
  { time: '17:00', type: 'open',        title: 'Check-in',              desc: 'Gặp lại nhau tại nhà hàng, check-in, nhận diện thành viên và bắt đầu hành trình trở về thanh xuân.' },
  { time: '18:00', type: 'meal',        title: 'Gala Dinner & Hồi Tưởng Thanh Xuân', desc: 'Khai mạc chương trình, dùng tiệc tối, cùng xem lại slide, video và chia sẻ những câu chuyện sau 10 năm xa cách.' },
  { time: '18:30', type: 'game',        title: 'Giao Lưu, Mini Game & Bốc Thăm May Mắn', desc: 'Tham gia các hoạt động giao lưu, văn nghệ, trò chơi tập thể, bốc thăm nhận quà và cùng lưu lại những khoảnh khắc đáng nhớ.' },
  { time: '22:00', type: 'close',       title: 'Bế Mạc',                            desc: 'Khép lại chương trình với lời cảm ơn, lời chúc và lời hẹn gặp lại C1 trong những lần hội ngộ tiếp theo.' },
];

export default function PageProgram() {
  const ref = useIntersectionAnim();
  return (
    <div ref={ref} style={{ background: 'transparent', minHeight: '100vh', padding: '120px 24px 80px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div className="anim-in" style={{ textAlign: 'center', marginBottom: 64 }}>
          <SectionTag>Lịch Trình</SectionTag>
          <h2 style={{ fontFamily: F.display, fontSize: 'clamp(26px,3.5vw,40px)', fontWeight: 900, color: C.gold, letterSpacing: '0.06em', marginBottom: 8, textShadow: '0 0 40px rgba(245,215,161,0.25)' }}>Chương Trình Sự Kiện</h2>
          <div style={{ fontFamily: F.serif, fontStyle: 'italic', fontSize: 16, color: C.white70, marginBottom: 20 }}>Từ mái trường xưa đến Gala Dinner — một ngày trọn vẹn kỷ niệm</div>
          <GoldDivider style={{ maxWidth: 300, margin: '0 auto' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {PROGRAM_ITEMS.map((item, i) => (
            <div key={i} className="anim-in program-row" style={{ display: 'flex', gap: 20, alignItems: 'stretch', animationDelay: `${i*0.06}s` }}>
              <div className="program-time" style={{ width: 'clamp(48px,10vw,60px)', flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', paddingTop: 18 }}>
                <div style={{ fontFamily: F.display, fontSize: 13, fontWeight: 700, color: typeColors[item.type] || C.gold, letterSpacing: '0.06em' }}>{item.time}</div>
              </div>
              <div className="program-rail" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{ width: 14, height: 14, borderRadius: '50%', background: typeColors[item.type] || C.gold, border: `2px solid ${typeColors[item.type] || C.gold}`, boxShadow: `0 0 12px ${typeColors[item.type]}66`, flexShrink: 0, marginTop: 20 }}></div>
                {i < PROGRAM_ITEMS.length - 1 && <div style={{ flex: 1, width: 1, background: 'rgba(201,168,108,0.2)', marginTop: 4 }}></div>}
              </div>
              <div className="program-card" style={{ flex: 1, minWidth: 0, background: 'linear-gradient(135deg,#4A1015,#260D0D)', border: `1px solid ${C.goldLine}`, borderRadius: 12, padding: 'clamp(12px,3vw,16px) clamp(12px,3vw,20px)', marginBottom: i < PROGRAM_ITEMS.length-1 ? 8 : 0, boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }}>
                <div className="program-card-meta" style={{ display: 'none', alignItems: 'center', gap: 10, marginBottom: 10, paddingBottom: 10, borderBottom: `1px solid ${C.goldLine}` }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: typeColors[item.type] || C.gold, boxShadow: `0 0 10px ${typeColors[item.type]}88`, flexShrink: 0 }}></div>
                  <div style={{ fontFamily: F.display, fontSize: 14, fontWeight: 700, color: typeColors[item.type] || C.gold, letterSpacing: '0.1em' }}>{item.time}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <div className="program-desktop-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: typeColors[item.type], flexShrink: 0 }}></div>
                  <div style={{ fontFamily: F.serif, fontSize: 16, fontWeight: 600, color: C.gold }}>{item.title}</div>
                </div>
                <div style={{ fontFamily: F.body, fontSize: 13, color: C.white70, lineHeight: 1.7 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
