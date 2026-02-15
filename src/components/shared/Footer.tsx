import Link from "next/link";
import { GraduationCap } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/40 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold mb-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              GPA Calculator
            </Link>
            <p className="text-sm text-muted-foreground">
              Free GPA calculator for high school students. Calculate weighted,
              unweighted, and UC GPA for any target college.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3">Tools</h3>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/gpa-calculator" className="hover:text-foreground transition-colors">
                GPA Calculator
              </Link>
              <Link href="/how-it-works" className="hover:text-foreground transition-colors">
                How GPA Works
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3">GPA Types</h3>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/how-it-works#unweighted" className="hover:text-foreground transition-colors">
                Unweighted GPA (4.0)
              </Link>
              <Link href="/how-it-works#weighted" className="hover:text-foreground transition-colors">
                Weighted GPA (5.0)
              </Link>
              <Link href="/how-it-works#uc-gpa" className="hover:text-foreground transition-colors">
                UC GPA System
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} GPA Calculator. Free to use. Your
          data stays in your browser.
        </div>
      </div>
    </footer>
  );
}
