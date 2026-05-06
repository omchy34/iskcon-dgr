"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight, FaPrayingHands } from "react-icons/fa";

const HeroSection: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500&display=swap');

        .h-shell   { font-family: 'Cormorant Garamond', Georgia, serif; }
        .cinzel    { font-family: 'Cinzel', serif; }
        .cormorant { font-family: 'Cormorant Garamond', Georgia, serif; }

        .img-overlay::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 45%);
          pointer-events: none;
          z-index: 1;
        }
      `}</style>

      <div
        className="h-shell relative min-h-screen flex flex-col overflow-hidden"
        style={{ background: "linear-gradient(135deg, #fff7ed 0%, #fffbeb 50%, #ffedd5 100%)" }}
      >

        {/* ── Background blobs ── */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" style={{ opacity: 0.18 }}>
          <div className="absolute top-0 left-0 w-96 h-96 bg-orange-300 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-0 right-0 w-96 h-96 bg-amber-300 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-yellow-200 rounded-full blur-3xl"
            style={{ opacity: 0.4 }}
          />
        </div>

        {/* ── Main grid ── */}
        <div className="relative z-10 flex-1 grid lg:grid-cols-2 items-center gap-12 px-8 lg:px-16 pt-28 pb-12 max-w-6xl mx-auto w-full">

          {/* ── LEFT COLUMN ── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:items-start items-center text-center lg:text-left"
          >

            {/* Location tag */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 mb-5"
            >
              <div className="w-7 h-px bg-orange-400" />
              <span className="cinzel text-xs tracking-widest uppercase text-orange-500">
                ISKCON Durgapur · West Bengal
              </span>
              <div className="w-7 h-px bg-orange-400" />
            </motion.div>

            {/* Open badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg mb-6"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="cinzel text-xs tracking-wider text-gray-700">
                Temple Open Daily · 4:30 AM – 8:30 PM
              </span>
            </motion.div>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isLoaded ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="mb-1"
            >
              <p className="cinzel text-sm tracking-[0.3em] uppercase text-orange-400 mb-1">
                Shri Shri
              </p>
              <h1
                className="cormorant font-light leading-none text-gray-800"
                style={{ fontSize: "clamp(2.4rem, 4vw, 3.8rem)", letterSpacing: "0.01em" }}
              >
                Radha<br />
                <span className="bg-linear-to-br from-orange-600 via-amber-500 to-orange-600 bg-clip-text text-transparent italic">
                  Madanmohan
                </span>
              </h1>
            </motion.div>

            {/* Decorative rule */}
            <div className="flex items-center gap-3 my-4">
              <div
                className="w-16 h-px"
                style={{ background: "linear-gradient(90deg, rgba(234,88,12,0.5), transparent)" }}
              />
              <div className="w-1.5 h-1.5 rotate-45 bg-orange-500 opacity-65 shrink-0" />
              <div
                className="w-16 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(234,88,12,0.5))" }}
              />
            </div>

            {/* Sanskrit verse */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isLoaded ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="mb-5 p-4 bg-white/60 backdrop-blur-sm rounded-xl border-l-4 border-orange-500 w-full max-w-sm"
            >
              <p className="cormorant text-xl text-orange-700 mb-1 italic">हरे कृष्ण हरे कृष्ण</p>
              <p className="cormorant text-lg text-orange-600 italic">कृष्ण कृष्ण हरे हरे</p>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={isLoaded ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
              className="cormorant text-lg font-light italic leading-relaxed text-gray-600 mb-7 max-w-sm"
            >
              Come, take shelter at the lotus feet of the Supreme Lord —
              where devotion transcends time and the soul finds its eternal home.
            </motion.p>

            {/* ── CTA BUTTONS — FIXED ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9 }}
              className="flex flex-row gap-3 justify-center lg:justify-start mb-7"
            >
              {/* Primary button */}
              <Link
                href="/visit"
                className="group cinzel inline-flex items-center justify-center gap-2 bg-linear-to-br from-orange-500 to-amber-500 text-white rounded-2xl shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all duration-300"
                style={{
                  padding: "13px 24px",
                  fontSize: "10px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                }}
              >
                Plan Your Visit
                <FaArrowRight className="group-hover:translate-x-1 transition-transform text-[11px]" />
              </Link>

              {/* Secondary button */}
              <Link
                href="/donate"
                className="group cinzel inline-flex items-center justify-center gap-2 bg-white text-orange-600 rounded-2xl hover:-translate-y-0.5 transition-all duration-300"
                style={{
                  padding: "13px 24px",
                  fontSize: "10px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  border: "1.5px solid #fdba74",
                  boxShadow: "0 4px 14px rgba(234,88,12,0.12)",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#ea580c";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(234,88,12,0.2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#fdba74";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 14px rgba(234,88,12,0.12)";
                }}
              >
                <FaPrayingHands />
                Support Seva
              </Link>
            </motion.div>

            {/* Stats */}
            <div className="flex items-stretch gap-0 pt-4 w-full border-t border-orange-200">
              {[
                { num: "4", label: "Daily Arati", italic: false },
                { num: "365", label: "Days Open", italic: false },
                { num: "∞", label: "Mercy & Grace", italic: true },
              ].map((s, i) => (
                <div key={i} className="flex items-stretch">
                  {i > 0 && (
                    <div className="w-px self-stretch bg-orange-200 mx-6" />
                  )}
                  <div>
                    <div
                      className={`cormorant font-light text-2xl leading-none mb-1 text-orange-500 ${s.italic ? "italic" : ""}`}
                    >
                      {s.num}
                    </div>
                    <div className="cinzel text-[7px] tracking-[0.2em] uppercase text-orange-400">
                      {s.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT COLUMN — image ── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Tilt accent cards */}
            <motion.div
              initial={{ opacity: 0, rotate: -3 }}
              animate={isLoaded ? { opacity: 1, rotate: -6 } : {}}
              transition={{ delay: 0.5 }}
              className="absolute -top-4 -left-4 w-32 h-40 bg-linear-to-br from-amber-400 to-orange-500 rounded-2xl -z-10 shadow-lg"
            />
            <motion.div
              initial={{ opacity: 0, rotate: 3 }}
              animate={isLoaded ? { opacity: 1, rotate: 6 } : {}}
              transition={{ delay: 0.7 }}
              className="absolute -bottom-4 -right-4 w-40 h-32 bg-linear-to-br from-orange-400 to-red-500 rounded-2xl -z-10 shadow-lg"
            />

            {/* ── IMAGE FRAME — border rings removed ── */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative z-10"
            >
              {/* Image — clean, no border rings */}
              <div
                className="img-overlay relative h-100 sm:h-125 rounded-3xl overflow-hidden shadow-2xl"
                style={{ transform: `translateY(${scrollY * 0.04}px)` }}
              >
                <Image
                  src="/radhamadanmohan.jpg"
                  alt="Shri Shri Radha Madanmohan"
                  fill
                  style={{ objectFit: "cover", objectPosition: "top" }}
                  priority
                />
              </div>

              {/* Floating info card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.2 }}
                className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl z-10"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="cinzel font-bold text-gray-800 text-[10px] tracking-wide uppercase leading-snug">
                      Sri Sri Radha Madanmohan Temple
                    </h3>
                    <p className="cinzel text-gray-500 text-[8.5px] tracking-wider uppercase mt-0.5">
                      Durgapur, West Bengal
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-2xl">🙏</div>
                    <p className="cinzel text-[7px] text-gray-500 tracking-widest uppercase mt-0.5">
                      Jai Sri Krishna
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Caption */}
            <div className="mt-6 text-center cinzel text-[7.5px] tracking-[0.3em] uppercase text-orange-400">
              Shri Shri Radha Madanmohan · ISKCON Durgapur
            </div>
          </motion.div>

        </div>

        {/* ── Footer bar ── */}
        <div
          className="relative z-10 flex items-center justify-center flex-wrap gap-4 px-8 py-4"
          style={{
            borderTop: "1px solid rgba(234,88,12,0.15)",
            background: "rgba(254,215,170,0.45)",
          }}
        >
          {[
            "Mangal Arati · 4:30 AM",
            "Hare Krishna Kirtan",
            "Prasadam Daily",
            "Bhagavad Gita Classes",
            "Spiritual Counselling",
          ].map((text, i) => (
            <div key={i} style={{ display: "contents" }}>
              {i > 0 && (
                <div className="w-px h-3.5 hidden sm:block bg-orange-300" />
              )}
              <div className="flex items-center gap-2 cinzel text-[8px] tracking-[0.2em] uppercase text-orange-500">
                <div className="w-1 h-1 rounded-full shrink-0 bg-orange-400" />
                {text}
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
};

export default HeroSection;