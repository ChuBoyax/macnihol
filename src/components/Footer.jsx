import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ADDRESS, HOURS, HOURS_NOTE, PHONE, PRODUCT_NAV, UTILITY_NAV } from '../data';
import { useOpenStatus } from '../hooks/useOpenStatus';
import { StatusDot } from './Hours';
import { Arrow, EASE, EASE_OUT_EXPO, Magnetic } from './motion';

const LOGO = 'assets/images/logo.png';

const col = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

function FooterLink({ to, children }) {
  return (
    <Link to={to} className="group inline-flex items-center gap-0 py-1 text-[#EEF1EA]/75 transition-all duration-300 hover:gap-2 hover:text-white">
      <span className="h-px w-0 bg-accent transition-all duration-300 group-hover:w-4" aria-hidden="true" />
      {children}
    </Link>
  );
}

function Heading({ children }) {
  return <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#E3A35E]">{children}</p>;
}

export default function Footer() {
  const status = useOpenStatus();
  const toTop = () => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });

  return (
    <footer className="hero-bg relative isolate overflow-hidden">
      {/* faint wood-grain rings in the corner */}
      <svg aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 -z-10 h-[34rem] w-[34rem] opacity-[0.07]" viewBox="0 0 200 200" fill="none" stroke="#EEF1EA">
        {[95, 80, 66, 53, 41, 30, 20, 11, 4].map((r, i) => (
          <circle key={r} cx={100 + i * 0.6} cy={100 - i * 0.4} r={r} strokeWidth={i % 3 === 0 ? 1.6 : 0.9} />
        ))}
      </svg>

      {/* CTA band */}
      <div className="mx-auto max-w-7xl px-5 pt-16 sm:px-8 lg:pt-20">
        <motion.div
          className="glass-card flex flex-col items-start justify-between gap-6 rounded-[28px] p-7 sm:p-10 lg:flex-row lg:items-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <div>
            <p className="display text-3xl font-bold leading-tight sm:text-4xl">Ready to start your project?</p>
            <p className="hero-sub mt-2">Quality landscaping supplies and hemlock lumber, just minutes from Moncton.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Magnetic>
              <a href={PHONE.href} className="btn-accent inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold">
                Call {PHONE.label}
              </a>
            </Magnetic>
            <Magnetic>
              <a href={ADDRESS.directions} target="_blank" rel="noopener" className="btn-ghost-light group inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold">
                Get Directions <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Magnetic>
          </div>
        </motion.div>
      </div>

      {/* Main columns */}
      <motion.div
        className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:grid-cols-2 sm:px-8 lg:grid-cols-12 lg:gap-8"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
      >
        <motion.div variants={col} className="lg:col-span-4">
          <Link to="/" className="inline-block rounded-2xl bg-white/95 px-4 py-3 shadow-lg transition-transform duration-300 hover:-rotate-1 hover:scale-[1.03]" aria-label="MacNichol Landscaping Supplies home">
            <img src={LOGO} alt="MacNichol Landscaping Supplies" width="331" height="100" className="h-12 w-auto" />
          </Link>
          <p className="hero-sub mt-5 max-w-xs leading-relaxed">
            Milling hemlock lumber and timber, and supplying quality soils, aggregates and mulch in Salisbury, New Brunswick.
          </p>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm" style={{ background: 'color-mix(in oklab, #EEF1EA 9%, transparent)' }}>
            <StatusDot status={status} />
            {status.text}
          </p>
        </motion.div>

        <motion.nav variants={col} aria-label="Products" className="lg:col-span-2">
          <Heading>Products</Heading>
          <ul className="space-y-1.5">
            {PRODUCT_NAV.map(l => <li key={l.to}><FooterLink to={l.to}>{l.label}</FooterLink></li>)}
          </ul>
        </motion.nav>

        <motion.nav variants={col} aria-label="Company" className="lg:col-span-2">
          <Heading>Company</Heading>
          <ul className="space-y-1.5">
            {UTILITY_NAV.map(l => <li key={l.to}><FooterLink to={l.to}>{l.label}</FooterLink></li>)}
          </ul>
        </motion.nav>

        <motion.div variants={col} className="sm:col-span-2 lg:col-span-4">
          <Heading>Visit the yard</Heading>
          <address className="not-italic leading-relaxed text-[#EEF1EA]/85">
            {ADDRESS.lines.map(l => <span key={l} className="block">{l}</span>)}
          </address>
          <a href={PHONE.href} className="display mt-3 inline-block text-2xl font-bold transition-colors hover:text-[#E3A35E]">{PHONE.label}</a>
          <ul className="mt-4 space-y-1 text-sm">
            {HOURS.map(h => (
              <li key={h.label} className="flex justify-between gap-4 border-b border-white/10 pb-1" style={{ color: h.days.includes(status.day) ? '#E3A35E' : undefined }}>
                <span className="text-[#EEF1EA]/75">{h.label}</span>
                <span className="font-semibold">{h.time}</span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs font-semibold tracking-wide text-[#E3A35E]">{HOURS_NOTE}</p>
        </motion.div>
      </motion.div>

      {/* Oversized outlined wordmark that fills in as it scrolls into view */}
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
