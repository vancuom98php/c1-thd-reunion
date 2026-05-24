"use client";
import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { C, F } from '@/components/tokens';
import { GoldBtn, GoldDivider } from '@/components/ui';

function LoginForm() {
  const router = useRouter();
  const sp = useSearchParams();
  const from = sp.get('from') || '/admin';

  const [form, setForm] = React.useState({ username: '', password: '' });
  const [error, setError] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(form),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || !body.ok) {
        setError(body.error || 'Đăng nhập thất bại');
        return;
      }
      router.replace(from.startsWith('/admin') ? from : '/admin');
      router.refresh();
    } catch {
      setError('Không kết nối được tới server.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ background: 'linear-gradient(135deg,#4A1015,#260D0D)', border: `1px solid ${C.goldLine}`, borderRadius: 14, padding: '32px 28px', boxShadow: '0 16px 60px rgba(0,0,0,0.6)' }}>
      <div style={{ marginBottom: 18 }}>
        <label>Tài khoản</label>
        <input autoFocus autoComplete="username" value={form.username} onChange={e => setForm(f => ({...f, username: e.target.value}))} placeholder="admin" />
      </div>
      <div style={{ marginBottom: 18 }}>
        <label>Mật khẩu</label>
        <input type="password" autoComplete="current-password" value={form.password} onChange={e => setForm(f => ({...f, password: e.target.value}))} placeholder="••••••••" />
      </div>
      {error && (
        <div style={{ fontFamily: F.body, fontSize: 13, color: '#FF8080', marginBottom: 14, background: 'rgba(255,128,128,0.08)', border: '1px solid rgba(255,128,128,0.3)', borderRadius: 6, padding: '8px 14px' }}>
          {error}
        </div>
      )}
      <GoldBtn type="submit" style={{ width: '100%', justifyContent: 'center', textAlign: 'center', opacity: submitting ? 0.6 : 1 }}>
        {submitting ? 'Đang đăng nhập…' : 'Đăng Nhập'}
      </GoldBtn>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, background: 'linear-gradient(160deg,#7A0F14 0%,#3D0C10 50%,#1A0B0B 100%)' }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontFamily: F.display, fontSize: 11, letterSpacing: '0.3em', color: C.goldMuted, textTransform: 'uppercase', marginBottom: 12 }}>Quản Trị</div>
          <h1 style={{ fontFamily: F.display, fontSize: 32, fontWeight: 900, color: C.gold, letterSpacing: '0.06em', textShadow: '0 0 40px rgba(245,215,161,0.25)', marginBottom: 6 }}>Admin Login</h1>
          <div style={{ fontFamily: F.serif, fontStyle: 'italic', fontSize: 14, color: C.white70 }}>C1 – Trần Hưng Đạo | 2013–2016 · Kỷ Niệm 10 Năm</div>
          <GoldDivider style={{ maxWidth: 200, margin: '20px auto 0' }} />
        </div>
        <Suspense fallback={<div style={{ fontFamily: F.body, fontSize: 13, color: C.white40, textAlign: 'center' }}>Đang tải…</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
