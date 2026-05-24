"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { C, F, NAV_ITEMS } from './tokens';
import { GoldBtn } from './ui';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Close mobile menu whenever the route changes.
  React.useEffect(() => { setMobileOpen(false); }, [pathname]);

  const isActive = (href) => href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/');

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        background: scrolled || mobileOpen ? 'rgba(26,11,11,0.98)' : 'transparent',
        backdropFilter: scrolled || mobileOpen ? 'blur(16px)' : 'none',
        borderBottom: scrolled || mobileOpen ? `1px solid ${C.goldLine}` : 'none',
        transition: 'background 0.3s, border 0.3s',
        padding: '0 20px',
      }}>
        <div style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>

          <div className="nav-mobile-toggle" style={{ width: 44, flexShrink: 0, display: 'flex', alignItems: 'center' }}>
            <button
              className="nav-mobile-toggle"
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Menu"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'center', justifyContent: 'center', width: 36, height: 36 }}
            >
              <span style={{ display: 'block', width: 22, height: 2, background: C.gold, borderRadius: 2, transform: mobileOpen ? 'translateY(7px) rotate(45deg)' : 'none', transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1)' }}></span>
              <span style={{ display: 'block', width: 22, height: 2, background: C.gold, borderRadius: 2, opacity: mobileOpen ? 0 : 1, transform: mobileOpen ? 'scaleX(0)' : 'scaleX(1)', transition: 'opacity 0.2s, transform 0.25s' }}></span>
              <span style={{ display: 'block', width: 22, height: 2, background: C.gold, borderRadius: 2, transform: mobileOpen ? 'translateY(-7px) rotate(-45deg)' : 'none', transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1)' }}></span>
            </button>
          </div>

          <Link href="/" className="nav-logo-center" style={{ cursor: 'pointer', flexShrink: 0, paddingLeft: 4, display: 'inline-flex' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/Logo.png" alt="Kỷ Niệm 10 Năm Ra Trường" style={{ height: 52, width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 0 8px rgba(245,215,161,0.25))' }} />
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
            <div className="nav-links-desktop" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {NAV_ITEMS.filter(i => i.href !== '/register').map(item => (
                <Link key={item.href} href={item.href} style={{
                  fontFamily: F.body, fontSize: 13, fontWeight: 500,
                  color: isActive(item.href) ? C.gold : C.white70,
                  background: 'none', border: 'none', textDecoration: 'none',
                  padding: '8px 12px', borderRadius: 6,
                  borderBottom: isActive(item.href) ? `1px solid ${C.gold}` : '1px solid transparent',
                  transition: 'all 0.2s', letterSpacing: '0.02em',
                }}>
                  {item.label}
                </Link>
              ))}
              <Link href="/register" style={{ textDecoration: 'none' }}>
                <GoldBtn style={{ marginLeft: 8, padding: '9px 20px', fontSize: 13 }}>Đăng Ký</GoldBtn>
              </Link>
            </div>
            <Link href="/register" className="nav-mobile-toggle" style={{ fontFamily: F.body, fontSize: 12, fontWeight: 600, color: C.bgDeep, background: `linear-gradient(135deg,${C.goldWarm},${C.goldMuted})`, border: 'none', borderRadius: 6, padding: '8px 14px', cursor: 'pointer', whiteSpace: 'nowrap', letterSpacing: '0.02em', textDecoration: 'none' }}>
              Đăng Ký
            </Link>
          </div>
        </div>
      </nav>

      <div style={{
        position: 'fixed', top: 64, left: 0, right: 0, bottom: 0,
        zIndex: 199,
        background: 'rgba(12,4,4,0.97)',
        backdropFilter: 'blur(24px)',
        opacity: mobileOpen ? 1 : 0,
        pointerEvents: mobileOpen ? 'all' : 'none',
        transition: 'opacity 0.35s cubic-bezier(0.22,1,0.36,1)',
        display: 'flex', flexDirection: 'column',
        overflowY: 'auto',
      }} className="nav-mobile-fullscreen">
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '90%', height: '45%', background: 'radial-gradient(ellipse at top, rgba(122,15,20,0.45) 0%, transparent 70%)', pointerEvents: 'none' }}></div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'start', padding: '16px 32px 24px' }}>
          {NAV_ITEMS.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: F.display,
                fontSize: 'clamp(18px,5vw,26px)',
                fontWeight: 600,
                letterSpacing: '0.06em',
                color: isActive(item.href) ? C.gold : C.white70,
                background: 'none', border: 'none',
                borderBottom: `1px solid ${C.goldLine}`,
                cursor: 'pointer',
                padding: '16px 0',
                textAlign: 'left',
                textDecoration: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                width: '100%',
                transform: mobileOpen ? 'translateX(0)' : 'translateX(-24px)',
                opacity: mobileOpen ? 1 : 0,
                transition: `transform 0.4s cubic-bezier(0.22,1,0.36,1) ${i*0.045}s, opacity 0.4s ${i*0.045}s, color 0.2s`,
              }}
            >
              <span>{item.label}</span>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: isActive(item.href) ? C.gold : 'transparent', display: 'inline-block', boxShadow: isActive(item.href) ? `0 0 10px ${C.gold}` : 'none', border: `1px solid ${isActive(item.href) ? C.gold : 'rgba(245,215,161,0.25)'}`, transition: 'all 0.2s' }}></span>
            </Link>
          ))}
        </div>

        <div style={{
          padding: '20px 32px',
          borderTop: `1px solid ${C.goldLine}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          opacity: mobileOpen ? 1 : 0,
          transition: 'opacity 0.5s 0.35s',
        }}>
          <div style={{ fontFamily: F.display, fontSize: 11, color: C.goldMuted, letterSpacing: '0.15em' }}>THĐ-C1 · 2016–2026</div>
          <div style={{ fontFamily: F.body, fontSize: 11, color: C.white40 }}>Kỷ Niệm 10 Năm</div>
        </div>
      </div>
    </>
  );
}
