"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { C, F } from './tokens';
import { GoldBtn, GoldDivider } from './ui';

function csvEscape(v) {
  if (v == null) return '';
  const s = String(v);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function formatDate(ts) {
  const d = new Date(ts);
  return d.toLocaleString('vi-VN', { hour12: false });
}

const ATTEND_LABEL = { yes: 'Có', maybe: 'Có thể', no: 'Không' };
const ATTEND_COLOR = { yes: '#6BFFE8', maybe: '#F5D7A1', no: '#FF8080' };

export default function AdminDashboard({ adminName }) {
  const router = useRouter();
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch('/api/admin/registrations', { cache: 'no-store' });
        const body = await res.json();
        if (!alive) return;
        if (!res.ok || !body.ok) {
          setError(body.error || 'Không lấy được dữ liệu');
          return;
        }
        setData(body);
      } catch {
        if (alive) setError('Không kết nối được tới server.');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.replace('/admin/login');
    router.refresh();
  }

  function exportCsv() {
    if (!data) return;
    const header = ['Họ tên', 'SĐT', 'Tham dự', 'Số người đi cùng', 'Ghi chú', 'Thời gian'];
    const rows = filtered.map(r => [
      r.full_name, r.phone, ATTEND_LABEL[r.attendance] || r.attendance,
      r.guests_count, r.note || '', formatDate(r.created_at),
    ]);
    const csv = '﻿' + [header, ...rows].map(row => row.map(csvEscape).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dang-ky-thd-c1-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const items = data?.items || [];
  const q = search.trim().toLowerCase();
  const filtered = q
    ? items.filter(r => r.full_name.toLowerCase().includes(q) || (r.phone || '').toLowerCase().includes(q))
    : items;

  return (
    <div style={{ padding: '32px 24px 60px', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
        <div>
          <div style={{ fontFamily: F.display, fontSize: 11, letterSpacing: '0.3em', color: C.goldMuted, textTransform: 'uppercase', marginBottom: 4 }}>Bảng Điều Khiển</div>
          <h1 style={{ fontFamily: F.display, fontSize: 26, fontWeight: 900, color: C.gold }}>Danh Sách Đăng Ký</h1>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ fontFamily: F.body, fontSize: 13, color: C.white70 }}>
            Xin chào, <strong style={{ color: C.gold }}>{adminName}</strong>
          </div>
          <GoldBtn ghost onClick={handleLogout} style={{ padding: '8px 18px', fontSize: 13 }}>Đăng xuất</GoldBtn>
        </div>
      </div>

      <GoldDivider style={{ marginBottom: 24 }} />

      {error && (
        <div style={{ fontFamily: F.body, fontSize: 14, color: '#FF8080', marginBottom: 18, background: 'rgba(255,128,128,0.08)', border: '1px solid rgba(255,128,128,0.3)', borderRadius: 8, padding: '12px 16px' }}>
          {error}
        </div>
      )}

      {loading ? (
        <div style={{ fontFamily: F.body, fontSize: 14, color: C.white40, textAlign: 'center', padding: 60 }}>Đang tải…</div>
      ) : data ? (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 12, marginBottom: 28 }}>
            <Stat label="Tổng đăng ký" value={data.total} accent={C.gold} />
            <Stat label="Có tham dự" value={data.breakdown?.yes ?? 0} accent={ATTEND_COLOR.yes} />
            <Stat label="Có thể" value={data.breakdown?.maybe ?? 0} accent={ATTEND_COLOR.maybe} />
            <Stat label="Tổng số khách dự kiến" value={data.totalGuests ?? 0} accent={C.goldWarm} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Tìm theo tên hoặc SĐT…"
              style={{ flex: 1, minWidth: 220, maxWidth: 360 }}
            />
            <GoldBtn ghost onClick={exportCsv} style={{ padding: '10px 22px', fontSize: 13 }}>Xuất CSV</GoldBtn>
            <div style={{ fontFamily: F.body, fontSize: 12, color: C.white40 }}>
              {filtered.length} / {items.length} dòng
            </div>
          </div>

          <div style={{ overflowX: 'auto', background: 'linear-gradient(135deg,#3D0C10,#260D0D)', border: `1px solid ${C.goldLine}`, borderRadius: 12, boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: F.body, fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${C.goldLine}` }}>
                  {['Họ tên', 'SĐT', 'Tham dự', 'Số khách', 'Ghi chú', 'Thời gian'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '12px 14px', fontFamily: F.body, fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.goldMuted, whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={6} style={{ padding: 32, textAlign: 'center', color: C.white40 }}>Chưa có đăng ký nào.</td></tr>
                ) : (
                  filtered.map(r => (
                    <tr key={r.id} style={{ borderBottom: `1px solid rgba(245,215,161,0.08)` }}>
                      <td style={{ padding: '12px 14px', color: C.white90, fontWeight: 500 }}>{r.full_name}</td>
                      <td style={{ padding: '12px 14px', color: C.white70, fontVariantNumeric: 'tabular-nums' }}>{r.phone}</td>
                      <td style={{ padding: '12px 14px' }}>
                        <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 999, background: `${ATTEND_COLOR[r.attendance]}22`, color: ATTEND_COLOR[r.attendance], fontSize: 12, fontWeight: 600 }}>
                          {ATTEND_LABEL[r.attendance] || r.attendance}
                        </span>
                      </td>
                      <td style={{ padding: '12px 14px', color: C.white70, fontVariantNumeric: 'tabular-nums' }}>{r.guests_count}</td>
                      <td style={{ padding: '12px 14px', color: C.white70, maxWidth: 280, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={r.note || ''}>{r.note || '—'}</td>
                      <td style={{ padding: '12px 14px', color: C.white40, whiteSpace: 'nowrap' }}>{formatDate(r.created_at)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : null}
    </div>
  );
}

function Stat({ label, value, accent }) {
  return (
    <div style={{ background: 'linear-gradient(135deg,#4A1015,#260D0D)', border: `1px solid ${C.goldLine}`, borderRadius: 10, padding: '18px 20px' }}>
      <div style={{ fontFamily: F.body, fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.goldMuted, marginBottom: 6 }}>{label}</div>
      <div style={{ fontFamily: F.display, fontSize: 28, fontWeight: 900, color: accent || C.gold, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{value}</div>
    </div>
  );
}
