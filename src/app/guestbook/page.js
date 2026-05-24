import { C, F } from '@/components/tokens';
import { GoldDivider, SectionTag } from '@/components/ui';
import GuestbookForm from '@/components/GuestbookForm';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import { query } from '@/lib/db';

export const revalidate = 0; // always fresh — guestbook gets posted to often

function initialsOf(name) {
  return name.trim().split(/\s+/).slice(-2).map(w => w[0] || '').join('').toUpperCase().slice(0, 2);
}

function timeAgo(ts) {
  const d = ts instanceof Date ? ts : new Date(ts);
  const diff = (Date.now() - d.getTime()) / 1000;
  if (diff < 60)      return 'Vừa xong';
  if (diff < 3600)    return `${Math.floor(diff / 60)} phút trước`;
  if (diff < 86400)   return `${Math.floor(diff / 3600)} giờ trước`;
  if (diff < 86400*7) return `${Math.floor(diff / 86400)} ngày trước`;
  return d.toLocaleDateString('vi-VN');
}

async function fetchMessages() {
  try {
    const rows = await query(
      'SELECT id, author_name, message, created_at FROM guestbook WHERE is_approved = 1 ORDER BY created_at DESC LIMIT 50'
    );
    return rows;
  } catch (e) {
    console.error('[guestbook] DB error:', e.message);
    return [];
  }
}

export default async function PageGuestbook() {
  const messages = await fetchMessages();

  return (
    <AnimateOnScroll style={{ background: 'transparent', minHeight: '100vh', padding: '120px 24px 80px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div className="anim-in" style={{ textAlign: 'center', marginBottom: 48 }}>
          <SectionTag>Sổ Lưu Niệm</SectionTag>
          <h2 style={{ fontFamily: F.display, fontSize: 'clamp(26px,3.5vw,40px)', fontWeight: 900, color: C.gold, letterSpacing: '0.06em', marginBottom: 8, textShadow: '0 0 40px rgba(245,215,161,0.25)' }}>Guestbook</h2>
          <div style={{ fontFamily: F.serif, fontStyle: 'italic', fontSize: 15, color: C.white70 }}>Viết lời nhắn gửi đến bạn bè, thầy cô</div>
          <GoldDivider style={{ maxWidth: 300, margin: '16px auto 0' }} />
        </div>

        <GuestbookForm />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {messages.length === 0 ? (
            <div style={{ fontFamily: F.body, fontSize: 14, color: C.white40, textAlign: 'center', padding: 40 }}>
              Chưa có lời nhắn. Hãy là người đầu tiên!
            </div>
          ) : (
            messages.map((msg, i) => (
              <div key={msg.id} className="anim-in" style={{ background: 'linear-gradient(135deg,#3D0C10,#260D0D)', border: `1px solid ${C.goldLine}`, borderRadius: 12, padding: '20px 24px', animationDelay: `${i*0.07}s`, boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 38, height: 38, borderRadius: '50%', background: `linear-gradient(135deg,#7A0F14,#4A1015)`, border: `1px solid ${C.goldLine}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontFamily: F.display, fontSize: 13, fontWeight: 700, color: C.gold }}>{initialsOf(msg.author_name)}</span>
                  </div>
                  <div>
                    <div style={{ fontFamily: F.body, fontSize: 14, fontWeight: 600, color: C.gold }}>{msg.author_name}</div>
                    <div style={{ fontFamily: F.body, fontSize: 11, color: C.white40, marginTop: 1 }}>{timeAgo(msg.created_at)}</div>
                  </div>
                </div>
                <div style={{ fontFamily: F.body, fontSize: 14, color: C.white70, lineHeight: 1.75, borderLeft: `2px solid ${C.goldLine}`, paddingLeft: 14, whiteSpace: 'pre-wrap' }}>{msg.message}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </AnimateOnScroll>
  );
}
