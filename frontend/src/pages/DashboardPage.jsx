import { DashboardLayout } from '@/components/dashboard/DashboardLayout';

export function DashboardPage({ user }) {
  return (
    <DashboardLayout user={user}>
      <section className="min-h-[400px] border border-dashed border-border/60 p-8">
        <p className="text-sm text-muted-foreground">Dashboard content goes here.</p>
      </section>
    </DashboardLayout>
  );
}

export default DashboardPage;
