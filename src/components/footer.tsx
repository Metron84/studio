import Link from 'next/link';

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/fundamentals', label: 'The Roots' },
  { href: '/booking', label: 'Book Free Session' },
];

export function Footer() {
  return (
    <footer className="border-t border-primary/10 bg-background py-12">
      <div className="container mx-auto flex flex-col items-center justify-center gap-6 px-4 text-center md:px-6">
        <div className="text-4xl opacity-20">🌳</div>
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-lg font-light">
          {navLinks.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className="text-muted-foreground transition-colors hover:text-accent"
            >
              {label}
            </Link>
          ))}
        </nav>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear() + 2} Mr. Melo. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
