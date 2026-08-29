import { CreditCard, Receipt, ShieldCheck, Wallet, Coins } from 'lucide-react';
import { toast } from 'sonner';

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const plannedFeatures = [
  {
    icon: Coins,
    title: 'Buy interview coins',
    description: 'Top up interview coins to keep practicing with AI-powered interviews.',
  },
  {
    icon: Wallet,
    title: 'Career plans',
    description: 'Monthly and annual plans unlock roadmaps, resumes, and interviews.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure checkout',
    description: 'Payments processed securely through Razorpay — cards, UPI, and wallets.',
  },
  {
    icon: Receipt,
    title: 'Usage history',
    description: 'Transparent invoices and coin-balance history in one place.',
  },
];

export function BillingPage() {
  const handleNotify = () => {
    toast.success("Thanks! We'll let you know when billing goes live.");
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <div className="flex items-center gap-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
              Billing
            </p>
            <Badge variant="outline">Coming soon</Badge>
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
            Billing &amp; Plans
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-[0.9375rem]">
            We’re building a simple, secure way to manage your career toolkit. Payments will be
            powered by Razorpay.
          </p>
        </div>

        <Card>
          <CardContent className="flex flex-col items-center gap-4 py-12 text-center sm:py-16">
            <div className="flex size-14 items-center justify-center rounded-2xl border border-border bg-accent/60">
              <CreditCard className="size-7 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                Billing is coming soon
              </h2>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                We’re finalizing checkout, coin top-ups, and subscription plans. Hang tight — it’ll
                be here shortly.
              </p>
            </div>
            <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground">
              Secure payments by
              <span style={{ color: '#528FF0' }} className="font-semibold">
                Razorpay
              </span>
            </div>
          </CardContent>
        </Card>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">What’s coming</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {plannedFeatures.map(({ icon: Icon, title, description }) => (
              <Card key={title}>
                <CardContent className="flex items-start gap-3 p-5">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-accent/60">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Card>
          <CardContent className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">Get notified at launch</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Be the first to know when billing goes live.
              </p>
            </div>
            <Button onClick={handleNotify}>Notify me</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default BillingPage;
