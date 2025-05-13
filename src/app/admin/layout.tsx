import { auth } from '~/server/auth';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import AdminNav from '~/app/components/admin/AdminNav';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Check if user is authenticated
  if (!session) {
    redirect('/auth/signin');
  }

  // In a real application, you would check if the user has admin permissions
  // For now, we'll just allow any authenticated user to access this page

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <AdminNav />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
