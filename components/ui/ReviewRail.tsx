"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Horizontal review rail that auto-scrolls AND can be grabbed and scrolled by
 * hand — swipe on touch, click-drag on desktop, arrow buttons, or keyboard.
 *
 * The previous version was a pure CSS marquee (`transform: translateX(-50%)`)
 * inside `overflow: hidden`, so there was nothing to scroll: you could only
 * watch it go past. This uses a real scroll container and drives `scrollLeft`
 * from rAF instead, which means native touch/trackpad scrolling works for free
 * and manual control is always available.
 *
 * `children` is ONE copy of the card list. The loop needs two identical halves —
 * it wraps by subtracting half the scroll width — but duplicating them in the
 * server render put every review in the HTML twice, which an SEO audit reads as
 * duplicate content and which doubled the heaviest section on the page. So the
 * second half is cloned from the DOM after hydration instead: crawlers and the
 * no-JS render see each review exactly once, and the animation is unchanged.
 */
export function ReviewRail({ children, speed = 0.45 }: { children: ReactNode; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const originalsRef = useRef<HTMLDivElement>(null);
  const cloneRef = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const drag = useRef<{ active: boolean; startX: number; startScroll: number }>({
    active: false,
    startX: 0,
    startScroll: 0,
  });
  const [dragging, setDragging] = useState(false);

  /**
   * Keep scrollLeft inside the first copy so the loop never hits either end.
   *
   * `allowBackward` matters: browsers clamp scrollLeft at 0, so a rail sitting
   * at rest at the start is indistinguishable from one dragged past it. Wrapping
   * unconditionally therefore fires on the very first frame and slams the rail
   * to the halfway point before the user has touched anything. Auto-scroll only
   * ever moves forward, so it passes false; a drag passes true.
   */
  const wrap = useCallback((el: HTMLDivElement, allowBackward = false) => {
    const half = el.scrollWidth / 2;
    if (half <= 0) return;
    if (el.scrollLeft >= half) el.scrollLeft -= half;
    else if (allowBackward && el.scrollLeft <= 0) el.scrollLeft += half;
  }, []);

  /**
   * Build the duplicate half once, after hydration.
   *
   * It goes into its own container that React renders empty and never touches,
   * so imperatively filling it can't collide with reconciliation. aria-hidden
   * keeps screen readers from reading every review twice.
   */
  useEffect(() => {
    const originals = originalsRef.current;
    const clone = cloneRef.current;
    if (!originals || !clone || clone.childElementCount > 0) return;
    clone.innerHTML = originals.innerHTML;
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;

    /**
     * Sub-pixel position is tracked here rather than by doing
     * `el.scrollLeft += speed`. Browsers round the scrollLeft they hand back,
     * so incrementing the DOM property by less than 1px reads back as the
     * original value every frame and the rail never moves at all. Accumulate in
     * JS, assign the absolute value.
     */
    let pos = el.scrollLeft;

    const tick = () => {
      if (!paused.current && !drag.current.active && !reduced) {
        const half = el.scrollWidth / 2;
        if (half > 0) {
          pos += speed;
          if (pos >= half) pos -= half;
          el.scrollLeft = pos;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Manual wheel / trackpad / touch / drag: wrap, then resync the accumulator
    // so auto-scroll picks up from wherever the user left it instead of jumping.
    const onScroll = () => {
      if (drag.current.active) wrap(el, true);
      if (paused.current || drag.current.active) pos = el.scrollLeft;
    };
    el.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
    };
  }, [speed, wrap]);

  // Click-and-drag on desktop. Touch devices get this natively from overflow-x.
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return; // let the browser do native momentum
    const el = ref.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft };
    setDragging(true);
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !drag.current.active) return;
    el.scrollLeft = drag.current.startScroll - (e.clientX - drag.current.startX);
    wrap(el, true);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !drag.current.active) return;
    drag.current.active = false;
    setDragging(false);
    if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
  };

  const nudge = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 400), behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={ref}
        // Region + keyboard access: the rail is focusable and arrow keys scroll
        // it, so it isn't mouse-only.
        role="region"
        aria-label="Guest reviews from Google — scrollable"
        tabIndex={0}
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => (paused.current = false)}
        onFocus={() => (paused.current = true)}
        onBlur={() => (paused.current = false)}
        onTouchStart={() => (paused.current = true)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className={`no-scrollbar overflow-x-auto overscroll-x-contain focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] ${
          dragging ? "cursor-grabbing select-none" : "cursor-grab"
        }`}
      >
        <div className="flex w-max items-stretch gap-5 px-5">
          <div ref={originalsRef} className="flex items-stretch gap-5">
            {children}
          </div>
          {/* Filled from the effect above — React renders it empty and leaves
              it alone, so the cloned nodes are never reconciled away. */}
          <div ref={cloneRef} className="flex items-stretch gap-5" aria-hidden="true" />
        </div>
      </div>

      {/* Explicit controls — discoverable, and the only option for anyone who
          can't drag. Hidden on touch, where swiping is the obvious gesture. */}
      <div className="mt-6 hidden justify-center gap-3 sm:flex">
        {([-1, 1] as const).map((dir) => (
          <button
            key={dir}
            type="button"
            onClick={() => nudge(dir)}
            aria-label={dir === -1 ? "Previous reviews" : "Next reviews"}
            className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-brand-200 bg-white text-brand-700 transition-colors hover:border-brand-700 hover:bg-brand-700 hover:text-white"
          >
            {dir === -1 ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </button>
        ))}
      </div>

      <p className="mt-4 text-center text-xs font-medium text-ink/45 sm:hidden">← swipe to read more →</p>
    </div>
  );
}
