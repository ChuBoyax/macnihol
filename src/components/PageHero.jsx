import { Link } from 'react-router';
import { motion } from 'motion/react';
import { IMAGES } from '../data';
import { EASE, SplitText } from './motion';

/** Banner at the top of each inner page: photo + dark opacity, breadcrumb, title. */
export default function PageHero({ title, subtitle, image = IMAGES.milling, position = '50% 50%' }) {
  return (
    <section className="hero-bg relative isolate overflow-hidden">
      <motion.img
        src={image}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        style={{ objectPosition: position }}
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: EASE }}
      />
      <div aria-hidden="true" className="hero-shade absolute inset-0 -z-10" />
      <div className="mx-auto max-w-7xl px-5 pb-16 pt-14 sm:px-8 lg:pb-20 lg:pt-20">
        <motion.nav
          aria-label="Breadcrumb"
          className="hero-sub flex items-center gap-2 text-sm"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link to="/" className="transition-colors hover:text-white">Home</Link>
          <span aria-hidden="true">/</span>
          <span className="text-[#E3A35E]">{title}</span>
        </motion.nav>
        <SplitText text={title} as="h1" delay={0.25} className="display mt-4 max-w-3xl text-5xl font-extrabold leading-[0.95] sm:text-6xl lg:text-7xl" />
        {subtitle && (
          <motion.p
            className="hero-sub mt-6 max-w-xl text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
