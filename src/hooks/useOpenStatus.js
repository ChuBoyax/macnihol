import { useEffect, useState } from 'react';

const UNKNOWN = { known: false, isOpen: false, day: -1, text: 'Checking hours…' };

// Live open/closed status in Atlantic time
function compute() {
  let day, mins;
  try {
    const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Moncton', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' }).formatToParts(new Date());
    const get = t => parts.find(p => p.type === t).value;
    day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
    mins = parseInt(get('hour'), 10) * 60 + parseInt(get('minute'), 10);
  } catch {
    return UNKNOWN;
  }
  const close = day >= 1 && day <= 5 ? 16 * 60 + 30 : day === 6 ? 11 * 60 : null;
  const isOpen = close !== null && mins >= 8 * 60 && mins < close;
  const fmt = m => { const h = Math.floor(m / 60), mm = m % 60; return ((h + 11) % 12 + 1) + (mm ? ':' + String(mm).padStart(2, '0') : '') + (h < 12 ? ' AM' : ' PM'); };
  let text;
  if (isOpen) text = 'Open now · until ' + fmt(close);
  else if (close !== null && mins < 8 * 60) text = 'Closed · opens today at 8 AM';
  else text = 'Closed · opens ' + (day === 6 || day === 0 ? 'Monday' : 'tomorrow') + ' at 8 AM';
  return { known: true, isOpen, day, text };
}

export function useOpenStatus() {
  const [status, setStatus] = useState(compute);
  useEffect(() => {
    const id = setInterval(() => setStatus(compute()), 60000);
    return () => clearInterval(id);
  }, []);
  return status;
}
