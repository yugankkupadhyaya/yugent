import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Logo } from '@/components/brand/logo';
import { MobileNav } from '@/components/layout/mobile-nav';
import { applyTheme, getStoredTheme } from '@/lib/theme';
import { springs } from '@/lib/motion-tokens';

const navLinks = [
  { href: '#features', label: 'Features', sectionId: 'features' },
  { href: '#how-it-works', label: 'How it works', sectionId: 'how-it-works' },
  { href: '#about', label: 'About', sectionId: 'about' },
  { href: '#contact', label: 'Contact', sectionId: 'contact' },
];

export function Navbar() {
  const location = useLocation();
  const [theme, setTheme] = useState(getStoredTheme);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  const sectionIds = useMemo(() => navLinks.map((link) => link.sectionId), []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 8);
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const elements = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);

    if (!elements.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target?.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: '-30% 0px -60% 0px',
        threshold: [0.2, 0.4, 0.6],
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [sectionIds]);

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
  }

  return (
    <nav
      className={`sticky top-0 z-40 w-full border-b transition-colors duration-300 ${
        scrolled
          ? 'border-border/70 bg-background/85 backdrop-blur-xl'
          : 'border-border/50 bg-background/55 backdrop-blur-md'
      }`}
    >
      <div className="grid h-[68px] w-full grid-cols-[1fr_auto_1fr] items-center px-6 sm:px-8 lg:px-12 xl:px-16">
        <a
          href="#hero"
          className="flex shrink-0 items-center justify-self-start text-lg font-semibold tracking-tight text-foreground"
        >
          <Logo className="h-9 w-auto" />
        </a>

        <nav className="hidden items-center gap-9 md:flex md:justify-self-center">
          {navLinks.map((link) => {
            const isActive = activeSection === link.sectionId;

            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative py-1 text-sm font-medium transition-colors duration-200 ${
                  isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
                {isActive ? (
                  <motion.span
                    layoutId="navbar-active-indicator"
                    className="absolute inset-x-0 -bottom-0.5 h-px bg-primary"
                    transition={springs.soft}
                  />
                ) : null}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 md:justify-self-end">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-9 rounded-full border border-border/70 bg-background/60"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            <motion.span
              key={theme}
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={springs.snappy}
              className="flex"
            >
              {theme === 'dark' ? <Sun /> : <Moon />}
            </motion.span>
          </Button>

          <span className="hidden h-5 w-px bg-border/60 md:block" aria-hidden="true" />

          <motion.div
            className="hidden md:block"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={springs.snappy}
          >
            <Button asChild size="sm" className="h-9 rounded-full px-4">
              <Link to="/dashboard">Login</Link>
            </Button>
          </motion.div>

          <MobileNav
            open={mobileOpen}
            onToggle={() => setMobileOpen((open) => !open)}
            onClose={() => setMobileOpen(false)}
            links={navLinks}
            activeSection={activeSection}
          />
        </div>
      </div>
    </nav>
  );
}
