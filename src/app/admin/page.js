// Server component — proxy.js already ensures the session is valid before we get here.
import { getSession } from '@/lib/auth';
import AdminDashboard from '@/components/AdminDashboard';

export default async function AdminHome() {
  const session = await getSession();
  const adminName = session?.u || 'admin';
  return <AdminDashboard adminName={adminName} />;
}
