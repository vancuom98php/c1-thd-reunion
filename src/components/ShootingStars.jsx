"use client";
import React from 'react';

export default function ShootingStars() {
  const [stars, setStars] = React.useState([]);
  React.useEffect(() => {
    let idCounter = 0;
    let timer;
    const spawn = () => {
      const s = {
        id: idCounter++,
        startTop:  -5 + Math.random() * 40,
        startLeft: -5 + Math.random() * 40,
        duration: 2.5 + Math.random() * 2.5,
        size: 1.8 + Math.random() * 1.6,
        tail: 70 + Math.random() * 110,
        opacity: 0.7 + Math.random() * 0.3,
      };
      setStars(prev => [...prev, s]);
      setTimeout(() => setStars(prev => prev.filter(x => x.id !== s.id)), (s.duration + 0.4) * 1000);
    };
    const loop = () => {
      spawn();
      timer = setTimeout(loop, 8000 + Math.random() * 4000); // ~10s between stars
    };
    timer = setTimeout(loop, 5000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }} aria-hidden="true">
      {stars.map(s => (
        <div key={s.id} className="shooting-star" style={{
          top:  `${s.startTop}vh`,
          left: `${s.startLeft}vw`,
          width:  `${s.tail}px`,
          height: `${s.size}px`,
          opacity: s.opacity,
          animationDuration: `${s.duration}s`,
        }}></div>
      ))}
    </div>
  );
}
