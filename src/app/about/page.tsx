import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AboutPage() {
  const aboutImage = PlaceHolderImages.find((img) => img.id === 'melo-about');

  return (
    <div className="animate-in fade-in duration-500">
      <div className="container mx-auto max-w-5xl px-4 py-16 md:px-6 md:py-24">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="flex items-center justify-center">
            {aboutImage && (
              <div className="relative h-[400px] w-full max-w-[300px] overflow-hidden rounded-lg shadow-2xl md:h-[500px] md:max-w-[400px]">
                <Image
                  src={aboutImage.imageUrl}
                  alt={aboutImage.description}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 80vw, 400px"
                  data-ai-hint={aboutImage.imageHint}
                />
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="font-headline text-5xl font-bold tracking-tight md:text-6xl">
              The Man Behind the Method
            </h1>
            <div className="mt-8 space-y-6 text-lg text-foreground/80">
              <p>
                Welcome. I'm known as Mr. Melo, a guide dedicated to helping
                individuals navigate the complexities of life to find clarity,
                purpose, and growth. My journey began not in a classroom, but
                in the rich tapestry of real-world experiences, observing the
                intricate patterns of human behavior and potential.
              </p>
              <p>
                My philosophy is rooted in the belief that every person holds
                the seed of their own potential. Like a tree, with strong roots,
                a solid trunk, and branches reaching for the sky, we too need to
                be nurtured to grow. My work focuses on strengthening your
                foundations—'The Roots'—so you can flourish in all aspects of
                your life.
              </p>
              <p>
                With a background that blends artistic sensibility and deep
                empathy, I offer a unique perspective that transcends
                conventional coaching. Together, we will explore your inner
                landscape, cultivate self-awareness, and build a resilient
                framework for lasting success and fulfillment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
