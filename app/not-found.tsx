import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { Label } from '@/components/ui/Label';
import { Button } from '@/components/ui/Button';
import { profile } from '@/data/profile';
import { socialLinks } from '@/data/links';

export default function NotFound() {
  return (
    <>
      <Header availability={profile.availability} showNotes={false} />
      <main id="main" className="py-24 sm:py-32">
        <Container className="space-y-6">
          <Label as="p">404 — Not found</Label>
          <h1 className="text-h2 text-ink">
            The document or route you requested does not exist.
          </h1>
          <p className="text-body text-muted measure">
            Return to the main specification index or use the command palette
            (⌘K) to jump to a project.
          </p>
          <div className="pt-2">
            <Button href="/" variant="primary">
              Return to index →
            </Button>
          </div>
        </Container>
      </main>
      <Footer
        name={profile.name}
        timeZone={profile.timeZone}
        showNotes={false}
        elsewhere={socialLinks.map((s) => ({ label: s.label, href: s.href }))}
      />
    </>
  );
}
