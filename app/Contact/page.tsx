"use client";
import React, { useEffect, useRef, useState } from "react";

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

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "", email: "", phone: "", subject: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200)); // simulate send
    setLoading(false);
    setSubmitted(true);
  };

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

        .divider {
          display: flex; align-items: center; gap: 14px; justify-content: center;
        }
        .divider::before, .divider::after {
          content: ''; height: 1px; width: 64px;
          background: linear-gradient(90deg, transparent, #c97c3080);
        }
        .divider::after { background: linear-gradient(90deg, #c97c3080, transparent); }

        .contact-card {
          background: linear-gradient(145deg, #1a0d04, #120900);
          border: 1px solid #c97c3020;
          border-radius: 14px;
          padding: 24px 22px;
          transition: border-color 0.3s;
        }
        .contact-card:hover { border-color: #c97c3045; }

        .form-input {
          width: 100%;
          background: #110800;
          border: 1px solid #c97c3025;
          border-radius: 10px;
          padding: 13px 16px;
          color: #e2c99a;
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 16px;
          outline: none;
          transition: border-color 0.25s, box-shadow 0.25s;
          box-sizing: border-box;
        }
        .form-input::placeholder { color: #c97c3044; }
        .form-input:focus {
          border-color: #c97c3060;
          box-shadow: 0 0 0 3px #c97c3015;
        }

        select.form-input option { background: #110800; color: #e2c99a; }

        .submit-btn {
          width: 100%;
          padding: 14px 24px;
          background: linear-gradient(135deg, #c97c20, #a05c10);
          border: none; border-radius: 10px;
          color: #fef3d0;
          font-family: 'Cinzel', serif;
          font-size: 12px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          transition: opacity 0.25s, transform 0.2s;
        }
        .submit-btn:hover:not(:disabled) { opacity: 0.88; transform: translateY(-1px); }
        .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .schedule-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #c97c3012;
        }
        .schedule-row:last-child { border-bottom: none; }

        .map-placeholder {
          width: 100%; aspect-ratio: 16/9;
          background: linear-gradient(145deg, #1a0d04, #110800);
          border: 1px solid #c97c3020;
          border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          flex-direction: column; gap: 10px;
          overflow: hidden;
          position: relative;
        }

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
        textAlign: "center", padding: "100px 24px 60px",
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
        <div style={{ position: "relative", zIndex: 1, maxWidth: 640 }}>
          <p className="cinzel" style={{ color: "#c97c3099", fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: 16 }}>
            ISKCON Durgapur
          </p>
          <h1 className="cinzel gold-text" style={{ fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 600, lineHeight: 1.05, marginBottom: 10 }}>
            Contact Us
          </h1>
          <p className="cinzel" style={{ color: "#9a6e3a", fontSize: "clamp(9px, 1.1vw, 11px)", letterSpacing: "0.22em", marginBottom: 18 }}>
            We would love to hear from you
          </p>
          <div className="divider" style={{ marginBottom: 16 }}>
            <span style={{ color: "#c97c3055", fontSize: 10 }}>✦</span>
          </div>
          <blockquote className="cormorant" style={{
            fontSize: "clamp(13px, 1.6vw, 17px)",
            fontStyle: "italic", color: "#a07840",
            lineHeight: 1.65, maxWidth: 420, margin: "0 auto",
          }}>
            &ldquo;The temple doors are always open — to the seeker, the curious, and the devoted alike.&rdquo;
          </blockquote>
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
                <div style={{ fontSize: 26, marginBottom: 12 }}>{icon}</div>
                <p className="cinzel" style={{ color: "#c97c3088", fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", marginBottom: 10 }}>{label}</p>
                {lines.map(line => (
                  <p key={line} style={{ color: "#c4a06a", fontSize: 15, lineHeight: 1.7 }}>{line}</p>
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
            <p className="cinzel" style={{ color: "#c97c3077", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 14 }}>Send a Message</p>
            <h2 className="cinzel" style={{ fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 600, lineHeight: 1.2, marginBottom: 28 }}>
              <span style={{ color: "#d4c4a0" }}>Get in </span>
              <span className="gold-text">Touch</span>
            </h2>

            {submitted ? (
              <div style={{
                textAlign: "center", padding: "48px 24px",
                background: "linear-gradient(145deg,#1a0d04,#120900)",
                border: "1px solid #c97c3030", borderRadius: 14,
              }}>
                <p style={{ fontSize: 36, marginBottom: 14 }}>🙏</p>
                <p className="cinzel gold-text" style={{ fontSize: 18, marginBottom: 10 }}>Hare Krishna!</p>
                <p style={{ color: "#c4a06a", fontSize: 16, lineHeight: 1.7 }}>
                  Thank you for reaching out. A devotee will get back to you shortly.
                </p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <p className="cinzel" style={{ color: "#c97c3077", fontSize: 9, letterSpacing: "0.2em", marginBottom: 7 }}>NAME *</p>
                    <input
                      className="form-input"
                      name="name"
                      placeholder="Your name"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <p className="cinzel" style={{ color: "#c97c3077", fontSize: 9, letterSpacing: "0.2em", marginBottom: 7 }}>PHONE</p>
                    <input
                      className="form-input"
                      name="phone"
                      placeholder="+91 00000 00000"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <p className="cinzel" style={{ color: "#c97c3077", fontSize: 9, letterSpacing: "0.2em", marginBottom: 7 }}>EMAIL *</p>
                  <input
                    className="form-input"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <p className="cinzel" style={{ color: "#c97c3077", fontSize: 9, letterSpacing: "0.2em", marginBottom: 7 }}>SUBJECT</p>
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
                  <p className="cinzel" style={{ color: "#c97c3077", fontSize: 9, letterSpacing: "0.2em", marginBottom: 7 }}>MESSAGE *</p>
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
                  {loading ? "Sending..." : "Send Message"}
                </button>

                <p style={{ color: "#c97c3055", fontSize: 12, textAlign: "center", fontStyle: "italic" }}>
                  * Required fields
                </p>
              </div>
            )}
          </Reveal>

          {/* ── Right column: schedule + social ── */}
          <Reveal delay={120}>
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>

              {/* Daily Schedule */}
              <div className="contact-card">
                <p className="cinzel" style={{ color: "#c97c3088", fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", marginBottom: 18 }}>Daily Temple Programme</p>
                {scheduleHighlights.map(({ time, name }) => (
                  <div key={time} className="schedule-row">
                    <p className="cinzel" style={{ color: "#e8a830", fontSize: 12, letterSpacing: "0.05em" }}>{time}</p>
                    <p style={{ color: "#c4a06a", fontSize: 14 }}>{name}</p>
                  </div>
                ))}
              </div>

              {/* Social / Connect */}
              <div className="contact-card">
                <p className="cinzel" style={{ color: "#c97c3088", fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", marginBottom: 16 }}>Connect With Us</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    { platform: "Facebook", handle: "@ISKCONDurgapur", href: "#" },
                    { platform: "Instagram", handle: "@iskcon.durgapur", href: "#" },
                    { platform: "YouTube",   handle: "ISKCON Durgapur",  href: "#" },
                    { platform: "WhatsApp",  handle: "+91 98765 43210",  href: "#" },
                  ].map(({ platform, handle, href }) => (
                    <a key={platform} href={href} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", textDecoration: "none" }}>
                      <p className="cinzel" style={{ color: "#c97c3077", fontSize: 10, letterSpacing: "0.12em" }}>{platform}</p>
                      <p style={{ color: "#c4a06a", fontSize: 14 }}>{handle}</p>
                    </a>
                  ))}
                </div>
              </div>

              {/* How to reach */}
              <div className="contact-card">
                <p className="cinzel" style={{ color: "#c97c3088", fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", marginBottom: 14 }}>How to Reach Us</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { mode: "By Auto / Taxi", detail: "Ask for ISKCON Temple, City Centre" },
                    { mode: "By Bus",         detail: "Durgapur City Centre stop" },
                    { mode: "By Train",       detail: "Durgapur Station — 3 km away" },
                  ].map(({ mode, detail }) => (
                    <div key={mode}>
                      <p className="cinzel" style={{ color: "#e8a830", fontSize: 11, letterSpacing: "0.08em", marginBottom: 2 }}>{mode}</p>
                      <p style={{ color: "#c4a06a", fontSize: 14 }}>{detail}</p>
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
          <p className="cinzel" style={{ color: "#c97c3070", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 12, textAlign: "center" }}>Find Us</p>
          <h2 className="cinzel" style={{ textAlign: "center", fontSize: "clamp(20px, 3vw, 30px)", color: "#d4c4a0", marginBottom: 28 }}>
            Visit the <span className="gold-text">Temple</span>
          </h2>
          <div className="map-placeholder">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902!2d87.3241!3d23.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zISKCON+Durgapur!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: 16, filter: "invert(90%) hue-rotate(180deg)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="ISKCON Durgapur Location"
            />
          </div>
        </Reveal>
      </section>

      {/* ══════════════════════════════════════
          FOOTER NOTE
      ══════════════════════════════════════ */}
      <div style={{ textAlign: "center", padding: "28px 24px", borderTop: "1px solid #c97c3012" }}>
        <p className="cinzel" style={{ color: "#c97c3035", fontSize: 10, letterSpacing: "0.22em" }}>
          Hare Krishna · Hare Krishna · Krishna Krishna · Hare Hare · Hare Rāma · Hare Rāma · Rāma Rāma · Hare Hare
        </p>
      </div>
    </main>
  );
}