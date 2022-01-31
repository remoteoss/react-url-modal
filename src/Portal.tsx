import React, { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';

export default function Portal({
  children,
  parent,
}: {
  children: JSX.Element;
  parent?: HTMLElement | null;
}) {
  const el = useMemo(() => document.createElement('div'), []);
  useEffect(() => {
    const target = parent ? parent : document.body;
    target.appendChild(el);
    return () => {
      target.removeChild(el);
    };
  }, [el, parent]);
  return createPortal(children, el);
}
