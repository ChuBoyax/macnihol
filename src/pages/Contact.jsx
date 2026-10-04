import { motion } from 'motion/react';
import { ADDRESS, PHONE, WEBSITE } from '../data';
import { useOpenStatus } from '../hooks/useOpenStatus';
import PageHero from '../components/PageHero';
import { HoursList, StatusDot } from '../components/Hours';
import { EASE, EASE_OUT_EXPO, Magnetic, Reveal, SplitText, Tilt } from '../components/motion';

const IMG = 'assets/images/contact/';

const CARD = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

function Icon({ d }) {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{ background: 'color-mix(in oklab, var(--accent) 16%, transparent)' }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
    </span>
  );
}
const ICONS = {
  user: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  phone: 'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z',
  pin: 'M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  globe: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z',
};

/** Photo that wipes open when scrolled into view (trigger on unclipped wrapper). */
function Photo({ src, alt, ratio, delay = 0, className = '' }) {
  return (
    <motion.div className={className} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
      <Tilt max={5}>
        <motion.figure
          className="group overflow-hidden rounded-[24px] shadow-[0_30px_60px_-35px_rgba(0,0,0,.7)]"
          variants={{ hidden: { clipPath: 'inset(0% 0% 100% 0% round 24px)' }, show: { clipPath: 'inset(0% 0% 0% 0% round 24px)', transition: { duration: 1.1, ease: EASE_OUT_EXPO, delay } } }}
        >
          <img src={IMG + src} alt={alt} loading="lazy" className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" style={{ aspectRatio: ratio }} />
        </motion.figure>
      </Tilt>
    </motion.div>
  );
}

export default function Contact() {
  const status = useOpenStatus();

  return (
    <>
      <PageHero
        title="Contact MacNichol Landscaping Supplies"
        subtitle="Serving Salisbury and Moncton New Brunswick and Surrounding Areas."
        image={IMG + 'macnichol-landscaping-supplies-salisbury.jpg'}
        position="50% 45%"
      />

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:gap-14 lg:py-28">
        {/* Photos */}
        <div className="relative mx-auto w-full max-w-[460px] pb-20 lg:col-span-5 lg:mx-0">
          <Photo src="landscaping-supplies-sign.jpg" alt="MacNichol Landscaping Supplies Sign" ratio="375/380" className="w-[78%]" />
          <div className="absolute bottom-0 right-0 w-[62%]">
            <div className="rounded-[28px] bg-bg p-1.5">
              <Photo src="macnichol-landscaping-supplies-salisbury.jpg" alt="MacNichol Landscaping Supplies Building in Salisbury" ratio="375/217" delay={0.25} />
            </div>
          </div>
        </div>

        {/* Details */}
        <motion.div
          className="grid content-start gap-5 sm:grid-cols-2 lg:col-span-7"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div variants={CARD} className="flex gap-4 rounded-[22px] border border-line bg-card p-6">
            <Icon d={ICONS.user} />
            <div>
              <p className="text-sm text-muted">Contact</p>
              <p className="display mt-1 text-xl font-bold">Randy MacNichol</p>
            </div>
          </motion.div>
          <motion.div variants={CARD} className="flex gap-4 rounded-[22px] border border-line bg-card p-6">
            <Icon d={ICONS.phone} />
            <div>
              <p className="text-sm text-muted">Phone</p>
              <a href={PHONE.href} className="display mt-1 block text-xl font-bold transition-colors hover:text-accent">{PHONE.label}</a>
            </div>
          </motion.div>

          <motion.div variants={CARD} className="hero-bg rounded-[22px] p-6 sm:col-span-2 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="display text-xl font-bold">Hours of Operation:</p>
              <p className="flex items-center gap-2 text-xs"><StatusDot status={status} />{status.text}</p>
            </div>
            <div className="mt-4 text-lg">
              <HoursList status={status} />
            </div>
          </motion.div>

          <motion.div variants={CARD} className="flex gap-4 rounded-[22px] border border-line bg-card p-6">
            <Icon d={ICONS.pin} />
            <div>
              <p className="text-sm text-muted">Address:</p>
              <address className="mt-1 font-semibold not-italic leading-relaxed">
                {ADDRESS.lines.map(l => <span key={l} className="block">{l}</span>)}
              </address>
            </div>
          </motion.div>
          <motion.div variants={CARD} className="flex gap-4 rounded-[22px] border border-line bg-card p-6">
            <Icon d={ICONS.globe} />
            <div className="min-w-0">
              <p className="text-sm text-muted">Website</p>
              <a href={`https://${WEBSITE}`} target="_blank" rel="noopener" className="text-link mt-1 inline-block break-all font-semibold">{WEBSITE}</a>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Map */}
      <section className="border-t border-line bg-card">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SplitText text="Get Directions" className="display text-4xl font-bold leading-tight sm:text-5xl" />
            <Reveal className="flex flex-wrap gap-3">
              <Magnetic>
                <a href={ADDRESS.directions} target="_blank" rel="noopener" className="btn-accent inline-flex rounded-full px-6 py-3.5 font-semibold">Get Directions</a>
              </Magnetic>
              <Magnetic>
                <a href={PHONE.href} className="inline-flex rounded-full border border-line px-6 py-3.5 font-semibold transition-colors hover:border-accent">Call Randy</a>
              </Magnetic>
            </Reveal>
          </div>

          <Reveal delay={0.1} y={50} className="relative mt-10 overflow-hidden rounded-[28px] border border-line shadow-[0_40px_80px_-40px_rgba(0,0,0,.6)]">
            <iframe
              title="Map to MacNichol Landscaping Supplies, 2856 NB-106, Boundary Creek"
              src={ADDRESS.embed}
              className="block h-[420px] w-full sm:h-[480px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
