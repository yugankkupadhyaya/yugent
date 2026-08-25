import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import { DashboardSidebar } from './DashboardSidebar';
import { DashboardHeader } from './DashboardHeader';
import './dashboard.css';

export function DashboardLayout({ children, user }) {
  return (
    <SidebarProvider
      style={{
        '--sidebar-width': '17.25rem',
        '--sidebar-width-icon': '3.5rem',
      }}
    >
      <DashboardSidebar user={user} />

      <SidebarInset className="dashboard-shell min-h-screen overflow-x-hidden bg-background">
        <DashboardHeader user={user} />

        <main className="relative z-10 min-w-0 px-5 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
          <div className="mx-auto max-w-[1440px]">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
