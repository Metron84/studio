import { Download, Book, FileText, Ruler } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

const resources = [
  {
    title: 'A Map to Peace',
    description:
      'How humanity forgot complementarity. Why we pathologize difference. The path back to balance.',
    icon: <FileText className="h-8 w-8 text-primary" />,
    href: '/resources/map-to-peace.pdf',
    cta: 'Download PDF',
  },
  {
    title: 'The Translator Imperative',
    description:
      'The cognitive practice of bridging paradigms. Why some people carry asymmetric burdens. How to translate without losing yourself.',
    icon: <FileText className="h-8 w-8 text-primary" />,
    href: '/resources/translator-imperative.pdf',
    cta: 'Download PDF',
  },
  {
    title: 'The Nine Foundations',
    description:
      'Goodness → Clear Communication → Understanding → Authenticity → Trust → Justice → Truth → Respect → Love → Peace',
    icon: <Book className="h-8 w-8 text-primary" />,
    href: '#', // Placeholder
    cta: 'Read Essays',
  },
  {
    title: 'The Metron Methodology',
    description:
      'How to think synthetically, not just analytically. Building frameworks from timeless principles. Character as source of protection.',
    icon: <Ruler className="h-8 w-8 text-primary" />,
    href: '/resources/metron-methodology.pdf',
    cta: 'Introduction PDF',
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
            <Card key={resource.title} className="border-primary/10 bg-card p-2">
              <CardHeader className="flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  {resource.icon}
                  <CardTitle className="font-headline text-2xl font-normal">
                    {resource.title}
                  </CardTitle>
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="shrink-0 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Link
                    href={resource.href}
                    download={resource.href.endsWith('.pdf')}
                  >
                    {resource.href.endsWith('.pdf') && (
                      <Download className="mr-2 h-4 w-4" />
                    )}
                    {resource.cta}
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <p className="text-base text-muted-foreground">
                  {resource.description}
                </p>
              </CardContent>
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
      </div>
    </div>
  );
}
