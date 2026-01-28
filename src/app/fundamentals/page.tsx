import { Download, BookCheck, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const resources = [
  {
    title: 'The Growth Mindset',
    description:
      'An introductory guide to understanding and cultivating a mindset geared for growth and resilience.',
    icon: <BookCheck className="h-6 w-6 text-primary" />,
    fileName: 'growth-mindset.pdf',
  },
  {
    title: 'Principles of Self-Discipline',
    description:
      'Learn the fundamental principles of self-discipline to build powerful habits and achieve your goals.',
    icon: <ShieldCheck className="h-6 w-6 text-primary" />,
    fileName: 'self-discipline.pdf',
  },
  {
    title: 'Effective Communication Workbook',
    description:
      'A practical workbook with exercises to help you improve your communication skills in personal and professional settings.',
    icon: <BookCheck className="h-6 w-6 text-primary" />,
    fileName: 'communication-workbook.pdf',
  },
  {
    title: 'Mindfulness for Beginners',
    description:
      'A simple guide to practicing mindfulness, reducing stress, and increasing your presence in daily life.',
    icon: <ShieldCheck className="h-6 w-6 text-primary" />,
    fileName: 'mindfulness-beginners.pdf',
  },
];

export default function FundamentalsPage() {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="container mx-auto max-w-5xl px-4 py-16 md:px-6 md:py-24">
        <div className="text-center">
          <h1 className="font-headline text-5xl font-bold tracking-tight md:text-6xl">
            The Roots: Free Fundamentals
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Nurture your growth with these foundational resources, offered freely
            to help you begin your journey.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {resources.map((resource) => (
            <Card
              key={resource.title}
              className="flex flex-col transition-shadow duration-300 hover:shadow-lg"
            >
              <CardHeader className="flex-row items-center gap-4">
                {resource.icon}
                <CardTitle className="font-headline text-2xl">
                  {resource.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-base">
                  {resource.description}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full" variant="outline">
                  <a href={`/resources/${resource.fileName}`} download>
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
