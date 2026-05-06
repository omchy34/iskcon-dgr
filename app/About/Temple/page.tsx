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

interface ScheduleItem { time: string; name: string; desc: string; }

const schedule: ScheduleItem[] = [
  { time: "4:30 AM", name: "Maṅgala Ārati", desc: "The day begins in the pre-dawn stillness with the most auspicious ārati of the day, offered to the Deities as they are awakened." },
  { time: "7:15 AM", name: "Śṛṅgāra Darśana", desc: "The Deities are beautifully dressed for the day and revealed to the congregation for morning darśana." },
  { time: "7:30 AM", name: "Guru Pūjā & Kīrtan", desc: "Devotees offer worship to Śrīla Prabhupāda followed by congregational chanting of the holy names." },
  { time: "8:00 AM", name: "Śrīmad-Bhāgavatam", desc: "A daily class on the Śrīmad-Bhāgavatam — open to all — drawing timeless wisdom from the crown jewel of Vedic literature." },
  { time: "12:00 PM", name: "Rāja Bhoga Ārati", desc: "The midday offering of a royal feast is presented to the Deities, followed by prasādam distribution." },
  { time: "4:00 PM", name: "Ușṭhāpana Ārati", desc: "The Deities are awakened from their afternoon rest with a gentle ārati and kīrtan." },
  { time: "6:45 PM", name: "Sandhyā Ārati", desc: "The beautiful evening ārati — lamps, incense, conches and bells fill the temple with devotion as the sun sets." },
  { time: "8:00 PM", name: "Śayana Ārati", desc: "The final ārati of the day, as the Deities are lovingly put to rest for the night." },
];

const localFeatures: string[] = ["Daily Ārati", "Open to All", "Prasad Seva", "Bhāgavatam Class", "Kīrtan", "Counselling"];

const deityFacts: { label: string; value: string }[] = [
  { label: "Presiding Deities", value: "Śrī Śrī Rādhā Madana Mohana" },
  { label: "Deity Style", value: "Traditional Vaiṣṇava — Gauḍīya paramparā" },
  { label: "Significance", value: "Madana Mohana is the form of Krishna who enchants even Cupid — the attractor of all hearts" },
  { label: "Deity Dress", value: "Changed daily; elaborate during Ekādaśī & festivals" },
];

export default function ISKCONDurgapurPage() {
  return (
    <main style={{ background: "#0c0701", color: "#e2c99a", fontFamily: "'EB Garamond', Georgia, serif", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Cinzel:wght@400;500;600&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap');

        .cinzel    { font-family: 'Cinzel', serif; }
        .cormorant { font-family: 'Cormorant Garamond', serif; }

        .gold-text {
          background: linear-gradient(135deg, #f7e099 0%, #d49132 50%, #f0c564 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .body-text { color: #c4a06a; }
        .highlight { color: #e8a830; }

        .divider {
          display: flex; align-items: center; gap: 14px; justify-content: center;
        }
        .divider::before, .divider::after {
          content: ''; height: 1px; width: 64px;
          background: linear-gradient(90deg, transparent, #c97c3080);
        }
        .divider::after { background: linear-gradient(90deg, #c97c3080, transparent); }

        .schedule-row {
          display: grid;
          grid-template-columns: 100px 1fr;
          gap: 20px;
          padding: 20px 24px;
          border-bottom: 1px solid #c97c3012;
          transition: background 0.25s;
        }
        .schedule-row:hover { background: #1a0c0430; }
        .schedule-row:last-child { border-bottom: none; }

        .deity-card {
          background: linear-gradient(145deg, #1a0d04, #120900);
          border: 1px solid #c97c3020;
          border-radius: 12px;
          padding: 18px 22px;
          transition: border-color 0.3s;
        }
        .deity-card:hover { border-color: #c97c3045; }

        .feature-pill {
          text-align: center; padding: 14px 10px;
          background: #110800; border: 1px solid #c97c3020;
          border-radius: 10px;
          transition: border-color 0.3s, background 0.3s;
        }
        .feature-pill:hover { border-color: #c97c3050; background: #1a0d04; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0c0701; }
        ::-webkit-scrollbar-thumb { background: #c97c3055; border-radius: 4px; }
      `}</style>

      {/* ══════════════════════════════════════
    HERO
══════════════════════════════════════ */}
      <section style={{
        minHeight: "auto",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "100px 24px 50px",
        background: "radial-gradient(ellipse at 50% 40%, #2a1200 0%, #0c0701 65%)",
        borderBottom: "1px solid #c97c3015",
        position: "relative", overflow: "hidden",
      }}>
        {[520, 340].map(size => (
          <div key={size} style={{
            position: "absolute", width: size, height: size, borderRadius: "50%",
            border: `1px solid #c97c30${size === 520 ? "12" : "1a"}`,
            top: "50%", left: "50%", transform: "translate(-50%,-50%)",
            pointerEvents: "none",
          }} />
        ))}

        <div style={{ position: "relative", zIndex: 1, maxWidth: 700 }}>
          <p className="cinzel" style={{ color: "#c97c3099", fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: 12 }}>
            Local Chapter · Durgapur, West Bengal
          </p>

          <h1 className="cinzel gold-text" style={{ fontSize: "clamp(24px, 4vw, 42px)", fontWeight: 600, lineHeight: 1.05, marginBottom: 8 }}>
            ISKCON<br />Durgapur
          </h1>

          <p className="cinzel" style={{ color: "#9a6e3a", fontSize: "clamp(9px, 1.1vw, 11px)", letterSpacing: "0.22em", marginBottom: 16 }}>
            Śrī Śrī Rādhā Madana Mohana Temple
          </p>

          <div className="divider" style={{ marginBottom: 16 }}>
            <span style={{ color: "#c97c3055", fontSize: 10 }}>✦</span>
          </div>

          <blockquote className="cormorant" style={{
            fontSize: "clamp(13px, 1.6vw, 16px)",
            fontStyle: "italic", color: "#a07840",
            lineHeight: 1.6, maxWidth: 420, margin: "0 auto 10px",
          }}>
            &ldquo;A sanctuary of bhakti in the heart of the steel city.&rdquo;
          </blockquote>

          <div style={{
            display: "inline-flex", gap: 10, alignItems: "center",
            marginTop: 20, padding: "8px 18px",
            background: "linear-gradient(135deg,#1e1000,#160c00)",
            border: "1px solid #c97c3030", borderRadius: 40,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#c97c30", boxShadow: "0 0 6px #c97c30" }} />
            <p className="cinzel" style={{ color: "#c97c30cc", fontSize: 10, letterSpacing: "0.2em" }}>OPEN DAILY · 4:30 AM – 8:30 PM</p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          ABOUT THE TEMPLE
      ══════════════════════════════════════ */}
      <section style={{ padding: "80px 24px", maxWidth: 1060, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 56, alignItems: "center" }}>

          {/* Image */}
          <Reveal>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", inset: -10, borderRadius: 20, border: "1px solid #c97c3020", zIndex: 0 }} />
              <div style={{ position: "relative", zIndex: 1, borderRadius: 16, overflow: "hidden", aspectRatio: "4/3", background: "#1a0c04" }}>
                <Image src="/radhamadanmohan.jpg" alt="ISKCON Durgapur Temple" fill style={{ objectFit: "cover" }} />
              </div>
            </div>
          </Reveal>

          {/* Text */}
          <Reveal delay={120}>
            <p className="cinzel" style={{ color: "#c97c3077", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 16 }}>About the Temple</p>
            <h2 className="cinzel" style={{ fontSize: "clamp(26px, 4.5vw, 40px)", fontWeight: 600, lineHeight: 1.2, marginBottom: 20 }}>
              <span style={{ color: "#d4c4a0" }}>Where Devotion</span><br />
              <span className="gold-text">Found Its Home</span>
            </h2>
            <div style={{ width: 48, height: 1, background: "linear-gradient(90deg,#c97c30,transparent)", marginBottom: 28 }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 18, fontSize: "clamp(15px, 1.8vw, 17px)", lineHeight: 1.85 }}>
              <p className="body-text">
                ISKCON Durgapur is a vibrant centre of <span className="highlight">bhakti-yoga</span> established in the industrial heartland of West Bengal. The temple serves as a spiritual refuge for thousands of residents, students, and families across the <span className="highlight">Durgapur–Asansol</span> region.
              </p>
              <p className="body-text">
                The temple is dedicated to <span className="highlight">Śrī Śrī Rādhā Madana Mohana</span> — the Divine Couple whose worship forms the very foundation of the <span className="highlight">Gauḍīya Vaiṣṇava</span> tradition brought to the West by Śrīla Prabhupāda.
              </p>
              <p className="body-text">
                From its founding, ISKCON Durgapur has carried the mission of spreading <span className="highlight">Krishna consciousness</span> through daily programmes, prasādam distribution, and cultural outreach — touching lives far beyond its walls.
              </p>
            </div>

            {/* Feature pills */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 32 }}>
              {localFeatures.map((label) => (
                <div key={label} className="feature-pill">
                  <p className="cinzel highlight" style={{ fontSize: 10, letterSpacing: "0.15em" }}>{label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════
          ESTABLISHMENT TIMELINE
      ══════════════════════════════════════ */}
      <section style={{
        padding: "70px 24px",
        background: "linear-gradient(135deg,#110800,#0e0600,#110800)",
        borderTop: "1px solid #c97c3015", borderBottom: "1px solid #c97c3015",
      }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <Reveal>
            <p className="cinzel" style={{ textAlign: "center", color: "#c97c3070", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 12 }}>Our Story</p>
            <h2 className="cinzel" style={{ textAlign: "center", fontSize: "clamp(24px, 4vw, 36px)", color: "#d4c4a0", marginBottom: 10 }}>
              How the Temple <span className="gold-text">Came to Be</span>
            </h2>
            <div className="divider" style={{ marginBottom: 48 }}>
              <span style={{ color: "#c97c3055", fontSize: 12 }}>✦</span>
            </div>
          </Reveal>

          {/* Timeline entries */}
          <div style={{ position: "relative", paddingLeft: 40 }}>
            <div style={{
              position: "absolute", left: 15, top: 0, bottom: 0, width: 1,
              background: "linear-gradient(180deg, transparent, #c97c3040 10%, #c97c3040 90%, transparent)",
            }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {[
                {
                  year: "Early Days",
                  event: "A small group of devotees in Durgapur began gathering for kīrtan and Bhāgavatam study, planting the first seeds of an organised spiritual community in the steel city.",
                },
                {
                  year: "Establishment",
                  event: "ISKCON Durgapur was formally established under the guidance of ISKCON leaders, with the installation of Śrī Śrī Rādhā Madana Mohana marking the official beginning of daily Deity worship.",
                },
                {
                  year: "Growth",
                  event: "The congregation steadily grew — programmes expanded, prasādam distribution began reaching the wider community, and the temple became a landmark of spiritual culture in the region.",
                },
                {
                  year: "Today",
                  event: "The temple now hosts hundreds of devotees daily, runs ongoing outreach programmes, and continues to grow as a beacon of bhakti for the Durgapur–Asansol belt.",
                },
              ].map(({ year, event }, i) => (
                <Reveal key={year} delay={i * 70}>
                  <div style={{ position: "relative" }}>
                    <div style={{
                      position: "absolute", left: -47, top: 5,
                      width: 14, height: 14, borderRadius: "50%",
                      background: "#0c0701", border: "2px solid #c97c30",
                      boxShadow: "0 0 8px #c97c3055",
                    }} />
                    <div style={{ background: "linear-gradient(135deg,#1a0d04,#110800)", border: "1px solid #c97c3020", borderRadius: 12, padding: "16px 20px" }}>
                      <p className="cinzel highlight" style={{ fontSize: 12, fontWeight: 500, marginBottom: 7, letterSpacing: "0.06em" }}>{year}</p>
                      <p className="body-text" style={{ fontSize: 14, lineHeight: 1.78 }}>{event}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          DEITY — RADHA MADAN MOHAN
      ══════════════════════════════════════ */}
      <section style={{ padding: "80px 24px", maxWidth: 1060, margin: "0 auto" }}>
        <Reveal>
          <p className="cinzel" style={{ textAlign: "center", color: "#c97c3070", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 12 }}>The Presiding Deities</p>
          <h2 className="cinzel" style={{ textAlign: "center", fontSize: "clamp(24px, 4vw, 36px)", color: "#d4c4a0", marginBottom: 10 }}>
            Śrī Śrī Rādhā <span className="gold-text">Madana Mohana</span>
          </h2>
          <div className="divider" style={{ marginBottom: 52 }}>
            <span style={{ color: "#c97c3055", fontSize: 12 }}>✦</span>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 56, alignItems: "start" }}>
          <Reveal delay={80}>
            <div style={{ display: "flex", flexDirection: "column", gap: 18, fontSize: "clamp(15px, 1.8vw, 17px)", lineHeight: 1.85 }}>
              <p className="body-text">
                <span className="highlight">Madana Mohana</span> — &ldquo;He who enchants even the enchanter of minds&rdquo; — is one of the most intimate and beloved forms of <span className="highlight">Lord Kṛṣṇa</span>. He is worshipped as the original attractor of all hearts, whose beauty surpasses even that of Cupid himself.
              </p>
              <p className="body-text">
                In the <span className="highlight">Gauḍīya Vaiṣṇava</span> tradition, Madana Mohana is the first of the three principal Vṛndāvana Deities — representing the <span className="highlight">sambandha</span> aspect: the foundational understanding of one&apos;s relationship with the Supreme. To know Madana Mohana is to know who we truly are, and who Kṛṣṇa truly is.
              </p>
              <p className="body-text">
                <span className="highlight">Śrīmatī Rādhārāṇī</span> — the Divine consort — stands beside Him as the embodiment of <span className="highlight">pure devotional love</span> (śuddha-bhakti). She is the internal potency of Kṛṣṇa and the very source of all spiritual energy.
              </p>
              <p className="body-text">
                Darśana of Rādhā Madana Mohana is considered deeply purifying. Devotees believe that simply gazing upon Their lotus faces with love dissolves material attachment and awakens the dormant seed of devotion within the heart.
              </p>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {deityFacts.map(({ label, value }) => (
                <div key={label} className="deity-card">
                  <p className="cinzel" style={{ color: "#c97c3088", fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", marginBottom: 6 }}>{label}</p>
                  <p className="body-text" style={{ fontSize: 15, lineHeight: 1.65 }}>{value}</p>
                </div>
              ))}

              {/* Quote */}
              <div style={{
                marginTop: 8, padding: "22px 24px",
                background: "linear-gradient(135deg,#1e1000,#150e00)",
                border: "1px solid #c97c3025", borderRadius: 14,
              }}>
                <p className="cormorant" style={{ fontSize: 22, fontStyle: "italic", color: "#c9a060", lineHeight: 1.65, marginBottom: 12 }}>
                  &ldquo;Kṛṣṇa is so beautiful that He attracts even those who are self-satisfied — and He even attracts Rādhārāṇī Herself.&rdquo;
                </p>
                <p className="cinzel" style={{ color: "#c97c3055", fontSize: 9, letterSpacing: "0.25em" }}>— ŚRĪLA PRABHUPĀDA</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════
          DAILY SCHEDULE
      ══════════════════════════════════════ */}
      <section style={{
        padding: "80px 24px",
        background: "linear-gradient(135deg,#110800,#0e0600,#110800)",
        borderTop: "1px solid #c97c3015",
      }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <Reveal>
            <p className="cinzel" style={{ textAlign: "center", color: "#c97c3070", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 12 }}>Temple Programme</p>
            <h2 className="cinzel" style={{ textAlign: "center", fontSize: "clamp(24px, 4vw, 36px)", color: "#d4c4a0", marginBottom: 10 }}>
              Daily <span className="gold-text">Schedule</span>
            </h2>
            <div className="divider" style={{ marginBottom: 48 }}>
              <span style={{ color: "#c97c3055", fontSize: 12 }}>✦</span>
            </div>
          </Reveal>

          <Reveal>
            <div style={{ background: "linear-gradient(145deg,#1a0d04,#110800)", border: "1px solid #c97c3018", borderRadius: 16, overflow: "hidden" }}>
              {schedule.map(({ time, name, desc }, i) => (
                <div key={time} className="schedule-row" style={{ borderTop: i === 0 ? "none" : undefined }}>
                  {/* Time */}
                  <div style={{ paddingTop: 2 }}>
                    <p className="cinzel highlight" style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.04em", whiteSpace: "nowrap" }}>{time}</p>
                  </div>
                  {/* Name + desc */}
                  <div>
                    <p className="cinzel" style={{ color: "#e2c99a", fontSize: 14, marginBottom: 5, fontWeight: 500 }}>{name}</p>
                    <p className="body-text" style={{ fontSize: 13.5, lineHeight: 1.72 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════
          MAHA MANTRA FOOTER
      ══════════════════════════════════════ */}
      <div style={{ textAlign: "center", padding: "28px 24px", borderTop: "1px solid #c97c3012", marginTop: 40 }}>
        <p className="cinzel" style={{ color: "#c97c3035", fontSize: 10, letterSpacing: "0.22em" }}>
          Hare Krishna · Hare Krishna · Krishna Krishna · Hare Hare · Hare Rāma · Hare Rāma · Rāma Rāma · Hare Hare
        </p>
      </div>
    </main>
  );
}