"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/** "idle" is the server-rendered state: fully visible, nothing to animate. */
type Phase = "idle" | "hidden" | "shown";

/**
 * Fade-and-lift a block into view once, without ever trapping it invisible.
 *
 * The previous implementation used Framer's `whileInView` with `once: true`.
 * IntersectionObserver can miss an element that passes entirely through the
 * viewport between observer ticks — and with once-only semantics nothing ever
 * re-checks it, so a fast fling scroll (~5000px/s, an ordinary thumb flick)
 * left whole sections stuck at opacity:0 permanently. Measured on mobile: 53
 * elements lost at fling speed vs 11 at reading speed.
 *
 * This version fixes that three ways:
 *  1. The server renders `idle` — visible, untransformed. Crawlers, no-JS
 *     visitors and above-the-fold content never see opacity:0 at all.
 *  2. Only content still below the fold at mount gets armed for animation, so
 *     there's no visible flash on what's already on screen.
 *  3. A scroll-idle safety net force-shows anything at or above the fold, which
 *     catches whatever the observer dropped.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const done = useRef(false);
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");

  const show = useCallback(() => {
    if (done.current) return;
    done.current = true;
    setPhase("shown");
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;

    // Already on screen (or the viewport is tall enough to contain it, which is
    // how Googlebot renders) — leave it visible rather than flashing it out.
    if (el.getBoundingClientRect().top < window.innerHeight - 80) {
      show();
      return;
    }
    setPhase("hidden");

    const io = new IntersectionObserver(
      (entries) => entries.some((e) => e.isIntersecting) && show(),
      { rootMargin: "-80px 0px" },
    );
    io.observe(el);

    let t: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(t);
      t = setTimeout(() => {
        const b = ref.current?.getBoundingClientRect();
        if (b && b.top < window.innerHeight) show();
      }, 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduce, show]);

  const hidden = phase === "hidden";

  return (
    <motion.div
      ref={ref}
      className={className}
      // `initial={false}` keeps the first paint identical to the server output.
      initial={false}
      animate={hidden ? { opacity: 0, y } : { opacity: 1, y: 0 }}
      // Arming happens off-screen, so snap into the hidden state rather than
      // animating out — otherwise a fast scroller can catch the fade-out.
      transition={hidden ? { duration: 0 } : { duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
