import { motion } from 'motion/react';
import { EASE } from './motion';

const LOGO = 'assets/images/logo.png';

/** Full-screen logo loader shown between pages. */
function Loader({ initial, animate, exit, transition }) {
  return (
    <motion.div
      aria-hidden="true"
      className="loader-backdrop pointer-events-none fixed inset-0 z-[70] flex flex-col items-center justify-center"
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transition}
    >
      {/* logo stays still; only the shine sweeps across it */}
      <div className="relative">
        {/* soft glow behind the logo */}
        <span
          className="absolute -inset-10 -z-10 rounded-full"
          style={{ background: 'radial-gradient(closest-side, color-mix(in oklab, var(--accent) 22%, transparent), transparent)' }}
        />
        <span className="relative block">
          <img src={LOGO} alt="" width="331" height="100" decoding="sync" className="site-logo block h-16 w-auto sm:h-20" />
          <span className="loader-shine absolute inset-0" style={{ WebkitMaskImage: `url(${LOGO})`, maskImage: `url(${LOGO})` }} />
        </span>
      </div>

      {/* indeterminate progress bar */}
      <div className="loader-track relative mt-7 h-[3px] w-40 overflow-hidden rounded-full">
        <motion.span
          className="absolute inset-y-0 w-1/2 rounded-full bg-accent"
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{ duration: 0.9, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
        />
      </div>
    </motion.div>
  );
}

/**
 * Wraps a routed page. While the old page leaves, the logo loader fades in over it;
 * the new page then fades the loader out and rises into place. The first page load skips the loader.
 */
export default function PageTransition({ children, withCurtain }) {
  // Loaders are siblings of the page wrapper so its fade-in doesn't hide them
  return (
    <>
      <motion.div
        initial={withCurtain ? { opacity: 0, y: 24 } : false}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, delay: withCurtain ? 0.35 : 0 } }}
        exit={{ opacity: 1, transition: { duration: 0.35 } }}
      >
        {children}
      </motion.div>

      {/* in: covers the old page as it leaves */}
      <Loader initial={{ opacity: 0 }} animate={{ opacity: 0 }} exit={{ opacity: 1 }} transition={{ duration: 0.3, ease: 'easeOut' }} />

      {/* out: lifts away once the new page is in place */}
      {withCurtain && (
        <Loader initial={{ opacity: 1 }} animate={{ opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease: 'easeInOut', delay: 0.35 }} />
      )}
    </>
  );
}
