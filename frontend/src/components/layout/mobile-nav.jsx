import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';

export function MobileNav({ open, onToggle, onClose, links, activeSection }) {
  return (
    <div className="md:hidden">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-9 rounded-full border border-border/70 bg-background/60"
        aria-expanded={open}
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={onToggle}
      >
        {open ? <X /> : <Menu />}
      </Button>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-x-3 top-[68px] z-50 rounded-[var(--radius-xl)] border border-border/80 bg-background/96 p-3 shadow-[var(--shadow-lg)] backdrop-blur-xl"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={`rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
                    activeSection === link.sectionId
                      ? 'bg-accent text-foreground'
                      : 'text-muted-foreground hover:bg-accent/70 hover:text-foreground'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="mt-2 border-t border-border/80 pt-3">
              <Button asChild className="h-10 w-full rounded-full" onClick={onClose}>
                <Link to="/dashboard">Login</Link>
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
