"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/** Small button that appears after scrolling and smooth-scrolls back to the top. */
export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={cnShow(show)}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}

// bottom-left so it never collides with the Call/WhatsApp corner buttons (bottom-right)
function cnShow(show: boolean) {
  return [
    "fixed bottom-6 left-5 z-40 flex h-12 w-12 items-center justify-center rounded-full",
    "bg-brand-800/90 text-white shadow-lg shadow-black/20 backdrop-blur transition-all duration-300",
    "hover:bg-brand-700 active:scale-95",
    show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
  ].join(" ");
}
