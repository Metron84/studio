import { Button } from '@/components/ui/button';
import Link from 'next/link';

const LeafDivider = () => (
  <div className="my-16 text-center text-3xl opacity-30" aria-hidden="true">
    🍃
  </div>
);

export default function BookingPage() {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="container mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
        <div className="text-center">
          <h1 className="font-headline text-4xl font-normal tracking-tight text-primary md:text-5xl">
            Book Your First Session
          </h1>
          <div className="mx-auto mt-6 max-w-2xl space-y-4 text-lg font-light text-muted-foreground md:text-xl">
            <p>
              Two free 40-minute conversations.
              <br />
              No credit card. No obligation.
            </p>
            <p>
              Let's talk about where you feel irrelevant
              <br />
              and explore what the canvas looks like for you.
            </p>
          </div>
        </div>

        <LeafDivider />

        <div className="mx-auto max-w-2xl">
          <h2 className="text-center font-headline text-3xl font-normal text-primary md:text-4xl">
            How It Works
          </h2>
          <ol className="mt-8 space-y-8 text-lg font-light">
            <li className="flex items-start gap-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-primary/50 bg-primary/10 pt-0.5 font-headline text-lg text-primary">
                1
              </div>
              <div className="space-y-1">
                <h3 className="font-normal text-foreground">
                  Choose a time below that works for you
                </h3>
                <p className="text-muted-foreground">
                  You'll see my available appointment slots in the calendar.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-primary/50 bg-primary/10 pt-0.5 font-headline text-lg text-primary">
                2
              </div>
              <div className="space-y-1">
                <h3 className="font-normal text-foreground">Fill in your details</h3>
                <p className="text-muted-foreground">
                  Just your name, email, and 3 short questions about where you
                  feel irrelevant.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-primary/50 bg-primary/10 pt-0.5 font-headline text-lg text-primary">
                3
              </div>
              <div className="space-y-1">
                <h3 className="font-normal text-foreground">
                  You'll receive a confirmation email
                </h3>
                <p className="text-muted-foreground">
                  With a Google Meet link and calendar reminder. No need to
                  download anything.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-primary/50 bg-primary/10 pt-0.5 font-headline text-lg text-primary">
                4
              </div>
              <div className="space-y-1">
                <h3 className="font-normal text-foreground">We talk</h3>
                <p className="text-muted-foreground">
                  40 minutes. Relaxed conversation. No pressure. No sales.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-primary/50 bg-primary/10 pt-0.5 font-headline text-lg text-primary">
                5
              </div>
              <div className="space-y-1">
                <h3 className="font-normal text-foreground">
                  If it resonates, we continue
                </h3>
                <p className="text-muted-foreground">
                  After both free sessions, we'll discuss what ongoing
                  mentorship might look like. If it doesn't resonate, you walk
                  away with new clarity. Either way, you gain something.
                </p>
              </div>
            </li>
          </ol>
        </div>

        <LeafDivider />

        <div className="mx-auto max-w-xl text-center">
          <h2 className="mb-8 text-center font-headline text-3xl font-normal text-primary">
            Select Your Time
          </h2>
          <Button
            asChild
            size="lg"
            className="h-auto bg-accent px-12 py-4 text-lg font-medium text-accent-foreground shadow-md transition-all hover:-translate-y-0.5 hover:bg-accent/90 hover:shadow-lg"
          >
            <Link
              href="https://calendar.app.google/zEPJrMHf9HVejbSA8"
              target="_blank"
              rel="noopener noreferrer"
            >
              View availability & book
            </Link>
          </Button>
          <p className="mt-4 text-base text-muted-foreground">
            You'll be taken to Google Calendar to select your time. This opens in a
            new tab.
          </p>
        </div>

        <LeafDivider />

        <div className="text-center text-base font-light text-muted-foreground">
          <p className="font-normal text-foreground">
            After booking, you'll receive:
          </p>
          <ul className="mx-auto mt-4 inline-block list-inside list-disc space-y-1 text-left">
            <li>Confirmation email with Google Meet link</li>
            <li>Short intake form (3 questions about relevancy)</li>
            <li>Access to free resources while you wait</li>
          </ul>
          <p className="mt-8">
            Questions?
            <br />
            Email:{' '}
            <a
              href="mailto:melo@mrmelo.com"
              className="text-primary underline-offset-4 hover:underline hover:text-accent"
            >
              melo@mrmelo.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
