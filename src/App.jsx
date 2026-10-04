import { useEffect, useRef } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router';
import { AnimatePresence, MotionConfig } from 'motion/react';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollTopButton from './components/ScrollTopButton';
import PageTransition from './components/PageTransition';
import Home from './pages/Home';
import DecorativeMulches from './pages/DecorativeMulches';
import SoilsAggregates from './pages/SoilsAggregates';
import LumberProducts from './pages/LumberProducts';
import RoughLumberCabin from './pages/RoughLumberCabin';
import Contact from './pages/Contact';
import Sitemap from './pages/Sitemap';
import NotFound from './pages/NotFound';

const ROUTES = [
  { path: '/', element: <Home />, title: 'MacNichol Landscaping Supplies — Milling Timber in Moncton Area' },
  { path: '/decorative-mulches', element: <DecorativeMulches />, title: 'Decorative Mulches' },
  { path: '/soils-aggregates', element: <SoilsAggregates />, title: 'Soils & Aggregates' },
  { path: '/lumber-products', element: <LumberProducts />, title: 'Lumber Products' },
  { path: '/rough-lumber-cabin', element: <RoughLumberCabin />, title: 'Rough Lumber Cabin' },
  { path: '/contact', element: <Contact />, title: 'Contact' },
  { path: '/sitemap', element: <Sitemap />, title: 'Sitemap' },
];

function AnimatedRoutes() {
  const location = useLocation();
  const firstLoad = useRef(true);

  useEffect(() => {
    const route = ROUTES.find(r => r.path === location.pathname);
    document.title = route?.path === '/' ? route.title : `${route?.title ?? 'Page not found'} | MacNichol Landscaping Supplies`;
    const t = setTimeout(() => { firstLoad.current = false; }, 0);
    return () => clearTimeout(t);
  }, [location.pathname]);

  const wrap = el => <PageTransition withCurtain={!firstLoad.current}>{el}</PageTransition>;

  return (
    <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo({ top: 0, behavior: 'instant' })}>
      <Routes location={location} key={location.pathname}>
        {ROUTES.map(r => <Route key={r.path} path={r.path} element={wrap(r.element)} />)}
        <Route path="*" element={wrap(<NotFound />)} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <Header />
        <main id="top">
          <AnimatedRoutes />
        </main>
        <Footer />
        <ScrollTopButton />
      </MotionConfig>
    </BrowserRouter>
  );
}
