import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { SOIL_SHOWCASE, SOILS } from '../data';
import PageHero from '../components/PageHero';
import { EASE, EASE_OUT_EXPO, Reveal, Tilt } from '../components/motion';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'soils', label: 'Soils' },
  { id: 'aggregates', label: 'Aggregates' },
];

function ProductCard({ p, index }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE, delay: index * 0.06 } }}
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
      whileHover={{ y: -6 }}
      className="group flex flex-col overflow-hidden rounded-[24px] border border-line bg-card sm:flex-row"
    >
      {/* photos are 250px wide, so they're kept near that size */}
      <div className="relative shrink-0 overflow-hidden sm:w-[250px]">
        <img src={p.image} alt={p.name} loading="lazy" className="aspect-[5/3] h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">{p.label}</p>
        <h3 className="display mt-2 text-xl font-bold leading-snug">{p.name}</h3>
        {p.note && <p className="mt-2 text-sm leading-relaxed text-muted">{p.note}</p>}
        <p className="mt-auto flex flex-wrap items-baseline gap-x-2 pt-4">
          <span className="display text-3xl font-extrabold transition-colors duration-300 group-hover:text-accent">${p.price}</span>
          <span className="text-sm text-muted">per cubic yard plus HST</span>
        </p>
      </div>
    </motion.article>
  );
}

function Showcase({ src, alt, title, children, delay }) {
  return (
    <motion.figure
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="h-full"
    >
      <Tilt max={4} className="h-full">
        <div className="flex h-full flex-col overflow-hidden rounded-[28px] border border-line bg-card sm:flex-row">
          <motion.div
            className="shrink-0 overflow-hidden sm:w-[300px]"
            variants={{ hidden: { clipPath: 'inset(0% 100% 0% 0%)' }, show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.1, ease: EASE_OUT_EXPO, delay } } }}
          >
            <motion.img
              src={src}
              alt={alt}
              loading="lazy"
              className="aspect-[300/211] h-full w-full object-cover"
              variants={{ hidden: { scale: 1.25 }, show: { scale: 1, transition: { duration: 1.4, ease: EASE_OUT_EXPO, delay } } }}
            />
          </motion.div>
          <figcaption className="flex flex-col justify-center p-6 sm:p-8">
            <motion.p
              className="display text-3xl font-bold"
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay: delay + 0.4 } } }}
            >
              {title}
            </motion.p>
            {children && (
              <motion.p
                className="mt-3 leading-relaxed text-muted"
                variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay: delay + 0.5 } } }}
              >
                {children}
              </motion.p>
            )}
          </figcaption>
        </div>
      </Tilt>
    </motion.figure>
  );
}

export default function SoilsAggregates() {
  const [filter, setFilter] = useState('all');
  const shown = SOILS.filter(p => filter === 'all' || p.group === filter);

  return (
    <>
      <PageHero title="Quality Soils & Aggregates" />

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
        <Reveal className="flex w-full gap-1 overflow-x-auto rounded-full border border-line p-1 sm:w-fit" role="group" aria-label="Filter products">
          {FILTERS.map(f => {
            const on = f.id === filter;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(f.id)}
                className={`relative isolate shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-300 ${on ? 'text-bg' : 'text-muted hover:text-ink'}`}
              >
                {on && <motion.span layoutId="soil-filter" className="absolute inset-0 -z-10 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                {f.label}
              </button>
            );
          })}
        </Reveal>

        <motion.div layout className="mt-8 grid gap-5 lg:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {shown.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
          </AnimatePresence>
        </motion.div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:py-24">
          <Showcase src={SOIL_SHOWCASE.load} alt="3 cubic yard load of crushed stone in a dump truck" title="3 Cubic Yards" delay={0}>
            This photo shows a 3 cubic yard load of 0"-3/4" inch crushed stone / gravel.
          </Showcase>
          <Showcase src={SOIL_SHOWCASE.blendedPile} alt="Pile of blended soil" title="Blended Soil" delay={0.15} />
        </div>
      </section>
    </>
  );
}
