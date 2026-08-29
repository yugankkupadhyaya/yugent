import { PageShell } from '@/components/layout/page-shell';
import { Navbar } from '@/components/layout/navbar';
import { ContactSection } from '@/components/marketing/contact/contact-section';

export function ContactPage() {
  return (
    <PageShell>
      <Navbar />
      <ContactSection />
    </PageShell>
  );
}

export default ContactPage;
