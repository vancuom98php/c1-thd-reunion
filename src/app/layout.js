import './globals.css';
import LayoutShell from './LayoutShell';

export const metadata = {
  title: '10 NĂM – MỘT LẦN HỘI NGỘ | C1 – Trần Hưng Đạo | 2013–2016',
  description: 'Kỷ niệm 10 năm ra trường — C1 – Trần Hưng Đạo | 2013–2016',
};

const S3_HOST = process.env.AWS_S3_BUCKET && process.env.AWS_S3_REGION
  ? `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_S3_REGION}.amazonaws.com`
  : null;

export default function RootLayout({ children }) {
  return (
    <html lang="vi" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Be+Vietnam+Pro:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap"
          rel="stylesheet"
        />
        {S3_HOST && <link rel="preconnect" href={S3_HOST} crossOrigin="anonymous" />}
        {S3_HOST && <link rel="dns-prefetch" href={S3_HOST} />}
      </head>
      <body>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
