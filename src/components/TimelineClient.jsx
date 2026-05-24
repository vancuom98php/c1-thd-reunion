"use client";
import React from 'react';
import { C, F } from '@/components/tokens';
import { GoldDivider, SectionTag } from '@/components/ui';
import PhotoSlideshow from '@/components/PhotoSlideshow';

const TL_ITEMS = [
  { year: '2013', title: 'Bước Vào Thanh Xuân', icon: '🎓', body: 'Chúng ta bước vào lớp 10 với nhiều bỡ ngỡ, từ những người xa lạ trở thành bạn cùng lớp, cùng bắt đầu một hành trình thanh xuân mang tên C1.', side: 'left' },
  { year: '2014', title: 'Tình Bạn Lớn Dần', icon: '📚', body: 'Lớp học dần trở thành nơi lưu giữ tiếng cười, những trò nghịch ngợm, những giờ kiểm tra căng thẳng và những tình bạn ngày một thân thiết hơn.', side: 'right' },
  { year: '2015', title: 'Thanh Xuân Rực Rỡ', icon: '💼', body: 'Một năm của những kỷ niệm đẹp nhất: cùng học, cùng chơi, cùng lo cho tương lai và cùng giữ lại những khoảnh khắc không thể nào quên.', side: 'left' },
  { year: '2016', title: 'Ngày Rời Sân Trường', icon: '✨', body: 'Chúng ta khép lại những năm tháng áo trắng bằng những cái ôm, những lời chúc, những giọt nước mắt và lời hẹn sẽ gặp lại nhau sau này.', side: 'right' },
  { year: '2017–2020', title: 'Mỗi Người Một Nẻo Đường', icon: '🛤️', body: 'Người đi làm, người học lên, người khởi nghiệp, người xây dựng gia đình. Cuộc sống cuốn mỗi người về một hướng khác nhau.', side: 'left' },
  { year: '2021–2023', title: 'Vượt Qua Thử Thách', icon: '🌊', body: 'Đại dịch, khó khăn kinh tế, những thay đổi lớn của thế giới. Nhưng mỗi người đều tìm cách vươn lên và thích nghi.', side: 'right' },
  { year: '2024–2025', title: 'Nhớ Về Những Ngày Xưa', icon: '💫', body: 'Ai đó bắt đầu nhắn tin trong group cũ. Những tin nhắn nhớ nhau xuất hiện. Ý tưởng về buổi họp lớp 10 năm bắt đầu hình thành.', side: 'left' },
  { year: '2026', title: 'Hội Ngộ', icon: '🥂', body: 'Chúng ta gặp lại nhau — với những nét khác biệt, với những câu chuyện mới, nhưng vẫn là những tâm hồn quen thuộc năm nào.', side: 'right' },
];

export default function TimelineClient({ photosByYear = {} }) {
  const itemRefs = React.useRef([]);
  const [progress, setProgress] = React.useState(-1);

  React.useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    itemRefs.current.forEach(r => r && obs.observe(r));

    const onScroll = () => {
      const trigger = window.innerHeight * 0.5;
      let highest = -1;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top < trigger) highest = i;
      });
      setProgress(highest);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { obs.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, []);

  return (
    <div style={{ background: 'transparent', minHeight: '100vh', padding: '120px 24px 80px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <SectionTag>Hành Trình Thời Gian</SectionTag>
          <h2 style={{ fontFamily: F.display, fontSize: 'clamp(26px,3.5vw,40px)', fontWeight: 900, color: C.gold, letterSpacing: '0.06em', marginBottom: 16, textShadow: '0 0 40px rgba(245,215,161,0.25)' }}>Mười Năm Ký Ức</h2>
          <GoldDivider style={{ maxWidth: 300, margin: '0 auto' }} />
        </div>

        <div style={{ position: 'relative' }}>
          <div className="timeline-line" style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: 'linear-gradient(180deg,transparent,rgba(201,168,108,0.18) 8%,rgba(201,168,108,0.18) 92%,transparent)', transform: 'translateX(-50%)', pointerEvents: 'none' }}></div>
          <div className="timeline-line" style={{ position: 'absolute', left: '50%', top: 0, width: 1.5, height: progress >= 0 ? `calc(${((progress + 1) / TL_ITEMS.length) * 100}% - 20px)` : 0, background: 'linear-gradient(180deg,transparent,#F5D7A1 12%,#C9A86C)', transform: 'translateX(-50%)', pointerEvents: 'none', boxShadow: '0 0 12px rgba(245,215,161,0.5)', transition: 'height 0.6s cubic-bezier(0.22,1,0.36,1)' }}></div>

          {TL_ITEMS.map((item, i) => {
            const isRight = item.side === 'right';
            return (
              <div
                key={i}
                ref={el => (itemRefs.current[i] = el)}
                className={`tl-vertical-item${isRight ? ' right' : ''}`}
                style={{ display: 'flex', alignItems: 'stretch', marginBottom: 40, gap: 0 }}
              >
                <div style={{ flex: 1, minWidth: 0, display: 'flex', paddingRight: 24, justifyContent: 'flex-end' }}>
                  {!isRight ? (
                    <div className="tl-text-card" style={{ width: '100%', maxWidth: 420 }}>
                      <div style={{ textAlign: 'right', marginBottom: 14, paddingRight: 4 }}>
                        <div style={{ fontFamily: F.display, fontSize: 'clamp(28px,4vw,40px)', fontWeight: 400, color: C.gold, letterSpacing: '0.04em', lineHeight: 1.1, marginBottom: 6 }}>{item.year}</div>
                        <div style={{ fontFamily: F.serif, fontSize: 'clamp(18px,2.6vw,24px)', fontWeight: 500, color: C.white90, letterSpacing: '0.01em' }}>{item.title}</div>
                      </div>
                      <div style={{ background: 'rgba(38,13,13,0.55)', border: `1px solid ${C.goldLine}`, borderRadius: 10, padding: 'clamp(16px,3vw,22px) clamp(18px,3.5vw,26px)', boxShadow: '0 6px 28px rgba(0,0,0,0.4)' }}>
                        <div style={{ fontFamily: F.body, fontSize: 'clamp(13px,2vw,14px)', color: C.white70, lineHeight: 1.8, textAlign: 'center' }}>{item.body}</div>
                      </div>
                    </div>
                  ) : (
                    <div style={{ width: '100%', maxWidth: 380 }}>
                      <PhotoSlideshow photos={photosByYear[item.year] || []} />
                    </div>
                  )}
                </div>

                <div style={{ width: 48, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 28, position: 'relative', zIndex: 1 }}>
                  {(() => {
                    const reached = i <= progress;
                    return (
                      <div style={{
                        width: 14, height: 14,
                        background: reached ? C.gold : 'transparent',
                        border: `2px solid ${reached ? C.gold : 'rgba(201,168,108,0.45)'}`,
                        borderRadius: '50%',
                        boxShadow: reached ? '0 0 20px rgba(245,215,161,0.7), 0 0 40px rgba(245,215,161,0.25)' : 'none',
                        flexShrink: 0,
                        transform: reached ? 'scale(1.05)' : 'scale(1)',
                        transition: 'all 0.5s cubic-bezier(0.22,1,0.36,1)',
                      }}></div>
                    );
                  })()}
                </div>

                <div style={{ flex: 1, minWidth: 0, display: 'flex', paddingLeft: 24 }}>
                  {isRight ? (
                    <div className="tl-text-card" style={{ width: '100%', maxWidth: 420 }}>
                      <div style={{ textAlign: 'left', marginBottom: 14, paddingLeft: 4 }}>
                        <div style={{ fontFamily: F.display, fontSize: 'clamp(28px,4vw,40px)', fontWeight: 400, color: C.gold, letterSpacing: '0.04em', lineHeight: 1.1, marginBottom: 6 }}>{item.year}</div>
                        <div style={{ fontFamily: F.serif, fontSize: 'clamp(18px,2.6vw,24px)', fontWeight: 500, color: C.white90, letterSpacing: '0.01em' }}>{item.title}</div>
                      </div>
                      <div style={{ background: 'rgba(38,13,13,0.55)', border: `1px solid ${C.goldLine}`, borderRadius: 10, padding: 'clamp(16px,3vw,22px) clamp(18px,3.5vw,26px)', boxShadow: '0 6px 28px rgba(0,0,0,0.4)' }}>
                        <div style={{ fontFamily: F.body, fontSize: 'clamp(13px,2vw,14px)', color: C.white70, lineHeight: 1.8, textAlign: 'center' }}>{item.body}</div>
                      </div>
                    </div>
                  ) : (
                    <div style={{ width: '100%', maxWidth: 380 }}>
                      <PhotoSlideshow photos={photosByYear[item.year] || []} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
