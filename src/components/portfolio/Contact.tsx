"use client";

import { useState } from "react";
import { ArrowUpRight, ArrowUp, Check, Copy } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioProfile";

export default function Contact() {
  const [copyStatus, setCopyStatus] = useState("");
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopyStatus("Email address copied.");
    } catch {
      setCopyStatus("Copy this address: " + PERSONAL_INFO.email);
    }
  }
  return (
    <>
      <section
        id="contact"
        className="p-contact p-section"
        aria-labelledby="contact-heading"
      >
        <div className="p-wrap">
          <div className="p-contact-top">
            <div className="p-section-label">
              <span>06 /</span> THE NEXT CHAPTER
            </div>
            <span className="p-contact-availability p-micro">
              <i className="p-status-dot" /> OPEN TO OPPORTUNITIES
            </span>
          </div>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="p-contact-heading-link"
            aria-label="Email Eranda to build something that matters"
          >
            <h2 id="contact-heading" className="p-display">
              LET’S BUILD
              <br />
              SOMETHING{" "}
              <span className="p-outline">
                THAT
                <br className="p-contact-break" /> MATTERS.
              </span>
            </h2>
            <span className="p-contact-arrow">
              <ArrowUpRight strokeWidth={0.8} />
            </span>
          </a>
          <div className="p-contact-bottom">
            <div>
              <p>
                Have an interesting problem, a bold idea,
                <br />
                or a team that’s building what’s next?
              </p>
              <div className="p-contact-email">
                <a href={`mailto:${PERSONAL_INFO.email}`}>
                  {PERSONAL_INFO.email}
                </a>
                <button
                  onClick={copyEmail}
                  className="p-icon-button"
                  aria-label="Copy email address"
                >
                  {copyStatus === "Email address copied." ? (
                    <Check size={17} />
                  ) : (
                    <Copy size={17} />
                  )}
                </button>
              </div>
              <p className="p-copy-status" role="status" aria-live="polite">
                {copyStatus}
              </p>
            </div>
            <div className="p-contact-links">
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
                <ArrowUpRight size={17} />
              </a>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
                <ArrowUpRight size={17} />
              </a>
              <a
                href={PERSONAL_INFO.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
                <ArrowUpRight size={17} />
              </a>
              <a href={`tel:${PERSONAL_INFO.phone.replace(/\s/g, "")}`}>
                {PERSONAL_INFO.phone}
                <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
        </div>
      </section>
      <footer className="p-footer p-wrap">
        <a className="p-brand" href="#home" aria-label="Back to top">
          <span className="p-monogram">
            e<span>.</span>
          </span>
          <span>
            ERANDA
            <br />
            SATHSARA<span className="p-copper">.</span>
          </span>
        </a>
        <span className="p-micro">
          © {new Date().getFullYear()} ERANDA SATHSARA ABEWARDHANA
        </span>
        <span className="p-micro p-footer-note">
          THOUGHTFULLY ENGINEERED IN SRI LANKA.
        </span>
        <a href="#home" className="p-back-top" aria-label="Back to top">
          <ArrowUp size={18} />
        </a>
      </footer>
    </>
  );
}
