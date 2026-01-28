import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'melo-hero');
  const aboutCardImage = PlaceHolderImages.find(
    (img) => img.id === 'melo-card1'
  );
  const rootsCardImage = PlaceHolderImages.find(
    (img) => img.id === 'melo-card2'
  );
  const bookingCardImage = PlaceHolderImages.find(
    (img) => img.id === 'melo-card3'
  );

  const features = [
    {
      title: 'About Mr. Melo',
      description: 'Discover the story and philosophy behind the guidance.',
      href: '/about',
      icon: <User className="h-8 w-8 text-primary" />,
      image: aboutCardImage,
    },
    {
      title: 'The Roots',
      description: 'Explore a collection of free resources to nurture your growth.',
      href: '/fundamentals',
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      image: rootsCardImage,
    },
    {
      title: 'Book a Session',
      description: 'Schedule a one-on-one appointment to begin your journey.',
      href: '/booking',
      icon: <Calendar className="h-8 w-8 text-primary" />,
      image: bookingCardImage,
    },
  ];

  return (
    <div className="flex flex-col animate-in fade-in duration-500">
      <section className="relative h-[60vh] min-h-[400px] w-full">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
          <div className="max-w-4xl rounded-lg bg-background/70 p-8 backdrop-blur-sm">
            <h1 className="font-headline text-5xl font-bold tracking-tight text-foreground md:text-7xl">
              Cultivate Your Potential
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground md:text-xl">
              Guidance and resources from Mr. Melo for personal and professional
              growth.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/booking">
                Begin Your Journey <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="transform-gpu transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <CardHeader>
                  <div className="mb-4 flex items-center gap-4">
                    {feature.icon}
                    <CardTitle className="font-headline text-2xl">
                      {feature.title}
                    </CardTitle>
                  </div>
                  {feature.image && (
                    <div className="relative h-48 w-full overflow-hidden rounded-lg">
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
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                  <Button asChild variant="link" className="p-0 mt-4">
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
