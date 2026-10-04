import { motion } from 'motion/react';
import { IMAGES, MULCH_AMOUNTS } from '../data';
import PageHero from '../components/PageHero';
import { CountUp, EASE, EASE_OUT_EXPO, Reveal, SplitText, Tilt } from '../components/motion';

const GALLERY = [
  { src: IMAGES.woodchips, title: 'Natural Hemlock Woodchips' },
  { src: IMAGES.woodchipsBucket, title: 'Bucket Load of Hemlock Woodchips' },
  { src: IMAGES.woodchipsTruck, title: 'Truck Load of Hemlock Woodchips' },
];

const MAX_YARDS = Math.max(...MULCH_AMOUNTS.map(r => r.yards));

const ROW = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function DecorativeMulches() {
  return (
    <>
      <PageHero
        title="Decorative Mulches"
        subtitle="MacNichol Landscaping Supplies is located at 2856 Salisbury Road only minutes from Moncton. We carry Natural Hemlock Woodchips. Prices listed are for pickups."
        image={IMAGES.woodchips}
        position="50% 60%"
      />

      {/* Product */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:py-28">
        <div>
          <SplitText text="Hemlock Woodchips" className="display text-4xl font-bold leading-tight sm:text-5xl" />
          <Reveal delay={0.1} className="mt-8 rounded-3xl border border-line bg-card p-6 sm:p-8">
            <div className="flex items-center gap-4">
              <img src={IMAGES.woodchipsTexture} alt="Close-up of hemlock woodchips" className="h-16 w-24 shrink-0 rounded-xl object-cover" />
              <h3 className="display text-2xl font-bold">Natural Hemlock Woodchips</h3>
            </div>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Natural hemlock woodchips are popular for landscaping projects such as gardening, pathways, flower and garden boxes. Hemlock is naturally rot-resistant with no chemicals.
            </p>
            <div className="mt-7 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-line pt-6">
              <p className="display text-5xl font-extrabold text-accent">$<CountUp to={65} format={v => v.toFixed(2)} /></p>
              <p className="text-muted">per cubic yard plus HST</p>
            </div>
          </Reveal>
        </div>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          <Tilt max={4}>
            <motion.div
              className="overflow-hidden rounded-[28px] shadow-[0_40px_80px_-40px_rgba(0,0,0,.6)]"
              variants={{ hidden: { clipPath: 'inset(0% 0% 100% 0% round 28px)' }, show: { clipPath: 'inset(0% 0% 0% 0% round 28px)', transition: { duration: 1.2, ease: EASE_OUT_EXPO } } }}
            >
              <motion.img
                src={IMAGES.woodchips}
                alt="Natural hemlock woodchips with a tape measure for scale"
                className="aspect-[640/416] w-full object-cover"
                variants={{ hidden: { scale: 1.2 }, show: { scale: 1, transition: { duration: 1.6, ease: EASE_OUT_EXPO } } }}
              />
            </motion.div>
          </Tilt>
        </motion.div>
      </section>

      {/* Guidelines */}
      <section className="border-y border-line bg-card">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
          <SplitText text="Guidelines for using Mulch" className="display text-4xl font-bold leading-tight sm:text-5xl" />
          <motion.div
            className="mt-10 grid gap-5 md:grid-cols-2"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.div variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } }} className="flex gap-6 rounded-3xl border border-line bg-bg p-6 sm:p-8">
              {/* depth gauge: soil with a 2–4" mulch layer settling on top */}
              <div className="relative h-32 w-16 shrink-0 overflow-hidden rounded-xl bg-[#5a4330]" aria-hidden="true">
                <motion.div
                  className="absolute inset-x-0 top-0 origin-top"
                  style={{ height: '40%', background: `url(${IMAGES.woodchipsTexture}) center / cover` }}
                  variants={{ hidden: { scaleY: 0 }, show: { scaleY: 1, transition: { duration: 1, ease: EASE_OUT_EXPO, delay: 0.3 } } }}
                />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-accent">Depth</p>
                <p className="display mt-2 text-2xl font-bold">Recommended depth is 2 to 4 inches.</p>
              </div>
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } }} className="rounded-3xl border border-line bg-bg p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-accent">Spacing</p>
              <p className="mt-2 text-lg leading-relaxed">
                Mulch should be kept a few inches away from the base of any trees, bushes etc. If mulch is up against tree trunks it will encourage decay, disease and pests to form.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
        <motion.div
          className="grid gap-5 md:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        >
          {GALLERY.map(g => (
            <motion.figure
              key={g.title}
              variants={{ hidden: { opacity: 0, y: 50, scale: 0.96 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease: EASE } } }}
              whileHover={{ y: -6 }}
              className="group overflow-hidden rounded-[24px] border border-line bg-card"
            >
              <div className="overflow-hidden">
                <img src={g.src} alt={g.title} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
              </div>
              <figcaption className="display p-5 text-lg font-bold">{g.title}</figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </section>

      {/* How much mulch */}
      <section className="hero-bg">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-5">
            <SplitText text="How much Mulch will you need?" className="display text-4xl font-bold leading-tight sm:text-5xl" />
            <Reveal delay={0.1}>
              <p className="hero-sub mt-5 max-w-md text-lg leading-relaxed">Here are some suggested amounts depending on the depth of mulch you are looking for.</p>
            </Reveal>
            <Reveal delay={0.2} className="mt-8 space-y-4 text-sm leading-relaxed">
              <p className="glass-card rounded-2xl p-4">Length in feet <b>×</b> width in feet = area in square feet</p>
              <p className="glass-card rounded-2xl p-4">3 × 3 × 3 feet = 1 cubic yard or 27 cubic feet</p>
              <p className="glass-card rounded-2xl p-4">A full size half ton pickup truck with an 8ft box filled level with the rails will hold approximately 2.5 cubic yards.</p>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="lg:col-span-7">
            <div className="glass-card overflow-hidden rounded-[28px]">
              <table className="w-full text-left">
                <caption className="sr-only">Suggested mulch amounts</caption>
                <thead>
                  <tr className="hero-sub text-sm" style={{ borderBottom: '1px solid color-mix(in oklab, #EEF1EA 14%, transparent)' }}>
                    <th scope="col" className="px-5 py-4 font-medium sm:px-7">Area to Cover</th>
                    <th scope="col" className="px-5 py-4 font-medium">Depth of Mulch</th>
                    <th scope="col" className="px-5 py-4 font-medium sm:px-7">Cubic Yards Needed</th>
                  </tr>
                </thead>
                <motion.tbody
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.15 }}
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }}
                >
                  {MULCH_AMOUNTS.map(r => (
                    <motion.tr key={r.depth} variants={ROW} className="transition-colors hover:bg-white/5" style={{ borderBottom: '1px solid color-mix(in oklab, #EEF1EA 8%, transparent)' }}>
                      <td className="px-5 py-5 sm:px-7">{r.area}</td>
                      <td className="display px-5 py-5 text-2xl font-bold">{r.depth}</td>
                      <td className="px-5 py-5 sm:px-7">
                        <div className="flex items-center gap-3">
                          <span className="display w-12 text-2xl font-bold tabular-nums text-[#E3A35E]">{r.yards.toFixed(2)}</span>
                          <span className="hidden h-2 flex-1 overflow-hidden rounded-full bg-white/10 sm:block" aria-hidden="true">
                            <motion.span
                              className="block h-full rounded-full bg-accent"
                              variants={{ hidden: { width: 0 }, show: { width: `${(r.yards / MAX_YARDS) * 100}%`, transition: { duration: 1, ease: EASE_OUT_EXPO, delay: 0.3 } } }}
                            />
                          </span>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </motion.tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
