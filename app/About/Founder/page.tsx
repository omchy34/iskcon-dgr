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

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Animated counter ── */
interface CounterProps {
  to: number;
  suffix?: string;
}

function Counter({ to, suffix = "" }: CounterProps) {
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

interface Pillar {
  title: string;
  body: string;
}

const pillars: Pillar[] = [
  {
    title: "Devotional Service",
    body: "Bhakti yoga — the path of loving devotion — is the heart of ISKCON's teachings. Through chanting, worship, and selfless service, seekers cultivate a direct and living relationship with the Divine."
  },
  {
    title: "Vedic Knowledge",
    body: "Rooted in ancient scriptures such as the Bhagavad-gītā and Śrīmad-Bhāgavatam, ISKCON preserves and shares timeless wisdom that speaks to every dimension of human life — spiritual, ethical, and philosophical."
  },
  {
    title: "Global Community",
    body: "With over 600 temples across 60+ countries, ISKCON is one of the most widespread spiritual movements in the world, warmly uniting seekers of all backgrounds, cultures, and walks of life."
  },
  {
    title: "Compassionate Outreach",
    body: "Through food relief, education, and cultural programs, ISKCON serves millions every year. Seva — selfless service — is not separate from spirituality; it is its fullest and most beautiful expression."
  },
];

interface TimelineEntry {
  year: string;
  event: string;
}

const timeline: TimelineEntry[] = [
  { year: "1486", event: "Sri Chaitanya Mahaprabhu appears in Mayapur, Bengal, inaugurating the sankirtan movement — congregational chanting of the holy names of God." },
  { year: "1922", event: "Srila Bhaktisiddhanta Sarasvati meets a young Abhay Charan De (the future Srila Prabhupada) in Calcutta and instructs him to spread Krishna consciousness in the English-speaking world." },
  { year: "1965", event: "At age 69, Srila Prabhupada sails alone to New York on a cargo ship — the Jaladuta — to fulfill his guru's mission, arriving with little more than books and an unshakeable conviction." },
  { year: "1966", event: "ISKCON is formally incorporated in New York City on 13 July 1966, beginning as a small gathering of seekers in a storefront on Second Avenue." },
  { year: "1971", event: "The first Indian ISKCON temple opens in Surat; the movement returns to its spiritual homeland, bringing bhakti back to the land of its birth." },
  { year: "1977", event: "Srila Prabhupada departs this world, leaving behind 108 temples, thousands of initiated devotees, and over 70 volumes of translations and commentaries on Vedic literature." },
  { year: "Today", event: "600+ temples, 50+ farm communities, 60 schools, and Hare Krishna Food for Life — the world's largest vegetarian food-relief program, serving millions of free meals annually." },
];

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { value: 600, suffix: "+", label: "Temples Worldwide" },
  { value: 60, suffix: "+", label: "Countries" },
  { value: 1966, suffix: "", label: "Year Founded" },
  { value: 70, suffix: "+", label: "Books Translated" },
];

const localFeatures: string[] = ["Daily Ārati", "Open to All", "Prasad Seva"];

export default function AboutISKCON() {
  return (
    <main style={{ background: "#0c0701", color: "#e2c99a", fontFamily: "'EB Garamond', Georgia, serif", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Cinzel:wght@400;500;600&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap');

        .cinzel { font-family: 'Cinzel', serif; }
        .cormorant { font-family: 'Cormorant Garamond', serif; }

        .gold-text {
          background: linear-gradient(135deg, #f7e099 0%, #d49132 50%, #f0c564 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .divider {
          display: flex;
          align-items: center;
          gap: 14px;
          justify-content: center;
          color: #c97c3050;
        }
        .divider::before, .divider::after {
          content: '';
          height: 1px;
          width: 64px;
          background: linear-gradient(90deg, transparent, #c97c3080);
        }
        .divider::after {
          background: linear-gradient(90deg, #c97c3080, transparent);
        }

        .pillar-card {
          background: linear-gradient(145deg, #1a0d04, #120900);
          border: 1px solid #c97c3020;
          border-radius: 14px;
          padding: 28px 26px;
          transition: border-color 0.3s, transform 0.3s;
          height: 100%;
        }
        .pillar-card:hover {
          border-color: #c97c3050;
          transform: translateY(-3px);
        }

        .timeline-line {
          position: absolute;
          left: 15px;
          top: 0; bottom: 0;
          width: 1px;
          background: linear-gradient(180deg, transparent, #c97c3040 10%, #c97c3040 90%, transparent);
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0c0701; }
        ::-webkit-scrollbar-thumb { background: #c97c3055; border-radius: 4px; }
      `}</style>

      {/* ── HERO ── */}
      {/* ── HERO ── */}
      <section
        style={{
          minHeight: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "100px 24px 60px",
          background: "radial-gradient(ellipse at 50% 40%, #2a1200 0%, #0c0701 60%)",
          borderBottom: "1px solid #c97c3015",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{
          position: "absolute", width: 520, height: 520,
          borderRadius: "50%", border: "1px solid #c97c3012",
          top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", width: 340, height: 340,
          borderRadius: "50%", border: "1px solid #c97c3018",
          top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 700 }}>
          <p className="cinzel" style={{ color: "#c97c3099", fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: 16 }}>
            Est. 1966 · New York City
          </p>

          <h1 className="cinzel gold-text" style={{ fontSize: "clamp(24px, 4vw, 42px)", fontWeight: 600, lineHeight: 1.05, marginBottom: 8 }}>
            ISKCON
          </h1>

          <p className="cinzel" style={{ color: "#9a6e3a", fontSize: "clamp(9px, 1.1vw, 11px)", letterSpacing: "0.22em", marginBottom: 16 }}>
            International Society for Krishna Consciousness
          </p>

          <div className="divider" style={{ marginBottom: 16 }}>✦</div>

          <blockquote className="cormorant" style={{
            fontSize: "clamp(12px, 1.4vw, 15px)",
            fontStyle: "italic", color: "#a07840",
            lineHeight: 1.6, maxWidth: 420, margin: "0 auto 10px",
          }}>
            &ldquo;Spreading the teachings of Lord Sri Krishna to every town and village in the world.&rdquo;
          </blockquote>

          <p className="cinzel" style={{ color: "#c97c3060", fontSize: 9, letterSpacing: "0.25em", marginTop: 10 }}>
            — SRILA PRABHUPADA
          </p>
        </div>
      </section>

      {/* ── ABOUT / FOUNDER ── */}
      <section style={{ padding: "80px 24px", maxWidth: 1060, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 56, alignItems: "center" }}>
          <Reveal>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", inset: -10, borderRadius: 20, border: "1px solid #c97c3020", zIndex: 0 }} />
              <div style={{ position: "relative", zIndex: 1, borderRadius: 16, overflow: "hidden", aspectRatio: "4/5", background: "#1a0c04" }}>
                <Image
                  src="/prabhupad.jpg"
                  alt="Srila Prabhupada"
                  fill
                  style={{ objectFit: "cover" }}
                />
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  background: "linear-gradient(to top, #0c0701ee 0%, transparent 100%)",
                  padding: "28px 20px 20px",
                }}>
                  <p className="cinzel" style={{ color: "#c97c30aa", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase" }}>His Divine Grace</p>
                  <p className="cinzel" style={{ color: "#f5de90", fontSize: 17, marginTop: 3 }}>A.C. Bhaktivedanta Swami Prabhupada</p>
                  <p style={{ color: "#c97c3077", fontSize: 13, fontStyle: "italic", marginTop: 4 }}>Founder-Ācārya of ISKCON</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <p className="cinzel" style={{ color: "#c97c3077", fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", marginBottom: 16 }}>Who We Are</p>
            <h2 className="cinzel" style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 600, color: "#f0c87a", lineHeight: 1.25, marginBottom: 20 }}>
              A Movement Born from<br />
              <span className="gold-text">Pure Devotion</span>
            </h2>
            <div style={{ width: 48, height: 1, background: "linear-gradient(90deg, #c97c30, transparent)", marginBottom: 28 }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 18, fontSize: "clamp(15px, 2vw, 18px)", color: "#c8a47a", lineHeight: 1.8 }}>
              <p>
                ISKCON — the International Society for Krishna Consciousness — was founded in 1966 by His Divine Grace A.C. Bhaktivedanta Swami Prabhupada in New York City. Rooted in the ancient Vaishnava tradition of India, ISKCON carries the timeless teachings of the <em>Bhagavad-gītā</em> to every corner of the globe.
              </p>
              <p>
                Srila Prabhupada arrived in America at the age of 69 with little more than a trunk of books and an unwavering conviction that the world needed Krishna consciousness. Within eleven years he had circled the globe fourteen times, established 108 temples, and inspired a generation of sincere seekers.
              </p>
              <p>
                Today ISKCON is a worldwide family of over 600 temples, farm communities, schools, and restaurants — a living testament to the transformative power of bhakti yoga.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PHILOSOPHY QUOTE ── */}
      <section style={{
        padding: "64px 24px",
        background: "linear-gradient(135deg, #140900, #0e0600, #140900)",
        borderTop: "1px solid #c97c3015", borderBottom: "1px solid #c97c3015",
        textAlign: "center",
      }}>
        <Reveal>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <p className="cormorant" style={{ fontSize: 64, color: "#c97c3025", lineHeight: 0.8, marginBottom: 16 }}>&ldquo;</p>
            <blockquote className="cormorant" style={{ fontSize: "clamp(20px, 3.5vw, 30px)", fontStyle: "italic", color: "#dfc07a", lineHeight: 1.65, marginBottom: 20 }}>
              The recommended means of deliverance in this age of Kali is the chanting of the holy name of the Lord.
            </blockquote>
            <div className="divider" style={{ marginBottom: 16 }}>—</div>
            <p className="cinzel" style={{ color: "#c97c3070", fontSize: 11, letterSpacing: "0.25em" }}>ŚRĪMAD-BHĀGAVATAM · 12.3.52</p>
          </div>
        </Reveal>
      </section>

      {/* ── FOUR PILLARS ── */}
      <section style={{ padding: "80px 24px", maxWidth: 1060, margin: "0 auto" }}>
        <Reveal>
          <p className="cinzel" style={{ textAlign: "center", color: "#c97c3070", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 12 }}>Our Pillars</p>
          <h2 className="cinzel" style={{ textAlign: "center", fontSize: "clamp(26px, 4vw, 38px)", color: "#f0c87a", marginBottom: 10 }}>What We Stand For</h2>
          <div className="divider" style={{ marginBottom: 48 }}>✦</div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
          {pillars.map(({ title, body }, i) => (
            <Reveal key={title} delay={i * 90}>
              <div className="pillar-card">
                <h3 className="cinzel" style={{ color: "#f0c87a", fontSize: 16, marginBottom: 14, fontWeight: 500 }}>{title}</h3>
                <p style={{ color: "#a07848", fontSize: 15, lineHeight: 1.75 }}>{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section style={{ padding: "80px 24px", maxWidth: 760, margin: "0 auto" }}>
        <Reveal>
          <p className="cinzel" style={{ textAlign: "center", color: "#c97c3070", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 12 }}>History</p>
          <h2 className="cinzel" style={{ textAlign: "center", fontSize: "clamp(26px, 4vw, 38px)", color: "#f0c87a", marginBottom: 52 }}>The Sacred Journey</h2>
        </Reveal>
        <div style={{ position: "relative", paddingLeft: 40 }}>
          <div className="timeline-line" />
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {timeline.map(({ year, event }, i) => (
              <Reveal key={year} delay={i * 60}>
                <div style={{ position: "relative" }}>
                  <div style={{
                    position: "absolute", left: -47, top: 4,
                    width: 14, height: 14, borderRadius: "50%",
                    background: "#0c0701", border: "2px solid #c97c30",
                    boxShadow: "0 0 8px #c97c3055",
                  }} />
                  <div style={{
                    background: "linear-gradient(135deg, #1a0d04, #110800)",
                    border: "1px solid #c97c3020",
                    borderRadius: 12,
                    padding: "18px 22px",
                  }}>
                    <p className="cinzel" style={{ color: "#d4983a", fontSize: 13, fontWeight: 500, marginBottom: 8, letterSpacing: "0.05em" }}>{year}</p>
                    <p style={{ color: "#b08850", fontSize: 15, lineHeight: 1.7 }}>{event}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>



      {/* ── CTA ── */}
      {/* ── MAHA MANTRA FOOTER NOTE ── */}
      <div style={{ textAlign: "center", padding: "24px", borderTop: "1px solid #c97c3012" }}>
        <p className="cinzel" style={{ color: "#c97c3035", fontSize: 11, letterSpacing: "0.22em" }}>
          Hare Krishna · Hare Krishna · Krishna Krishna · Hare Hare · Hare Rāma · Hare Rāma · Rāma Rāma · Hare Hare
        </p>
      </div>
    </main>
  );
}


