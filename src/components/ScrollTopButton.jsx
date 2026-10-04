import { useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react';

/** Floating back-to-top button; its ring fills with scroll progress. Appears after scrolling down a bit. */
export default function ScrollTopButton() {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25, restDelta: 0.001 });
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, 'change', v => setShow(v > 500));

  const toTop = () => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          onClick={toTop}
          aria-label="Back to top"
          className="group fixed bottom-5 right-5 z-[55] flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[0_12px_30px_-10px_rgba(0,0,0,.5)] sm:bottom-8 sm:right-8"
          style={{ background: '#1F3B2C' }}
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {/* progress ring: light track, amber fill */}
          <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 56 56" aria-hidden="true">
            <circle cx="28" cy="28" r="25" fill="none" stroke="#CFE0D2" strokeOpacity=".55" strokeWidth="4" />
            <motion.circle cx="28" cy="28" r="25" fill="none" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" style={{ pathLength: progress }} />
          </svg>
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="relative transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden="true">
            <path d="M8 13V3M4 7l4-4 4 4" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
