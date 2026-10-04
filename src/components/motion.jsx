import { Fragment, useEffect, useRef } from 'react';
import { animate, motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';

export const EASE = [0.2, 0.8, 0.2, 1];
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

/** Fade + rise + unblur when scrolled into view. */
export function Reveal({ as = 'div', delay = 0, y = 36, className, children, ...rest }) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/** One word that slides up out of a clipping mask. Use inside a parent with hidden/show variants. */
export const WORD_VARIANTS = {
  hidden: { y: '115%', rotate: 5 },
  show: { y: '0%', rotate: 0, transition: { duration: 1, ease: EASE_OUT_EXPO } },
};

export function Word({ children }) {
  return (
    <span aria-hidden="true" className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-top">
      <motion.span className="inline-block origin-bottom-left will-change-transform" variants={WORD_VARIANTS}>
        {children}
      </motion.span>
    </span>
  );
}

/** Heading whose words rise in one after another. */
export function SplitText({ text, as = 'h2', className, delay = 0, stagger = 0.06 }) {
  const Comp = motion[as];
  const words = text.split(' ');
  return (
    <Comp
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {words.map((w, i) => (
        <Fragment key={i}>
          <Word>{w}</Word>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Comp>
  );
}

/** Number that springs to each new value. */
export function AnimatedNumber({ value, format }) {
  const reduce = useReducedMotion();
  const mv = useSpring(value, { stiffness: 140, damping: 22, mass: 0.6 });
  const display = useTransform(mv, v => format(v));
  useEffect(() => {
    if (reduce) mv.jump(value);
    else mv.set(value);
  }, [value, reduce, mv]);
  return <motion.span>{display}</motion.span>;
}

/** Counts up from 0 the first time it scrolls into view. */
export function CountUp({ to, format = v => Math.round(v).toString(), delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const display = useTransform(mv, format);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, { duration: 1.6, ease: EASE_OUT_EXPO, delay });
    return () => controls.stop();
  }, [inView, to, delay, mv]);
  return <motion.span ref={ref}>{display}</motion.span>;
}

/** Pulls its child toward the mouse pointer. */
export function Magnetic({ children, strength = 0.25, className = '' }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 250, damping: 18, mass: 0.4 });
  const y = useSpring(0, { stiffness: 250, damping: 18, mass: 0.4 });
  function move(e) {
    if (reduce || e.pointerType !== 'mouse') return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * strength);
    y.set((e.clientY - r.top - r.height / 2) * strength);
  }
  function leave() { x.set(0); y.set(0); }
  return (
    <motion.div ref={ref} onPointerMove={move} onPointerLeave={leave} style={{ x, y }} className={`inline-flex ${className}`}>
      {children}
    </motion.div>
  );
}

/** 3D tilt that follows the pointer. */
export function Tilt({ children, max = 6, className = '', ...rest }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const rx = useSpring(0, { stiffness: 150, damping: 16 });
  const ry = useSpring(0, { stiffness: 150, damping: 16 });
  function move(e) {
    if (reduce || e.pointerType !== 'mouse') return;
    const r = ref.current.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * max * 2);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * max * 2);
  }
  function leave() { rx.set(0); ry.set(0); }
  return (
    <motion.div ref={ref} onPointerMove={move} onPointerLeave={leave} style={{ rotateX: rx, rotateY: ry, transformPerspective: 1100 }} className={className} {...rest}>
      {children}
    </motion.div>
  );
}

export function Arrow({ className = '' }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}
