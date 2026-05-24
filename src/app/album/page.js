import { Suspense } from 'react';
import { C, F } from '@/components/tokens';
import { GoldDivider, GoldBtn, SectionTag } from '@/components/ui';
import GalleryGrid from '@/components/GalleryGrid';
import AlbumFilter from '@/components/AlbumFilter';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import { query } from '@/lib/db';

export const revalidate = 300;

const PAGE_LIMIT = 60;
const FALLBACK_YEARS = ['all', '2013', '2014', '2015', '2016', '2021', '2024'];

async function fetchYears() {
  try {
    const rows = await query("SELECT DISTINCT year FROM gallery_photos WHERE year IS NOT NULL AND year <> '' ORDER BY year");
    if (rows.length === 0) return FALLBACK_YEARS;
    return ['all', ...rows.map(r => r.year)];
  } catch {
    return FALLBACK_YEARS;
  }
}

async function fetchPhotos(year) {
  try {
    if (year && year !== 'all') {
      return await query(
        'SELECT id, s3_url, year, label, width, height, blur_data_url FROM gallery_photos WHERE year = ? ORDER BY display_order, id LIMIT ?',
        [year, PAGE_LIMIT]
      );
    }
    return await query(
      'SELECT id, s3_url, year, label, width, height, blur_data_url FROM gallery_photos ORDER BY display_order, id LIMIT ?',
      [PAGE_LIMIT]
    );
  } catch (e) {
    console.error('[album] DB error:', e.message);
    return [];
  }
}

export default async function PageAlbum({ searchParams }) {
  const sp = await searchParams;
  const year = sp?.year || 'all';
  const [years, photos] = await Promise.all([fetchYears(), fetchPhotos(year)]);

  return (
    <AnimateOnScroll style={{ background: 'transparent', minHeight: '100vh', padding: '120px 24px 80px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="anim-in" style={{ textAlign: 'center', marginBottom: 48 }}>
          <SectionTag>Album Lớp</SectionTag>
          <h2 style={{ fontFamily: F.display, fontSize: 'clamp(26px,3.5vw,40px)', fontWeight: 900, color: C.gold, letterSpacing: '0.06em', marginBottom: 16, textShadow: '0 0 40px rgba(245,215,161,0.25)' }}>Album Ảnh</h2>
          <GoldDivider style={{ maxWidth: 300, margin: '0 auto' }} />
        </div>

        <Suspense fallback={<div style={{ minHeight: 40 }} />}>
          <AlbumFilter years={years} current={year} />
        </Suspense>

        <GalleryGrid photos={photos} />

        <div className="anim-in" style={{ textAlign: 'center', marginTop: 40 }}>
          <GoldBtn>Tải Xuống Album</GoldBtn>
        </div>

        <div className="anim-in" style={{ marginTop: 48, background: 'linear-gradient(135deg,#3D0C10,#1A0B0B)', border: `1px solid ${C.goldLine}`, borderRadius: 14, overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', borderBottom: `1px solid ${C.goldLine}`, display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ fontFamily: F.serif, fontSize: 17, fontWeight: 600, color: C.gold }}>Video Recap</div>
            <div style={{ background: 'rgba(192,22,28,0.2)', border: '1px solid rgba(192,22,28,0.4)', borderRadius: 999, padding: '2px 10px', fontFamily: F.body, fontSize: 10, fontWeight: 700, color: '#FF8080', letterSpacing: '0.12em' }}>SẮP RA MẮT</div>
          </div>
          <div style={{ aspectRatio: '16/9', maxHeight: 280, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0D0505' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: F.serif, fontSize: 16, color: C.gold, marginBottom: 6 }}>Video recap sự kiện</div>
              <div style={{ fontFamily: F.body, fontSize: 13, color: C.white40 }}>Sẽ được cập nhật sau ngày 10/10/2026</div>
            </div>
          </div>
        </div>
      </div>
    </AnimateOnScroll>
  );
}
