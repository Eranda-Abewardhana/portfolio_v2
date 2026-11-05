"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const links = [
  { label: "Work", id: "work" },
  { label: "About", id: "about" },
  { label: "Expertise", id: "expertise" },
  { label: "Experience", id: "experience" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -65% 0px" },
    );
    links.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`p-nav ${scrolled ? "is-scrolled" : ""}`}>
      <a
        className="p-brand"
        href="#home"
        aria-label="Eranda Sathsara, back to top"
      >
        <span className="p-monogram">
          e<span>.</span>
        </span>
        <span>
          ERANDA
          <br />
          SATHSARA<span className="p-copper">.</span>
        </span>
      </a>
      <nav className="p-desktop-nav" aria-label="Main navigation">
        {links.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            aria-current={active === link.id ? "location" : undefined}
          >
            {link.label}
            <span className="p-nav-dot" />
          </a>
        ))}
      </nav>
      <a href="#contact" className="p-nav-contact">
        Let’s talk <ArrowUpRight size={16} />
      </a>
      <button
        ref={toggle}
        className="p-menu-toggle"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
      {open && (
        <nav
          id="mobile-navigation"
          className="p-mobile-nav"
          aria-label="Mobile navigation"
        >
          {[
            ...links,
            { label: "Research", id: "research" },
            { label: "Contact", id: "contact" },
          ].map((link, index) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setOpen(false)}
            >
              <span>0{index + 1}</span>
              {link.label}
              <ArrowUpRight size={22} />
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
