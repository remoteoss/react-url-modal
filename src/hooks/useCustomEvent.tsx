import { useEffect } from 'react';

export default function useCustomEvent(
  eventName: string,
  listener: EventListenerOrEventListenerObject
) {
  useEffect(() => {
    window.addEventListener(eventName, listener);

    return () => {
      window.removeEventListener(eventName, listener);
    };
  }, [eventName, listener]);
}
