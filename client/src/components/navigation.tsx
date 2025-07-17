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
    <header className="fixed top-0 left-0 right-0 z-50 sophisticated-blur border-b border-white/20 elegant-shadow">
      <nav className="container mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cogito-blue to-blue-600 rounded-xl flex items-center justify-center elegant-shadow">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-3xl font-display text-sophisticated">Cogito</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-12">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-base font-heading transition-all duration-300 animated-underline ${
                  isActive(item.href)
                    ? 'text-cogito-blue'
                    : 'text-elegant hover:text-cogito-blue'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-6">
            <Button
              variant="ghost"
              className="hidden md:block text-elegant hover:text-cogito-blue font-heading sophisticated-button"
            >
              Sign In
            </Button>
            <Button className="sophisticated-button bg-cogito-blue text-white hover:bg-blue-600 px-6 py-3 rounded-xl elegant-shadow font-heading">
              Get Started
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden sophisticated-button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
