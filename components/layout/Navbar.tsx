"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { site } from "@/data/site";
import { waEnquiry, PHONE_TEL, PHONE_DISPLAY } from "@/lib/whatsapp";
import { buttonClasses } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        solid ? "bg-white/95 shadow-md backdrop-blur" : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <a href="#top" className="flex items-center gap-3" aria-label={site.fullName}>
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-300 to-gold-600 text-brand-950 shadow-md ring-1 ring-black/10">
            <Car className="h-6 w-6" strokeWidth={2.2} />
          </span>
          <span className="leading-tight">
            <span
              className={cn(
                "block font-display text-lg font-extrabold tracking-tight transition-colors",
                solid ? "text-brand-800" : "text-white",
              )}
            >
              Mr Adventure
            </span>
            <span
              className={cn(
                "block text-[0.65rem] font-semibold uppercase tracking-[0.2em] transition-colors",
                solid ? "text-gold-600" : "text-gold-300",
              )}
            >
              Tours &amp; Travels
            </span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 lg:flex">
          {site.nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={cn(
                  "text-sm font-semibold transition-colors hover:text-gold-500",
                  solid ? "text-brand-800" : "text-white/90",
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={PHONE_TEL ? `tel:${PHONE_TEL}` : "#contact"}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors",
              solid ? "text-brand-700 hover:bg-brand-100" : "text-white hover:bg-white/15",
            )}
            aria-label={`Call ${PHONE_DISPLAY}`}
          >
            <Phone className="h-5 w-5" />
          </a>
          <a href={waEnquiry("a booking")} target="_blank" rel="noopener noreferrer" className={buttonClasses("whatsapp", "md")}>
            <WhatsAppIcon className="h-5 w-5" />
            WhatsApp
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "inline-flex h-11 w-11 items-center justify-center rounded-full lg:hidden",
            solid ? "text-brand-800 hover:bg-brand-100" : "text-white hover:bg-white/15",
          )}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-brand-100 bg-white lg:hidden"
          >
            <ul className="flex flex-col px-4 py-3">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-3 text-base font-semibold text-brand-900 hover:bg-brand-50"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="mt-2 flex gap-2">
                <a
                  href={waEnquiry("a booking")}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className={buttonClasses("whatsapp", "md", "flex-1")}
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  WhatsApp
                </a>
                <a
                  href={`tel:${PHONE_TEL}`}
                  className={buttonClasses("outline", "md", "flex-1 !border-brand-200 !text-brand-800 hover:!bg-brand-700 hover:!text-white")}
                >
                  <Phone className="h-5 w-5" />
                  Call
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
