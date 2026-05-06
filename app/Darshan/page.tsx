"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight, FaTimes, FaExpand, FaSearch } from "react-icons/fa";

// ── Types ──────────────────────────────────────────────────────────────────
type Category = "all" | "deities" | "festivals" | "temple" | "kirtan" | "prasadam";

interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  category: Exclude<Category, "all">;
  title: string;
  subtitle: string;
  description: string;
  featured?: boolean;
  span?: "wide" | "tall" | "large";
}

// ── Gallery Data ────────────────────────────────────────────────────────────
const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    src: "/gallery/radha-madanmohan-altar.jpg",
    alt: "Shri Shri Radha Madanmohan on the altar",
    category: "deities",
    title: "Shri Shri Radha Madanmohan",
    subtitle: "Main Altar · ISKCON Durgapur",
    description:
      "The resplendent altar of Shri Shri Radha Madanmohan — adorned in seasonal garments and fresh flower ornaments, radiating divine grace upon every devotee who seeks shelter.",
    featured: true,
    span: "large",
  },
  {
    id: 2,
    src: "/gallery/mangal-arati.jpg",
    alt: "Mangal Arati ceremony",
    category: "deities",
    title: "Mangal Ārati",
    subtitle: "4:30 AM · Daily Ceremony",
    description:
      "The sacred morning ārati that begins before dawn — lamps are offered to the Lord while devotees sing the Gurvashtakam in the stillness of the early hours.",
    span: "tall",
  },
  {
    id: 3,
    src: "/gallery/janmashtami.jpg",
    alt: "Janmashtami celebration",
    category: "festivals",
    title: "Janmashtami",
    subtitle: "Appearance of Lord Krishna",
    description:
      "The grand celebration of Lord Sri Krishna's divine appearance — the temple fills with thousands of devotees, midnight abhishek, and joyous kirtan.",
  },
  {
    id: 4,
    src: "/gallery/temple-exterior.jpg",
    alt: "ISKCON Durgapur temple exterior",
    category: "temple",
    title: "Temple Façade",
    subtitle: "ISKCON Durgapur",
    description:
      "The magnificent entrance of ISKCON Durgapur — where the spiritual journey begins the moment one crosses the threshold.",
  },
  {
    id: 5,
    src: "/gallery/holi-festival.jpg",
    alt: "Holi festival celebrations",
    category: "festivals",
    title: "Gaura Purnima Holi",
    subtitle: "Festival of Colours",
    description:
      "Devotees celebrate the appearance of Shri Chaitanya Mahaprabhu with ecstatic kirtan and the vibrant colours of Holi.",
    span: "wide",
  },
  {
    id: 6,
    src: "/gallery/kirtan-hall.jpg",
    alt: "Kirtan in the main hall",
    category: "kirtan",
    title: "Hare Krishna Mahā-Kirtan",
    subtitle: "Sunday Love Feast",
    description:
      "The congregation erupts in transcendental song — mridangas and kartals resonate through the hall as devotees dance in divine ecstasy.",
  },
  {
    id: 7,
    src: "/gallery/prasadam-hall.jpg",
    alt: "Prasadam distribution",
    category: "prasadam",
    title: "Mahā-Prasādam",
    subtitle: "Sacred Food Distribution",
    description:
      "The sanctified remnants of the Lord's meal are lovingly prepared and distributed daily — touching thousands of lives with spiritual nourishment.",
  },
  {
    id: 8,
    src: "/gallery/deity-decoration.jpg",
    alt: "Deity decoration with flowers",
    category: "deities",
    title: "Pushpa Shringar",
    subtitle: "Flower Decoration",
    description:
      "Skilled pujaris craft intricate floral garlands and ornaments, dressing the Divine Couple in breathtaking splendour each day.",
  },
  {
    id: 9,
    src: "/gallery/ratha-yatra.jpg",
    alt: "Ratha Yatra procession",
    category: "festivals",
    title: "Ratha Yātrā",
    subtitle: "Festival of the Chariots",
    description:
      "The colossal chariot of Lord Jagannath rolls through the streets of Durgapur as thousands pull the ropes in devotional fervour.",
    span: "tall",
  },
  {
    id: 10,
    src: "/gallery/temple-hall.jpg",
    alt: "Main temple hall interior",
    category: "temple",
    title: "Main Sabhā Hall",
    subtitle: "Temple Interior",
    description:
      "The grand pillared hall where daily classes, festivals, and satsangs are held — a sanctuary of peace and transcendental learning.",
  },
  {
    id: 11,
    src: "/gallery/youth-kirtan.jpg",
    alt: "Youth kirtan group",
    category: "kirtan",
    title: "Yuvā Bhakti Kirtan",
    subtitle: "Youth Congregation",
    description:
      "The next generation of devotees, discovering the bliss of the holy name — hearts alight with the chanting of Hare Krishna.",
  },
  {
    id: 12,
    src: "/gallery/lamp-arati.jpg",
    alt: "Evening lamp arati",
    category: "deities",
    title: "Sandhyā Ārati",
    subtitle: "Evening Lamp Offering",
    description:
      "As dusk falls, the resplendent evening ārati illuminates the altar — ghee lamps offered in seven auspicious circles to the Divine Couple.",
    span: "wide",
  },
];

const CATEGORIES: { key: Category; label: string }[] = [
  { key: "all", label: "All" },
  { key: "deities", label: "Deities" },
  { key: "festivals", label: "Festivals" },
  { key: "temple", label: "Temple" },
  { key: "kirtan", label: "Kirtan" },
  { key: "prasadam", label: "Prasādam" },
];

// ── Span class helper ───────────────────────────────────────────────────────
const spanClass = (span?: string) => {
  if (span === "large") return "md:col-span-2 md:row-span-2";
  if (span === "wide") return "md:col-span-2";
  if (span === "tall") return "md:row-span-2";
  return "";
};

const imageHeightClass = (span?: string) => {
  if (span === "large") return "h-[480px]";
  if (span === "tall") return "h-[400px]";
  return "h-[240px]";
};

// ── Main Component ──────────────────────────────────────────────────────────
const GalleryPage: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // ── Filtered items ─────────────────────────────────────────────────────
  const filtered = GALLERY_ITEMS.filter((item) => {
    const matchCat = activeCategory === "all" || item.category === activeCategory;
    const matchSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  // ── Lightbox navigation ────────────────────────────────────────────────
  const openLightbox = (id: number) => {
    const idx = filtered.findIndex((i) => i.id === id);
    setLightboxIndex(idx);
  };
  const closeLightbox = () => setLightboxIndex(null);
  const prev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
  }, [lightboxIndex, filtered.length]);
  const next = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filtered.length);
  }, [lightboxIndex, filtered.length]);

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

  const lightboxItem = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500&display=swap');

        .g-shell   { font-family: 'Cormorant Garamond', Georgia, serif; }
        .cinzel    { font-family: 'Cinzel', serif; }
        .cormorant { font-family: 'Cormorant Garamond', Georgia, serif; }

        .card-img::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%);
          pointer-events: none;
          z-index: 1;
        }

        .pill-btn {
          transition: all 0.2s ease;
        }
        .pill-btn:hover:not(.active) {
          border-color: #ea580c !important;
          background: rgba(255,255,255,0.9) !important;
        }

        .gallery-card {
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease;
        }
        .gallery-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 24px 48px rgba(234,88,12,0.22);
        }

        .lb-backdrop {
          backdrop-filter: blur(4px);
        }

        input.search-input {
          font-family: 'Cinzel', serif;
          font-size: 11px;
          letter-spacing: 0.15em;
          background: rgba(255,255,255,0.8);
          border: 1px solid rgba(234,88,12,0.25);
          border-radius: 999px;
          padding: 8px 18px 8px 38px;
          outline: none;
          color: #44403c;
          width: 220px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        input.search-input:focus {
          border-color: #ea580c;
          box-shadow: 0 0 0 3px rgba(234,88,12,0.12);
        }
        input.search-input::placeholder { color: #c2a884; }
      `}</style>

      <div
        className="g-shell relative min-h-screen flex flex-col overflow-hidden"
        style={{ background: "linear-gradient(135deg, #fff7ed 0%, #fffbeb 50%, #ffedd5 100%)" }}
      >

        {/* ── Background blobs ── */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" style={{ opacity: 0.16 }}>
          <div className="absolute top-0 left-0 w-96 h-96 bg-orange-300 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-0 right-0 w-96 h-96 bg-amber-300 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>

        {/* ── Page Header ── */}
        <div className="relative z-10 text-center px-8 pt-28 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-4"
          >
            <Link
              href="/"
              className="cinzel text-[10px] tracking-widest uppercase text-orange-400 hover:text-orange-600 transition-colors flex items-center gap-2"
            >
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
            <em
              className="italic"
              style={{
                background: "linear-gradient(135deg, #ea580c, #d97706, #ea580c)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
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

          {/* Decorative rule */}
          <div className="flex items-center justify-center gap-3">
            <div
              className="w-20 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(234,88,12,0.5))" }}
            />
            <div className="w-1.5 h-1.5 rotate-45 bg-orange-500 opacity-60 shrink-0" />
            <div
              className="w-20 h-px"
              style={{ background: "linear-gradient(90deg, rgba(234,88,12,0.5), transparent)" }}
            />
          </div>
        </div>

        {/* ── Controls bar: filters + search ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="relative z-10 flex flex-wrap items-center justify-between gap-4 px-8 lg:px-16 pb-6"
        >
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className="pill-btn cinzel text-[9px] tracking-[0.2em] uppercase px-4 py-2 rounded-full border"
                style={
                  activeCategory === cat.key
                    ? {
                        background: "linear-gradient(135deg, #ea580c, #d97706)",
                        color: "#fff",
                        border: "1px solid transparent",
                        boxShadow: "0 4px 14px rgba(234,88,12,0.3)",
                      }
                    : {
                        background: "rgba(255,255,255,0.65)",
                        color: "#ea580c",
                        border: "1px solid rgba(234,88,12,0.28)",
                      }
                }
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative flex items-center">
            <FaSearch
              className="absolute left-3 text-orange-400 pointer-events-none"
              style={{ fontSize: "11px" }}
            />
            <input
              className="search-input"
              type="text"
              placeholder="Search gallery…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>

        {/* ── Gallery Grid ── */}
        <div className="relative z-10 flex-1 px-8 lg:px-16 pb-10">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="cormorant italic text-2xl text-orange-400 mb-2">No offerings found</p>
              <p className="cinzel text-[10px] tracking-widest text-orange-300 uppercase">
                Try a different category or search term
              </p>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-auto"
            >
              <AnimatePresence>
                {filtered.map((item, i) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.88 }}
                    transition={{ duration: 0.35, delay: i * 0.04 }}
                    className={`gallery-card relative rounded-2xl overflow-hidden cursor-pointer ${spanClass(item.span)}`}
                    onClick={() => openLightbox(item.id)}
                  >
                    {/* Image */}
                    <div
                      className={`card-img relative w-full ${imageHeightClass(item.span)} bg-gradient-to-br from-amber-100 to-orange-200`}
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />

                      {/* Category badge */}
                      <div
                        className="absolute top-3 left-3 z-10 cinzel text-[7px] tracking-[0.2em] uppercase px-3 py-1 rounded-full"
                        style={{
                          background: "rgba(255,255,255,0.18)",
                          backdropFilter: "blur(8px)",
                          border: "1px solid rgba(255,255,255,0.3)",
                          color: "#fff",
                        }}
                      >
                        {item.category}
                      </div>

                      {/* Expand icon on hover */}
                      <div
                        className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100"
                        style={{
                          background: "rgba(255,255,255,0.18)",
                          backdropFilter: "blur(8px)",
                          border: "1px solid rgba(255,255,255,0.3)",
                        }}
                      >
                        <FaExpand style={{ fontSize: "9px", color: "#fff" }} />
                      </div>

                      {/* Label overlay */}
                      <div className="absolute bottom-0 left-0 right-0 z-10 p-4">
                        <p
                          className="cinzel mb-1"
                          style={{ fontSize: "7.5px", letterSpacing: "0.22em", color: "rgba(255,220,170,0.85)" }}
                        >
                          {item.subtitle}
                        </p>
                        <h3
                          className="cormorant italic font-light text-white leading-snug"
                          style={{ fontSize: item.span === "large" ? "26px" : "18px" }}
                        >
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        {/* ── Lightbox ── */}
        <AnimatePresence>
          {lightboxItem && (
            <motion.div
              key="lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lb-backdrop fixed inset-0 z-50 flex items-center justify-center p-6"
              style={{ background: "rgba(20,10,5,0.88)" }}
              onClick={closeLightbox}
            >
              <motion.div
                initial={{ scale: 0.9, y: 24 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.92, y: 16 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                className="relative max-w-3xl w-full rounded-3xl overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #fff7ed, #fffbeb)",
                  border: "1px solid rgba(234,88,12,0.2)",
                  boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Image */}
                <div
                  className="card-img relative w-full bg-gradient-to-br from-amber-100 to-orange-200"
                  style={{ height: "380px" }}
                >
                  <Image
                    src={lightboxItem.src}
                    alt={lightboxItem.alt}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="800px"
                    priority
                  />
                </div>

                {/* Info */}
                <div className="p-7">
                  <p
                    className="cinzel mb-2"
                    style={{ fontSize: "8px", letterSpacing: "0.28em", color: "#ea580c" }}
                  >
                    {lightboxItem.subtitle}
                  </p>
                  <h2
                    className="cormorant italic font-light text-gray-800 mb-3 leading-none"
                    style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
                  >
                    {lightboxItem.title}
                  </h2>
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-12 h-px"
                      style={{ background: "linear-gradient(90deg, rgba(234,88,12,0.5), transparent)" }}
                    />
                    <div className="w-1 h-1 rotate-45 bg-orange-500 opacity-60 shrink-0" />
                    <div
                      className="w-12 h-px"
                      style={{ background: "linear-gradient(90deg, transparent, rgba(234,88,12,0.5))" }}
                    />
                  </div>
                  <p className="cormorant italic font-light text-gray-500 leading-relaxed" style={{ fontSize: "17px" }}>
                    {lightboxItem.description}
                  </p>
                </div>

                {/* Close */}
                <button
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center z-10"
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.35)",
                    color: "#fff",
                  }}
                >
                  <FaTimes style={{ fontSize: "13px" }} />
                </button>

                {/* Prev / Next */}
                {filtered.length > 1 && (
                  <>
                    <button
                      onClick={prev}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center z-10"
                      style={{
                        background: "rgba(255,255,255,0.2)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(255,255,255,0.35)",
                        color: "#fff",
                      }}
                    >
                      <FaArrowLeft style={{ fontSize: "11px" }} />
                    </button>
                    <button
                      onClick={next}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center z-10"
                      style={{
                        background: "rgba(255,255,255,0.2)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(255,255,255,0.35)",
                        color: "#fff",
                      }}
                    >
                      <FaArrowRight style={{ fontSize: "11px" }} />
                    </button>
                  </>
                )}

                {/* Counter */}
                <div
                  className="absolute bottom-4 right-6 cinzel text-gray-400"
                  style={{ fontSize: "8px", letterSpacing: "0.2em" }}
                >
                  {lightboxIndex !== null ? lightboxIndex + 1 : 0} / {filtered.length}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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