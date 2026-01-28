import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const card1Image = PlaceHolderImages.find((img) => img.id === 'melo-card1');
  const card2Image = PlaceHolderImages.find((img) => img.id === 'melo-card2');
  const card3Image = PlaceHolderImages.find((img) => img.id === 'melo-card3');

  const features = [
    {
      title: 'About Mr. Melo',
      description: 'Discover the story and philosophy behind the guidance.',
      href: '/about',
      icon: <User className="h-8 w-8 text-primary" />,
      image: card1Image,
    },
    {
      title: 'The Roots',
      description:
        'Explore a collection of free resources to nurture your growth.',
      href: '/fundamentals',
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      image: card2Image,
    },
    {
      title: 'Book a Session',
      description: 'Schedule a one-on-one appointment to begin your journey.',
      href: '/booking',
      icon: <Calendar className="h-8 w-8 text-primary" />,
      image: card3Image,
    },
  ];

  const LeafDivider = () => (
    <div className="my-16 text-center text-3xl opacity-30" aria-hidden="true">
      🍃
    </div>
  );

  return (
    <div className="flex flex-col animate-in fade-in duration-500">
      <section className="w-full py-24 md:py-32">
        <div className="container mx-auto px-4 text-center md:px-6">
          <div className="mx-auto max-w-3xl">
            <h1 className="font-headline text-4xl font-normal text-primary md:text-5xl">
              Your journey is relevant.
              <br />
              Your existence is relevant.
            </h1>
            <p className="mt-16 text-2xl font-light text-primary">
              But are you feeling it?
            </p>
          </div>

          <LeafDivider />

          <div className="mx-auto max-w-2xl space-y-8 text-lg font-light text-muted-foreground">
            <p>
              Most people have forgotten.
              <br />
              They perform. They survive. They chase.
              <br />
              But they don't feel relevant to their own lives.
            </p>
          </div>

          <LeafDivider />

          <div className="mx-auto max-w-2xl space-y-8 text-lg font-light text-muted-foreground">
            <p>
              This isn't about therapy.
              <br />
              This isn't about coaching.
              <br />
              This isn't about courses.
            </p>
          </div>

          <p className="mt-8 text-xl font-normal text-foreground">
            This is about remembering the fundamentals.
          </p>

          <LeafDivider />

          <div className="rounded-lg border border-primary/10 bg-white/50 p-16">
            <Button
              asChild
              size="lg"
              className="h-auto bg-accent px-16 py-4 text-lg font-medium text-accent-foreground shadow-md transition-all hover:-translate-y-0.5 hover:bg-accent/90 hover:shadow-lg"
            >
              <Link href="/booking">Book Your First Session - Free</Link>
            </Button>
            <div className="mt-8 text-center text-muted-foreground">
              <p>Two 40-minute conversations.</p>
              <p>No obligation. Just clarity.</p>
              <p className="mt-4">Let's talk about relevancy.</p>
              <p className="mt-6 font-headline text-lg italic text-foreground">
                - Mr. Melo
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-24">
        <div className="container mx-auto px-4 text-center md:px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-headline text-4xl font-normal text-primary mb-12">
              Who This Is For
            </h2>
            <div className="text-lg font-light text-muted-foreground">
              <p>You might be here because:</p>
              <ul className="mt-4 mx-auto inline-block list-disc list-inside text-left space-y-2">
                <li>You have success but no satisfaction</li>
                <li>You have achievements but no authenticity</li>
                <li>You have a career but no purpose</li>
                <li>You perform roles but don't feel relevant</li>
                <li>
                  You're exhausted from pretending to be someone you're not
                </li>
              </ul>
            </div>
            <p className="my-8 text-xl font-normal text-foreground">
              You're not broken.
            </p>
            <p className="text-lg font-light text-muted-foreground">
              You've just been staring at the smudge
              <br />
              when the canvas was always there.
            </p>
          </div>
        </div>
      </section>

      <LeafDivider />

      <section className="w-full bg-background/50 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="transform-gpu border-primary/10 bg-white/50 p-2 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <CardHeader>
                  {feature.image && (
                    <div className="relative mb-4 h-48 w-full overflow-hidden rounded-md">
                      <Image
                        src={feature.image.imageUrl}
                        alt={feature.image.description}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        data-ai-hint={feature.image.imageHint}
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-4">
                    {feature.icon}
                    <CardTitle className="font-headline text-2xl font-normal">
                      {feature.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-base text-muted-foreground">
                    {feature.description}
                  </p>
                  <Button
                    asChild
                    variant="link"
                    className="p-0 mt-4 text-primary hover:text-accent"
                  >
                    <Link href={feature.href}>
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
