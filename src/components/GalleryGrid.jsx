"use client";
import React from 'react';
import Image from 'next/image';
import { C, F } from './tokens';
import { GoldBtn } from './ui';
import { useIntersectionAnim } from './hooks';

export default function GalleryGrid({ photos }) {
  const ref = useIntersectionAnim();
  const [modal, setModal] = React.useState(null);

  return (
    <>
      <div ref={ref} className="gallery-grid anim-in">
        {photos.map((photo, i) => (
          <div
            key={photo.id}
            className="gallery-item"
            onClick={() => setModal(photo)}
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', border: `1px solid ${C.goldLine}`, background: '#1A0B0B' }}>
              <Image
                src={photo.s3_url_thumbnail || photo.s3_url}
                alt={photo.label || photo.year || 'Gallery photo'}
                width={photo.width || 600}
                height={photo.height || 400}
                sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1100px) 33vw, 360px"
                placeholder={photo.blur_data_url ? 'blur' : 'empty'}
                blurDataURL={photo.blur_data_url || undefined}
                priority={i === 0}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
              {(photo.label || photo.year) && (
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 14px 10px', background: 'linear-gradient(180deg, transparent, rgba(26,11,11,0.85))' }}>
                  {photo.year && <div style={{ fontFamily: F.display, fontSize: 10, letterSpacing: '0.18em', color: C.goldMuted, textTransform: 'uppercase' }}>{photo.year}</div>}
                  {photo.label && <div style={{ fontFamily: F.body, fontSize: 12, color: C.gold, marginTop: 2 }}>{photo.label}</div>}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {photos.length === 0 && (
        <div className="anim-in" style={{ textAlign: 'center', padding: 60, fontFamily: F.body, fontSize: 14, color: C.white40 }}>
          Chưa có ảnh nào trong gallery.
        </div>
      )}

      {modal && (
        <div onClick={() => setModal(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: 'linear-gradient(135deg,#4A1015,#260D0D)', border: `1px solid ${C.goldLine}`, borderRadius: 16, padding: 24, maxWidth: 720, width: '100%', boxShadow: '0 24px 80px rgba(0,0,0,0.8)' }}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', borderRadius: 10, overflow: 'hidden', marginBottom: 16, border: `1px solid ${C.goldLine}`, background: '#1A0B0B' }}>
              <Image
                src={modal.s3_url}
                alt={modal.label || modal.year || 'Photo'}
                fill
                sizes="(max-width: 768px) 100vw, 720px"
                placeholder={modal.blur_data_url ? 'blur' : 'empty'}
                blurDataURL={modal.blur_data_url || undefined}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontFamily: F.body, fontSize: 14, color: C.white70 }}>{modal.label}{modal.year ? ` · ${modal.year}` : ''}</div>
              <GoldBtn ghost onClick={() => setModal(null)} style={{ padding: '8px 18px', fontSize: 13 }}>Đóng</GoldBtn>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
