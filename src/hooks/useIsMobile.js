import { useEffect, useState } from 'react';

const query = '(max-width: 600px)';

// True on phone-sized viewports; updates on resize/rotation.
export default function useIsMobile() {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  );
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);
  return matches;
}
