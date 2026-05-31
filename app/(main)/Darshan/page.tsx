"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight, FaTimes, FaFolder, FaFolderOpen } from "react-icons/fa";

interface DarshanFolder {
  _id: string;
  date: string;
  tithi?: string;
  cover: string;
  images: string[];
}

const GalleryPage: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [folders, setFolders] = useState<DarshanFolder[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [openFolder, setOpenFolder] = useState<DarshanFolder | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [hoveredFolder, setHoveredFolder] = useState<string | null>(null);

  useEffect(() => {
    setIsLoaded(true);
    fetch("/api/darshan")
      .then((r) => r.json())
      .then((data) => {
        setFolders(data);
        setFetchLoading(false);
      })
      .catch(() => setFetchLoading(false));
  }, []);

  const currentImages = openFolder?.images ?? [];

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);

  const prev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + currentImages.length) % currentImages.length);
  }, [lightboxIndex, currentImages.length]);

  const next = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % currentImages.length);
  }, [lightboxIndex, currentImages.length]);

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

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && lightboxIndex === null && openFolder) {
        setOpenFolder(null);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [openFolder, lightboxIndex]);

  return (
    <>
      <style>{`
        .folder-card {
          transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease;
          cursor: pointer;
        }
        .folder-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 32px 56px rgba(180,60,0,0.22);
        }
        .gallery-card {
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease;
          cursor: pointer;
        }
        .gallery-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(234,88,12,0.22);
        }
        .lb-backdrop { backdrop-filter: blur(6px); }
        .folder-tab {
          position: absolute;
          top: -14px;
          left: 20px;
          width: 80px;
          height: 16px;
          border-radius: 6px 6px 0 0;
          background: linear-gradient(135deg, #ea580c, #d97706);
        }
        .cover-shimmer {
          background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.12) 50%, transparent 70%);
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .badge-pulse { animation: badgePulse 2s ease-in-out infinite; }
        @keyframes badgePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(234,88,12,0.4); }
          50%       { box-shadow: 0 0 0 6px rgba(234,88,12,0); }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div
        className="g-shell relative min-h-screen flex flex-col overflow-hidden"
        style={{ background: "linear-gradient(135deg, #fff7ed 0%, #fffbeb 50%, #ffedd5 100%)" }}
      >
        {/* Background blobs */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" style={{ opacity: 0.14 }}>
          <div className="absolute top-0 left-0 w-96 h-96 bg-orange-300 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-200 rounded-full blur-3xl" />
        </div>

        {/* Page Header */}
        <div className="relative z-10 text-center px-8 pt-28 pb-8">
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
            Sacred glimpses of Shri Shri Radha Madanmohan — organised by date of Darshan
          </motion.p>

          <div className="flex items-center justify-center gap-3">
            <div className="w-20 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(234,88,12,0.5))" }} />
            <div className="w-1.5 h-1.5 rotate-45 bg-orange-500 opacity-60 shrink-0" />
            <div className="w-20 h-px" style={{ background: "linear-gradient(90deg, rgba(234,88,12,0.5), transparent)" }} />
          </div>
        </div>

        {/* Folder Grid */}
        <AnimatePresence mode="wait">
          {!openFolder && (
            <motion.div
              key="folder-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="relative z-10 flex-1 px-8 lg:px-20 pb-16"
            >
              {fetchLoading ? (
                <div className="flex items-center justify-center py-24">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                    <p className="cinzel text-orange-400 text-xs tracking-widest uppercase">Loading Darshan...</p>
                  </div>
                </div>
              ) : folders.length === 0 ? (
                <div className="flex items-center justify-center py-24">
                  <p className="cormorant italic text-gray-400 text-xl">No darshan folders yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-4">
                  {folders.map((folder, i) => (
                    <motion.div
                      key={folder._id}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, delay: i * 0.08 }}
                      className="folder-card relative pt-4"
                      onClick={() => setOpenFolder(folder)}
                      onMouseEnter={() => setHoveredFolder(folder._id)}
                      onMouseLeave={() => setHoveredFolder(null)}
                    >
                      {/* Folder tab */}
                      <div className="folder-tab" />

                      {/* Folder body */}
                      <div
                        className="relative rounded-tl-none rounded-tr-2xl rounded-b-2xl overflow-hidden"
                        style={{
                          border: "1px solid rgba(234,88,12,0.2)",
                          background: "rgba(255,247,237,0.9)",
                          boxShadow: "0 8px 32px rgba(180,60,0,0.10)",
                        }}
                      >
                        {/* Cover image */}
                        <div className="relative w-full aspect-4/3 overflow-hidden">
                          <Image
                            src={folder.cover}
                            alt={`Darshan ${folder.date} cover`}
                            fill
                            className="object-cover transition-transform duration-500"
                            style={{ transform: hoveredFolder === folder._id ? "scale(1.07)" : "scale(1)" }}
                            unoptimized
                          />
                          <div className="cover-shimmer absolute inset-0 z-10" />
                          <div
                            className="absolute inset-x-0 bottom-0 h-16 z-20"
                            style={{ background: "linear-gradient(to top, rgba(30,10,0,0.55), transparent)" }}
                          />
                          <div className="absolute top-3 right-3 z-30">
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center"
                              style={{
                                background: "rgba(234,88,12,0.85)",
                                backdropFilter: "blur(6px)",
                                border: "1px solid rgba(255,255,255,0.3)",
                              }}
                            >
                              {hoveredFolder === folder._id
                                ? <FaFolderOpen style={{ fontSize: "11px", color: "#fff" }} />
                                : <FaFolder style={{ fontSize: "11px", color: "#fff" }} />
                              }
                            </div>
                          </div>
                          <div
                            className="badge-pulse absolute bottom-3 right-3 z-30 cinzel text-white rounded-full px-2.5 py-0.5"
                            style={{
                              fontSize: "8px",
                              letterSpacing: "0.12em",
                              background: "rgba(0,0,0,0.45)",
                              backdropFilter: "blur(6px)",
                              border: "1px solid rgba(255,255,255,0.2)",
                            }}
                          >
                            {folder.images.length} photos
                          </div>
                        </div>

                        {/* Folder info */}
                        <div className="px-4 py-3">
                          <div
                            className="cinzel font-semibold text-gray-800 mb-0.5"
                            style={{ fontSize: "11px", letterSpacing: "0.06em" }}
                          >
                            {folder.date}
                          </div>
                          {folder.tithi && (
                            <div className="cormorant italic text-orange-500" style={{ fontSize: "13px" }}>
                              {folder.tithi}
                            </div>
                          )}

                          {/* Mini strip preview */}
                          <div className="flex gap-1 mt-2 overflow-hidden">
                            {folder.images.slice(1, 5).map((img, j) => (
                              <div
                                key={j}
                                className="relative w-8 h-8 rounded overflow-hidden shrink-0"
                                style={{ border: "1px solid rgba(234,88,12,0.15)" }}
                              >
                                <Image src={img} alt="" fill className="object-cover" unoptimized />
                              </div>
                            ))}
                            {folder.images.length > 5 && (
                              <div
                                className="w-8 h-8 rounded flex items-center justify-center shrink-0 cinzel text-orange-500"
                                style={{
                                  fontSize: "8px",
                                  letterSpacing: "0.05em",
                                  background: "rgba(234,88,12,0.08)",
                                  border: "1px solid rgba(234,88,12,0.15)",
                                }}
                              >
                                +{folder.images.length - 5}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Bottom CTA */}
                        <div
                          className="flex items-center justify-between px-4 py-2.5"
                          style={{ borderTop: "1px solid rgba(234,88,12,0.1)" }}
                        >
                          <span className="cinzel text-orange-500" style={{ fontSize: "8px", letterSpacing: "0.18em", textTransform: "uppercase" }}>
                            View Darshan
                          </span>
                          <FaArrowRight style={{ fontSize: "9px", color: "#ea580c", opacity: 0.7 }} />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Open Folder View */}
        <AnimatePresence mode="wait">
          {openFolder && (
            <motion.div
              key={`folder-${openFolder._id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.4 }}
              className="relative z-10 flex-1 px-6 lg:px-16 pb-16"
            >
              <div className="flex items-center gap-3 mb-6">
                <button
                  onClick={() => setOpenFolder(null)}
                  className="flex items-center gap-2 cinzel text-orange-500 hover:text-orange-700 transition-colors"
                  style={{ fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase" }}
                >
                  <FaArrowLeft style={{ fontSize: "9px" }} />
                  All Folders
                </button>
                <div className="w-4 h-px bg-orange-300" />
                <FaFolderOpen style={{ fontSize: "11px", color: "#ea580c", opacity: 0.7 }} />
                <span className="cinzel text-gray-700" style={{ fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  {openFolder.date}{openFolder.tithi ? ` · ${openFolder.tithi}` : ""}
                </span>
              </div>

              <div className="mb-6">
                <h2 className="cormorant font-light text-gray-800" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}>
                  Darshan —{" "}
                  <em className="italic" style={{
                    background: "linear-gradient(135deg, #ea580c, #d97706)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}>
                    {openFolder.date}
                  </em>
                </h2>
                <p className="cormorant italic text-gray-400 text-lg">{openFolder.images.length} sacred photographs</p>
              </div>

              <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
                {openFolder.images.map((src, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                    className="gallery-card relative mb-4 rounded-2xl overflow-hidden break-inside-avoid"
                    onClick={() => openLightbox(i)}
                  >
                    <Image
                      src={src}
                      alt={`Darshan ${openFolder.date} — ${i + 1}`}
                      width={600}
                      height={800}
                      className="w-full h-auto object-cover"
                      style={{ display: "block" }}
                      unoptimized
                    />
                    <div
                      className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-3"
                      style={{ background: "linear-gradient(to top, rgba(180,50,0,0.5), transparent)" }}
                    >
                      <span className="cinzel text-white" style={{ fontSize: "8px", letterSpacing: "0.15em" }}>
                        {i + 1} / {openFolder.images.length}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              key="lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lb-backdrop fixed inset-0 z-50 flex items-center justify-center p-4"
              style={{ background: "rgba(20,10,5,0.93)" }}
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
                  src={currentImages[lightboxIndex]}
                  alt={`Darshan ${openFolder?.date} — ${lightboxIndex + 1}`}
                  width={900}
                  height={1200}
                  className="w-full h-auto object-contain"
                  priority
                  fill
                  loading="eager"
                />

                <button
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center z-10"
                  style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff" }}
                >
                  <FaTimes style={{ fontSize: "13px" }} />
                </button>

                <button
                  onClick={prev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center z-10"
                  style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff" }}
                >
                  <FaArrowLeft style={{ fontSize: "11px" }} />
                </button>

                <button
                  onClick={next}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center z-10"
                  style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff" }}
                >
                  <FaArrowRight style={{ fontSize: "11px" }} />
                </button>

                <div
                  className="absolute top-4 left-4 cinzel text-white px-3 py-1 rounded-full"
                  style={{
                    fontSize: "8px",
                    letterSpacing: "0.18em",
                    background: "rgba(234,88,12,0.75)",
                    backdropFilter: "blur(6px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  {openFolder?.date}
                </div>

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
                  {lightboxIndex + 1} / {currentImages.length}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div
          className="relative z-10 flex items-center justify-center flex-wrap gap-4 px-8 py-4"
          style={{ borderTop: "1px solid rgba(234,88,12,0.15)", background: "rgba(254,215,170,0.45)" }}
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