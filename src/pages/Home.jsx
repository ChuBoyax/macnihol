import { Link } from 'react-router';
import { motion } from 'motion/react';
import { IMAGES } from '../data';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import Intro from '../components/Intro';
import { Arrow, EASE, SplitText, Tilt } from '../components/motion';

const GALLERY = [
  { src: IMAGES.gardenBoxes, title: 'Raised Hemlock Garden Boxes', note: 'Check out the Lumber Products page for details!', span: 'md:col-span-2' },
  { src: IMAGES.sign, title: 'Custom Hemlock Wooden Laser Sign', span: 'md:col-span-2' },
  { src: IMAGES.stakes, title: 'Hemlock Wooden Stakes', span: 'md:col-span-2' },
];

const CARD = {
  hidden: { opacity: 0, y: 50, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease: EASE } },
};

function GalleryCard({ item }) {
  return (
    <motion.div variants={CARD} className={item.span}>
      <Tilt max={4} className="h-full">
        <Link
          to="/lumber-products"
          className={`group relative isolate flex h-full flex-col justify-end overflow-hidden rounded-[24px] p-6 text-white sm:p-7 min-h-[300px] lg:min-h-[340px]`}
        >
          <img src={item.src} alt={item.title} loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 transition-opacity duration-500" style={{ background: 'linear-gradient(180deg, rgba(10,18,13,0) 35%, rgba(10,18,13,.85) 100%)' }} />
          <h3 className={`display font-bold leading-tight text-2xl`}>{item.title}</h3>
          {item.note && <p className="mt-2 text-white/85">{item.note}</p>}
          <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#E3A35E] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
            Lumber Products <Arrow />
          </span>
        </Link>
      </Tilt>
    </motion.div>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />

      <Intro />

      <section className="border-t border-line">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <SplitText text="Made in Salisbury, New Brunswick." className="display max-w-2xl text-4xl font-bold leading-tight sm:text-5xl" />
          <motion.div
            className="mt-12 grid gap-5 md:grid-cols-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          >
            {GALLERY.map(item => <GalleryCard key={item.title} item={item} />)}
          </motion.div>
        </div>
      </section>
    </>
  );
}
