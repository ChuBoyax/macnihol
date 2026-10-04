import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react';
import { NAV, PHONE } from '../data';
import { EASE, Magnetic } from './motion';

const MENU_CLOSED = 'M3 6L17 6M3 14L17 14';
const MENU_OPEN = 'M5 5L15 15M15 5L5 15';

const LOGO_SRC = 'assets/images/logo.png';

/** Logo: springs in on load, a light streak sweeps across it every few seconds, wiggles on hover. */
function Logo({ scrolled }) {
  return (
    <motion.span
      className="relative inline-block"
      initial={{ opacity: 0, scale: 0.6, rotate: -8, filter: 'blur(6px)' }}
      animate={{ opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)' }}
      transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.25 }}
      whileHover={{ rotate: [0, -4, 3, -2, 0], scale: 1.06, transition: { duration: 0.6 } }}
      whileTap={{ scale: 0.94 }}
    >
      <img
        src={LOGO_SRC}
        alt="MacNichol Landscaping Supplies"
        width="331"
        height="100"
        className={`site-logo block w-auto transition-[height] duration-500 ${scrolled ? 'h-10' : 'h-11 sm:h-12'}`}
      />
      {/* shine, clipped to the logo's own shape */}
      <span
        aria-hidden="true"
        className="logo-shine pointer-events-none absolute inset-0"
        style={{ WebkitMaskImage: `url(${LOGO_SRC})`, maskImage: `url(${LOGO_SRC})` }}
      />
    </motion.span>
  );
}

export default function Header() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(null);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25, restDelta: 0.001 });
  useMotionValueEvent(scrollY, 'change', v => setScrolled(v > 12));

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1280) setOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const pill = hovered ?? pathname;
  // Already on the homepage: Home links just take you back up to the hero
  const onLogoClick = () => { if (pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const onNavClick = to => () => { if (to === '/') onLogoClick(); };

  return (
    <>
      <motion.div className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-accent" style={{ scaleX: progress }} />

      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
        className={`site-header header-glass sticky z-50 border-b transition-[background-color,box-shadow] duration-500 ${scrolled ? 'is-scrolled' : ''}`}
      >
        <div className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 transition-[padding] duration-500 sm:px-8 ${scrolled ? 'py-2' : 'py-3'}`}>
          <Link to="/" onClick={onLogoClick} className="flex shrink-0 items-center" aria-label="MacNichol Landscaping Supplies home">
            <Logo scrolled={scrolled} />
          </Link>

          <nav className="hidden items-center gap-0.5 text-sm font-medium xl:flex" aria-label="Main" onPointerLeave={() => setHovered(null)}>
            {NAV.map(n => (
              <NavLink
                key={n.to}
                to={n.to}
                onClick={onNavClick(n.to)}
                end
                onPointerEnter={() => setHovered(n.to)}
                className={({ isActive }) => `relative isolate whitespace-nowrap rounded-full px-3.5 py-2 transition-colors duration-300 ${pill === n.to || isActive ? 'text-ink' : 'text-muted'}`}
              >
                {pill === n.to && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full"
                    style={{ background: 'color-mix(in oklab, var(--ink) 9%, transparent)' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <Magnetic>
                <a href={PHONE.href} className="btn-accent whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold">Call {PHONE.label}</a>
              </Magnetic>
            </div>
            <button
              type="button"
              onClick={() => setOpen(o => !o)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line xl:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobileNav"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <motion.path initial={false} animate={{ d: open ? MENU_OPEN : MENU_CLOSED }} transition={{ duration: 0.35, ease: EASE }} />
              </svg>
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.nav
              id="mobileNav"
              aria-label="Mobile"
              className="overflow-hidden border-t border-line xl:hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <motion.div
                className="px-5 pb-5 pt-2"
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } }}
              >
                {NAV.map((n, i) => (
                  <motion.div key={n.to} variants={{ hidden: { opacity: 0, x: -18 }, show: { opacity: 1, x: 0 } }}>
                    <NavLink
                      to={n.to}
                      end
                      onClick={onNavClick(n.to)}
                      className={({ isActive }) => `block py-3.5 font-medium ${isActive ? 'text-accent' : ''} ${i < NAV.length - 1 ? 'border-b border-line' : ''}`}
                    >
                      {n.label}
                    </NavLink>
                  </motion.div>
                ))}
                <motion.a
                  href={PHONE.href}
                  variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                  className="btn-accent mt-3 flex justify-center rounded-full px-5 py-3 font-semibold"
                >
                  Call {PHONE.label}
                </motion.a>
              </motion.div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
