export default function BookingPage() {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="container mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
        <div className="text-center">
          <h1 className="font-headline text-4xl font-normal tracking-tight md:text-5xl">
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

        <div className="mx-auto mt-12 max-w-4xl">
          <div className="aspect-video w-full overflow-hidden rounded-lg border border-primary/10 bg-card md:aspect-[16/10]">
            <iframe
              src="https://calendar.google.com/calendar/appointments/schedules/YOUR_LINK_HERE"
              className="h-full w-full border-0"
              title="Booking Calendar"
            ></iframe>
          </div>
        </div>

        <div className="mt-12 text-center text-muted-foreground">
          <p className="font-normal text-foreground">
            After booking, you'll receive:
          </p>
          <ul className="mt-4 list-inside list-disc space-y-1">
            <li>Confirmation email with Google Meet link</li>
            <li>Short intake form (3 questions)</li>
            <li>Option to download free resources</li>
          </ul>
          <p className="mt-8">
            Questions?
            <br />
            Email:{' '}
            <a
              href="mailto:hello@mrmelo.com"
              className="text-primary underline-offset-4 hover:underline hover:text-accent"
            >
              hello@mrmelo.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
