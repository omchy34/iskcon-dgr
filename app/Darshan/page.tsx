"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";

// ── Gallery Images ──────────────────────────────────────────────────────────
const DEITY_IMAGES = [
  "/deity/WhatsApp Image 2026-05-17 at 10.05.09 PM.jpeg",
  "/deity/WhatsApp Image 2026-05-17 at 10.05.10 PM.jpeg",
  "/deity/WhatsApp Image 2026-05-17 at 10.05.11 PM (1).jpeg",
  "/deity/WhatsApp Image 2026-05-17 at 10.05.11 PM.jpeg",
  "/deity/WhatsApp Image 2026-05-17 at 10.05.12 PM.jpeg",
  "/deity/WhatsApp Image 2026-05-17 at 10.05.13 PM (1).jpeg",
  "/deity/WhatsApp Image 2026-05-17 at 10.05.13 PM.jpeg",
  "/deity/WhatsApp Image 2026-05-17 at 10.05.14 PM.jpeg",
  "/deity/WhatsApp Image 2026-05-17 at 10.05.15 PM (1).jpeg",
  "/deity/WhatsApp Image 2026-05-17 at 10.05.15 PM.jpeg",
  "/deity/WhatsApp Image 2026-05-17 at 10.05.16 PM (1).jpeg",
  "/deity/WhatsApp Image 2026-05-17 at 10.05.16 PM.jpeg",
  "/deity/WhatsApp Image 2026-05-17 at 10.05.17 PM (1).jpeg",
  "/deity/WhatsApp Image 2026-05-17 at 10.05.17 PM.jpeg",
  "/deity/WhatsApp Image 2026-05-17 at 10.05.18 PM (1).jpeg",
  "/deity/WhatsApp Image 2026-05-17 at 10.05.18 PM.jpeg",
  "/deity/WhatsApp Image 2026-05-17 at 10.05.19 PM (1).jpeg",
  "/deity/WhatsApp Image 2026-05-17 at 10.05.19 PM.jpeg",
  "/deity/WhatsApp Image 2026-05-17 at 10.05.20 PM.jpeg",
];

// ── Main Component ──────────────────────────────────────────────────────────
const GalleryPage: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => { setIsLoaded(true); }, []);

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);

  const prev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + DEITY_IMAGES.length) % DEITY_IMAGES.length);
  }, [lightboxIndex]);

  const next = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % DEITY_IMAGES.length);
  }, [lightboxIndex]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, prev, next]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500&display=swap');
        .g-shell   { font-family: 'Cormorant Garamond', Georgia, serif; }
        .cinzel    { font-family: 'Cinzel', serif; }
        .cormorant { font-family: 'Cormorant Garamond', Georgia, serif; }

        .gallery-card {
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease;
        }
        .gallery-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 24px 48px rgba(234,88,12,0.22);
        }
        .lb-backdrop { backdrop-filter: blur(4px); }
      `}</style>

      <div
        className="g-shell relative min-h-screen flex flex-col overflow-hidden"
        style={{ background: "linear-gradient(135deg, #fff7ed 0%, #fffbeb 50%, #ffedd5 100%)" }}
      >
        {/* Background blobs */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" style={{ opacity: 0.16 }}>
          <div className="absolute top-0 left-0 w-96 h-96 bg-orange-300 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        {/* Page Header */}
        <div className="relative z-10 text-center px-8 pt-28 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-4"
          >
            <Link href="/" className="cinzel text-[10px] tracking-widest uppercase text-orange-400 hover:text-orange-600 transition-colors flex items-center gap-2">
              <FaArrowLeft className="text-[9px]" /> Home
            </Link>
            <div className="w-5 h-px bg-orange-300" />
            <span className="cinzel text-[10px] tracking-widest uppercase text-orange-500">
              ISKCON Durgapur · Gallery
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="cormorant font-light leading-none text-gray-800 mb-2"
            style={{ fontSize: "clamp(2.6rem, 5vw, 4.5rem)" }}
          >
            Divine{" "}
            <em className="italic" style={{
              background: "linear-gradient(135deg, #ea580c, #d97706, #ea580c)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Darshan
            </em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="cormorant italic font-light text-xl text-gray-500 max-w-md mx-auto mb-6"
          >
            A glimpse into the eternal beauty of Shri Shri Radha Madanmohan's sacred abode
          </motion.p>

          <div className="flex items-center justify-center gap-3">
            <div className="w-20 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(234,88,12,0.5))" }} />
            <div className="w-1.5 h-1.5 rotate-45 bg-orange-500 opacity-60 shrink-0" />
            <div className="w-20 h-px" style={{ background: "linear-gradient(90deg, rgba(234,88,12,0.5), transparent)" }} />
          </div>
        </div>

        {/* ── Gallery Grid ── */}
        <div className="relative z-10 flex-1 px-8 lg:px-16 pb-16">
          <motion.div
            className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4"
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            {DEITY_IMAGES.map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="gallery-card relative mb-4 rounded-2xl overflow-hidden cursor-pointer break-inside-avoid"
                onClick={() => openLightbox(i)}
              >
                <Image
                  src={src}
                  alt={`Deity darshan ${i + 1}`}
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover"
                  style={{ display: "block" }}
                />
                {/* subtle hover overlay */}
                <div
                  className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                  style={{ background: "rgba(234,88,12,0.15)" }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      background: "rgba(255,255,255,0.25)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(255,255,255,0.4)",
                    }}
                  >
                    <FaArrowRight style={{ fontSize: "11px", color: "#fff" }} />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── Lightbox ── */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              key="lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lb-backdrop fixed inset-0 z-50 flex items-center justify-center p-4"
              style={{ background: "rgba(20,10,5,0.92)" }}
              onClick={closeLightbox}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                className="relative max-w-3xl w-full rounded-3xl overflow-hidden"
                style={{
                  border: "1px solid rgba(234,88,12,0.2)",
                  boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={DEITY_IMAGES[lightboxIndex]}
                  alt={`Deity darshan ${lightboxIndex + 1}`}
                  width={900}
                  height={1200}
                  className="w-full h-auto object-contain"
                  priority
                />

                {/* Close */}
                <button
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center z-10"
                  style={{
                    background: "rgba(0,0,0,0.4)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.25)",
                    color: "#fff",
                  }}
                >
                  <FaTimes style={{ fontSize: "13px" }} />
                </button>

                {/* Prev */}
                <button
                  onClick={prev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center z-10"
                  style={{
                    background: "rgba(0,0,0,0.4)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.25)",
                    color: "#fff",
                  }}
                >
                  <FaArrowLeft style={{ fontSize: "11px" }} />
                </button>

                {/* Next */}
                <button
                  onClick={next}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center z-10"
                  style={{
                    background: "rgba(0,0,0,0.4)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.25)",
                    color: "#fff",
                  }}
                >
                  <FaArrowRight style={{ fontSize: "11px" }} />
                </button>

                {/* Counter */}
                <div
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 cinzel text-white px-4 py-1.5 rounded-full"
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.2em",
                    background: "rgba(0,0,0,0.4)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                >
                  {lightboxIndex + 1} / {DEITY_IMAGES.length}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer bar */}
        <div
          className="relative z-10 flex items-center justify-center flex-wrap gap-4 px-8 py-4"
          style={{
            borderTop: "1px solid rgba(234,88,12,0.15)",
            background: "rgba(254,215,170,0.45)",
          }}
        >
          {["Mangal Arati · 4:30 AM", "Hare Krishna Kirtan", "Prasadam Daily", "Bhagavad Gita Classes", "Spiritual Counselling"].map((text, i) => (
            <div key={i} style={{ display: "contents" }}>
              {i > 0 && <div className="w-px h-3.5 hidden sm:block bg-orange-300" />}
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

export default GalleryPage;