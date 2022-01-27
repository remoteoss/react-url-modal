import { useEffect } from 'react';

export default function useCustomEvent(
  eventName: string,
  listener: () => void
) {
  useEffect(() => {
    window.addEventListener(eventName, listener);

    return () => {
      window.removeEventListener(eventName, listener);
    };
  }, [eventName, listener]);
}
