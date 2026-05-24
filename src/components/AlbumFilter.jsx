"use client";
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { C, F } from './tokens';

export default function AlbumFilter({ years, current }) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  function go(year) {
    const params = new URLSearchParams(sp.toString());
    if (year === 'all') params.delete('year');
    else params.set('year', year);
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }

  return (
    <div className="anim-in" style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 40 }}>
      {years.map(y => {
        const active = y === current;
        return (
          <button
            key={y}
            onClick={() => go(y)}
            style={{
              fontFamily: F.body, fontSize: 12, fontWeight: 600, letterSpacing: '0.08em',
              color: active ? C.bgDeep : C.goldMuted,
              background: active ? C.gold : 'transparent',
              border: `1px solid ${active ? C.gold : C.goldLine}`,
              borderRadius: 999, padding: '6px 16px', cursor: 'pointer', transition: 'all 0.2s',
              textTransform: y === 'all' ? 'uppercase' : 'none',
            }}
          >
            {y === 'all' ? 'Tất cả' : y}
          </button>
        );
      })}
    </div>
  );
}
