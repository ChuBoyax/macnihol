import { useRef } from 'react';
import { Link } from 'react-router';
import { motion, useScroll, useTransform } from 'motion/react';
import { IMAGES } from '../data';
import { useOpenStatus } from '../hooks/useOpenStatus';
import { HoursList, StatusDot } from './Hours';
import { EASE, EASE_OUT_EXPO, Reveal, SplitText, Tilt } from './motion';

const TextLink = ({ to, children }) => <Link to={to} className="text-link">{children}</Link>;
const B = ({ children }) => <strong className="font-semibold text-ink">{children}</strong>;

const PARAGRAPHS = [
  <>We have a full range of quality <TextLink to="/soils-aggregates">landscaping supplies located just minutes from Moncton</TextLink>.</>,
  <>We are milling <B>Hemlock lumber and timber products</B>. Our milled 24 foot timber is perfect for building wooden bridges. View our <TextLink to="/lumber-products">Lumber Products</TextLink> page for more details.</>,
  <><B>Raised garden boxes</B> are a beautiful and convenient way to grow your plants. We also carry a variety of <B>hemlock wooden stakes, and rig mats</B>. Check out the lumber page for more details about our <TextLink to="/lumber-products">hemlock garden boxes, wooden stakes and rig mats</TextLink> made in Salisbury, New Brunswick, Canada.</>,
  <><B>Custom wooden signs are laser cut and engraved</B>. Go to the lumber products page for more details about our <TextLink to="/lumber-products">custom wooden laser cut signs</TextLink> made here in Salisbury, New Brunswick.</>,
];

/** Homepage intro: copy + hours on the left, the stakes photo on the right (same layout as the original site). */
export default function Intro() {
  const status = useOpenStatus();
  const photoRef = useRef(null);
  // Photo drifts gently inside its frame while the section scrolls by
  const { scrollYProgress } = useScroll({ target: photoRef, offset: ['start end', 'end start'] });
  const photoY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
      <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SplitText text="MacNichol Landscaping Supplies" className="display text-4xl font-bold leading-tight sm:text-5xl" />

          <motion.div
            className="mt-7 space-y-5 text-lg leading-relaxed text-muted"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } }}
          >
            {PARAGRAPHS.map((p, i) => (
              <motion.p key={i} variants={{ hidden: { opacity: 0, y: 24, filter: 'blur(6px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: EASE } } }}>
                {p}
              </motion.p>
            ))}
          </motion.div>

          <Reveal delay={0.2} className="mt-10 rounded-3xl border border-line bg-card p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="display text-2xl font-bold">Hours of Operation</h3>
              <p className="flex items-center gap-2 text-sm text-muted"><StatusDot status={status} />{status.text}</p>
            </div>
            <div className="mt-5 border-t border-line pt-5 text-lg">
              <HoursList status={status} />
            </div>
          </Reveal>
        </div>

        <motion.div className="lg:sticky lg:top-28" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          <Tilt max={4}>
            <motion.figure
              ref={photoRef}
              className="relative overflow-hidden rounded-[28px] shadow-[0_40px_80px_-40px_rgba(0,0,0,.6)]"
              variants={{ hidden: { clipPath: 'inset(0% 0% 100% 0% round 28px)' }, show: { clipPath: 'inset(0% 0% 0% 0% round 28px)', transition: { duration: 1.2, ease: EASE_OUT_EXPO } } }}
            >
              <motion.img
                src={IMAGES.snowStakes}
                alt="Pallets of hemlock snow and survey stakes in the yard"
                className="aspect-[4/3] w-full scale-[1.14] object-cover"
                style={{ y: photoY }}
              />
              <motion.figcaption
                className="absolute bottom-4 left-4 right-4 rounded-2xl px-4 py-3 text-sm font-semibold text-white backdrop-blur-md sm:bottom-5 sm:left-5 sm:right-auto"
                style={{ background: 'rgba(10,18,13,.55)', border: '1px solid rgba(255,255,255,.15)' }}
                variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay: 0.8 } } }}
              >
                Hemlock Snow and Survey Stakes in Moncton
              </motion.figcaption>
            </motion.figure>
          </Tilt>
        </motion.div>
      </div>
    </section>
  );
}
