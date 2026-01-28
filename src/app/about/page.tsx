import { Button } from '@/components/ui/button';
import Link from 'next/link';

const LeafDivider = () => (
  <div className="my-12 text-3xl opacity-30" aria-hidden="true">
    🍃
  </div>
);

export default function AboutPage() {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="container mx-auto max-w-2xl px-4 py-16 text-center md:px-6 md:py-24">
        <h1 className="font-headline text-4xl font-normal md:text-5xl">
          Who is Mr. Melo?
        </h1>
        <div className="mt-12 space-y-6 text-lg font-light text-muted-foreground">
          <p>
            Born in New York. Raised in London.
            <br />
            Rooted in Beirut. Based in Dubai.
          </p>
          <p>I spent decades asking: 'Who am I?'</p>
          <p>
            Trilingual. Multicultural. Neurodivergent.
            <br />
            Philosopher. Strategist. Storyteller.
          </p>
          <p>
            I learned to translate between worlds.
            <br />
            To bridge incompatible paradigms.
            <br />
            To help people find their relevance.
          </p>
        </div>

        <LeafDivider />

        <h2 className="font-headline text-3xl font-normal md:text-4xl">
          Why MrMelo.com Exists
        </h2>
        <div className="mt-8 space-y-6 text-lg font-light text-muted-foreground">
          <p>
            Sociologists are extinct.
            <br />
            Psychologists cost $200-400/hour.
            <br />
            Life coaches offer scripts without wisdom.
          </p>
          <p>And people are suffering from irrelevance.</p>
          <p>
            They have careers but no purpose.
            <br />
            Success but no satisfaction.
            <br />
            Achievements but no authenticity.
          </p>
          <p>
            They've forgotten the fundamentals:
            <br />- That they were designed to pursue knowledge
            <br />- That their difference is design, not defect
            <br />- That the canvas exists beyond the smudge
          </p>
          <p>
            I offer philosophical mentorship.
            <br />
            Character-based guidance.
            <br />
            Methods grounded in timeless principles.
          </p>
          <p>
            Not to fix you.
            <br />
            To help you remember who you are.
            <br />
            To restore your relevance.
          </p>
        </div>

        <LeafDivider />

        <h2 className="font-headline text-3xl font-normal md:text-4xl">
          The Approach
        </h2>
        <div className="mt-8 space-y-6 text-lg font-light text-muted-foreground">
          <p>We start with two free sessions (40 minutes each).</p>
          <p>
            You'll tell me where you feel irrelevant.
            <br />
            I'll show you where you've been staring at the smudge.
            <br />
            We'll explore what the canvas looks like for you.
          </p>
          <p>No pressure. No sales. Just clarity.</p>
          <p>
            If it resonates, we continue.
            <br />
            If not, you walk away with new perspective.
          </p>
          <p>Either way, you'll remember something fundamental.</p>
        </div>
        <div className="mt-12">
          <Button
            asChild
            size="lg"
            className="h-auto bg-accent px-12 py-3 text-lg font-medium text-accent-foreground shadow-md transition-all hover:-translate-y-0.5 hover:bg-accent/90 hover:shadow-lg"
          >
            <Link href="/booking">Book Your Free Sessions</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
