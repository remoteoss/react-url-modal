import { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';

export const Portal = ({
  children,
  parent,
}: {
  children: JSX.Element;
  // defaults to body
  parent?: HTMLElement | null;
}) => {
  const el = useMemo(() => document.createElement('div'), []);

  useEffect(() => {
    const target = parent || document.body;
    target.appendChild(el);

    return () => {
      target.removeChild(el);
    };
  }, [el, parent]);

  return createPortal(children, el);
};
