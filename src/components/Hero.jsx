import { Fragment, useRef } from 'react';
import { Link } from 'react-router';
import { motion, useScroll, useTransform } from 'motion/react';
import { IMAGES, PHONE } from '../data';
import { useOpenStatus } from '../hooks/useOpenStatus';
import { HoursList, StatusDot } from './Hours';
import { Arrow, EASE, EASE_OUT_EXPO, Magnetic, Tilt, Word } from './motion';

const fadeUp = delay => ({
  initial: { opacity: 0, y: 24, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.9, ease: EASE, delay },
});

export default function Hero() {
  const ref = useRef(null);
  const status = useOpenStatus();

  // Content lifts away as you scroll past
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -70]);

  return (
    <section ref={ref} className="hero-bg relative isolate overflow-hidden">
      {/* Background photo with a dark opacity overlay; fades in */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: EASE }}
      >
        <img src={IMAGES.milling} alt="" className="hero-photo" />
      </motion.div>
      <div aria-hidden="true" className="hero-shade absolute inset-0 -z-10" />

      <motion.div
        style={{ y: contentY }}
        className="mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-14 sm:px-8 lg:min-h-[600px] lg:grid-cols-12 lg:items-center lg:gap-10 lg:pb-16 lg:pt-14"
      >
        <div className="flex flex-col justify-center lg:col-span-7">
          <motion.p {...fadeUp(0.25)} className="mb-5 text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: '#E3A35E' }}>
            MacNichol Landscaping Supplies
          </motion.p>

          <motion.h1
            className="display text-[2.9rem] font-extrabold leading-[0.95] sm:text-6xl lg:text-[5.2rem]"
            aria-label="Milling Timber in Moncton Area"
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.4 } } }}
          >
            {['Milling', 'Timber', 'in'].map(w => (
              <Fragment key={w}><Word>{w}</Word>{' '}</Fragment>
            ))}
            <span className="relative inline-block whitespace-nowrap">
              <Word>Moncton</Word> <Word>Area</Word>
              <svg className="pointer-events-none absolute -bottom-[0.1em] left-0 h-[0.28em] w-full overflow-visible" viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true">
                <motion.path
                  d="M4 16 C 70 6, 160 2, 296 12"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="7"
                  strokeLinecap="round"
                  variants={{ hidden: { pathLength: 0, opacity: 0 }, show: { pathLength: 1, opacity: 1, transition: { duration: 1.1, ease: EASE_OUT_EXPO, delay: 0.5 } } }}
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p {...fadeUp(1)} className="hero-sub mt-7 max-w-xl text-lg leading-relaxed">
            We have a full range of quality landscaping supplies located just minutes from Moncton.
          </motion.p>

          <motion.div {...fadeUp(1.15)} className="mt-9 flex flex-wrap gap-3">
            <Magnetic>
              <Link to="/lumber-products" className="btn-accent group inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold">
                Lumber Products
                <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link to="/contact" className="btn-ghost-light rounded-full px-6 py-3.5 font-semibold">Contact us</Link>
            </Magnetic>
          </motion.div>
        </div>

        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, y: 40, rotateX: -20 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ type: 'spring', stiffness: 90, damping: 16, delay: 0.7 }}
          style={{ transformPerspective: 900 }}
        >
          <Tilt max={4}>
            <div className="glass-card rounded-[28px] p-7 backdrop-blur-xl sm:p-8" style={{ background: 'color-mix(in oklab, #0b150f 55%, transparent)' }}>
              <h2 className="display text-2xl font-bold">Hours of Operation</h2>
              <p className="mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm" style={{ background: 'color-mix(in oklab, #EEF1EA 10%, transparent)' }}>
                <StatusDot status={status} />
                {status.text}
              </p>
              <div className="mt-6 border-t pt-5" style={{ borderColor: 'color-mix(in oklab, #EEF1EA 16%, transparent)' }}>
                <HoursList status={status} />
              </div>
              <Magnetic strength={0.12} className="mt-7 w-full">
                <a href={PHONE.href} className="btn-accent flex w-full justify-center rounded-full px-6 py-3.5 font-semibold">Call {PHONE.label}</a>
              </Magnetic>
            </div>
          </Tilt>
        </motion.div>
      </motion.div>
    </section>
  );
}
