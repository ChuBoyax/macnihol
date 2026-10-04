import { HOURS, HOURS_NOTE } from '../data';

export function StatusDot({ status }) {
  const color = !status.known ? '#9aa79f' : status.isOpen ? '#7FD39A' : '#E3A35E';
  return (
    <span className="relative inline-flex">
      {status.isOpen && <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70" style={{ background: color }} />}
      <span className="status-dot relative" style={{ background: color }} />
    </span>
  );
}

/** Hours of Operation list; today's row is highlighted. */
export function HoursList({ status, className = '' }) {
  return (
    <>
      <ul className={`space-y-2.5 ${className}`}>
        {HOURS.map(h => {
          const today = h.days.includes(status.day);
          return (
            <li key={h.label} className="flex justify-between gap-4" style={{ color: today ? '#E3A35E' : undefined }}>
              <span>{h.label}</span>
              <span className="font-semibold">{h.time}</span>
            </li>
          );
        })}
      </ul>
      <p className="mt-4 text-sm font-semibold tracking-wide" style={{ color: '#E3A35E' }}>{HOURS_NOTE}</p>
    </>
  );
}
