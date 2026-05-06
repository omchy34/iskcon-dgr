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

/* ── Types ── */
interface GalleryImage {
  src: string;
  title: string;
  caption: string;
  category: "deity" | "temple" | "festival" | "prasad";
}

/* ── Image data — replace src with your actual image paths ── */
const allImages: GalleryImage[] = [
  { src: "/darshan/radha-madanmohan-1.jpg",  title: "Rādhā Madana Mohana",        caption: "Morning Śṛṅgāra darśana",         category: "deity"   },
  { src: "/darshan/radha-madanmohan-2.jpg",  title: "Rādhā Madana Mohana",        caption: "Rāja Bhoga ārati",                category: "deity"   },
  { src: "/darshan/temple-exterior.jpg",     title: "Temple Exterior",            caption: "ISKCON Durgapur",                 category: "temple"  },
  { src: "/darshan/temple-hall.jpg",         title: "Temple Hall",                caption: "Evening kīrtan in the main hall", category: "temple"  },
  { src: "/darshan/janmashtami.jpg",         title: "Janmāṣṭamī",                 caption: "Annual festival celebration",     category: "festival"},
  { src: "/darshan/rathayatra.jpg",          title: "Ratha Yātrā",                caption: "Lord Jagannātha's chariot",       category: "festival"},
  { src: "/darshan/gaura-purnima.jpg",       title: "Gaura Pūrṇimā",              caption: "Appearance day of Śrī Chaitanya", category: "festival"},
  { src: "/darshan/prasad-seva.jpg",         title: "Prasādam Seva",              caption: "Daily free meal distribution",    category: "prasad"  },
  { src: "/darshan/mangala-arati.jpg",       title: "Maṅgala Ārati",              caption: "4:30 AM pre-dawn worship",        category: "deity"   },
  { src: "/darshan/kirtan.jpg",              title: "Saṅkīrtana",                 caption: "Congregational chanting",         category: "temple"  },
  { src: "/darshan/deity-closeup.jpg",       title: "Deity Darśana",              caption: "Close darśana of the lotus feet", category: "deity"   },
  { src: "/darshan/nityananda-trayodasi.jpg",title: "Nityānanda Trayodaśī",       caption: "Festival of Lord Nityānanda",     category: "festival"},
];

const PREVIEW_COUNT = 5;

const categoryLabels: Record<GalleryImage["category"], string> = {
  deity:   "Deity Darśana",
  temple:  "Temple",
  festival:"Festivals",
  prasad:  "Prasādam Seva",
};

const categories = ["all", "deity", "temple", "festival", "prasad"] as const;
type Category = typeof categories[number];

export default function DarshanPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filtered = activeCategory === "all"
    ? allImages
    : allImages.filter(img => img.category === activeCategory);

  const previewImages = filtered.slice(0, PREVIEW_COUNT);
  const displayImages = showAll ? filtered : previewImages;

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  };

  const prev = () => setLightboxIndex(i => (i - 1 + filtered.length) % filtered.length);
  const next = () => setLightboxIndex(i => (i + 1) % filtered.length);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxOpen]);

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

        /* gallery grid */
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px;
        }

        /* first tile spans 2 columns on wide screens */
        @media (min-width: 640px) {
          .gallery-grid .tile-featured {
            grid-column: span 2;
            grid-row: span 2;
          }
        }

        .gallery-tile {
          position: relative;
          border-radius: 14px;
          overflow: hidden;
          aspect-ratio: 1 / 1;
          background: #1a0c04;
          border: 1px solid #c97c3018;
          cursor: pointer;
          transition: border-color 0.3s, transform 0.3s;
        }
        .gallery-tile:hover { border-color: #c97c3050; transform: scale(1.01); }
        .gallery-tile:hover .tile-overlay { opacity: 1; }

        .tile-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, #0c0701ee 0%, transparent 55%);
          opacity: 0;
          transition: opacity 0.35s;
          display: flex; flex-direction: column;
          justify-content: flex-end;
          padding: 20px;
        }

        /* last preview tile — the "view all" cover */
        .view-all-tile {
          position: relative;
          border-radius: 14px;
          overflow: hidden;
          aspect-ratio: 1 / 1;
          background: #1a0c04;
          border: 1px solid #c97c3030;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          flex-direction: column; gap: 10px;
          transition: border-color 0.3s, background 0.3s;
        }
        .view-all-tile:hover { border-color: #c97c3070; background: #210e02; }

        /* filter pills */
        .filter-pill {
          padding: 7px 18px;
          border-radius: 40px;
          border: 1px solid #c97c3030;
          background: transparent;
          color: #c97c3088;
          font-family: 'Cinzel', serif;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s;
        }
        .filter-pill:hover { border-color: #c97c3060; color: #e8a830; }
        .filter-pill.active {
          background: linear-gradient(135deg, #1e1000, #2a1500);
          border-color: #c97c3060;
          color: #e8a830;
        }

        /* lightbox */
        .lightbox-backdrop {
          position: fixed; inset: 0; z-index: 1000;
          background: rgba(4, 2, 0, 0.96);
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
        }
        .lightbox-img-wrap {
          position: relative;
          max-width: min(860px, 90vw);
          max-height: 80vh;
          width: 100%;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid #c97c3030;
        }
        .lb-btn {
          position: absolute; top: 50%; transform: translateY(-50%);
          background: #1a0c04cc; border: 1px solid #c97c3040;
          color: #e8a830; border-radius: 50%;
          width: 44px; height: 44px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 18px;
          transition: background 0.2s, border-color 0.2s;
          z-index: 10;
        }
        .lb-btn:hover { background: #2a1200cc; border-color: #c97c3080; }
        .lb-close {
          position: absolute; top: 16px; right: 16px;
          background: #1a0c04cc; border: 1px solid #c97c3040;
          color: #e8a830; border-radius: 50%;
          width: 38px; height: 38px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 16px;
          transition: background 0.2s;
          z-index: 10;
        }
        .lb-close:hover { background: #2a1200cc; }

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
        <div style={{ position: "relative", zIndex: 1, maxWidth: 680 }}>
          <p className="cinzel" style={{ color: "#c97c3099", fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: 16 }}>
            Śrī Śrī Rādhā Madana Mohana
          </p>
          <h1 className="cinzel gold-text" style={{ fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 600, lineHeight: 1.05, marginBottom: 10 }}>
            Darśana Gallery
          </h1>
          <p className="cinzel" style={{ color: "#9a6e3a", fontSize: "clamp(9px, 1.1vw, 11px)", letterSpacing: "0.22em", marginBottom: 18 }}>
            ISKCON Durgapur · Hare Krishna Temple
          </p>
          <div className="divider" style={{ marginBottom: 16 }}>
            <span style={{ color: "#c97c3055", fontSize: 10 }}>✦</span>
          </div>
          <blockquote className="cormorant" style={{
            fontSize: "clamp(13px, 1.6vw, 17px)",
            fontStyle: "italic", color: "#a07840",
            lineHeight: 1.65, maxWidth: 440, margin: "0 auto",
          }}>
            &ldquo;One who sees the Supreme Lord equally present everywhere and in every living being does not degrade himself.&rdquo;
          </blockquote>
          <p className="cinzel" style={{ color: "#c97c3055", fontSize: 9, letterSpacing: "0.25em", marginTop: 10 }}>
            — BHAGAVAD-GĪTĀ 13.29
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          GALLERY
      ══════════════════════════════════════ */}
      <section style={{ padding: "72px 24px", maxWidth: 1100, margin: "0 auto" }}>

        {/* heading */}
        <Reveal>
          <p className="cinzel" style={{ textAlign: "center", color: "#c97c3070", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 12 }}>
            Divine Moments
          </p>
          <h2 className="cinzel" style={{ textAlign: "center", fontSize: "clamp(22px, 3.5vw, 34px)", color: "#d4c4a0", marginBottom: 10 }}>
            Glimpses of <span className="gold-text">Bhakti</span>
          </h2>
          <div className="divider" style={{ marginBottom: 36 }}>
            <span style={{ color: "#c97c3055", fontSize: 12 }}>✦</span>
          </div>
        </Reveal>

        {/* category filters */}
        <Reveal delay={60}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 40 }}>
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-pill ${activeCategory === cat ? "active" : ""}`}
                onClick={() => { setActiveCategory(cat); setShowAll(false); }}
              >
                {cat === "all" ? "All" : categoryLabels[cat as GalleryImage["category"]]}
              </button>
            ))}
          </div>
        </Reveal>

        {/* grid */}
        <div className="gallery-grid">
          {displayImages.map((img, i) => (
            <Reveal key={img.src} delay={i * 60}>
              <div
                className={`gallery-tile ${i === 0 && !showAll ? "tile-featured" : ""}`}
                onClick={() => openLightbox(i)}
              >
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
                <div className="tile-overlay">
                  <p className="cinzel" style={{ color: "#e8a830", fontSize: 11, letterSpacing: "0.12em", marginBottom: 4 }}>{img.title}</p>
                  <p style={{ color: "#c4a06a", fontSize: 13, fontStyle: "italic" }}>{img.caption}</p>
                </div>
                {/* category badge */}
                <div style={{
                  position: "absolute", top: 12, left: 12,
                  background: "#0c070199", border: "1px solid #c97c3030",
                  borderRadius: 20, padding: "3px 10px",
                }}>
                  <p className="cinzel" style={{ color: "#c97c30bb", fontSize: 8, letterSpacing: "0.18em" }}>
                    {categoryLabels[img.category]}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}

          {/* View All tile — shown only when not showing all */}
          {!showAll && filtered.length > PREVIEW_COUNT && (
            <Reveal delay={PREVIEW_COUNT * 60}>
              <div className="view-all-tile" onClick={() => setShowAll(true)}>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%",
                  border: "1px solid #c97c3040",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 4,
                }}>
                  <span style={{ color: "#e8a830", fontSize: 22 }}>+</span>
                </div>
                <p className="cinzel gold-text" style={{ fontSize: 13, letterSpacing: "0.1em" }}>
                  View All
                </p>
                <p style={{ color: "#c97c3077", fontSize: 13, fontStyle: "italic" }}>
                  {filtered.length - PREVIEW_COUNT} more photos
                </p>
              </div>
            </Reveal>
          )}
        </div>

        {/* collapse button */}
        {showAll && (
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <button
              className="filter-pill active"
              onClick={() => setShowAll(false)}
              style={{ padding: "10px 28px" }}
            >
              Show Less
            </button>
          </div>
        )}
      </section>

      {/* ══════════════════════════════════════
          LIGHTBOX
      ══════════════════════════════════════ */}
      {lightboxOpen && (
        <div className="lightbox-backdrop" onClick={closeLightbox}>
          <div style={{ position: "relative", width: "100%", maxWidth: "min(860px, 90vw)" }} onClick={e => e.stopPropagation()}>

            {/* close */}
            <button className="lb-close" onClick={closeLightbox}>✕</button>

            {/* image */}
            <div className="lightbox-img-wrap" style={{ aspectRatio: "4/3" }}>
              <Image
                src={filtered[lightboxIndex].src}
                alt={filtered[lightboxIndex].title}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>

            {/* prev / next */}
            <button className="lb-btn" style={{ left: -22 }} onClick={prev}>‹</button>
            <button className="lb-btn" style={{ right: -22 }} onClick={next}>›</button>

            {/* caption */}
            <div style={{ textAlign: "center", marginTop: 18 }}>
              <p className="cinzel" style={{ color: "#e8a830", fontSize: 13, letterSpacing: "0.1em", marginBottom: 4 }}>
                {filtered[lightboxIndex].title}
              </p>
              <p style={{ color: "#c4a06a", fontSize: 15, fontStyle: "italic" }}>
                {filtered[lightboxIndex].caption}
              </p>
              <p className="cinzel" style={{ color: "#c97c3055", fontSize: 9, letterSpacing: "0.2em", marginTop: 8 }}>
                {lightboxIndex + 1} / {filtered.length}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          FOOTER NOTE
      ══════════════════════════════════════ */}
      <div style={{ textAlign: "center", padding: "28px 24px", borderTop: "1px solid #c97c3012", marginTop: 40 }}>
        <p className="cinzel" style={{ color: "#c97c3035", fontSize: 10, letterSpacing: "0.22em" }}>
          Hare Krishna · Hare Krishna · Krishna Krishna · Hare Hare · Hare Rāma · Hare Rāma · Rāma Rāma · Hare Hare
        </p>
      </div>
    </main>
  );
}