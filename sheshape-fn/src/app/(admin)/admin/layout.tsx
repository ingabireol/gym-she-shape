'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { ScrollToTop } from '@/components/common/ScrollToTop';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // Check if user is admin
  const isAdmin = user?.role === 'ADMIN';

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !isAdmin)) {
      router.push('/login');
    }
  }, [isAuthenticated, isAdmin, isLoading, router]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Only render admin dashboard if authenticated and admin
  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <div className="flex h-screen bg-neutral-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
      <ScrollToTop />
    </div>
  );
}