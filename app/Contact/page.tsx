"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight, FaPrayingHands, FaFacebook, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";

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
}

function Reveal({ children, delay = 0 }: RevealProps) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
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

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const contactDetails = [
  {
    icon: "📍",
    label: "Address",
    lines: ["ISKCON Durgapur", "City Centre, Durgapur", "West Bengal – 713216"],
  },
  {
    icon: "📞",
    label: "Phone",
    lines: ["+91 98765 43210", "+91 91234 56789"],
  },
  {
    icon: "✉️",
    label: "Email",
    lines: ["info@iskcondurgapur.org", "seva@iskcondurgapur.org"],
  },
  {
    icon: "🕐",
    label: "Temple Hours",
    lines: ["Open Daily", "4:30 AM – 8:30 PM"],
  },
];

const scheduleHighlights = [
  { time: "4:30 AM", name: "Maṅgala Ārati" },
  { time: "7:30 AM", name: "Guru Pūjā & Kīrtan" },
  { time: "8:00 AM", name: "Bhāgavatam Class" },
  { time: "12:00 PM", name: "Rāja Bhoga Ārati" },
  { time: "6:45 PM", name: "Sandhyā Ārati" },
  { time: "8:00 PM", name: "Śayana Ārati" },
];

const socialLinks = [
  { platform: "Facebook",  handle: "@ISKCONDurgapur",   href: "#", Icon: FaFacebook  },
  { platform: "Instagram", handle: "@iskcon.durgapur",  href: "#", Icon: FaInstagram },
  { platform: "YouTube",   handle: "ISKCON Durgapur",   href: "#", Icon: FaYoutube   },
  { platform: "WhatsApp",  handle: "+91 98765 43210",   href: "#", Icon: FaWhatsapp  },
];

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "", email: "", phone: "", subject: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => { setIsLoaded(true); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <main style={{
      background: "linear-gradient(135deg, #fff7ed 0%, #fffbeb 50%, #ffedd5 100%)",
      color: "#3a1a08",
      fontFamily: "'EB Garamond', Georgia, serif",
      minHeight: "100vh",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Cinzel:wght@400;500;600&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap');

        .cinzel    { font-family: 'Cinzel', serif; }
        .cormorant { font-family: 'Cormorant Garamond', serif; }

        .gold-text {
          background: linear-gradient(135deg, #ea580c 0%, #d97706 50%, #ea580c 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .divider {
          display: flex; align-items: center; gap: 14px; justify-content: center;
        }
        .divider::before, .divider::after {
          content: ''; height: 1px; width: 64px;
          background: linear-gradient(90deg, transparent, rgba(234,88,12,0.35));
        }
        .divider::after { background: linear-gradient(90deg, rgba(234,88,12,0.35), transparent); }

        .contact-card {
          background: rgba(255,255,255,0.72);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(234,88,12,0.14);
          border-radius: 20px;
          padding: 26px 24px;
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
          box-shadow: 0 4px 24px rgba(234,88,12,0.06);
        }
        .contact-card:hover {
          border-color: rgba(234,88,12,0.28);
          box-shadow: 0 8px 36px rgba(234,88,12,0.12);
          transform: translateY(-2px);
        }

        .form-input {
          width: 100%;
          background: rgba(255,255,255,0.85);
          border: 1.5px solid rgba(234,88,12,0.2);
          border-radius: 12px;
          padding: 13px 16px;
          color: #3a1a08;
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 16px;
          outline: none;
          transition: border-color 0.25s, box-shadow 0.25s;
          box-sizing: border-box;
        }
        .form-input::placeholder { color: rgba(234,88,12,0.35); }
        .form-input:focus {
          border-color: rgba(234,88,12,0.55);
          box-shadow: 0 0 0 3px rgba(234,88,12,0.1);
          background: #fff;
        }

        select.form-input option { background: #fff7ed; color: #3a1a08; }

        .submit-btn {
          width: 100%;
          padding: 14px 24px;
          background: linear-gradient(135deg, #ea580c, #d97706);
          border: none; border-radius: 12px;
          color: #fff;
          font-family: 'Cinzel', serif;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          transition: opacity 0.25s, transform 0.2s, box-shadow 0.25s;
          box-shadow: 0 4px 18px rgba(234,88,12,0.3);
        }
        .submit-btn:hover:not(:disabled) {
          opacity: 0.92;
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(234,88,12,0.4);
        }
        .submit-btn:disabled { opacity: 0.45; cursor: not-allowed; }

        .schedule-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid rgba(234,88,12,0.08);
        }
        .schedule-row:last-child { border-bottom: none; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #fff7ed; }
        ::-webkit-scrollbar-thumb { background: rgba(234,88,12,0.3); border-radius: 4px; }
      `}</style>

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section style={{
        position: "relative",
        overflow: "hidden",
        padding: "110px 24px 72px",
        textAlign: "center",
        borderBottom: "1px solid rgba(234,88,12,0.1)",
      }}>
        {/* background blobs */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden", opacity: 0.18 }}>
          <div style={{ position: "absolute", top: 0, left: 0, width: 380, height: 380, background: "#fb923c", borderRadius: "50%", filter: "blur(80px)" }} />
          <div style={{ position: "absolute", bottom: 0, right: 0, width: 380, height: 380, background: "#fbbf24", borderRadius: "50%", filter: "blur(80px)" }} />
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, background: "#fde68a", borderRadius: "50%", filter: "blur(100px)", opacity: 0.4 }} />
        </div>

        <div style={{ position: "relative", zIndex: 1, maxWidth: 640, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 20 }}
          >
            <div style={{ width: 28, height: 1, background: "#fb923c" }} />
            <span className="cinzel" style={{ fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase", color: "#ea580c" }}>
              ISKCON Durgapur
            </span>
            <div style={{ width: 28, height: 1, background: "#fb923c" }} />
          </motion.div>

          <motion.h1
            className="cinzel gold-text"
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25 }}
            style={{ fontSize: "clamp(32px, 5.5vw, 58px)", fontWeight: 600, lineHeight: 1.05, marginBottom: 12 }}
          >
            Contact Us
          </motion.h1>

          <motion.p
            className="cinzel"
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            style={{ color: "#c2410c", fontSize: "clamp(9px, 1.1vw, 11px)", letterSpacing: "0.22em", marginBottom: 20 }}
          >
            We would love to hear from you
          </motion.p>

          <div className="divider" style={{ marginBottom: 22 }}>
            <span style={{ color: "rgba(234,88,12,0.4)", fontSize: 10 }}>✦</span>
          </div>

          <motion.blockquote
            className="cormorant"
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ delay: 0.55 }}
            style={{
              fontSize: "clamp(15px, 1.8vw, 19px)",
              fontStyle: "italic", color: "#92400e",
              lineHeight: 1.7, maxWidth: 440, margin: "0 auto 24px",
            }}
          >
            &ldquo;The temple doors are always open — to the seeker, the curious, and the devoted alike.&rdquo;
          </motion.blockquote>

          {/* Open badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(255,255,255,0.8)", backdropFilter: "blur(8px)",
              padding: "10px 20px", borderRadius: 999,
              boxShadow: "0 4px 18px rgba(234,88,12,0.12)",
              border: "1px solid rgba(234,88,12,0.15)",
            }}
          >
            <span style={{ width: 8, height: 8, background: "#22c55e", borderRadius: "50%", display: "inline-block", boxShadow: "0 0 0 3px rgba(34,197,94,0.2)" }} />
            <span className="cinzel" style={{ fontSize: 10, letterSpacing: "0.18em", color: "#374151" }}>
              Temple Open Daily · 4:30 AM – 8:30 PM
            </span>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CONTACT CARDS
      ══════════════════════════════════════ */}
      <section style={{ padding: "72px 24px 0", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
          {contactDetails.map(({ icon, label, lines }, i) => (
            <Reveal key={label} delay={i * 80}>
              <div className="contact-card">
                <div style={{ fontSize: 28, marginBottom: 14 }}>{icon}</div>
                <p className="cinzel" style={{ color: "#c2410c", fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", marginBottom: 10 }}>{label}</p>
                {lines.map(line => (
                  <p key={line} style={{ color: "#78350f", fontSize: 15, lineHeight: 1.75 }}>{line}</p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          FORM + SCHEDULE
      ══════════════════════════════════════ */}
      <section style={{ padding: "72px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48, alignItems: "start" }}>

          {/* ── Contact Form ── */}
          <Reveal>
            <p className="cinzel" style={{ color: "#c2410c", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 10 }}>Send a Message</p>
            <h2 className="cinzel" style={{ fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 600, lineHeight: 1.2, marginBottom: 28, color: "#3a1a08" }}>
              Get in <span className="gold-text">Touch</span>
            </h2>

            {submitted ? (
              <div style={{
                textAlign: "center", padding: "52px 28px",
                background: "rgba(255,255,255,0.75)",
                border: "1px solid rgba(234,88,12,0.2)", borderRadius: 20,
                boxShadow: "0 8px 36px rgba(234,88,12,0.1)",
              }}>
                <p style={{ fontSize: 42, marginBottom: 16 }}>🙏</p>
                <p className="cinzel gold-text" style={{ fontSize: 20, marginBottom: 10 }}>Hare Krishna!</p>
                <p style={{ color: "#78350f", fontSize: 16, lineHeight: 1.75 }}>
                  Thank you for reaching out. A devotee will get back to you shortly.
                </p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <p className="cinzel" style={{ color: "#c2410c", fontSize: 9, letterSpacing: "0.2em", marginBottom: 7 }}>NAME *</p>
                    <input className="form-input" name="name" placeholder="Your name" value={form.name} onChange={handleChange} />
                  </div>
                  <div>
                    <p className="cinzel" style={{ color: "#c2410c", fontSize: 9, letterSpacing: "0.2em", marginBottom: 7 }}>PHONE</p>
                    <input className="form-input" name="phone" placeholder="+91 00000 00000" value={form.phone} onChange={handleChange} />
                  </div>
                </div>

                <div>
                  <p className="cinzel" style={{ color: "#c2410c", fontSize: 9, letterSpacing: "0.2em", marginBottom: 7 }}>EMAIL *</p>
                  <input className="form-input" name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange} />
                </div>

                <div>
                  <p className="cinzel" style={{ color: "#c2410c", fontSize: 9, letterSpacing: "0.2em", marginBottom: 7 }}>SUBJECT</p>
                  <select className="form-input" name="subject" value={form.subject} onChange={handleChange}>
                    <option value="">Select a topic</option>
                    <option value="visit">Planning a Visit</option>
                    <option value="seva">Volunteer / Seva</option>
                    <option value="donation">Donation Enquiry</option>
                    <option value="event">Event / Programme</option>
                    <option value="counselling">Spiritual Counselling</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <p className="cinzel" style={{ color: "#c2410c", fontSize: 9, letterSpacing: "0.2em", marginBottom: 7 }}>MESSAGE *</p>
                  <textarea
                    className="form-input"
                    name="message"
                    rows={5}
                    placeholder="How can we serve you?"
                    value={form.message}
                    onChange={handleChange}
                    style={{ resize: "vertical" }}
                  />
                </div>

                <button
                  className="submit-btn"
                  onClick={handleSubmit}
                  disabled={loading || !form.name || !form.email || !form.message}
                >
                  {loading ? "Sending…" : "Send Message ✦"}
                </button>

                <p style={{ color: "rgba(194,65,12,0.5)", fontSize: 12, textAlign: "center", fontStyle: "italic" }}>
                  * Required fields
                </p>
              </div>
            )}
          </Reveal>

          {/* ── Right column ── */}
          <Reveal delay={120}>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

              {/* Daily Schedule */}
              <div className="contact-card">
                <p className="cinzel" style={{ color: "#c2410c", fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", marginBottom: 18 }}>Daily Temple Programme</p>
                {scheduleHighlights.map(({ time, name }) => (
                  <div key={time} className="schedule-row">
                    <p className="cinzel" style={{ color: "#ea580c", fontSize: 12, letterSpacing: "0.05em" }}>{time}</p>
                    <p style={{ color: "#78350f", fontSize: 15 }}>{name}</p>
                  </div>
                ))}
              </div>

              {/* Social */}
              <div className="contact-card">
                <p className="cinzel" style={{ color: "#c2410c", fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", marginBottom: 16 }}>Connect With Us</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {socialLinks.map(({ platform, handle, href, Icon }) => (
                    <a
                      key={platform}
                      href={href}
                      style={{ display: "flex", justifyContent: "space-between", alignItems: "center", textDecoration: "none", padding: "8px 0", borderBottom: "1px solid rgba(234,88,12,0.07)" }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <Icon style={{ color: "#ea580c", fontSize: 15, opacity: 0.75 }} />
                        <p className="cinzel" style={{ color: "#c2410c", fontSize: 10, letterSpacing: "0.12em" }}>{platform}</p>
                      </div>
                      <p style={{ color: "#78350f", fontSize: 14 }}>{handle}</p>
                    </a>
                  ))}
                </div>
              </div>

              {/* How to Reach */}
              <div className="contact-card">
                <p className="cinzel" style={{ color: "#c2410c", fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", marginBottom: 16 }}>How to Reach Us</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {[
                    { mode: "By Auto / Taxi", detail: "Ask for ISKCON Temple, City Centre" },
                    { mode: "By Bus",         detail: "Durgapur City Centre stop" },
                    { mode: "By Train",       detail: "Durgapur Station — 3 km away" },
                  ].map(({ mode, detail }) => (
                    <div key={mode}>
                      <p className="cinzel" style={{ color: "#ea580c", fontSize: 11, letterSpacing: "0.08em", marginBottom: 3 }}>{mode}</p>
                      <p style={{ color: "#78350f", fontSize: 14 }}>{detail}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════
          MAP
      ══════════════════════════════════════ */}
      <section style={{ padding: "0 24px 80px", maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <p className="cinzel" style={{ color: "#c2410c", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 12, textAlign: "center" }}>Find Us</p>
          <h2 className="cinzel" style={{ textAlign: "center", fontSize: "clamp(20px, 3vw, 32px)", color: "#3a1a08", marginBottom: 28 }}>
            Visit the <span className="gold-text">Temple</span>
          </h2>
          <div style={{
            width: "100%", aspectRatio: "16/9",
            background: "rgba(255,255,255,0.6)",
            border: "1px solid rgba(234,88,12,0.15)",
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: "0 8px 40px rgba(234,88,12,0.1)",
          }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902!2d87.3241!3d23.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zISKCON+Durgapur!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="ISKCON Durgapur Location"
            />
          </div>
        </Reveal>
      </section>

      {/* ══════════════════════════════════════
          FOOTER BAR (matches HeroSection)
      ══════════════════════════════════════ */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        flexWrap: "wrap", gap: 16,
        padding: "16px 24px",
        borderTop: "1px solid rgba(234,88,12,0.15)",
        background: "rgba(254,215,170,0.45)",
      }}>
        {[
          "Mangal Arati · 4:30 AM",
          "Hare Krishna Kirtan",
          "Prasadam Daily",
          "Bhagavad Gita Classes",
          "Spiritual Counselling",
        ].map((text, i) => (
          <React.Fragment key={text}>
            {i > 0 && <div style={{ width: 1, height: 14, background: "#fb923c", opacity: 0.5 }} />}
            <div className="cinzel" style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase", color: "#ea580c" }}>
              <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#fb923c", flexShrink: 0 }} />
              {text}
            </div>
          </React.Fragment>
        ))}
      </div>
    </main>
  );
}