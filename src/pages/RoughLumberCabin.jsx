import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { IMAGES, PHONE } from '../data';
import PageHero from '../components/PageHero';
import { CountUp, EASE, EASE_OUT_EXPO, Magnetic, Reveal, SplitText, Tilt } from '../components/motion';

const IMG = 'assets/images/Rough%20Lumber%20Cabin/';

const FEATURES = [
  'Built with rough lumber',
  'Live edge cedar siding',
  'Green steel roof',
  '16 feet wide by 32 feet long',
  '8 foot covered cedar porch/deck',
  'Unfinished interior',
  'Ready to be moved',
];

const PHOTOS = [
  { src: 'rough-lumber-cabin-for-sale.jpg', alt: 'Rough Lumber Cabin for Sale, front with covered porch' },
  { src: 'rough-lumber-cabin-exLeft.jpg', alt: 'Rough Lumber Cabin for Sale, left side' },
  { src: 'rough-lumber-cabin-exRight.jpg', alt: 'Rough Lumber Cabin for Sale, right side' },
  { src: 'rough-lumber-cabin-interior.jpg', alt: 'Rough Lumber Cabin for Sale, interior' },
  { src: 'rough-lumber-cabin-interiorleft.jpg', alt: 'Rough Lumber Cabin for Sale, interior left' },
];

const item = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } };

function Check() {
  return (
    <svg className="mt-0.5 h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="var(--accent)" />
      <motion.path
        d="M5.5 10.5l3 3 6-6.5"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 0.5, ease: EASE, delay: 0.2 } } }}
      />
    </svg>
  );
}

/** Top-down floor plan: 32 ft × 16 ft cabin plus an 8 ft porch on the gable end, drawn in on scroll. */
function FloorPlan() {
  const draw = delay => ({ hidden: { pathLength: 0, opacity: 0 }, show: { pathLength: 1, opacity: 1, transition: { duration: 1.4, ease: EASE_OUT_EXPO, delay } } });
  const fade = delay => ({ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, delay } } });
  // 1 ft = 10 units; cabin 320×160, porch 80×160
  return (
    <motion.svg
      viewBox="-50 -45 470 225"
      className="w-full"
      role="img"
      aria-label="Floor plan: 16 feet wide by 32 feet long, with an 8 foot covered porch"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.rect x="0" y="0" width="320" height="160" rx="4" fill="color-mix(in oklab, var(--accent) 12%, transparent)" stroke="var(--accent)" strokeWidth="3" variants={draw(0)} />
      <motion.rect x="320" y="0" width="80" height="160" rx="4" fill="none" stroke="var(--ink)" strokeOpacity=".5" strokeWidth="2" strokeDasharray="6 6" variants={draw(0.5)} />
      {/* deck boards */}
      {[20, 40, 60].map((x, i) => (
        <motion.line key={x} x1={320 + x} y1="8" x2={320 + x} y2="152" stroke="var(--ink)" strokeOpacity=".18" strokeWidth="1.5" variants={draw(0.8 + i * 0.1)} />
      ))}
      {/* dimension lines */}
      <motion.path d="M0 -18 H320 M0 -24 V-12 M320 -24 V-12" stroke="var(--ink)" strokeOpacity=".6" strokeWidth="1.5" fill="none" variants={draw(0.9)} />
      <motion.path d="M-14 0 V160 M-20 0 H-8 M-20 160 H-8" stroke="var(--ink)" strokeOpacity=".6" strokeWidth="1.5" fill="none" variants={draw(1)} />
      <motion.text x="160" y="-26" textAnchor="middle" fill="var(--ink)" fontSize="14" fontWeight="700" variants={fade(1.2)}>32 ft</motion.text>
      <motion.text x="-28" y="84" textAnchor="middle" fill="var(--ink)" fontSize="14" fontWeight="700" transform="rotate(-90 -28 84)" variants={fade(1.3)}>16 ft</motion.text>
      <motion.text x="160" y="86" textAnchor="middle" fill="var(--accent)" fontSize="18" fontWeight="800" variants={fade(1.4)}>Cabin</motion.text>
      <motion.text x="360" y="80" textAnchor="middle" fill="var(--ink)" fontSize="13" fontWeight="700" variants={fade(1.5)}>Porch</motion.text>
      <motion.text x="360" y="98" textAnchor="middle" fill="var(--ink)" fillOpacity=".7" fontSize="12" variants={fade(1.6)}>8 ft</motion.text>
    </motion.svg>
  );
}

function Lightbox({ index, fromGallery, onClose, onStep }) {
  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onStep(1);
      if (e.key === 'ArrowLeft') onStep(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onStep]);

  const p = PHOTOS[index];
  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4"
      style={{ background: 'rgba(6,12,8,.86)', backdropFilter: 'blur(8px)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={p.alt}
    >
      {/* photos are 500px wide; shown up to 720px so they stay reasonably sharp */}
      <motion.img
        layoutId={fromGallery ? `cabin-${p.src}` : undefined}
        initial={fromGallery ? undefined : { scale: 0.9, opacity: 0 }}
        animate={fromGallery ? undefined : { scale: 1, opacity: 1 }}
        src={IMG + p.src}
        alt={p.alt}
        className="max-h-[80vh] w-full max-w-[720px] rounded-[22px] object-contain"
        onClick={e => e.stopPropagation()}
        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
      />
      <button type="button" onClick={e => { e.stopPropagation(); onStep(-1); }} className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-2xl text-white backdrop-blur hover:bg-white/25 sm:left-8" aria-label="Previous photo">‹</button>
      <button type="button" onClick={e => { e.stopPropagation(); onStep(1); }} className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-2xl text-white backdrop-blur hover:bg-white/25 sm:right-8" aria-label="Next photo">›</button>
      <button type="button" onClick={onClose} className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-xl text-white backdrop-blur hover:bg-white/25" aria-label="Close">✕</button>
      <p className="absolute bottom-5 left-0 right-0 text-center text-sm text-white/80">{index + 1} / {PHOTOS.length}</p>
    </motion.div>
  );
}

export default function RoughLumberCabin() {
  // which photo is open, and whether it was opened from the gallery (only those get the shared zoom transition)
  const [open, setOpen] = useState(null);
  const step = d => setOpen(o => ({ ...o, i: (o.i + d + PHOTOS.length) % PHOTOS.length }));

  return (
    <>
      <PageHero
        title="Rough Lumber Cabin"
        subtitle="A Canadian made rough lumber cabin built right here in the maritimes in Salisbury, New Brunswick."
        image={IMAGES.milling}
        position="30% 50%"
      />

      {/* Pitch */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:py-28">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.18 } } }}>
          <motion.p variants={item} className="display text-2xl font-bold leading-snug text-muted sm:text-3xl">Have a piece of land that needs a wooden camp, but no time or resources to build one?</motion.p>
          <motion.p variants={item} className="display mt-5 text-2xl font-bold leading-snug text-muted sm:text-3xl">Looking for something other than a log cabin?</motion.p>
          <motion.p variants={item} className="display mt-8 text-4xl font-extrabold leading-tight text-accent sm:text-5xl">You need a rough lumber cabin!</motion.p>
          <motion.p variants={item} className="mt-6 max-w-md text-lg leading-relaxed text-muted">A Canadian made rough lumber cabin built right here in the maritimes in Salisbury, New Brunswick.</motion.p>
        </motion.div>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="mx-auto w-full max-w-[540px]">
          <Tilt max={4}>
            <motion.button
              type="button"
              onClick={() => setOpen({ i: 0, fromGallery: false })}
              className="group relative block w-full overflow-hidden rounded-[28px] shadow-[0_40px_80px_-40px_rgba(0,0,0,.7)]"
              variants={{ hidden: { clipPath: 'inset(0% 0% 100% 0% round 28px)' }, show: { clipPath: 'inset(0% 0% 0% 0% round 28px)', transition: { duration: 1.2, ease: EASE_OUT_EXPO } } }}
              aria-label="View larger photo"
            >
              <img src={IMG + PHOTOS[0].src} alt={PHOTOS[0].alt} className="aspect-[500/369] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <motion.span
                className="absolute left-4 top-4 rounded-full bg-accent px-4 py-1.5 text-sm font-bold uppercase tracking-wider text-white shadow-lg"
                variants={{ hidden: { scale: 0, rotate: -20 }, show: { scale: 1, rotate: -4, transition: { type: 'spring', stiffness: 300, damping: 14, delay: 0.9 } } }}
              >
                For Sale
              </motion.span>
            </motion.button>
          </Tilt>
        </motion.div>
      </section>

      {/* Specs + price */}
      <section className="hero-bg">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:py-28">
          <div>
            <SplitText text="Maritime made rough lumber cabin:" className="display text-3xl font-bold leading-tight sm:text-4xl" />
            <motion.ul
              className="mt-8 space-y-3.5 text-lg"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
            >
              {FEATURES.map(f => (
                <motion.li key={f} variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } } }} className="flex gap-3">
                  <Check />
                  <span>{f}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <div className="flex flex-col gap-6">
            <Reveal className="glass-card rounded-[28px] p-6 sm:p-8">
              <FloorPlan />
            </Reveal>
            <Reveal delay={0.15} className="glass-card rounded-[28px] p-6 sm:p-8">
              <p className="display text-5xl font-extrabold text-[#E3A35E] sm:text-6xl">
                $<CountUp to={66560} format={v => Math.round(v).toLocaleString('en-CA')} />
                <span className="hero-sub ml-3 text-lg font-medium">plus HST</span>
              </p>
              <Magnetic strength={0.12} className="mt-6 w-full">
                <a href={PHONE.href} className="btn-accent flex w-full justify-center rounded-full px-6 py-4 text-lg font-semibold">Call {PHONE.label} for more details</a>
              </Magnetic>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <SplitText text="Rough Lumber Cabin for Sale" className="display text-4xl font-bold leading-tight sm:text-5xl" />
        <motion.div
          className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          {PHOTOS.map((p, i) => (
            <motion.button
              key={p.src}
              type="button"
              onClick={() => setOpen({ i, fromGallery: true })}
              variants={{ hidden: { opacity: 0, y: 40, scale: 0.95 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: EASE } } }}
              whileHover={{ y: -6 }}
              className={`group relative overflow-hidden rounded-[22px] ${i < 2 ? 'col-span-2 md:col-span-3' : i === 4 ? 'col-span-2 md:col-span-2' : 'col-span-1 md:col-span-2'}`}
              aria-label={`View larger: ${p.alt}`}
            >
              <motion.img layoutId={`cabin-${p.src}`} src={IMG + p.src} alt={p.alt} loading="lazy" className="aspect-[500/369] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
              <span className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-4 text-left text-sm font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Rough Lumber Cabin for Sale
              </span>
            </motion.button>
          ))}
        </motion.div>
      </section>

      <AnimatePresence>
        {open && <Lightbox index={open.i} fromGallery={open.fromGallery} onClose={() => setOpen(null)} onStep={step} />}
      </AnimatePresence>
    </>
  );
}
