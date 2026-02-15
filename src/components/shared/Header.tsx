import Link from "next/link";
import { GraduationCap } from "lucide-react";

export function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span>GPA Calculator</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/gpa-calculator"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Calculator
          </Link>
          <Link
            href="/how-it-works"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            How It Works
          </Link>
        </nav>
      </div>
    </header>
  );
}
