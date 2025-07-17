import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Brain, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navigation() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/quiz', label: 'Take Quiz' },
    { href: '/news', label: 'News' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/bias-detector', label: 'Bias Detector' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return location === '/';
    return location.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-alabaster/80 backdrop-blur-sm border-b border-neutral-200">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-cogito-blue rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-ink">Cogito</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-cogito-blue'
                    : 'text-neutral-600 hover:text-cogito-blue'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              className="hidden md:block text-neutral-600 hover:text-cogito-blue"
            >
              Sign In
            </Button>
            <Button className="bg-cogito-blue text-white hover:bg-blue-600">
              Get Started
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`py-2 px-4 text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-cogito-blue bg-cogito-blue/10'
                      : 'text-neutral-600 hover:text-cogito-blue'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
