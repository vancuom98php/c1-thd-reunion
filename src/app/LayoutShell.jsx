"use client";
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ShootingStars from '@/components/ShootingStars';
import MusicPlayerGlobal from '@/components/MusicPlayerGlobal';
import ProgressBar from '@/components/ProgressBar';

// Wraps every page with the persistent chrome from the original SPA.
// Admin routes opt out of the marketing navbar/footer.
export default function LayoutShell({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <div style={{ overflowX: 'hidden', maxWidth: '100vw' }}>
      <div id="progress-bar"></div>
      <ProgressBar />
      <ShootingStars />
      <Navbar />
      {/* The key prop on `pathname` replays the page-enter fade animation on every route change. */}
      <div key={pathname} className="page-enter">
        {children}
        <Footer />
      </div>
      <MusicPlayerGlobal />
    </div>
  );
}
