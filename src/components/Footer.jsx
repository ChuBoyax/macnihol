import { Link } from 'react-router';
import { PRODUCT_NAV, UTILITY_NAV } from '../data';

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <nav className="flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold uppercase tracking-wide" aria-label="Products">
          {PRODUCT_NAV.map(l => <Link key={l.to} to={l.to} className="transition-colors hover:text-accent">{l.label}</Link>)}
        </nav>
        <nav className="mt-4 flex flex-wrap gap-x-7 gap-y-3 text-sm text-muted" aria-label="Footer">
          {UTILITY_NAV.map(l => (
            <Link key={l.to} to={l.to} className="transition-colors hover:text-ink">
              {l.to === '/contact' ? 'Contact MacNichol Landscaping Supplies' : l.label}
            </Link>
          ))}
        </nav>
        <div className="mt-8 flex flex-col gap-2 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:justify-between">
          <p>© 2026 MacNichol Landscaping Supplies</p>
          <p>Site Design by Thorlynn Design Group Inc.</p>
        </div>
      </div>
    </footer>
  );
}
