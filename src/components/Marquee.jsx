import { useRef } from 'react';
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from 'motion/react';
import { MARQUEE } from '../data';

const wrap = (min, max, v) => { const r = max - min; return ((((v - min) % r) + r) % r) + min; };

function Ring() {
  return (
    <svg className="h-6 w-6 shrink-0 opacity-80" viewBox="0 0 40 40" fill="none" stroke="currentColor" aria-hidden="true">
      <circle cx="20" cy="20" r="17" strokeWidth="2.5" />
      <circle cx="19" cy="21" r="11" strokeWidth="2" />
      <circle cx="18.5" cy="21.5" r="5" strokeWidth="2" />
    </svg>
  );
}

/** Endless band of products; scrolling the page speeds it up and flips its direction. */
export default function Marquee({ baseVelocity = -2.2 }) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const smoothVelocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(baseX, v => `${wrap(-50, 0, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let moveBy = direction.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) direction.current = -1;
    else if (velocityFactor.get() > 0) direction.current = 1;
    moveBy += direction.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  // Two identical halves so the -50% wrap is seamless
  const half = [...MARQUEE, ...MARQUEE];

  return (
    <div className="overflow-hidden py-8" aria-hidden="true">
      <div className="-mx-6 -rotate-[1.5deg] bg-accent py-5 text-white shadow-[0_20px_40px_-25px_rgba(0,0,0,.5)]">
        <motion.div className="flex w-max whitespace-nowrap" style={{ x }}>
          {[0, 1].map(k => (
            <div key={k} className="flex shrink-0 items-center">
              {half.map((item, i) => (
                <span key={i} className="display flex items-center gap-6 px-6 text-2xl font-bold sm:text-3xl">
                  {item}
                  <Ring />
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
