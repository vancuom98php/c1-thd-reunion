"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { C, F } from './tokens';
import { GoldBtn } from './ui';

export default function GuestbookForm() {
  const router = useRouter();
  const [form, setForm] = React.useState({ name: '', text: '' });
  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState('');

  async function handlePost(e) {
    e.preventDefault();
    setError('');
    if (!form.name.trim() || !form.text.trim()) {
      setError('Vui lòng nhập tên và lời nhắn');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ author_name: form.name.trim(), message: form.text.trim() }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || !body.ok) {
        setError(body.error || 'Không gửi được lời nhắn, vui lòng thử lại.');
        return;
      }
      setForm({ name: '', text: '' });
      setSubmitted(true);
      router.refresh();
      setTimeout(() => setSubmitted(false), 3000);
    } catch {
      setError('Không kết nối được tới server.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="anim-in" style={{ background: 'linear-gradient(135deg,#4A1015,#260D0D)', border: `1px solid ${C.goldLine}`, borderRadius: 14, padding: '24px 28px', marginBottom: 32, boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }}>
      {submitted && <div style={{ fontFamily: F.body, fontSize: 13, color: '#6BFFE8', marginBottom: 12, background: 'rgba(107,255,232,0.1)', border: '1px solid rgba(107,255,232,0.3)', borderRadius: 6, padding: '8px 14px' }}>Đã đăng lời nhắn!</div>}
      {error && <div style={{ fontFamily: F.body, fontSize: 13, color: '#FF8080', marginBottom: 12, background: 'rgba(255,128,128,0.08)', border: '1px solid rgba(255,128,128,0.3)', borderRadius: 6, padding: '8px 14px' }}>{error}</div>}
      <form onSubmit={handlePost}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 12, marginBottom: 12 }}>
          <div>
            <label>Tên của bạn</label>
            <input value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} placeholder="Nguyễn Văn A" />
          </div>
          <div>
            <label style={{ visibility: 'hidden' }}>_</label>
            <GoldBtn type="submit" style={{ width: '100%', textAlign: 'center', height: 45, opacity: submitting ? 0.6 : 1 }}>
              {submitting ? 'Đang gửi…' : 'Đăng Lời Nhắn'}
            </GoldBtn>
          </div>
        </div>
        <div>
          <label>Lời nhắn của bạn</label>
          <textarea value={form.text} onChange={e => setForm(f => ({...f, text: e.target.value}))} placeholder="Viết điều gì đó cho bạn bè và thầy cô..." rows={3} style={{ resize: 'none' }} />
        </div>
      </form>
    </div>
  );
}
