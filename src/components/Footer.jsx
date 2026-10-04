import { Link } from 'react-router';
import { motion } from 'motion/react';
import { PRODUCT_NAV, UTILITY_NAV } from '../data';
import { EASE, EASE_OUT_EXPO } from './motion';

const row = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

/** Link with an amber underline that draws in on hover. */
function FooterLink({ to, className = '', children }) {
  return (
    <Link to={to} className={`group relative inline-block py-1 transition-colors duration-300 hover:text-white ${className}`}>
      {children}
      <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" aria-hidden="true" />
    </Link>
  );
}

export default function Footer() {
  const toTop = () => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });

  return (
    <footer className="hero-bg relative isolate overflow-hidden">
      {/* faint wood-grain rings in the corner */}
      <svg aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 -z-10 h-[34rem] w-[34rem] opacity-[0.07]" viewBox="0 0 200 200" fill="none" stroke="#EEF1EA">
        {[95, 80, 66, 53, 41, 30, 20, 11, 4].map((r, i) => (
          <circle key={r} cx={100 + i * 0.6} cy={100 - i * 0.4} r={r} strokeWidth={i % 3 === 0 ? 1.6 : 0.9} />
        ))}
      </svg>

      {/* Links */}
      <motion.div
        className="mx-auto max-w-7xl px-5 pb-12 pt-16 sm:px-8 lg:pt-20"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
      >
        <motion.nav variants={row} aria-label="Products" className="flex flex-wrap gap-x-10 gap-y-3">
          {PRODUCT_NAV.map(l => (
            <FooterLink key={l.to} to={l.to} className="display text-xl font-bold lowercase text-[#EEF1EA] sm:text-2xl">{l.label}</FooterLink>
          ))}
        </motion.nav>
        <motion.nav variants={row} aria-label="Footer" className="mt-5 flex flex-wrap gap-x-8 gap-y-2 text-[#EEF1EA]/70">
          {UTILITY_NAV.map(l => (
            <FooterLink key={l.to} to={l.to}>
              {l.to === '/contact' ? <>contact <span className="normal-case">MacNichol Landscaping Supplies</span></> : l.label.toLowerCase()}
            </FooterLink>
          ))}
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
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-4 px-5 py-6 text-sm text-[#EEF1EA]/60 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© 2026 MacNichol Landscaping Supplies</p>
          <p>Site Design by CreativeDevLabs</p>
          <button
            type="button"
            onClick={toTop}
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 font-medium text-[#EEF1EA]/80 transition-colors hover:border-accent hover:text-white"
          >
            Back to top
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden="true"><path d="M8 13V3M4 7l4-4 4 4" /></svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
