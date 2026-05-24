"use client";
import React from 'react';
import { C, F } from '@/components/tokens';
import { GoldBtn, SectionTag, Confetti } from '@/components/ui';
import { useIntersectionAnim } from '@/components/hooks';
import QRDisplay from '@/components/QRDisplay';

const EMPTY = { name: '', phone: '', attending: 'yes', guests: '0', message: '' };

function Field({ label, error, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label>{label}</label>
      {children}
      {error && <div style={{ fontFamily: F.body, fontSize: 12, color: '#FF8080', marginTop: 4 }}>{error}</div>}
    </div>
  );
}

export default function PageRegister() {
  const ref = useIntersectionAnim();
  const [form, setForm] = React.useState(EMPTY);
  const [submitted, setSubmitted] = React.useState(false);
  const [showConfetti, setShowConfetti] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [submitting, setSubmitting] = React.useState(false);
  const [serverError, setServerError] = React.useState('');
  const [registrationId, setRegistrationId] = React.useState(null);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Vui lòng nhập họ tên';
    if (!form.phone.trim()) e.phone = 'Vui lòng nhập số điện thoại';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setErrors({});
    setSubmitting(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          full_name: form.name.trim(),
          phone: form.phone.trim(),
          attendance: form.attending,
          guests_count: form.guests,
          note: form.message.trim() || null,
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || !body.ok) {
        setServerError(body.error || 'Có lỗi xảy ra, vui lòng thử lại.');
        return;
      }
      setRegistrationId(body.id);
      setSubmitted(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4500);
    } catch {
      setServerError('Không kết nối được tới server. Kiểm tra mạng và thử lại.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div ref={ref} style={{ background: 'linear-gradient(160deg,#7A0F14 0%,#3D0C10 40%,#1A0B0B 100%)', minHeight: '100vh', padding: '120px 24px 80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {showConfetti && <Confetti />}
      <div style={{ width: '100%', maxWidth: 540 }}>
        <div className="anim-in" style={{ textAlign: 'center', marginBottom: 40 }}>
          <SectionTag>Tham Dự Sự Kiện</SectionTag>
          <h2 style={{ fontFamily: F.display, fontSize: 'clamp(24px,3vw,36px)', fontWeight: 900, color: C.gold, letterSpacing: '0.06em', marginBottom: 8, textShadow: '0 0 40px rgba(245,215,161,0.25)' }}>Đăng Ký</h2>
          <div style={{ fontFamily: F.serif, fontStyle: 'italic', fontSize: 15, color: C.white70 }}>Giữ chỗ của bạn tại buổi hội ngộ 10 năm</div>
        </div>

        {!submitted ? (
          <div className="anim-in" style={{ background: 'linear-gradient(135deg,#4A1015,#260D0D)', border: `1px solid ${C.goldLine}`, borderRadius: 16, padding: '36px 32px', boxShadow: '0 16px 60px rgba(0,0,0,0.6)' }}>
            <form onSubmit={handleSubmit}>
              <Field label="Họ và Tên *" error={errors.name}>
                <input value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} placeholder="Nguyễn Văn A" />
              </Field>
              <Field label="Số Điện Thoại *" error={errors.phone}>
                <input value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} placeholder="0909 123 456" />
              </Field>
              <Field label="Bạn có tham dự không?">
                <select value={form.attending} onChange={e => setForm(f => ({...f, attending: e.target.value}))}>
                  <option value="yes">Có, tôi sẽ tham dự</option>
                  <option value="maybe">Có thể sẽ đến</option>
                  <option value="no">Rất tiếc, không đến được</option>
                </select>
              </Field>
              <Field label="Số người đi cùng">
                <select value={form.guests} onChange={e => setForm(f => ({...f, guests: e.target.value}))}>
                  {['0', '1', '2', '3', '4', '5+'].map(v => <option key={v} value={v}>{v} người</option>)}
                </select>
              </Field>
              <Field label="Lời Nhắn (tuỳ chọn)">
                <textarea value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))} placeholder="Nhắn gửi đến thầy cô, bạn bè..." rows={3} style={{ resize: 'vertical' }} />
              </Field>
              {serverError && (
                <div style={{ fontFamily: F.body, fontSize: 13, color: '#FF8080', marginBottom: 12, background: 'rgba(255,128,128,0.08)', border: '1px solid rgba(255,128,128,0.3)', borderRadius: 6, padding: '8px 14px' }}>
                  {serverError}
                </div>
              )}
              <GoldBtn type="submit" style={{ width: '100%', justifyContent: 'center', textAlign: 'center', marginTop: 8, opacity: submitting ? 0.6 : 1 }}>
                {submitting ? 'Đang gửi…' : 'Xác Nhận Đăng Ký'}
              </GoldBtn>
            </form>
          </div>
        ) : (
          <div className="anim-in" style={{ background: 'linear-gradient(135deg,#4A1015,#260D0D)', border: `1px solid rgba(245,215,161,0.3)`, borderRadius: 16, padding: '36px 32px', boxShadow: '0 16px 60px rgba(0,0,0,0.6)', textAlign: 'center' }}>
            <div style={{ fontFamily: F.display, fontSize: 32, color: C.gold, marginBottom: 8, textShadow: '0 0 30px rgba(245,215,161,0.4)' }}>✦</div>
            <div style={{ fontFamily: F.serif, fontSize: 22, fontWeight: 600, color: C.gold, marginBottom: 8 }}>Đăng ký thành công!</div>
            <div style={{ fontFamily: F.body, fontSize: 14, color: C.white70, marginBottom: 28, lineHeight: 1.7 }}>
              Cảm ơn <strong style={{ color: C.gold }}>{form.name}</strong>! Chúng ta sẽ gặp nhau tại buổi hội ngộ. Đây là mã QR check-in của bạn:
            </div>
            <QRDisplay name={form.name} seed={`R${registrationId}`} />
            <div style={{ fontFamily: F.body, fontSize: 12, color: C.white40, marginTop: 20 }}>Lưu ảnh màn hình để check-in tại sự kiện</div>
            <div style={{ marginTop: 24 }}>
              <GoldBtn ghost onClick={() => { setSubmitted(false); setForm(EMPTY); setRegistrationId(null); }}>
                Đăng ký thêm
              </GoldBtn>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
