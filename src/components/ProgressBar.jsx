"use client";
import React from 'react';

// Drives the #progress-bar element rendered in LayoutShell.
export default function ProgressBar() {
  React.useEffect(() => {
    const bar = document.getElementById('progress-bar');
    if (!bar) return;
    const fn = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (total > 0 ? (window.scrollY / total) * 100 : 0) + '%';
    };
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    window.addEventListener('resize', fn);
    return () => {
      window.removeEventListener('scroll', fn);
      window.removeEventListener('resize', fn);
    };
  }, []);
  return null;
}
