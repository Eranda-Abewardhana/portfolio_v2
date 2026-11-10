import Image from "next/image";
import { ArrowUpRight, GraduationCap, Trophy } from "lucide-react";
import {
  EDUCATION,
  ACHIEVEMENTS,
  PERSONAL_INFO,
  PROFILE_NOTES,
  YATHRA_EVENT,
} from "@/data/portfolioProfile";
import ScrollZoom from "./ScrollZoom";

export default function About() {
  return (
    <section
      id="about"
      className="p-about-band p-section"
      aria-labelledby="about-heading"
    >
      <div className="p-wrap p-about-grid">
        <div className="p-about-photo">
          <div className="p-about-photo-frame">
            <ScrollZoom amount={0.12}>
              <Image
                src="/images/optimized/eranda-about.webp"
                alt="Eranda Sathsara standing on the steps at the University of Moratuwa"
                fill
                sizes="(max-width: 760px) 85vw, 35vw"
              />
            </ScrollZoom>
            <span className="p-photo-corner p-corner-tl" />
            <span className="p-photo-corner p-corner-br" />
          </div>
          <div className="p-about-photo-caption">
            <span className="p-micro">THE PERSON BEHIND THE SYSTEMS</span>
            <span className="p-signature">Eranda.</span>
          </div>
        </div>
        <div className="p-about-copy">
          <div className="p-section-label">
            <span>02 /</span> A LITTLE ABOUT ME
          </div>
          <h2 id="about-heading" className="p-display">
            MORE THAN
            <br />
            <span className="p-outline">THE CODE.</span>
          </h2>
          <p className="p-about-lead">
            Good engineering starts with a simple question:{" "}
            <span>what could be better?</span>
          </p>
          <p>
            I’m {PERSONAL_INFO.name}, an AI and software engineer based in {PERSONAL_INFO.location}.
            My work connects applied AI with backend and platform engineering,
            from cross-platform mobile applications to production AI backends
            and cloud-native systems.
          </p>
          <p>
            With a foundation in Artificial Intelligence at the University of
            Moratuwa and 2+ years of industry experience, I focus on automation,
            developer experience, and reliable delivery. On DocCraft, I lead
            backend design and coordinate backend and frontend developers across
            architecture, payment integrations, and sprint planning.
          </p>
          <a
            className="p-text-link"
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            A little more about my journey <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="p-education">
          <div className="p-mini-heading">
            <GraduationCap size={18} />
            <h3>THE FOUNDATION</h3>
          </div>
          {EDUCATION.map((education) => (
            <div className="p-education-row" key={education.institution}>
              <span className="p-micro">{education.period}</span>
              <h4>{education.degree}</h4>
              <p>{education.institution}</p>
            </div>
          ))}
        </div>
        <div className="p-recognition">
          <div className="p-mini-heading">
            <Trophy size={18} />
            <h3>BEYOND THE WORK</h3>
          </div>
          <details className="p-award-detail">
            <summary>
              <span>
                <span className="p-micro">CS EMINENCE &apos;24 / AIESEC</span>
                <strong>Recognised for going beyond.</strong>
              </span>
              <span className="p-detail-plus">+</span>
            </summary>
            <div className="p-award-expanded">
              <p className="p-award-title">{ACHIEVEMENTS[0].title}</p>
              <p>{ACHIEVEMENTS[0].organization}</p>
              <Image
                src={ACHIEVEMENTS[0].images![0]}
                alt="Eranda holding his Best Performing LB Member trophy and certificate at CS Eminence ’24"
                width={723}
                height={905}
                sizes="(max-width: 400px) 85vw, 340px"
              />
              <blockquote className="p-award-story">
                <p className="p-award-gratitude">Grateful. Honoured. Proud.</p>
                {ACHIEVEMENTS[0].quote?.split("\n\n").map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </blockquote>
            </div>
          </details>
          <details className="p-award-detail p-yathra-detail">
            <summary>
              <span>
                <span className="p-micro">YATHRA / {YATHRA_EVENT.year}</span>
                <strong>{YATHRA_EVENT.role}</strong>
              </span>
              <span className="p-detail-plus" aria-hidden="true">+</span>
            </summary>
            <div className="p-award-expanded p-yathra-expanded">
              <h4>{YATHRA_EVENT.title}</h4>
              <p>{YATHRA_EVENT.organization}</p>
              <p className="p-yathra-venue">{YATHRA_EVENT.venue}</p>
              <p>{YATHRA_EVENT.description}</p>
              <p>{YATHRA_EVENT.experience}</p>
              <div className="p-yathra-gallery">
                {YATHRA_EVENT.photos.map((photo) => (
                  <figure key={photo.src}>
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      width={photo.width}
                      height={photo.height}
                      sizes="(max-width: 480px) 85vw, (max-width: 760px) 40vw, 23vw"
                      draggable={false}
                    />
                    <figcaption>{photo.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </details>
          <div className="p-recognition-note">
            <span className="p-micro">CODE RUSH / 2022</span>
            <p>
              8th place · Algorithmic competition
              <br />
              <span className="p-muted">University of Moratuwa</span>
            </p>
          </div>
        </div>
        <div className="p-profile-notes">
          {PROFILE_NOTES.map((note) => (
            <div key={note.label}>
              <h3 className="p-micro">{note.label}</h3>
              <p>{note.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
