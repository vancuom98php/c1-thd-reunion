// Admin layout opts out of the public LayoutShell chrome (navbar/footer/stars).
// LayoutShell already checks pathname.startsWith('/admin') so all this needs to
// do is provide a minimal wrapper.
import { C } from '@/components/tokens';

export const metadata = {
  title: 'Admin · C1 – Trần Hưng Đạo | 2013–2016',
};

export default function AdminLayout({ children }) {
  return (
    <div style={{ minHeight: '100vh', background: C.bgDeep }}>
      {children}
    </div>
  );
}
