import { Leaf } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        'group flex items-center gap-2 text-lg font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md px-1',
        className
      )}
    >
      <Leaf className="h-6 w-6 text-primary transition-transform duration-300 group-hover:rotate-12" />
      <span className="font-headline text-2xl font-bold text-foreground">
        Mr. Melo
      </span>
    </Link>
  );
}
