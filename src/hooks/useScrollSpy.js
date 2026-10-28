import { useEffect, useState } from 'react';

export function useScrollSpy(sectionIds) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '');

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    let observer = null;

    // Delay the observer so it doesn't block the initial paint
    const timer = setTimeout(() => {
      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          if (visible[0]) setActiveId(visible[0].target.id);
        },
        { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
      );

      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 1000); // 1 second delay after mount

    return () => {
      clearTimeout(timer);
      if (observer) {
        observer.disconnect();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds.join(',')]);

  return activeId;
}