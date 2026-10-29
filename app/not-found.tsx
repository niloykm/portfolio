import { Layout } from '@/components/Layout';
import { Heading, Body } from '@/components/Typography';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <Layout showNotes={false}>
      <div className="border-b border-border-subtle p-8 sm:p-16 space-y-6">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          {"// "}ERROR_404 :: ROUTE_NOT_FOUND
        </p>
        <Heading as="h1" size="h2">
          The document or route you requested does not exist.
        </Heading>
        <Body size="base" muted measure>
          Return to the primary system index or open the command palette (⌘K)
          to jump directly to a specification.
        </Body>
        <div className="pt-2">
          <Button href="/" variant="primary">
            <span>[RETURN_TO_INDEX]</span>
            <span aria-hidden="true">-&gt;</span>
          </Button>
        </div>
      </div>
    </Layout>
  );
}
