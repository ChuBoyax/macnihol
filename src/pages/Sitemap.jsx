import { Link } from 'react-router';
import { motion } from 'motion/react';
import { PRODUCT_NAV, UTILITY_NAV } from '../data';
import PageHero from '../components/PageHero';
import { Arrow, EASE } from '../components/motion';

const GROUPS = [
  { title: 'Products', links: PRODUCT_NAV },
  { title: 'MacNichol Landscaping Supplies', links: UTILITY_NAV },
];

export default function Sitemap() {
  return (
    <>
      <PageHero title="Sitemap" />
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 md:grid-cols-2 lg:py-28">
        {GROUPS.map(g => (
          <motion.div
            key={g.title}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
          >
            <h2 className="display text-2xl font-bold">{g.title}</h2>
            <ul className="mt-5 border-t border-line">
              {g.links.map(l => (
                <motion.li key={l.to} variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } } }}>
                  <Link to={l.to} className="group flex items-center justify-between border-b border-line py-4 font-medium transition-colors hover:text-accent">
                    {l.label}
                    <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </section>
    </>
  );
}
