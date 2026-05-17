"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

/* ── Scroll reveal hook ── */
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
  className?: string;
}) {
  const { ref, visible } = useInView();
  const transform = {
    up:    visible ? "translateY(0)"  : "translateY(32px)",
    left:  visible ? "translateX(0)"  : "translateX(-32px)",
    right: visible ? "translateX(0)"  : "translateX(32px)",
  }[direction];
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform,
        transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const localFeatures = [
  { icon: "🔔", label: "Daily Ārati" },
  { icon: "🙏", label: "Open to All" },
  { icon: "🍛", label: "Prasad Seva" },
  { icon: "📖", label: "Bhāgavatam Class" },
  { icon: "🎵", label: "Kīrtan" },
  { icon: "💬", label: "Counselling" },
];

const timeline = [
  {
    year: "Early Days",
    event:
      "A small group of devotees in Durgapur began gathering for kīrtan and Bhāgavatam study, planting the first seeds of an organised spiritual community in the steel city.",
  },
  {
    year: "Establishment",
    event:
      "ISKCON Durgapur was formally established under ISKCON guidance. The installation of Śrī Śrī Rādhā Madana Mohana marked the official beginning of daily Deity worship.",
  },
  {
    year: "Growth",
    event:
      "The congregation steadily grew — programmes expanded, prasādam distribution began reaching the wider community, and the temple became a landmark of spiritual culture in the region.",
  },
  {
    year: "Today",
    event:
      "The temple now hosts hundreds of devotees daily, runs ongoing outreach programmes, and continues to grow as a beacon of bhakti for the Durgapur–Asansol belt.",
  },
];

const deityFacts = [
  { label: "Presiding Deities",  value: "Śrī Śrī Rādhā Madana Mohana" },
  { label: "Tradition",          value: "Gauḍīya Vaiṣṇava paramparā" },
  { label: "Significance",       value: "Madana Mohana — He who enchants even the enchanter of minds" },
  { label: "Deity Dress",        value: "Changed daily; elaborate during Ekādaśī & festivals" },
];

const schedule = [
  { time: "4:30 AM",  name: "Maṅgala Ārati",       icon: "🌅" },
  { time: "7:15 AM",  name: "Śṛṅgāra Darśana",     icon: "✨" },
  { time: "7:30 AM",  name: "Guru Pūjā & Kīrtan",  icon: "🎵" },
  { time: "8:00 AM",  name: "Śrīmad-Bhāgavatam",   icon: "📖" },
  { time: "12:00 PM", name: "Rāja Bhoga Ārati",     icon: "🍛" },
  { time: "4:00 PM",  name: "Uṣṭhāpana Ārati",     icon: "🔔" },
  { time: "6:45 PM",  name: "Sandhyā Ārati",        icon: "🪔" },
  { time: "8:00 PM",  name: "Śayana Ārati",         icon: "🌙" },
];

export default function AboutISKCONDurgapur() {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #fff7ed 0%, #fffbeb 50%, #ffedd5 100%)",
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        color: "#1c1917",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=Cinzel:wght@400;500;600&display=swap');

        .cinzel    { font-family: 'Cinzel', serif; }
        .cormorant { font-family: 'Cormorant Garamond', serif; }

        .orange-grad {
          background: linear-gradient(135deg, #ea580c, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .section-divider {
          display: flex; align-items: center; gap: 14px; justify-content: center;
        }
        .section-divider::before, .section-divider::after {
          content: ''; height: 1px; width: 72px;
          background: linear-gradient(90deg, transparent, rgba(234,88,12,0.4));
        }
        .section-divider::after {
          background: linear-gradient(90deg, rgba(234,88,12,0.4), transparent);
        }

        .feat-card {
          background: rgba(255,255,255,0.7);
          border: 1px solid rgba(234,88,12,0.12);
          border-radius: 14px;
          padding: 18px 14px;
          text-align: center;
          transition: all 0.3s ease;
          backdrop-filter: blur(6px);
        }
        .feat-card:hover {
          background: rgba(255,255,255,0.95);
          border-color: rgba(234,88,12,0.35);
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(234,88,12,0.12);
        }

        .timeline-item {
          background: rgba(255,255,255,0.65);
          border: 1px solid rgba(234,88,12,0.12);
          border-radius: 16px;
          padding: 22px 26px;
          backdrop-filter: blur(8px);
          transition: all 0.3s ease;
        }
        .timeline-item:hover {
          background: rgba(255,255,255,0.9);
          border-color: rgba(234,88,12,0.3);
          transform: translateX(6px);
          box-shadow: 0 8px 28px rgba(234,88,12,0.1);
        }

        .deity-fact {
          background: rgba(255,255,255,0.65);
          border: 1px solid rgba(234,88,12,0.12);
          border-radius: 12px;
          padding: 16px 20px;
          backdrop-filter: blur(6px);
          transition: all 0.3s ease;
        }
        .deity-fact:hover {
          background: rgba(255,255,255,0.9);
          border-color: rgba(234,88,12,0.3);
          box-shadow: 0 6px 20px rgba(234,88,12,0.1);
        }

        .sched-pill {
          background: rgba(255,255,255,0.7);
          border: 1px solid rgba(234,88,12,0.12);
          border-radius: 12px;
          padding: 14px 18px;
          display: flex;
          align-items: center;
          gap: 14px;
          backdrop-filter: blur(6px);
          transition: all 0.25s ease;
        }
        .sched-pill:hover {
          background: rgba(255,255,255,0.95);
          border-color: rgba(234,88,12,0.35);
          transform: translateX(4px);
          box-shadow: 0 6px 20px rgba(234,88,12,0.1);
        }
      `}</style>

      {/* ── Background blobs ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" style={{ opacity: 0.12 }}>
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-300 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-300 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-175 bg-yellow-100 rounded-full blur-3xl" style={{ opacity: 0.5 }} />
      </div>

      {/* ════════════════════════════
          PAGE HERO BANNER
      ════════════════════════════ */}
      <section
        className="relative z-10"
        style={{
          padding: "85px 24px 40px",
          textAlign: "center",
          borderBottom: "1px solid rgba(234,88,12,0.12)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Label */}
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-orange-400" />
            <span className="cinzel text-[10px] tracking-[0.35em] uppercase text-orange-500">
              ISKCON Durgapur · West Bengal
            </span>
            <div className="w-8 h-px bg-orange-400" />
          </div>

          {/* Title */}
          <h1
            className="cinzel font-semibold leading-tight text-gray-800 mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "0.04em" }}
          >
            About <span className="orange-grad">ISKCON Durgapur</span>
          </h1>

          {/* Ornament */}
          <div className="section-divider my-6">
            <div className="w-1.5 h-1.5 rotate-45 bg-orange-500" style={{ opacity: 0.7 }} />
          </div>

          {/* Tagline */}
          <p
            className="cormorant italic text-gray-500 mx-auto"
            style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", maxWidth: 520, lineHeight: 1.8 }}
          >
            A sanctuary of bhakti in the heart of the steel city — where devotion found its eternal home.
          </p>

          {/* Open badge */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-lg mt-8">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="cinzel text-[10px] tracking-wider text-gray-700">
              Temple Open Daily · 4:30 AM – 8:30 PM
            </span>
          </div>
        </motion.div>
      </section>

      {/* ════════════════════════════
          ABOUT — IMAGE + TEXT
      ════════════════════════════ */}
      <section className="relative z-10" style={{ padding: "90px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 64, alignItems: "center" }}>

          {/* Image */}
          <Reveal direction="left">
            <div className="relative">
              {/* Tilt accent behind */}
              <div
                className="absolute -top-4 -left-4 w-32 h-48 rounded-2xl -z-10"
                style={{ background: "linear-gradient(135deg, #fbbf24, #ea580c)", transform: "rotate(-5deg)", opacity: 0.8 }}
              />
              <div
                className="absolute -bottom-4 -right-4 w-44 h-32 rounded-2xl -z-10"
                style={{ background: "linear-gradient(135deg, #f97316, #ef4444)", transform: "rotate(5deg)", opacity: 0.75 }}
              />
              {/* Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ aspectRatio: "4/3" }}>
                <Image
                  src="/radhamadanmohan.jpg"
                  alt="Śrī Śrī Rādhā Madana Mohana"
                  fill
                  style={{ objectFit: "cover", objectPosition: "top" }}
                />
                {/* Bottom gradient */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%)" }}
                />
                {/* Floating badge */}
                <div
                  className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl"
                  style={{ zIndex: 2 }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="cinzel font-bold text-gray-800 text-[10px] tracking-wide uppercase leading-snug">
                        Sri Sri Radha Madanmohan Temple
                      </h3>
                      <p className="cinzel text-gray-500 text-[8px] tracking-wider uppercase mt-0.5">
                        Durgapur, West Bengal
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl">🙏</div>
                      <p className="cinzel text-[7px] text-gray-400 tracking-widest uppercase mt-0.5">Jai Sri Krishna</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Text */}
          <Reveal direction="right" delay={100}>
            <p className="cinzel text-[10px] tracking-[0.32em] uppercase text-orange-500 mb-4">About the Temple</p>
            <h2
              className="cinzel font-semibold text-gray-800 mb-2 leading-tight"
              style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)" }}
            >
              Where Devotion<br />
              <span className="orange-grad">Found Its Home</span>
            </h2>

            {/* Decorative rule */}
            <div className="flex items-center gap-3 my-5">
              <div className="w-14 h-px" style={{ background: "linear-gradient(90deg, rgba(234,88,12,0.5), transparent)" }} />
              <div className="w-1.5 h-1.5 rotate-45 bg-orange-500" style={{ opacity: 0.65 }} />
            </div>

            <div className="cormorant text-gray-600 leading-relaxed" style={{ fontSize: "clamp(1rem, 1.6vw, 1.15rem)", display: "flex", flexDirection: "column", gap: 18 }}>
              <p>
                ISKCON Durgapur is a vibrant centre of{" "}
                <span className="text-orange-600 font-medium">bhakti-yoga</span> established in the industrial heartland of West Bengal — a spiritual refuge for thousands of residents, students, and families across the{" "}
                <span className="text-orange-600 font-medium">Durgapur–Asansol</span> region.
              </p>
              <p>
                The temple is dedicated to{" "}
                <span className="text-orange-600 font-medium">Śrī Śrī Rādhā Madana Mohana</span> — the Divine Couple whose worship forms the very foundation of the{" "}
                <span className="text-orange-600 font-medium">Gauḍīya Vaiṣṇava</span> tradition brought to the West by Śrīla Prabhupāda.
              </p>
              <p>
                From its founding, ISKCON Durgapur has carried the mission of spreading{" "}
                <span className="text-orange-600 font-medium">Krishna consciousness</span> through daily programmes, prasādam distribution, and cultural outreach — touching lives far beyond its walls.
              </p>
            </div>

            {/* Sanskrit verse block */}
            <div
              className="mt-6 p-4 rounded-xl backdrop-blur-sm"
              style={{ background: "rgba(255,255,255,0.6)", borderLeft: "4px solid #ea580c" }}
            >
              <p className="cormorant text-xl text-orange-700 italic mb-1">हरे कृष्ण हरे कृष्ण</p>
              <p className="cormorant text-lg text-orange-600 italic">कृष्ण कृष्ण हरे हरे</p>
            </div>

            {/* Feature pills */}
           
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════
          TIMELINE
      ════════════════════════════ */}
      <section className="relative z-10" style={{ padding: "90px 24px", maxWidth: 860, margin: "0 auto" }}>
        <Reveal>
          <p className="cinzel text-[10px] tracking-[0.32em] uppercase text-orange-500 text-center mb-3">Our Story</p>
          <h2
            className="cinzel font-semibold text-gray-800 text-center leading-tight mb-3"
            style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)" }}
          >
            How the Temple <span className="orange-grad">Came to Be</span>
          </h2>
          <div className="section-divider mb-14">
            <div className="w-1.5 h-1.5 rotate-45 bg-orange-500" style={{ opacity: 0.7 }} />
          </div>
        </Reveal>

        <div className="relative pl-10">
          {/* Vertical line */}
          <div
            className="absolute left-3 top-2 bottom-2 w-px"
            style={{ background: "linear-gradient(180deg, transparent, rgba(234,88,12,0.3) 10%, rgba(234,88,12,0.3) 90%, transparent)" }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {timeline.map(({ year, event }, i) => (
              <Reveal key={year} delay={i * 90}>
                <div className="relative">
                  {/* Timeline dot */}
                  <div
                    className="absolute rounded-full"
                    style={{
                      left: -38, top: 20,
                      width: 14, height: 14,
                      background: "linear-gradient(135deg, #ea580c, #f59e0b)",
                      boxShadow: "0 0 10px rgba(234,88,12,0.4)",
                    }}
                  />
                  <div className="timeline-item">
                    <p className="cinzel text-orange-500 font-medium mb-2" style={{ fontSize: 13, letterSpacing: "0.06em" }}>{year}</p>
                    <p className="cormorant text-gray-600" style={{ fontSize: "clamp(1rem, 1.5vw, 1.1rem)", lineHeight: 1.8 }}>{event}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════
          FOOTER MANTRA
      ════════════════════════════ */}
      <footer
        className="relative z-10 text-center"
        style={{
          padding: "48px 24px",
          borderTop: "1px solid rgba(234,88,12,0.12)",
          background: "rgba(254,215,170,0.4)",
        }}
      >
        {/* Ornament */}
        <div className="flex items-center gap-3 justify-center mb-6">
          <div className="w-16 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(234,88,12,0.4))" }} />
          <div className="w-1.5 h-1.5 rotate-45 bg-orange-400" style={{ opacity: 0.7 }} />
          <div className="w-16 h-px" style={{ background: "linear-gradient(90deg, rgba(234,88,12,0.4), transparent)" }} />
        </div>

        <p
          className="cormorant italic text-orange-400"
          style={{ fontSize: "clamp(13px, 1.8vw, 17px)", letterSpacing: "0.14em", lineHeight: 2.2 }}
        >
          Hare Krishna · Hare Krishna · Krishna Krishna · Hare Hare<br />
          Hare Rāma · Hare Rāma · Rāma Rāma · Hare Hare
        </p>

        <div className="flex items-center gap-3 justify-center mt-6">
          <div className="w-16 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(234,88,12,0.4))" }} />
          <div className="w-1.5 h-1.5 rotate-45 bg-orange-400" style={{ opacity: 0.7 }} />
          <div className="w-16 h-px" style={{ background: "linear-gradient(90deg, rgba(234,88,12,0.4), transparent)" }} />
        </div>

        <p className="cinzel text-orange-300 mt-6" style={{ fontSize: 8, letterSpacing: "0.3em" }}>
          ISKCON DURGAPUR · WEST BENGAL · JAI SRI KRISHNA
        </p>
      </footer>
    </div>
  );
}