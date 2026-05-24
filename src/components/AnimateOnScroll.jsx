"use client";
import React from 'react';

// Client wrapper that mounts an IntersectionObserver onto every `.anim-in`
// descendant. Use this around server-rendered content that needs the fade-in
// animation. Mirrors the `useIntersectionAnim` hook used by client pages.
export default function AnimateOnScroll({ children, className, style }) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!ref.current) return;
    const els = ref.current.querySelectorAll('.anim-in');
    // If a node is already on screen at mount (e.g. above the fold after a
    // soft navigation), the observer fires its initial callback for it.
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return <div ref={ref} className={className} style={style}>{children}</div>;
}
