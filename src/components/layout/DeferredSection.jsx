import { Suspense, useEffect, useRef, useState } from "react";

/**
 * Mounts a lazy section only when it approaches the viewport
 * (IntersectionObserver with a generous preload margin), so its JS
 * chunk is downloaded, parsed, and hydrated just-in-time.
 *
 * A reserved min-height prevents layout shift before mount, and a
 * hash-navigation fallback force-mounts the section if the user jumps
 * to its anchor before scrolling reaches it.
 */

function MountNotifier({ id }) {
  useEffect(() => {
    // Lets useActiveSection start observing this late-mounted section.
    window.dispatchEvent(new CustomEvent("section-mounted"));
    // If the user navigated here via anchor before the section existed,
    // finish the jump now that it does.
    if (window.location.hash === `#${id}`) {
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView();
      });
    }
  }, [id]);
  return null;
}

export default function DeferredSection({ id, component: Component, minHeight = "80vh" }) {
  const ref = useRef(null);
  const [show, setShow] = useState(
    () => typeof window !== "undefined" && window.location.hash === `#${id}`
  );

  useEffect(() => {
    if (show) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          observer.disconnect();
        }
      },
      // Start loading ~1.5 screens before the section is visible.
      { rootMargin: "1200px 0px" }
    );
    observer.observe(ref.current);

    const onHashChange = () => {
      if (window.location.hash === `#${id}`) setShow(true);
    };
    window.addEventListener("hashchange", onHashChange);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [show, id]);

  return (
    <div ref={ref} style={show ? undefined : { minHeight }}>
      {show && (
        <Suspense fallback={<div style={{ minHeight }} aria-hidden />}>
          <MountNotifier id={id} />
          <Component />
        </Suspense>
      )}
    </div>
  );
}
