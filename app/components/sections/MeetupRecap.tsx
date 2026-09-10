"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

// First Build for Public meetup — Sunday, 5 July 2026, The Ruai Room, KL.
// Photos live in /public/events/meetup-1. Landscape shots lead the grid.
const PHOTOS = [
  { src: "/events/meetup-1/meetup1-01.webp", alt: "The full table of builders at the first Build for Public meetup, banner behind them", span: true },
  { src: "/events/meetup-1/meetup1-03.webp", alt: "Group selfie down the length of the table", span: true },
  { src: "/events/meetup-1/meetup1-05.webp", alt: "Laptops, coffee and stickers spread across the table while people work" },
  { src: "/events/meetup-1/meetup1-07.webp", alt: "A volunteer walking the room through a project on screen" },
  { src: "/events/meetup-1/meetup1-08.webp", alt: "Two builders pair-working on an NGO site" },
  { src: "/events/meetup-1/meetup1-04.webp", alt: "The group at the end of the day, laptops still open" },
  { src: "/events/meetup-1/meetup1-02.webp", alt: "Everyone turning to the camera mid-session at the long shared table", span: true },
  { src: "/events/meetup-1/meetup1-06.webp", alt: "Wide view of the venue, Build for Public banner by the window", span: true },
];

const STATS = [
  { value: "2", label: "NGO sites built from scratch" },
  { value: "1 day", label: "From blank repo to live domain" },
  { value: "1", label: "First-timer taught to vibe code" },
];

const FORMAT_STEPS = [
  {
    title: "We collect the brief",
    body: "Build for Public talks to the non-profit first and writes down what they actually need — then posts it on the projects board.",
  },
  {
    title: "You pick a project",
    body: "Turn up, take something off the board, and work on it for the day. No pitching, no team formation, no wasted morning.",
  },
  {
    title: "Ship a PR by end of day",
    body: "Everything is open source, so the next volunteer picks up exactly where the last one stopped instead of starting over.",
  },
  {
    title: "The NGO is in the room",
    body: "We'd rather the non-profit come and say what they need in person — and leave able to edit and maintain the site themselves.",
  },
];

function Lightbox({
  index,
  onClose,
  onStep,
}: {
  index: number;
  onClose: () => void;
  onStep: (delta: number) => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onStep]);

  const photo = PHOTOS[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close photo"
        className="absolute top-4 right-4 z-10 border-2 border-black bg-white px-3 py-1 text-sm font-bold"
      >
        Close ✕
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onStep(-1);
        }}
        aria-label="Previous photo"
        className="absolute left-3 z-10 border-2 border-black bg-white px-3 py-2 text-sm font-bold sm:left-6"
      >
        ←
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onStep(1);
        }}
        aria-label="Next photo"
        className="absolute right-3 z-10 border-2 border-black bg-white px-3 py-2 text-sm font-bold sm:right-6"
      >
        →
      </button>
      <div
        className="relative h-full w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          className="object-contain"
          sizes="100vw"
          priority
        />
      </div>
    </div>
  );
}

export default function MeetupRecap() {
  const [open, setOpen] = useState<number | null>(null);

  const step = useCallback((delta: number) => {
    setOpen((cur) =>
      cur === null ? cur : (cur + delta + PHOTOS.length) % PHOTOS.length,
    );
  }, []);

  return (
    <section
      className="band band-white section-padding px-6"
      aria-labelledby="recap-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* ── Header ── */}
        <p className="eyebrow mb-4">Recap · 5 July 2026 · Kuala Lumpur</p>
        <h2
          id="recap-heading"
          className="heading-display text-4xl sm:text-5xl text-black mb-5 max-w-3xl"
        >
          Our first meetup: two NGO websites, shipped in a day.
        </h2>
        <p className="text-base text-black/60 leading-relaxed max-w-2xl mb-10">
          A room of builders, one long table, and a board of real requests
          from real non-profits. By the time the coffee ran out, TitikLab had a live
          domain and YouthWave had a landing page in review — both built from
          scratch that afternoon.
        </p>

        {/* ── Stats ── */}
        <div className="grid sm:grid-cols-3 gap-4 mb-14">
          {STATS.map((s) => (
            <div key={s.label} className="card-flat p-6">
              <div className="heading-display text-4xl mb-1">{s.value}</div>
              <p
                className="text-sm text-black/60"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* ── Photos ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-16">
          {PHOTOS.map((p, i) => (
            <button
              key={p.src}
              onClick={() => setOpen(i)}
              aria-label={`Open photo: ${p.alt}`}
              className={`relative block overflow-hidden border-2 border-black transition-transform hover:-translate-y-0.5 ${
                p.span ? "col-span-2 aspect-[4/3]" : "aspect-[3/4]"
              }`}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </button>
          ))}
        </div>

        {/* ── How the format works ── */}
        <div className="mb-16">
          <h3 className="heading-section mb-3">
            It&apos;s a mini hackathon, except the problem statements are real.
          </h3>
          <p className="text-base text-black/60 leading-relaxed max-w-2xl mb-8">
            No theme, no judges, no demo-day theatre. The brief comes straight
            from the non-profit, and whatever you ship stays theirs.
          </p>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FORMAT_STEPS.map((s, i) => (
              <li key={s.title} className="card p-6 bg-white">
                <span className="inline-flex items-center justify-center w-8 h-8 border-2 border-black bg-[var(--color-bp-yellow)] heading-display text-sm mb-4">
                  {i + 1}
                </span>
                <h4 className="heading-display text-base mb-2">{s.title}</h4>
                <p
                  className="text-sm text-black/60 leading-relaxed"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* ── Video walkthrough ── */}
        <div className="flex flex-col lg:flex-row gap-8 items-start mb-14">
          <div className="lg:w-1/3">
            <h3 className="heading-section mb-3">See one for yourself.</h3>
            <p
              className="text-base text-black/60 leading-relaxed mb-6"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Jom Jelas is a youth-led civic media initiative making Malaysian
              politics legible for first-time voters. Here&apos;s a walkthrough
              of the site we helped them ship.
            </p>
            <a
              href="https://www.jomjelas.com/en"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary btn-primary-yellow inline-block"
            >
              Visit Jom Jelas →
            </a>
          </div>
          <div className="w-full lg:flex-1">
            <div className="card overflow-hidden">
              <video
                controls
                playsInline
                muted
                loop
                preload="none"
                poster="/events/meetup-1/jomjelas-demo-poster.webp"
                className="block w-full bg-black"
              >
                <source src="/events/meetup-1/jomjelas-demo.mp4" type="video/mp4" />
                Your browser doesn&apos;t support embedded video. Visit
                jomjelas.com to see the site.
              </video>
            </div>
          </div>
        </div>

        {/* ── Thanks ── */}
        <div className="card-flat p-6 sm:p-8">
          <h3 className="heading-display text-lg mb-3">
            The people who made it happen.
          </h3>
          <p
            className="text-sm text-black/60 leading-relaxed"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Huge thanks to @akhlaq.dmg for pulling in sponsors and stickers in a
            couple of days — and turning up straight after organising OCBC Cycle
            that morning — and to @ainhsaifulnizam for prepping the whole thing
            on less than a week&apos;s notice. @ayunee_m bought a domain, picked
            up Codex, GitHub and hosting, and had TitikLab live within hours.
            @frdspuzi built and opened a landing-page PR for YouthWave.
            @ashvinpraveen, @maxinel.ai, @yan.hee09, razali and @haddifhairi
            helped remotely, and @behwithmeforasec and @aisea.builders connected
            us with the venue, @theruairoom.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <a
              href="https://luma.com/buildforpublic"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ background: "#111", color: "#fff", borderColor: "#000" }}
            >
              Come to the next one →
            </a>
            <a
              href="/request"
              className="btn-primary"
              style={{ background: "#fff", color: "#000", borderColor: "#000" }}
            >
              Request a website for your NGO →
            </a>
          </div>
        </div>
      </div>

      {open !== null && (
        <Lightbox index={open} onClose={() => setOpen(null)} onStep={step} />
      )}
    </section>
  );
}
