import { Link } from 'react-router';
import PageHero from '../components/PageHero';

export default function NotFound() {
  return (
    <>
      <PageHero title="Page not found" subtitle="That page doesn't exist." />
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <Link to="/" className="btn-accent inline-flex rounded-full px-6 py-3.5 font-semibold">Back to Home</Link>
      </section>
    </>
  );
}
