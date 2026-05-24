"use client";
import React from 'react';

// Toggles `.visible` on `.anim-in` children when they scroll into view.
// Returns a ref to attach to the section root.
export function useIntersectionAnim(className = 'anim-in') {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!ref.current) return;
    const els = ref.current.querySelectorAll ? ref.current.querySelectorAll(`.${className}`) : [];
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return ref;
}

export function useCountdown(targetDate) {
  const [time, setTime] = React.useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  React.useEffect(() => {
    const tick = () => {
      const now = new Date();
      const target = new Date(targetDate);
      const diff = target - now;
      if (diff <= 0) { setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setTime({
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return time;
}
