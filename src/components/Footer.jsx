import { Link, useLocation } from 'react-router';
import { motion } from 'motion/react';
import { PRODUCT_NAV, UTILITY_NAV } from '../data';
import { Arrow, EASE, EASE_OUT_EXPO } from './motion';

const row = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

function useHomeScroll(to) {
  const { pathname } = useLocation();
  // Already on the homepage: Home just scrolls back up to the hero
  return () => { if (to === '/' && pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' }); };
}

/** Big product row: label slides right and an amber arrow appears on hover. */
function ProductLink({ to, children }) {
  const onClick = useHomeScroll(to);
  return (
    <Link to={to} onClick={onClick} className="group flex items-center justify-between gap-4 border-b border-white/10 py-4 transition-colors duration-300 hover:border-accent">
      <span className="display text-2xl font-bold text-[#EEF1EA] transition-transform duration-300 group-hover:translate-x-2 sm:text-[1.7rem]">{children}</span>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-[#EEF1EA]/60 transition-all duration-300 group-hover:-rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-white" aria-hidden="true">
        <Arrow />
      </span>
    </Link>
  );
}

/** Small link with an amber underline that draws in on hover. */
function FooterLink({ to, children }) {
  const onClick = useHomeScroll(to);
  return (
    <Link to={to} onClick={onClick} className="group relative inline-block py-1 text-[#EEF1EA]/70 transition-colors duration-300 hover:text-white">
      {children}
      <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" aria-hidden="true" />
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="hero-bg relative isolate overflow-hidden">
      {/* Logo + links */}
      <motion.div
        className="mx-auto grid max-w-7xl gap-12 px-5 pb-14 pt-16 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:pt-20"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
      >
        <motion.div variants={row} className="lg:col-span-5">
          <Link to="/" onClick={() => { if (window.location.pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="inline-block transition-transform duration-300 hover:-rotate-1 hover:scale-[1.03]" aria-label="MacNichol Landscaping Supplies home">
            <img src="assets/images/logo.png" alt="MacNichol Landscaping Supplies" width="331" height="100" className="h-20 w-auto drop-shadow-[0_6px_18px_rgba(0,0,0,.45)] sm:h-24" />
          </Link>
          <div className="mt-8 h-px w-16 bg-accent" aria-hidden="true" />
          <nav aria-label="Footer" className="mt-6 flex flex-wrap gap-x-7 gap-y-2">
            {UTILITY_NAV.map(l => (
              <FooterLink key={l.to} to={l.to}>
                {l.to === '/contact' ? <>contact MacNichol Landscaping Supplies</> : l.label.toLowerCase()}
              </FooterLink>
            ))}
          </nav>
        </motion.div>

        <motion.nav variants={row} aria-label="Products" className="border-t border-white/10 lg:col-span-7">
          {PRODUCT_NAV.map(l => <ProductLink key={l.to} to={l.to}>{l.label.toLowerCase()}</ProductLink>)}
        </motion.nav>
      </motion.div>

      {/* Oversized outlined wordmark that rises in; fills with amber on hover */}
      <div className="mx-auto max-w-7xl overflow-hidden px-5 sm:px-8" aria-hidden="true">
        <motion.p
          className="footer-wordmark display select-none whitespace-nowrap text-center font-extrabold leading-[0.8]"
          initial={{ y: '40%', opacity: 0 }}
          whileInView={{ y: '0%', opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.4, ease: EASE_OUT_EXPO }}
        >
          MacNichol
        </motion.p>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-4 px-5 py-6 pr-24 text-sm text-[#EEF1EA]/60 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:pr-28">
          <p>© 2026 MacNichol Landscaping Supplies</p>
          <p>
            Site Design by{' '}
            <a href="https://creativedevlabs.com/" target="_blank" rel="noopener" className="font-medium text-[#EEF1EA]/80 underline decoration-white/25 underline-offset-4 transition-colors hover:text-[#E3A35E] hover:decoration-[#E3A35E]">
              CreativeDevLabs
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
