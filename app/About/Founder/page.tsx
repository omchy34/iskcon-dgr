"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ── Scroll reveal hook ── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
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
  className = "",
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right";
}) {
  const { ref, visible } = useInView();
  const transform = {
    up:    visible ? "translateY(0)"  : "translateY(28px)",
    left:  visible ? "translateX(0)"  : "translateX(-28px)",
    right: visible ? "translateX(0)"  : "translateX(28px)",
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

/* ── Animated counter ── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, visible } = useInView(0.4);
  useEffect(() => {
    if (!visible) return;
    let v = 0;
    const step = Math.max(1, Math.ceil(to / 55));
    const t = setInterval(() => {
      v += step;
      if (v >= to) { setCount(to); clearInterval(t); }
      else setCount(v);
    }, 18);
    return () => clearInterval(t);
  }, [visible, to]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const pillars = [
  {
    icon: "🙏",
    title: "Devotional Service",
    body: "Bhakti yoga — the path of loving devotion — is the heart of ISKCON's teachings. Through chanting, worship, and selfless service, seekers cultivate a direct and living relationship with the Divine.",
  },
  {
    icon: "📖",
    title: "Vedic Knowledge",
    body: "Rooted in ancient scriptures such as the Bhagavad-gītā and Śrīmad-Bhāgavatam, ISKCON preserves and shares timeless wisdom that speaks to every dimension of human life.",
  },
  {
    icon: "🌍",
    title: "Global Community",
    body: "With over 600 temples across 60+ countries, ISKCON is one of the most widespread spiritual movements in the world, warmly uniting seekers of all backgrounds and walks of life.",
  },
  {
    icon: "🍛",
    title: "Compassionate Outreach",
    body: "Through food relief, education, and cultural programs, ISKCON serves millions every year. Seva — selfless service — is not separate from spirituality; it is its fullest expression.",
  },
];

const timeline = [
  { year: "1486", event: "Sri Chaitanya Mahaprabhu appears in Mayapur, Bengal, inaugurating the sankirtan movement — congregational chanting of the holy names of God." },
  { year: "1922", event: "Srila Bhaktisiddhanta Sarasvati meets a young Abhay Charan De in Calcutta and instructs him to spread Krishna consciousness in the English-speaking world." },
  { year: "1965", event: "At age 69, Srila Prabhupada sails alone to New York on a cargo ship to fulfill his guru's mission, arriving with little more than books and unshakeable conviction." },
  { year: "1966", event: "ISKCON is formally incorporated in New York City on 13 July 1966, beginning as a small gathering of seekers in a storefront on Second Avenue." },
  { year: "1971", event: "The first Indian ISKCON temple opens in Surat; the movement returns to its spiritual homeland, bringing bhakti back to the land of its birth." },
  { year: "1977", event: "Srila Prabhupada departs this world, leaving behind 108 temples, thousands of initiated devotees, and over 70 volumes of translations and commentaries." },
  { year: "Today", event: "600+ temples, 50+ farm communities, 60 schools, and Hare Krishna Food for Life — the world's largest vegetarian food-relief program, serving millions annually." },
];

const stats = [
  { value: 600, suffix: "+", label: "Temples Worldwide" },
  { value: 60,  suffix: "+", label: "Countries" },
  { value: 1966, suffix: "",  label: "Year Founded" },
  { value: 70,  suffix: "+", label: "Books Translated" },
];

export default function AboutISKCON() {
  return (
    <main
      style={{
        background: "linear-gradient(135deg, #fff7ed 0%, #fffbeb 50%, #ffedd5 100%)",
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        color: "#1c1917",
        minHeight: "100vh",
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

        .orn-divider {
          display: flex; align-items: center; gap: 14px; justify-content: center;
        }
        .orn-divider::before, .orn-divider::after {
          content: ''; height: 1px; width: 72px;
          background: linear-gradient(90deg, transparent, rgba(234,88,12,0.4));
        }
        .orn-divider::after {
          background: linear-gradient(90deg, rgba(234,88,12,0.4), transparent);
        }

        .pillar-card {
          background: rgba(255,255,255,0.7);
          border: 1px solid rgba(234,88,12,0.12);
          border-radius: 18px;
          padding: 28px 24px;
          backdrop-filter: blur(8px);
          transition: all 0.3s ease;
          height: 100%;
        }
        .pillar-card:hover {
          background: rgba(255,255,255,0.95);
          border-color: rgba(234,88,12,0.35);
          transform: translateY(-5px);
          box-shadow: 0 16px 40px rgba(234,88,12,0.1);
        }

        .timeline-card {
          background: rgba(255,255,255,0.65);
          border: 1px solid rgba(234,88,12,0.12);
          border-radius: 14px;
          padding: 20px 24px;
          backdrop-filter: blur(8px);
          transition: all 0.3s ease;
        }
        .timeline-card:hover {
          background: rgba(255,255,255,0.92);
          border-color: rgba(234,88,12,0.3);
          transform: translateX(6px);
          box-shadow: 0 8px 28px rgba(234,88,12,0.1);
        }

        .stat-box {
          text-align: center;
          padding: 28px 16px;
          transition: transform 0.2s;
        }
        .stat-box:hover { transform: translateY(-3px); }
      `}</style>

      {/* ── BG blobs ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" style={{ opacity: 0.13 }}>
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-300 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-300 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-175 bg-yellow-100 rounded-full blur-3xl" style={{ opacity: 0.5 }} />
      </div>

      {/* ════════════════════════════
          HERO
      ════════════════════════════ */}
      <section
        className="relative z-10"
        style={{
          padding: "90px 24px 80px",
          textAlign: "center",
          borderBottom: "1px solid rgba(234,88,12,0.12)",
        }}
      >
        {/* Decorative rings */}
        {[560, 380].map((size, i) => (
          <div
            key={size}
            style={{
              position: "absolute",
              width: size, height: size,
              borderRadius: "50%",
              border: `1px solid rgba(234,88,12,${i === 0 ? 0.06 : 0.1})`,
              top: "50%", left: "50%",
              transform: "translate(-50%,-50%)",
              pointerEvents: "none",
            }}
          />
        ))}

        <div style={{ position: "relative", zIndex: 1, maxWidth: 700, margin: "0 auto" }}>
          {/* Label */}
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-orange-400" />
            <span className="cinzel text-[10px] tracking-[0.35em] uppercase text-orange-500">
              Est. 1966 · New York City
            </span>
            <div className="w-8 h-px bg-orange-400" />
          </div>

          {/* Title */}
          <h1
            className="cinzel font-semibold text-gray-800 leading-tight mb-4"
            style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)", letterSpacing: "0.06em" }}
          >
            <span className="orange-grad">ISKCON</span>
          </h1>

          <p
            className="cinzel text-gray-500 mb-6"
            style={{ fontSize: "clamp(9px, 1.2vw, 12px)", letterSpacing: "0.22em" }}
          >
            International Society for Krishna Consciousness
          </p>

          {/* Ornament */}
          <div className="orn-divider my-6">
            <div className="w-1.5 h-1.5 rotate-45 bg-orange-500" style={{ opacity: 0.7 }} />
          </div>

          {/* Quote */}
          <blockquote
            className="cormorant italic text-gray-500 mx-auto mb-3"
            style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", maxWidth: 480, lineHeight: 1.75 }}
          >
            &ldquo;Spreading the teachings of Lord Sri Krishna to every town and village in the world.&rdquo;
          </blockquote>
          <p className="cinzel text-orange-400" style={{ fontSize: 9, letterSpacing: "0.28em" }}>
            — SRILA PRABHUPADA
          </p>
        </div>
      </section>

      {/* ════════════════════════════
          ABOUT / FOUNDER
      ════════════════════════════ */}
      <section className="relative z-10" style={{ padding: "90px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 64, alignItems: "center" }}>

          {/* Image */}
          <Reveal direction="left">
            <div className="relative">
              {/* Tilt accents */}
              <div
                className="absolute -top-4 -left-4 w-28 h-44 rounded-2xl -z-10"
                style={{ background: "linear-gradient(135deg, #fbbf24, #ea580c)", transform: "rotate(-5deg)", opacity: 0.8 }}
              />
              <div
                className="absolute -bottom-4 -right-4 w-40 h-28 rounded-2xl -z-10"
                style={{ background: "linear-gradient(135deg, #f97316, #ef4444)", transform: "rotate(5deg)", opacity: 0.75 }}
              />

              {/* Image frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ aspectRatio: "4/5" }}>
                <Image
                  src="/prabhupad.jpg"
                  alt="Srila Prabhupada"
                  fill
                  style={{ objectFit: "cover" }}
                />
                {/* Bottom gradient caption */}
                <div
                  className="absolute bottom-0 left-0 right-0"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%)", padding: "36px 20px 20px" }}
                >
                  <p className="cinzel text-orange-300" style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase" }}>His Divine Grace</p>
                  <p className="cinzel text-amber-100" style={{ fontSize: 15, marginTop: 4 }}>A.C. Bhaktivedanta Swami Prabhupada</p>
                  <p className="cormorant italic text-orange-300" style={{ fontSize: 14, marginTop: 3 }}>Founder-Ācārya of ISKCON</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Text */}
          <Reveal direction="right" delay={100}>
            <p className="cinzel text-[10px] tracking-[0.32em] uppercase text-orange-500 mb-4">Who We Are</p>
            <h2
              className="cinzel font-semibold text-gray-800 leading-tight mb-2"
              style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.7rem)" }}
            >
              A Movement Born from<br />
              <span className="orange-grad">Pure Devotion</span>
            </h2>

            <div className="flex items-center gap-3 my-5">
              <div className="w-14 h-px" style={{ background: "linear-gradient(90deg, rgba(234,88,12,0.5), transparent)" }} />
              <div className="w-1.5 h-1.5 rotate-45 bg-orange-500" style={{ opacity: 0.65 }} />
            </div>

            <div
              className="cormorant text-gray-600 leading-relaxed"
              style={{ fontSize: "clamp(1rem, 1.6vw, 1.15rem)", display: "flex", flexDirection: "column", gap: 18 }}
            >
              <p>
                ISKCON was founded in 1966 by His Divine Grace{" "}
                <span className="text-orange-600 font-medium">A.C. Bhaktivedanta Swami Prabhupada</span> in New York City. Rooted in the ancient Vaishnava tradition of India, ISKCON carries the timeless teachings of the{" "}
                <em className="text-orange-600">Bhagavad-gītā</em> to every corner of the globe.
              </p>
              <p>
                Srila Prabhupada arrived in America at age 69 with little more than a trunk of books and an unwavering conviction that the world needed{" "}
                <span className="text-orange-600 font-medium">Krishna consciousness</span>. Within eleven years he had circled the globe fourteen times and established 108 temples.
              </p>
              <p>
                Today ISKCON is a worldwide family of over{" "}
                <span className="text-orange-600 font-medium">600 temples</span>, farm communities, schools, and restaurants — a living testament to the transformative power of bhakti yoga.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════
          PHILOSOPHY QUOTE BAND
      ════════════════════════════ */}
      <section
        className="relative z-10"
        style={{
          padding: "10px 24px",
          background: "rgba(255,237,213,0.5)",
          borderTop: "1px solid rgba(234,88,12,0.1)",
          borderBottom: "1px solid rgba(234,88,12,0.1)",
          textAlign: "center",
          backdropFilter: "blur(8px)",
        }}
      >
        <Reveal>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            {/* Big opening quote mark */}
            <p
              className="cormorant text-orange-200 leading-none mb-4"
              style={{ fontSize: 80 }}
            >
              &ldquo;
            </p>
            <blockquote
              className="cormorant italic text-gray-700"
              style={{ fontSize: "clamp(1.2rem, 2.8vw, 1.8rem)", lineHeight: 1.7, marginBottom: 20 }}
            >
              The recommended means of deliverance in this age of Kali is the chanting of the holy name of the Lord.
            </blockquote>
            <div className="orn-divider mb-4">
              <div className="w-1.5 h-1.5 rotate-45 bg-orange-400" style={{ opacity: 0.7 }} />
            </div>
            <p className="cinzel text-orange-400" style={{ fontSize: 9, letterSpacing: "0.28em" }}>
              ŚRĪMAD-BHĀGAVATAM · 12.3.52
            </p>
          </div>
        </Reveal>
      </section>

      {/* ════════════════════════════
          FOUR PILLARS
      ════════════════════════════ */}
     
      {/* ════════════════════════════
          TIMELINE
      ════════════════════════════ */}
      <section
        className="relative z-10"
        style={{
          padding: "90px 24px",
          background: "rgba(255,237,213,0.4)",
          borderTop: "1px solid rgba(234,88,12,0.1)",
          borderBottom: "1px solid rgba(234,88,12,0.1)",
        }}
      >
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <Reveal>
            <p className="cinzel text-[10px] tracking-[0.32em] uppercase text-orange-500 text-center mb-3">History</p>
            <h2
              className="cinzel font-semibold text-gray-800 text-center leading-tight mb-3"
              style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)" }}
            >
              The <span className="orange-grad">Sacred Journey</span>
            </h2>
            <div className="orn-divider mb-14">
              <div className="w-1.5 h-1.5 rotate-45 bg-orange-500" style={{ opacity: 0.7 }} />
            </div>
          </Reveal>

          <div style={{ position: "relative", paddingLeft: 44 }}>
            {/* Vertical line */}
            <div
              style={{
                position: "absolute", left: 13, top: 6, bottom: 6, width: 1,
                background: "linear-gradient(180deg, transparent, rgba(234,88,12,0.3) 8%, rgba(234,88,12,0.3) 92%, transparent)",
              }}
            />

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {timeline.map(({ year, event }, i) => (
                <Reveal key={year} delay={i * 70}>
                  <div style={{ position: "relative" }}>
                    {/* Dot */}
                    <div
                      style={{
                        position: "absolute", left: -51, top: 18,
                        width: 16, height: 16, borderRadius: "50%",
                        background: "linear-gradient(135deg, #ea580c, #f59e0b)",
                        boxShadow: "0 0 10px rgba(234,88,12,0.45)",
                      }}
                    />
                    <div className="timeline-card">
                      <p
                        className="cinzel text-orange-500 font-medium mb-2"
                        style={{ fontSize: 13, letterSpacing: "0.06em" }}
                      >
                        {year}
                      </p>
                      <p
                        className="cormorant text-gray-600"
                        style={{ fontSize: "clamp(1rem, 1.5vw, 1.1rem)", lineHeight: 1.8 }}
                      >
                        {event}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════
          MAHA MANTRA FOOTER
      ════════════════════════════ */}
      <footer
        className="relative z-10 text-center"
        style={{
          padding: "52px 24px",
          background: "rgba(254,215,170,0.4)",
          borderTop: "1px solid rgba(234,88,12,0.12)",
        }}
      >
        <div className="flex items-center gap-3 justify-center mb-6">
          <div className="w-16 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(234,88,12,0.4))" }} />
          <div className="w-1.5 h-1.5 rotate-45 bg-orange-400" style={{ opacity: 0.7 }} />
          <div className="w-16 h-px" style={{ background: "linear-gradient(90deg, rgba(234,88,12,0.4), transparent)" }} />
        </div>

        <p
          className="cormorant italic text-orange-400"
          style={{ fontSize: "clamp(13px, 1.8vw, 18px)", letterSpacing: "0.12em", lineHeight: 2.2 }}
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
          ISKCON · INTERNATIONAL SOCIETY FOR KRISHNA CONSCIOUSNESS · JAI SRI KRISHNA
        </p>
      </footer>
    </main>
  );
}