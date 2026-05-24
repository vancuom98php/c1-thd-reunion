// Design tokens copied verbatim from the original index.html.
// C = colors (wine/gold palette). F = font families.

export const C = {
  bgDeep:    '#1A0B0B',
  bgMid:     '#7A0F14',
  bgSurface: '#3D0C10',
  bgDark:    '#260D0D',
  bgElevated:'#4A1015',
  gold:      '#F5D7A1',
  goldBright:'#FFE8B8',
  goldWarm:  '#E8C07A',
  goldMuted: '#C9A86C',
  goldDeep:  '#9A7040',
  goldLine:  'rgba(245,215,161,0.20)',
  white:     '#FFFFFF',
  white90:   'rgba(255,255,255,0.90)',
  white70:   'rgba(255,255,255,0.70)',
  white40:   'rgba(255,255,255,0.40)',
  crimson:   '#C0161C',
};

export const F = {
  display: "'Cinzel', Georgia, serif",
  serif:   "'Playfair Display', Georgia, serif",
  body:    "'Be Vietnam Pro', system-ui, sans-serif",
};

// Static fact sheet from the original TWEAK_DEFAULTS block. Tweaks Panel is
// removed in the production app — these values are now constants.
export const EVENT = {
  date: '2026-07-25',
  className: 'C1 – Trần Hưng Đạo | 2013–2016',
  heroTitle: '10 NĂM – MỘT LẦN HỘI NGỘ',
  showMusicButton: true,
};

// Nav items shared by Navbar and Footer.
export const NAV_ITEMS = [
  { label: 'Trang Chủ',    href: '/' },
  { label: 'Giới Thiệu',   href: '/about' },
  { label: 'Timeline',     href: '/timeline' },
  { label: 'Chương Trình', href: '/program' },
  { label: 'Địa Điểm',     href: '/venue' },
  { label: 'Đăng Ký',      href: '/register' },
  { label: 'Guestbook',    href: '/guestbook' },
  { label: 'Gallery',      href: '/gallery' },
];
