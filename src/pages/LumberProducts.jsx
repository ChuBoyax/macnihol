import { useRef } from 'react';
import { Link } from 'react-router';
import { motion, useScroll, useSpring } from 'motion/react';
import { IMAGES, PHONE } from '../data';
import PageHero from '../components/PageHero';
import { EASE, EASE_OUT_EXPO, Magnetic, Reveal, SplitText, Tilt } from '../components/motion';

const IMG = 'assets/images/lumberproducts/';

const JUMP_LINKS = [
  { id: 'lumber-pricing', label: 'Lumber pricing' },
  { id: 'wooden-stakes', label: 'Wooden stakes' },
  { id: 'garden-boxes', label: 'Garden boxes' },
  { id: 'rig-mats', label: 'Rig mats' },
  { id: 'laser-signs', label: 'Laser signs' },
  { id: 'firewood', label: 'Firewood & more' },
  { id: 'milling', label: 'Our milling operation' },
];

const LUMBER_SIZES = [
  { group: 'Boards', sizes: ['1 x 3', '1 x 4', '1 x 6', '1 x 8', '1 x 10', '1 x 12'] },
  { group: 'Dimensional', sizes: ['2 x 4', '2 x 6', '2 x 8', '2 x 10', '2 x 12'] },
  { group: 'Posts & timber', sizes: ['4 x 4', '6 x 6', '8 x 8'] },
];

const STAKES = [
  { name: 'Survey Stakes', size: '1 x 2 x 30 inches', bundle: 'Bundles of 50', price: '$37.50' },
  { name: 'Snow Stakes', size: '1 x 2 x 48 inches', bundle: 'Bundles of 50', price: '$62.50' },
  { name: 'Snow Stakes', size: '1 x 2 x 60 inches', bundle: 'Bundles of 50', price: '$87.50' },
  { name: 'Landscape/Snow Stakes', size: '2 x 2 x 60 inches', bundle: 'Bundles of 25', price: '$56.25' },
];

const MORE = [
  {
    id: 'firewood-bundles', label: 'Firewood Bundles', title: 'Firewood Bundles', image: 'firewood-bundles.jpg',
    prices: [{ amount: '$10.00', unit: 'each plus HST' }, { or: true }, { amount: '3 for $25.00', unit: 'plus HST' }],
  },
  {
    id: 'firewood-cord', label: 'Firewood', title: 'Firewood', image: 'firewood-half-cord.jpg',
    prices: [{ amount: '$90.00', unit: 'per 1/2 cord plus HST' }],
  },
  {
    id: 'slab-wood', label: 'Slab Wood Bundles', title: 'Slab Wood Bundles', image: 'slabwood-bundles-firewood.jpg',
    text: 'Slab wood bundles are approximately 48" x 36" and 8 feet long. A trailer is recommended for pickup of slab wood bundles as they are wider than most truck boxes therefore could cause damage to your truck box.',
    prices: [{ amount: '$50.00', unit: 'per bundle plus HST' }],
  },
  {
    id: 'sawdust', label: 'Tote Bag of Sawdust', title: 'Sawdust', image: 'tote-bag-of-sawdust.jpg', image2: 'tote-bag-of-sawdust-2.jpg',
    text: 'Tote Bag of Sawdust',
    prices: [{ amount: '$40.00', unit: 'each plus HST' }],
  },
  {
    id: 'live-edge', label: 'Live Edge Hemlock Lumber Moncton', title: 'Live Edge Lumber - available upon request', image: 'live-edge-hemlock-Moncton.jpg', image2: 'live-edge-hemlock-lumber.jpg',
    prices: [{ call: 'Call for pricing.' }],
  },
];

const MILLING = [
  { step: 'Milling Step 1', text: 'First step in the milling process is receiving the hemlock logs.', image: 'milling-operation-1.jpg' },
  { step: 'Milling Step 2', text: 'Second step in the milling process is to take a log to the mill.', image: 'milling-operation-2.jpg' },
  { step: 'Milling Step 3', text: 'Third step is to carefully mill the log.', image: 'milling-operation-3.jpg' },
  { step: 'Finished Product', text: 'Here is a finished milled lumber product.', image: 'milling-operation-4.jpg' },
];

/* ---------- building blocks ---------- */

/** Photo that wipes open when scrolled into view and zooms on hover. Photos are ~350px, so callers keep them small. */
function Photo({ src, alt, className = '', ratio = '4/3', delay = 0 }) {
  // The in-view trigger sits on an unclipped wrapper; a fully clipped element never registers as visible
  return (
    <motion.div className={className} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}>
      <motion.figure
        className="group overflow-hidden rounded-[22px] shadow-[0_30px_60px_-35px_rgba(0,0,0,.7)]"
        variants={{
          hidden: { clipPath: 'inset(0% 0% 100% 0% round 22px)' },
          show: { clipPath: 'inset(0% 0% 0% 0% round 22px)', transition: { duration: 1.1, ease: EASE_OUT_EXPO, delay } },
        }}
      >
        <img src={IMG + src} alt={alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" style={{ aspectRatio: ratio }} />
      </motion.figure>
    </motion.div>
  );
}

/** One or two photos; two are laid out as an overlapping collage. */
function Collage({ images }) {
  if (images.length === 1) {
    return <div className="mx-auto w-full max-w-[380px]"><Photo src={images[0].src} alt={images[0].alt} ratio={images[0].ratio} /></div>;
  }
  return (
    <div className="relative mx-auto w-full max-w-[460px] pb-16 sm:pb-24">
      <Tilt max={4} className="w-[78%]">
        <Photo src={images[0].src} alt={images[0].alt} ratio={images[0].ratio} />
      </Tilt>
      <Tilt max={6} className="absolute bottom-0 right-0 w-[55%]">
        <div className="rounded-[26px] bg-bg p-1.5">
          <Photo src={images[1].src} alt={images[1].alt} ratio={images[1].ratio} delay={0.25} />
        </div>
      </Tilt>
    </div>
  );
}

function Price({ amount, unit }) {
  return (
    <p className="flex flex-wrap items-baseline gap-x-2">
      <span className="display text-3xl font-extrabold text-accent">{amount}</span>
      <span className="text-sm text-muted">{unit}</span>
    </p>
  );
}

function Label({ children }) {
  return <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">{children}</p>;
}

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };

/** Alternating photo/text row for the larger products. */
function ProductRow({ id, images, flip, children }) {
  return (
    <section id={id} className="border-t border-line">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div className={flip ? 'lg:order-2' : ''}><Collage images={images} /></div>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="space-y-4 text-lg leading-relaxed text-muted">
          {children}
        </motion.div>
      </div>
    </section>
  );
}

const Title = ({ children }) => <motion.h2 variants={item} className="display text-3xl font-bold leading-tight text-ink sm:text-4xl">{children}</motion.h2>;
const P = ({ children, className = '' }) => <motion.p variants={item} className={className}>{children}</motion.p>;
const ContactLink = ({ children }) => <Link to="/contact" className="text-link">{children}</Link>;

/* ---------- page ---------- */

export default function LumberProducts() {
  const millRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: millRef, offset: ['start 85%', 'end 60%'] });
  const millLine = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });

  return (
    <>
      <PageHero
        title="Lumber Products"
        subtitle="We are milling Hemlock lumber and timber products right here in Salisbury, New Brunswick, minutes from Moncton. We also have live edge hemlock!"
        image={IMAGES.milling}
        position="60% 55%"
      />

      {/* Intro */}
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div>
          <Reveal>
            <p className="text-xl leading-relaxed">See below for our price lists and some photos of our milling process.</p>
            <p className="mt-2 text-xl font-semibold text-accent">All prices listed are for pickups.</p>
          </Reveal>

          <Reveal delay={0.1} className="relative mt-8 overflow-hidden rounded-[28px] p-7 sm:p-8" style={{ background: 'color-mix(in oklab, var(--accent) 16%, var(--bg))', border: '1px solid color-mix(in oklab, var(--accent) 40%, transparent)' }}>
            <motion.div
              aria-hidden="true"
              className="absolute -right-16 -top-16 h-56 w-56 rounded-full"
              style={{ background: 'radial-gradient(circle, color-mix(in oklab, var(--accent) 45%, transparent), transparent 65%)' }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <p className="display relative text-2xl font-bold sm:text-3xl">Warmer Weather = Building Season!</p>
            <p className="relative mt-3 leading-relaxed text-muted">Milled hemlock lumber and timber must be ordered well in advance. What do you need?</p>
            <p className="relative mt-2 font-semibold">Don't Delay....Order Today!!</p>
            <Magnetic className="relative mt-6">
              <a href={PHONE.href} className="btn-accent inline-flex rounded-full px-6 py-3 font-semibold">Call {PHONE.label}</a>
            </Magnetic>
          </Reveal>

          <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-2" aria-label="Jump to">
            {JUMP_LINKS.map(l => (
              <a key={l.id} href={`#${l.id}`} className="chip rounded-full px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent">{l.label}</a>
            ))}
          </Reveal>
        </div>

        <div className="space-y-5">
          {[
            { src: 'custom-milling-hemlock.jpg', alt: 'Custom Milling Hemlock Moncton', ratio: '400/174' },
            { src: 'moncton-hemlock-timber-24feet.jpg', alt: 'Moncton Hemlock Timber', ratio: '400/172' },
          ].map((p, i) => (
            <Tilt key={p.src} max={3} className="mx-auto max-w-[520px]">
              <Photo src={p.src} alt={p.alt} ratio={p.ratio} delay={i * 0.15} />
              <p className="mt-2 text-sm text-muted">{p.alt}</p>
            </Tilt>
          ))}
        </div>
      </section>

      {/* Lumber pricing */}
      <section id="lumber-pricing" className="hero-bg">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <SplitText text="Lumber Pricing" className="display text-4xl font-bold sm:text-5xl" />
            <Reveal><p className="hero-sub">HST must be added to prices.</p></Reveal>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            <Reveal delay={0.1} className="glass-card rounded-[28px] p-6 sm:p-8 lg:col-span-8">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="display text-2xl font-bold">ROUGH HEMLOCK LUMBER</h3>
                <p className="font-semibold text-[#E3A35E]">Call for pricing.</p>
              </div>
              <div className="mt-6 space-y-5">
                {LUMBER_SIZES.map(g => (
                  <div key={g.group}>
                    <p className="hero-sub mb-2 text-sm">{g.group}</p>
                    <motion.div
                      className="flex flex-wrap gap-2 text-sm font-semibold"
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, amount: 0.6 }}
                      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
                    >
                      {g.sizes.map(s => (
                        <motion.span
                          key={s}
                          variants={{ hidden: { opacity: 0, scale: 0.6, y: 10 }, show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 320, damping: 18 } } }}
                          whileHover={{ y: -3, scale: 1.06 }}
                          className="cursor-default rounded-full px-4 py-2"
                          style={{ border: '1px solid color-mix(in oklab, #EEF1EA 22%, transparent)' }}
                        >
                          {s}
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>
                ))}
              </div>
              <div className="mt-7 grid gap-3 border-t pt-6 text-sm sm:grid-cols-2" style={{ borderColor: 'color-mix(in oklab, #EEF1EA 16%, transparent)' }}>
                <p className="rounded-2xl p-4" style={{ background: 'color-mix(in oklab, var(--accent) 22%, transparent)' }}>
                  <span className="font-semibold text-[#E3A35E]">* 24' length beams available</span>, call for pricing and stock availability. Special pricing applies.
                </p>
                <p className="rounded-2xl p-4" style={{ background: 'color-mix(in oklab, #EEF1EA 8%, transparent)' }}>
                  <span className="font-semibold">10 x 10</span> (Call for availability.)
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-2 gap-4 lg:col-span-4 lg:grid-cols-1">
              <div><Photo src="hemlock-logs.jpg" alt="Hemlock logs" ratio="350/210" /><p className="hero-sub mt-2 text-sm">Hemlock logs</p></div>
              <div><Photo src="rough-hemlock-lumber-loading.jpg" alt="Hemlock lumber loaded on a pickup" ratio="350/210" delay={0.15} /><p className="hero-sub mt-2 text-sm">Hemlock Lumber</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* Wooden stakes */}
      <ProductRow id="wooden-stakes" images={[{ src: 'wooden-stakes-driveway-markers.jpg', alt: 'Hemlock wooden stakes', ratio: '350/452' }]}>
        <motion.div variants={item}><Label>Wooden Stakes</Label></motion.div>
        <Title>Hemlock Wooden Stakes</Title>
        <P>Pointed hemlock wooden stakes are ideal for various garden and landscaping applications such as vined vegetables and flowers, driveway markers, and snow and survey stakes.</P>
        <P className="font-semibold text-ink">Sharpened hemlock wooden stakes are offered in three sizes:</P>
        <motion.div variants={item} className="overflow-hidden rounded-3xl border border-line bg-card text-base">
          {STAKES.map((s, i) => (
            <div key={s.size} className={`group flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-[color-mix(in_oklab,var(--accent)_8%,transparent)] ${i ? 'border-t border-line' : ''}`}>
              <div>
                <p className="font-semibold text-ink">{s.name} <span className="font-normal text-muted">({s.size})</span></p>
                <p className="text-sm text-muted">{s.bundle}</p>
              </div>
              <p className="shrink-0 text-right">
                <span className="display text-xl font-bold text-ink transition-colors group-hover:text-accent">{s.price}</span>
                <span className="block text-xs text-muted">each plus HST</span>
              </p>
            </div>
          ))}
        </motion.div>
      </ProductRow>

      {/* Garden boxes */}
      <ProductRow
        id="garden-boxes"
        flip
        images={[
          { src: 'raised-garden-planter-box.jpg', alt: 'Raised Hemlock Garden Planter Box', ratio: '350/263' },
          { src: 'raised-garden-boxes-display.jpg', alt: 'Raised hemlock garden boxes on display', ratio: '350/303' },
        ]}
      >
        <motion.div variants={item}><Label>Raised Hemlock Garden Boxes</Label></motion.div>
        <Title>Rough Hemlock Raised Garden Boxes and Planters</Title>
        <P>Elevated planters are great for growing flowers, herbs, vegetables, and many other plants.</P>
        <P>The benefits of a raised garden bed are more than simply aesthetics. An elevated garden is less subject to weeds as well as some insects and pests.</P>
        <P>Raised garden boxes have a convenient height which eliminates the need to kneel and bend while planting, pruning, weeding and harvesting.</P>
        <motion.div variants={item} className="rounded-3xl border border-line bg-card p-6">
          <p className="display text-xl font-bold text-ink">Our Most Popular Raised Garden Box</p>
          <p className="mt-2 text-base">Measuring 32 inches tall (ground level to top of the rail), 36 inches wide, 72 inches long, and 12 inches deep (for soil depth).</p>
          <div className="mt-4"><Price amount="$250.00" unit="each plus HST (3 feet x 6 feet x 32 inches)" /></div>
          <p className="mt-3 text-base">Various sizes available, <ContactLink>contact us for details</ContactLink>.</p>
        </motion.div>
      </ProductRow>

      {/* Rig mats */}
      <ProductRow
        id="rig-mats"
        images={[
          { src: 'hemlock-rig-mats.jpg', alt: 'Hemlock Rigging Mats', ratio: '350/287' },
          { src: 'hemlock-rig-matting.jpg', alt: 'Hemlock Rig Matting being lifted', ratio: '350/337' },
        ]}
      >
        <motion.div variants={item}><Label>Hemlock Rigging Mats</Label></motion.div>
        <Title>Rough Hemlock Rig Mats</Title>
        <P>Rig mats, also known as rigging mats, are portable, heavy-duty platforms.</P>
        <P>Our Canadian made ground protection rig mats are common for crane matting and working in wet areas.</P>
        <P>Rig mats are designed to protect grass, turf, and other soft ground while supporting heavy equipment. Rig mats provide a flat and firm surface that allows crews, vehicles, and heavy machinery to safely move throughout any job site while also reducing environmental impact.</P>
        <motion.div variants={item} className="flex flex-wrap gap-3 text-base">
          <span className="chip rounded-full px-4 py-2 text-ink">Constructed of 6 x 6 rough hemlock and threaded rod</span>
          <span className="chip rounded-full px-4 py-2 text-ink">5 feet wide x 6 feet long</span>
        </motion.div>
        <P className="font-semibold text-ink"><ContactLink>Contact us for pricing and availability.</ContactLink></P>
      </ProductRow>

      {/* Laser signs */}
      <ProductRow
        id="laser-signs"
        flip
        images={[
          { src: 'hemlock-wooden-laser-signs.jpg', alt: 'Custom Hemlock Wooden Laser Signs', ratio: '350/227' },
          { src: 'custom-wooden-laser-sign.jpg', alt: 'Custom Laser-Cut Wooden Sign', ratio: '350/265' },
        ]}
      >
        <motion.div variants={item}><Label>Custom Laser-Cut Wooden Sign</Label></motion.div>
        <Title>Custom Laser-Cut Hemlock Wooden Signs</Title>
        <P>Custom laser-cut signs are a perfect way to showcase your business name and brand. Our signs are ideal for businesses or for adding decor to your home or any space you wish!</P>
        <P>Wooden name signs are also great for showcasing your family name for cottages, campers, and even for special awards and gifts.</P>
        <P>There are so many uses for custom wooden signs. Let us know how we can help you with your next project.</P>
        <P>Our custom hemlock wooden signs are made locally here in Salisbury, New Brunswick, Canada.</P>
        <P className="font-semibold text-ink"><ContactLink>Contact us for details.</ContactLink></P>
      </ProductRow>

      {/* Firewood, slab wood, sawdust, live edge */}
      <section id="firewood" className="border-t border-line bg-card">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
          <SplitText text="Firewood, Slab Wood, Sawdust & Live Edge" className="display max-w-3xl text-4xl font-bold leading-tight sm:text-5xl" />
          <motion.div
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          >
            {MORE.map(m => (
              <motion.article
                key={m.id}
                variants={{ hidden: { opacity: 0, y: 40, scale: 0.96 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: EASE } } }}
                whileHover={{ y: -6 }}
                className="group flex flex-col overflow-hidden rounded-[24px] border border-line bg-bg"
              >
                <div className={`grid overflow-hidden ${m.image2 ? 'grid-cols-2 gap-1' : ''}`}>
                  {[m.image, m.image2].filter(Boolean).map(src => (
                    <div key={src} className="overflow-hidden">
                      <img src={IMG + src} alt={m.label} loading="lazy" className="aspect-[4/3] h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
                    </div>
                  ))}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <Label>{m.label}</Label>
                  <h3 className="display mt-2 text-xl font-bold leading-snug">{m.title}</h3>
                  {m.text && <p className="mt-2 text-sm leading-relaxed text-muted">{m.text}</p>}
                  <div className="mt-auto space-y-1 pt-5">
                    {m.prices.map((p, i) =>
                      p.or ? <p key={i} className="text-xs font-semibold uppercase tracking-widest text-muted">or</p>
                        : p.call ? <a key={i} href={PHONE.href} className="display text-xl font-bold text-accent">{p.call}</a>
                          : <Price key={i} amount={p.amount} unit={p.unit} />,
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Milling operation */}
      <section id="milling" className="border-t border-line">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <SplitText text="Our Milling Operation" className="display text-4xl font-bold leading-tight sm:text-5xl" />
          <div ref={millRef} className="relative mt-12">
            {/* line through the step numbers draws itself as you scroll */}
            <div aria-hidden="true" className="absolute left-0 right-0 top-5 hidden h-0.5 bg-line lg:block">
              <motion.div className="h-full origin-left bg-accent" style={{ scaleX: millLine }} />
            </div>
            <motion.ol
              className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
            >
              {MILLING.map((m, i) => (
                <motion.li key={m.step} variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } }}>
                  <span className="display relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-lg font-bold text-white ring-8 ring-bg">{i < 3 ? i + 1 : '✓'}</span>
                  <Tilt max={5} className="mt-5">
                    <div className="group overflow-hidden rounded-[22px]">
                      <img src={IMG + m.image} alt={m.step} loading="lazy" className="aspect-[350/261] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
                    </div>
                  </Tilt>
                  <p className="display mt-4 text-lg font-bold">{m.step}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{m.text}</p>
                </motion.li>
              ))}
            </motion.ol>
          </div>
        </div>
      </section>
    </>
  );
}
