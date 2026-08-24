import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import { DashboardSidebar } from './DashboardSidebar';
import { DashboardHeader } from './DashboardHeader';

export function DashboardLayout({ children, user }) {
  return (
    <SidebarProvider>
      <DashboardSidebar user={user} />

      <SidebarInset className="bg-background">
        <DashboardHeader user={user} />

        <main className="min-w-0 px-5 py-6 sm:px-8 lg:px-10">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
