"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const HeroSection: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500&display=swap');

        .h-shell {
          background: #000000;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          font-family: 'Cormorant Garamond', Georgia, serif;
          overflow: hidden;
          position: relative;
        }

        /* ── Amber glow blobs ── */
        .h-blob-wrap {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }
        .h-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
        }
        .h-blob-1 { width: 400px; height: 400px; background: rgba(249,115,22,0.13); top: -80px; left: -80px; }
        .h-blob-2 { width: 300px; height: 300px; background: rgba(245,158,11,0.10); top: 60px; right: -60px; }
        .h-blob-3 { width: 350px; height: 350px; background: rgba(217,119,6,0.09); bottom: -60px; left: 25%; }
        .h-blob-4 { width: 240px; height: 240px; background: rgba(251,191,36,0.07); bottom: 80px; right: 15%; }

        /* ── Line-box grid background ── */
        .h-grid-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          overflow: hidden;
        }
        .h-grid-bg svg {
          width: 100%;
          height: 100%;
        }

        /* Ticker */
        .h-ticker {
          background: rgba(120,53,15,0.2);
          border-bottom: 1px solid rgba(249,115,22,0.18);
          padding: 9px 0;
          overflow: hidden;
          flex-shrink: 0;
          position: relative;
          z-index: 10;
        }
        .h-ticker-inner {
          display: inline-block;
          white-space: nowrap;
          animation: hticker 50s linear infinite;
          font-family: 'Cinzel', serif;
          font-size: 9px;
          letter-spacing: 0.32em;
          color: #fb923c;
          text-transform: uppercase;
        }
        @keyframes hticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        /* Main grid */
        .h-main {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          padding: 6rem 4rem 4rem;
          gap: 4rem;
          max-width: 1280px;
          margin: 0 auto;
          width: 100%;
          position: relative;
          z-index: 2;
        }

        /* Left column */
        .h-left {
          display: flex;
          flex-direction: column;
        }

        .h-tag {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 1.8rem;
        }
        .h-tag-line {
          width: 28px;
          height: 1px;
          background: rgba(249,115,22,0.4);
        }
        .h-tag-text {
          font-family: 'Cinzel', serif;
          font-size: 9px;
          letter-spacing: 0.35em;
          color: rgba(251,146,60,0.65);
          text-transform: uppercase;
        }

        .h-title-small {
          font-family: 'Cinzel', serif;
          font-size: 12px;
          font-weight: 400;
          letter-spacing: 0.3em;
          color: rgba(251,146,60,0.5);
          text-transform: uppercase;
          margin: 0 0 0.4rem;
        }

        .h-title-main {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3rem, 5vw, 4.5rem);
          font-weight: 300;
          line-height: 1.0;
          letter-spacing: 0.01em;
          color: #fef3c7;
          margin: 0 0 0.2rem;
        }
        .h-title-main em {
          font-style: italic;
          color: #fb923c;
          font-weight: 300;
        }

        .h-rule {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 1.6rem 0;
        }
        .h-rule-line-l {
          width: 80px;
          height: 1px;
          background: linear-gradient(90deg, rgba(249,115,22,0.5), transparent);
        }
        .h-rule-line-r {
          width: 80px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(249,115,22,0.5));
        }
        .h-rule-diamond {
          width: 5px;
          height: 5px;
          background: #f97316;
          transform: rotate(45deg);
          opacity: 0.65;
          flex-shrink: 0;
        }

        .h-desc {
          font-size: 1.18rem;
          font-weight: 300;
          font-style: italic;
          line-height: 1.85;
          color: rgba(254,243,199,0.5);
          margin: 0 0 2.2rem;
          max-width: 420px;
        }

        .h-btns {
          display: flex;
          gap: 14px;
          margin-bottom: 2.6rem;
          flex-wrap: wrap;
        }
        .h-btn-main {
          font-family: 'Cinzel', serif;
          font-size: 9px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          padding: 13px 30px;
          background: linear-gradient(135deg, #f97316, #ea580c);
          color: #000;
          border: none;
          cursor: pointer;
          font-weight: 500;
          transition: opacity 0.2s, transform 0.2s;
          border-radius: 2px;
        }
        .h-btn-main:hover {
          opacity: 0.88;
          transform: translateY(-1px);
        }
        .h-btn-ghost {
          font-family: 'Cinzel', serif;
          font-size: 9px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          padding: 12px 30px;
          background: transparent;
          color: #fb923c;
          border: 1px solid rgba(249,115,22,0.35);
          cursor: pointer;
          transition: border-color 0.2s, transform 0.2s;
          border-radius: 2px;
        }
        .h-btn-ghost:hover {
          border-color: rgba(249,115,22,0.7);
          transform: translateY(-1px);
        }

        .h-stats {
          display: flex;
          gap: 2rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(249,115,22,0.12);
        }
        .h-stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem;
          font-weight: 300;
          color: #fb923c;
          line-height: 1;
          margin-bottom: 4px;
        }
        .h-stat-label {
          font-family: 'Cinzel', serif;
          font-size: 8px;
          letter-spacing: 0.2em;
          color: rgba(251,146,60,0.38);
          text-transform: uppercase;
        }
        .h-stat-sep {
          width: 1px;
          background: rgba(249,115,22,0.1);
          align-self: stretch;
        }

        /* Right column */
        .h-right {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .h-img-frame {
          position: relative;
          width: 360px;
          height: 440px;
        }

        .h-img-border-outer {
          position: absolute;
          inset: -14px;
          border: 1px solid rgba(249,115,22,0.18);
          pointer-events: none;
        }
        .h-img-border-inner {
          position: absolute;
          inset: -7px;
          border: 1px solid rgba(249,115,22,0.08);
          pointer-events: none;
        }

        .h-img-corner {
          position: absolute;
          width: 20px;
          height: 20px;
          border-color: rgba(249,115,22,0.5);
          border-style: solid;
        }
        .corner-tl { top: -14px; left: -14px; border-width: 1px 0 0 1px; }
        .corner-tr { top: -14px; right: -14px; border-width: 1px 1px 0 0; }
        .corner-bl { bottom: -14px; left: -14px; border-width: 0 0 1px 1px; }
        .corner-br { bottom: -14px; right: -14px; border-width: 0 1px 1px 0; }

        .h-img-inner {
          width: 100%;
          height: 100%;
          overflow: hidden;
          position: relative;
        }
        .h-img-inner::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 40%);
          pointer-events: none;
          z-index: 1;
        }

        .h-img-caption {
          position: absolute;
          bottom: -32px;
          left: 0; right: 0;
          text-align: center;
          font-family: 'Cinzel', serif;
          font-size: 8px;
          letter-spacing: 0.3em;
          color: rgba(249,115,22,0.3);
          text-transform: uppercase;
        }

        /* Footer bar */
        .h-footer {
          border-top: 1px solid rgba(249,115,22,0.1);
          background: rgba(120,53,15,0.15);
          padding: 1.1rem 4rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2.5rem;
          flex-wrap: wrap;
          position: relative;
          z-index: 10;
        }
        .h-footer-item {
          display: flex;
          align-items: center;
          gap: 9px;
          font-family: 'Cinzel', serif;
          font-size: 8.5px;
          letter-spacing: 0.2em;
          color: rgba(251,146,60,0.45);
          text-transform: uppercase;
        }
        .h-footer-dot {
          width: 3px;
          height: 3px;
          background: rgba(249,115,22,0.4);
          border-radius: 50%;
          flex-shrink: 0;
        }
        .h-footer-sep {
          width: 1px;
          height: 14px;
          background: rgba(249,115,22,0.1);
        }

        /* Responsive */
        @media (max-width: 900px) {
          .h-main {
            grid-template-columns: 1fr;
            padding: 5rem 2rem 3rem;
            gap: 3rem;
            text-align: center;
          }
          .h-left { align-items: center; }
          .h-tag { justify-content: center; }
          .h-desc { max-width: 100%; }
          .h-btns { justify-content: center; }
          .h-stats { justify-content: center; }
          .h-right { order: -1; }
          .h-img-frame { width: 280px; height: 340px; }
          .h-rule { justify-content: center; }
          .h-footer { gap: 1.2rem; padding: 1rem 1.5rem; }
        }

        @media (max-width: 500px) {
          .h-img-frame { width: 240px; height: 290px; }
          .h-footer-sep { display: none; }
        }
      `}</style>

      <div className="h-shell">

        {/* Amber glow blobs */}
        <div className="h-blob-wrap">
          <div className="h-blob h-blob-1" />
          <div className="h-blob h-blob-2" />
          <div className="h-blob h-blob-3" />
          <div className="h-blob h-blob-4" />
        </div>

        {/* Line-box grid background */}
        <div className="h-grid-bg">
          <svg
            viewBox="0 0 1280 900"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Small inner grid */}
              <pattern id="smallbox" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <rect width="40" height="40" fill="none" stroke="rgba(249,115,22,0.04)" strokeWidth="0.5" />
              </pattern>
              {/* Large outer grid */}
              <pattern id="bigbox" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                <rect width="120" height="120" fill="none" stroke="rgba(249,115,22,0.08)" strokeWidth="0.6" />
              </pattern>
              {/* Diagonal accent */}
              <pattern id="diag" x="0" y="0" width="160" height="160" patternUnits="userSpaceOnUse">
                <line x1="0" y1="160" x2="160" y2="0" stroke="rgba(245,158,11,0.03)" strokeWidth="0.6" />
              </pattern>
            </defs>

            {/* Fill layers */}
            <rect width="1280" height="900" fill="url(#smallbox)" />
            <rect width="1280" height="900" fill="url(#bigbox)" />
            <rect width="1280" height="900" fill="url(#diag)" />

            {/* Accent decorative boxes — top-left cluster */}
            <rect x="0" y="0" width="320" height="220" fill="none" stroke="rgba(249,115,22,0.1)" strokeWidth="0.6" />
            <rect x="20" y="20" width="280" height="180" fill="none" stroke="rgba(249,115,22,0.06)" strokeWidth="0.5" />
            <rect x="40" y="40" width="240" height="140" fill="none" stroke="rgba(249,115,22,0.04)" strokeWidth="0.4" />

            {/* Accent decorative boxes — top-right cluster */}
            <rect x="960" y="0" width="320" height="260" fill="none" stroke="rgba(249,115,22,0.09)" strokeWidth="0.6" />
            <rect x="980" y="20" width="280" height="220" fill="none" stroke="rgba(249,115,22,0.06)" strokeWidth="0.5" />
            <rect x="1000" y="40" width="240" height="180" fill="none" stroke="rgba(249,115,22,0.04)" strokeWidth="0.4" />

            {/* Center focus box */}
            <rect x="480" y="280" width="320" height="300" fill="none" stroke="rgba(245,158,11,0.07)" strokeWidth="0.7" />
            <rect x="500" y="300" width="280" height="260" fill="none" stroke="rgba(245,158,11,0.04)" strokeWidth="0.5" />

            {/* Bottom-left accent */}
            <rect x="0" y="660" width="400" height="240" fill="none" stroke="rgba(249,115,22,0.08)" strokeWidth="0.5" />
            <rect x="20" y="680" width="360" height="200" fill="none" stroke="rgba(249,115,22,0.05)" strokeWidth="0.4" />

            {/* Bottom-right accent */}
            <rect x="880" y="700" width="400" height="200" fill="none" stroke="rgba(249,115,22,0.07)" strokeWidth="0.5" />
            <rect x="900" y="720" width="360" height="160" fill="none" stroke="rgba(249,115,22,0.04)" strokeWidth="0.4" />
          </svg>
        </div>

       

        {/* Main */}
        <div className="h-main">

          {/* LEFT */}
          <div className="h-left">
            <div className="h-tag">
              <div className="h-tag-line" />
              <span className="h-tag-text">ISKCON Durgapur · West Bengal</span>
              <div className="h-tag-line" />
            </div>

            <p className="h-title-small">Shri Shri</p>

            <h1 className="h-title-main">
              Radha<br />
              <em>Madanmohan</em>
            </h1>

            <div className="h-rule">
              <div className="h-rule-line-l" />
              <div className="h-rule-diamond" />
              <div className="h-rule-line-r" />
            </div>

            <p className="h-desc">
              Come, take shelter at the lotus feet of the Supreme Lord —
              where devotion transcends time and the soul finds its eternal home.
            </p>

            <div className="h-btns">
              <button className="h-btn-main">Plan Your Visit</button>
              <button className="h-btn-ghost">Upcoming Events</button>
            </div>

            <div className="h-stats">
              <div>
                <div className="h-stat-num">4</div>
                <div className="h-stat-label">Daily Arati</div>
              </div>
              <div className="h-stat-sep" />
              <div>
                <div className="h-stat-num">365</div>
                <div className="h-stat-label">Days Open</div>
              </div>
              <div className="h-stat-sep" />
              <div>
                <div className="h-stat-num" style={{ fontStyle: "italic" }}>∞</div>
                <div className="h-stat-label">Mercy &amp; Grace</div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="h-right">
            <div className="h-img-frame">
              <div className="h-img-border-outer" />
              <div className="h-img-border-inner" />
              <div className="h-img-corner corner-tl" />
              <div className="h-img-corner corner-tr" />
              <div className="h-img-corner corner-bl" />
              <div className="h-img-corner corner-br" />

              <div
                className="h-img-inner"
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

              <div className="h-img-caption">
                Shri Shri Radha Madanmohan · ISKCON Durgapur
              </div>
            </div>
          </div>

        </div>

        {/* Footer bar */}
        <div className="h-footer">
          {[
            "Mangal Arati · 4:30 AM",
            "Hare Krishna Kirtan",
            "Prasadam Daily",
            "Bhagavad Gita Classes",
            "Spiritual Counselling",
          ].map((text, i) => (
            <div key={i} style={{ display: "contents" }}>
              {i > 0 && <div className="h-footer-sep" />}
              <div className="h-footer-item">
                <div className="h-footer-dot" />
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