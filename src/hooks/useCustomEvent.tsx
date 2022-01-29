import { useEffect } from 'react';

export function useCustomEvent(
  eventName: string,
  listener: ((event: CustomEvent) => void) | ((event: Event) => void)
) {
  useEffect(() => {
    window.addEventListener(eventName, listener as (event: Event) => void);

    return () => {
      window.removeEventListener(eventName, listener as (event: Event) => void);
    };
  }, [eventName, listener]);
}
