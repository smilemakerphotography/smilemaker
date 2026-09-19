import { useEffect } from 'react';

// Shared behaviour for every popup/modal: lock page scroll while open,
// close on Escape, and optionally handle left/right arrow keys.
export default function useOverlay({ onClose, onPrev, onNext }) {
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft' && onPrev) onPrev();
      else if (e.key === 'ArrowRight' && onNext) onNext();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose, onPrev, onNext]);
}
