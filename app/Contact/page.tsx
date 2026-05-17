"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaYoutube, FaWhatsapp, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

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

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
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
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => { setIsLoaded(true); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  const isDisabled = loading || !form.name || !form.email || !form.message;

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

        /* ── Two main cards ── */
        .panel {
          background: rgba(255,255,255,0.82);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(234,88,12,0.13);
          border-radius: 24px;
          padding: 40px 36px;
          box-shadow: 0 6px 36px rgba(234,88,12,0.08);
          transition: box-shadow 0.3s, border-color 0.3s;
        }
        .panel:hover {
          box-shadow: 0 12px 48px rgba(234,88,12,0.14);
          border-color: rgba(234,88,12,0.22);
        }

        /* ── Info rows inside left panel ── */
        .info-row {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 18px 0;
          border-bottom: 1px solid rgba(234,88,12,0.09);
        }
        .info-row:last-of-type { border-bottom: none; }

        .icon-bubble {
          width: 44px; height: 44px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, #fff7ed, #ffedd5);
          border: 1px solid rgba(234,88,12,0.18);
          box-shadow: 0 2px 10px rgba(234,88,12,0.1);
          font-size: 17px; color: #ea580c;
        }

        /* ── Social icons ── */
        .social-btn {
          width: 44px; height: 44px; border-radius: 50%; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; color: #fff;
          transition: transform 0.2s, box-shadow 0.2s;
          text-decoration: none;
        }
        .social-btn:hover { transform: translateY(-3px); box-shadow: 0 6px 18px rgba(0,0,0,0.18); }

        /* ── Form inputs ── */
        .form-input {
          width: 100%;
          background: rgba(255,255,255,0.9);
          border: 1.5px solid rgba(234,88,12,0.18);
          border-radius: 12px;
          padding: 13px 16px;
          color: #3a1a08;
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 16px;
          outline: none;
          transition: border-color 0.25s, box-shadow 0.25s;
          box-sizing: border-box;
        }
        .form-input::placeholder { color: rgba(120,53,15,0.35); }
        .form-input:focus {
          border-color: rgba(234,88,12,0.5);
          box-shadow: 0 0 0 3px rgba(234,88,12,0.09);
          background: #fff;
        }

        /* ── Submit button ── */
        .submit-btn {
          width: 100%; padding: 15px 24px;
          background: linear-gradient(135deg, #ea580c, #d97706);
          border: none; border-radius: 12px;
          color: #fff;
          font-family: 'Cinzel', serif;
          font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase;
          cursor: pointer;
          transition: opacity 0.25s, transform 0.2s, box-shadow 0.25s;
          box-shadow: 0 4px 20px rgba(234,88,12,0.32);
        }
        .submit-btn:hover:not(:disabled) {
          opacity: 0.91; transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(234,88,12,0.42);
        }
        .submit-btn:disabled { opacity: 0.42; cursor: not-allowed; }

        /* ── Section label ── */
        .section-label {
          font-family: 'Cinzel', serif;
          font-size: 9px; letter-spacing: 0.3em;
          text-transform: uppercase; color: #c2410c;
          margin-bottom: 8px;
        }

        .divider {
          display: flex; align-items: center; gap: 14px; justify-content: center;
        }
        .divider::before, .divider::after {
          content: ''; height: 1px; width: 64px;
          background: linear-gradient(90deg, transparent, rgba(234,88,12,0.35));
        }
        .divider::after { background: linear-gradient(90deg, rgba(234,88,12,0.35), transparent); }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #fff7ed; }
        ::-webkit-scrollbar-thumb { background: rgba(234,88,12,0.3); border-radius: 4px; }
      `}</style>

      {/* ══ HERO ══ */}
      <section style={{
        position: "relative", overflow: "hidden",
        padding: "110px 24px 72px", textAlign: "center",
        borderBottom: "1px solid rgba(234,88,12,0.1)",
      }}>
        {/* blobs */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden", opacity: 0.18 }}>
          <div style={{ position: "absolute", top: 0, left: 0, width: 380, height: 380, background: "#fb923c", borderRadius: "50%", filter: "blur(80px)" }} />
          <div style={{ position: "absolute", bottom: 0, right: 0, width: 380, height: 380, background: "#fbbf24", borderRadius: "50%", filter: "blur(80px)" }} />
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, background: "#fde68a", borderRadius: "50%", filter: "blur(100px)", opacity: 0.4 }} />
        </div>

        <div style={{ position: "relative", zIndex: 1, maxWidth: 640, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={isLoaded ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
            style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ width: 28, height: 1, background: "#fb923c" }} />
            <span className="cinzel" style={{ fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase", color: "#ea580c" }}>ISKCON Durgapur</span>
            <div style={{ width: 28, height: 1, background: "#fb923c" }} />
          </motion.div>

          <motion.h1 className="cinzel gold-text"
            initial={{ opacity: 0, y: 20 }} animate={isLoaded ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.25 }}
            style={{ fontSize: "clamp(32px, 5.5vw, 58px)", fontWeight: 600, lineHeight: 1.05, marginBottom: 12 }}>
            Contact Us
          </motion.h1>

          <motion.p className="cinzel"
            initial={{ opacity: 0 }} animate={isLoaded ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}
            style={{ color: "#c2410c", fontSize: "clamp(9px, 1.1vw, 11px)", letterSpacing: "0.22em", marginBottom: 20 }}>
            We would love to hear from you
          </motion.p>

          <div className="divider" style={{ marginBottom: 22 }}>
            <span style={{ color: "rgba(234,88,12,0.4)", fontSize: 10 }}>✦</span>
          </div>

          <motion.blockquote className="cormorant"
            initial={{ opacity: 0 }} animate={isLoaded ? { opacity: 1 } : {}} transition={{ delay: 0.55 }}
            style={{ fontSize: "clamp(15px, 1.8vw, 19px)", fontStyle: "italic", color: "#92400e", lineHeight: 1.7, maxWidth: 440, margin: "0 auto 24px" }}>
            &ldquo;The temple doors are always open — to the seeker, the curious, and the devoted alike.&rdquo;
          </motion.blockquote>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={isLoaded ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.7 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(255,255,255,0.8)", backdropFilter: "blur(8px)",
              padding: "10px 20px", borderRadius: 999,
              boxShadow: "0 4px 18px rgba(234,88,12,0.12)", border: "1px solid rgba(234,88,12,0.15)",
            }}>
            <span style={{ width: 8, height: 8, background: "#22c55e", borderRadius: "50%", display: "inline-block", boxShadow: "0 0 0 3px rgba(34,197,94,0.2)" }} />
            <span className="cinzel" style={{ fontSize: 10, letterSpacing: "0.18em", color: "#374151" }}>
              Temple Open Daily · 4:30 AM – 8:30 PM
            </span>
          </motion.div>
        </div>
      </section>

      {/* ══ TWO-BOX CONTACT SECTION ══ */}
      <section style={{ padding: "72px 24px 80px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 32,
          alignItems: "start",
        }}>

          {/* ── LEFT BOX · Get in Touch ── */}
          <Reveal delay={0}>
            <div className="panel" style={{ height: "100%" }}>
              <p className="section-label">Contact</p>
              <h2 className="cinzel gold-text" style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 600, marginBottom: 32, lineHeight: 1.2 }}>
                Get in Touch
              </h2>

              {/* Location */}
              <div className="info-row">
                <div className="icon-bubble">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <p className="cinzel" style={{ color: "#c2410c", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 6 }}>
                    Our Location
                  </p>
                  <p style={{ color: "#78350f", fontSize: 15, lineHeight: 1.8 }}>
                    ISKCON Durgapur<br />
                    Netaji Subhas Chandra Bose Road, A-Zone,<br />
                    Durgapur, West Bengal, India 713204
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="info-row">
                <div className="icon-bubble">
                  <FaEnvelope />
                </div>
                <div>
                  <p className="cinzel" style={{ color: "#c2410c", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 6 }}>
                    Email
                  </p>
                  <p style={{ color: "#78350f", fontSize: 15, lineHeight: 1.8 }}>
                    info.iskcondurgapur@gmail.com
                  </p>
                </div>
              </div>

              {/* Connect With Us */}
              <div style={{ marginTop: 32 }}>
                <p className="cinzel" style={{ color: "#3a1a08", fontSize: 16, fontWeight: 600, marginBottom: 16, letterSpacing: "0.04em" }}>
                  Connect With Us
                </p>
                <div style={{ display: "flex", gap: 14 }}>
                  <a href="#" className="social-btn" style={{ background: "#1877f2" }} aria-label="Facebook">
                    <FaFacebook />
                  </a>
                  <a href="#" className="social-btn" style={{ background: "#ff0000" }} aria-label="YouTube">
                    <FaYoutube />
                  </a>
                  <a href="#" className="social-btn" style={{ background: "#25d366" }} aria-label="WhatsApp">
                    <FaWhatsapp />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ── RIGHT BOX · Send a Message ── */}
          <Reveal delay={120}>
            <div className="panel">
              <p className="section-label">Reach Out</p>
              <h2 className="cinzel gold-text" style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 600, marginBottom: 32, lineHeight: 1.2 }}>
                Send us a Message
              </h2>

              {submitted ? (
                <div style={{
                  textAlign: "center", padding: "52px 28px",
                  background: "rgba(255,247,237,0.8)", borderRadius: 16,
                  border: "1px solid rgba(234,88,12,0.15)",
                }}>
                  <p style={{ fontSize: 42, marginBottom: 16 }}>🙏</p>
                  <p className="cinzel gold-text" style={{ fontSize: 20, marginBottom: 10 }}>Hare Krishna!</p>
                  <p style={{ color: "#78350f", fontSize: 16, lineHeight: 1.75 }}>
                    Thank you for reaching out. A devotee will get back to you shortly.
                  </p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

                  {/* Name + Email row */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                      <p className="cinzel" style={{ color: "#c2410c", fontSize: 9, letterSpacing: "0.2em", marginBottom: 8 }}>NAME</p>
                      <input
                        className="form-input"
                        name="name"
                        placeholder="Your Name"
                        value={form.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <p className="cinzel" style={{ color: "#c2410c", fontSize: 9, letterSpacing: "0.2em", marginBottom: 8 }}>EMAIL</p>
                      <input
                        className="form-input"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <p className="cinzel" style={{ color: "#c2410c", fontSize: 9, letterSpacing: "0.2em", marginBottom: 8 }}>SUBJECT</p>
                    <input
                      className="form-input"
                      name="subject"
                      placeholder="How can we help?"
                      value={form.subject}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <p className="cinzel" style={{ color: "#c2410c", fontSize: 9, letterSpacing: "0.2em", marginBottom: 8 }}>MESSAGE</p>
                    <textarea
                      className="form-input"
                      name="message"
                      rows={6}
                      placeholder="Write your message here..."
                      value={form.message}
                      onChange={handleChange}
                      style={{ resize: "vertical" }}
                    />
                  </div>

                  <button
                    className="submit-btn"
                    onClick={handleSubmit}
                    disabled={isDisabled}
                  >
                    {loading ? "Sending…" : "Send Message"}
                  </button>
                </div>
              )}
            </div>
          </Reveal>

        </div>
      </section>

      {/* ══ MAP ══ */}
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
            borderRadius: 20, overflow: "hidden",
            boxShadow: "0 8px 40px rgba(234,88,12,0.1)",
          }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902!2d87.3241!3d23.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zISKCON+Durgapur!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%" height="100%"
              style={{ border: 0 }}
              allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="ISKCON Durgapur Location"
            />
          </div>
        </Reveal>
      </section>

      {/* ══ FOOTER BAR ══ */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        flexWrap: "wrap", gap: 16, padding: "16px 24px",
        borderTop: "1px solid rgba(234,88,12,0.15)",
        background: "rgba(254,215,170,0.45)",
      }}>
        {["Mangal Arati · 4:30 AM", "Hare Krishna Kirtan", "Prasadam Daily", "Bhagavad Gita Classes", "Spiritual Counselling"].map((text, i) => (
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