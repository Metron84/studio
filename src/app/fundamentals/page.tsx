import { Book, FileText, Ruler } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

const resources = [
  {
    title: 'A Map to Peace',
    icon: <FileText className="h-8 w-8 text-primary" />,
    summary: [
      'How humanity forgot complementarity. Why we pathologize difference. The path back to balance.',
      "Most people believe their neurodivergence is a defect. It's not. It's design. This paper maps the journey from the Cold War (pathologization) to the Melding (complementarity restored).",
    ],
    learnPoints: [
      'Why rice and fish both need the plate',
      'The Translator persona that bridges worlds',
      'The nine foundations that restore relevance',
    ],
  },
  {
    title: 'The Translator Imperative',
    icon: <FileText className="h-8 w-8 text-primary" />,
    summary: [
      'The cognitive practice of bridging paradigms. Why some people carry asymmetric burdens. How to translate without losing yourself.',
      'Some people spend their entire lives translating between neurotypical and neurodivergent worlds. They manually compute what others do intuitively. This paper names that burden and offers a framework for understanding it.',
    ],
    learnPoints: [
      'Pattern recognition as social systemizing',
      'Strategic dissociation under cognitive load',
      'Why translation is evolutionary necessity',
    ],
  },
  {
    title: 'The Nine Foundations',
    icon: <Book className="h-8 w-8 text-primary" />,
    summary: [
      'Goodness → Clear Communication → Understanding → Authenticity → Trust → Justice → Truth → Respect → Love → Peace',
      "These aren't abstract virtues. They're operational principles. Each foundation builds on the previous, creating a path from wherever you are to wherever relevance lives.",
    ],
    learnPoints: [
      'Why goodness is recognition, not judgment',
      'How clear communication dismantles scripts',
      'What authenticity demands when the mono-system punishes it',
    ],
  },
  {
    title: 'The Metron Methodology',
    icon: <Ruler className="h-8 w-8 text-primary" />,
    summary: [
      'How to think synthetically, not just analytically. Building frameworks from timeless principles. Character as source of protection.',
      'The Metron Methodology is a systematic approach to problem-solving that prioritizes HOW over WHAT, mechanism over intention, and synthesis over mere analysis.',
    ],
    learnPoints: [
      'The Source Protocol (Intention × Mechanism)',
      'Structuring logic (Roots → Trunk → Branches → Leaves)',
      'Exception recognition and hybrid model acceptance',
    ],
  },
];

export default function FundamentalsPage() {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="container mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
        <div className="text-center">
          <h1 className="font-headline text-4xl font-normal tracking-tight md:text-5xl">
            The Roots: Free Wisdom
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-light text-muted-foreground md:text-xl">
            Before you book a session, read these.
            <br />
            They'll show you what we explore together:
          </p>
        </div>

        <div className="mt-12 grid gap-8">
          {resources.map((resource) => (
            <Card key={resource.title} className="border-primary/10 bg-card">
              <CardHeader>
                <div className="flex items-center gap-4">
                  {resource.icon}
                  <CardTitle className="font-headline text-2xl font-normal">
                    {resource.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4 text-base font-light text-muted-foreground">
                  {resource.summary.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>

                <div className="text-base font-light text-muted-foreground">
                  <p className="font-normal text-foreground">You'll learn:</p>
                  <ul className="mt-2 list-inside list-disc space-y-1 pl-2">
                    {resource.learnPoints.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  className="bg-accent text-accent-foreground shadow-md transition-all hover:-translate-y-0.5 hover:bg-accent/90 hover:shadow-lg"
                >
                  <Link href="mailto:melo@mrmelo.com">
                    Request Full Paper →
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center text-lg font-light text-muted-foreground">
          <p>Read. Reflect.</p>
          <p>Then book your session if it resonates.</p>
          <p className="mt-4">
            The wisdom is free.
            <br />
            The conversation is where relevance emerges.
          </p>
        </div>
        <div className="mt-8 text-center">
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