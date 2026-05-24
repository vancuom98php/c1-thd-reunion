import { C, F } from '@/components/tokens';
import { GoldDivider, GoldBtn, SectionTag } from '@/components/ui';
import GalleryGrid from '@/components/GalleryGrid';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import { query } from '@/lib/db';

export const revalidate = 300; // cache the rendered list for 5 minutes

const PAGE_LIMIT = 24;

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
    console.error('[gallery] DB error:', e.message);
    return [];
  }
}

export default async function PageGallery({ searchParams }) {
  const sp = await searchParams;
  const year = sp?.year;
  const photos = await fetchPhotos(year);

  return (
    <AnimateOnScroll style={{ background: 'transparent', minHeight: '100vh', padding: '120px 24px 80px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="anim-in" style={{ textAlign: 'center', marginBottom: 48 }}>
          <SectionTag>Kho Ảnh</SectionTag>
          <h2 style={{ fontFamily: F.display, fontSize: 'clamp(26px,3.5vw,40px)', fontWeight: 900, color: C.gold, letterSpacing: '0.06em', marginBottom: 16, textShadow: '0 0 40px rgba(245,215,161,0.25)' }}>Gallery Kỷ Niệm</h2>
          <GoldDivider style={{ maxWidth: 300, margin: '0 auto' }} />
        </div>

        <GalleryGrid photos={photos} />

        <div className="anim-in" style={{ textAlign: 'center', marginTop: 40 }}>
          <div style={{ fontFamily: F.body, fontSize: 13, color: C.white40, marginBottom: 16 }}>
            Ảnh sẽ được cập nhật sau sự kiện.
          </div>
        </div>
      </div>
    </AnimateOnScroll>
  );
}
