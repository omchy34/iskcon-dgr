"use client";
import React, { useEffect, useState, useRef } from "react";
import { ChevronDown, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface NavLink {
  name: string;
  href: string;
  children?: { name: string; href: string }[];
}

const navLinks: NavLink[] = [
  { name: "Home", href: "/" },
  {
    name: "About",
    href: "/About",
    children: [
      { name: "About ISKCON", href: "/About/Temple" },
      { name: "Founder", href: "/About/Founder" },
    ],
  },
  { name: "Darshan", href: "/Darshan" },
  {
    name: "Resources",
    href: "/Resources",
    children: [
      { name: "Books", href: "/Resources/Books" },
      { name: "Courses", href: "/Resources/Courses" },
    ],
  },
  {
    name: "Events",
    href: "/Events",
    children: [
      { name: "Upcoming Festivals", href: "/Events/festivals" },
      { name: "Kirtan Programs", href: "/Events/kirtan" },
    ],
  },
  { name: "Contact", href: "/Contact" },
];

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  // ── Scroll listener for navbar background ──
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenMobileDropdown(null);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
          onClick={closeMobileMenu}
        />
      )}

      {/* ── Navbar ── */}
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          background: scrolled ? "rgba(255, 248, 235, 0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(201,124,48,0.15)" : "none",
          transition: "background 0.35s ease, backdrop-filter 0.35s ease, border-bottom 0.35s ease",
        }}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex items-center justify-between h-18">

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-12 h-12 overflow-hidden ">
                <Image src="/iskcon_logo.png" alt="ISKCON Logo" fill className="object-cover" />
              </div>
              <div>
                <h1
                  style={{ fontFamily: "'Cinzel', serif", fontSize: 14, fontWeight: 600, color: "#b85010", letterSpacing: "0.06em", lineHeight: 1.3 }}
                >
                  ISKCON Durgapur
                </h1>
                <p style={{ fontSize: 9.5, color: "#b8700880", letterSpacing: "0.22em", textTransform: "uppercase" }}>
                  Hare Krishna Temple
                </p>
              </div>
            </Link>

            {/* ── Desktop Nav ── */}
            <div ref={dropdownRef} className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <div key={link.name} className="relative">

                  {link.children ? (
                    <button
                      onClick={() => setOpenDropdown(openDropdown === link.name ? null : link.name)}
                      style={{
                        display: "flex", alignItems: "center", gap: 5,
                        padding: "8px 13px", borderRadius: 8, border: "none",
                        background: "transparent", cursor: "pointer",
                        fontSize: 13.5, fontWeight: 500,
                        color: openDropdown === link.name ? "#c97c30" : "#2a1a08",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#c97c30")}
                      onMouseLeave={e => { if (openDropdown !== link.name) e.currentTarget.style.color = "#2a1a08"; }}
                    >
                      {link.name}
                      <ChevronDown
                        size={12}
                        style={{
                          opacity: 0.55,
                          transition: "transform 0.2s",
                          transform: openDropdown === link.name ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      />
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      style={{
                        display: "flex", alignItems: "center",
                        padding: "8px 13px", borderRadius: 8,
                        fontSize: 13.5, fontWeight: 500,
                        color: "#2a1a08", textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#c97c30")}
                      onMouseLeave={e => (e.currentTarget.style.color = "#2a1a08")}
                    >
                      {link.name}
                    </Link>
                  )}

                  {/* ── Dropdown ── */}
                  {link.children && (
                    <div style={{
                      position: "absolute",
                      top: "calc(100% + 12px)",
                      left: "50%",
                      transform: openDropdown === link.name
                        ? "translateX(-50%) translateY(0)"
                        : "translateX(-50%) translateY(-8px)",
                      opacity: openDropdown === link.name ? 1 : 0,
                      pointerEvents: openDropdown === link.name ? "auto" : "none",
                      transition: "opacity 0.2s, transform 0.2s",
                      zIndex: 100,
                      minWidth: 200,
                    }}>
                      {/* Arrow tip */}
                      <div style={{
                        position: "absolute", top: -5, left: "50%",
                        transform: "translateX(-50%) rotate(45deg)",
                        width: 10, height: 10,
                        background: "#2a1206",
                        borderTop: "1px solid rgba(201,124,48,0.3)",
                        borderLeft: "1px solid rgba(201,124,48,0.3)",
                      }} />
                      {/* Panel */}
                      <div style={{
                        background: "linear-gradient(160deg, #2a1206, #1c0d03)",
                        border: "1px solid rgba(201,124,48,0.25)",
                        borderRadius: 14,
                        padding: 6,
                        boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
                      }}>
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setOpenDropdown(null)}
                            style={{
                              display: "flex", alignItems: "center", gap: 10,
                              padding: "10px 14px", borderRadius: 10,
                              fontSize: 13, textDecoration: "none",
                              color: "#c4a06a",
                              transition: "all 0.15s",
                            }}
                            onMouseEnter={e => {
                              e.currentTarget.style.color = "#f0a040";
                              e.currentTarget.style.background = "rgba(201,124,48,0.1)";
                              e.currentTarget.style.paddingLeft = "18px";
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.color = "#c4a06a";
                              e.currentTarget.style.background = "transparent";
                              e.currentTarget.style.paddingLeft = "14px";
                            }}
                          >
                            <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#e8a030", opacity: 0.7, flexShrink: 0 }} />
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* ── Location Button ── */}
            <button
              className="hidden md:flex items-center gap-2 text-white px-5 py-2 rounded-full text-[13px] font-medium tracking-wide transition-all duration-200 hover:opacity-90 hover:-translate-y-px"
              style={{ background: "linear-gradient(135deg, #d45f10, #b83010)", boxShadow: "0 4px 18px rgba(180,60,10,0.35)" }}
            >
              <MapPin size={14} />
              Location
            </button>

            {/* ── Mobile Hamburger ── */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex flex-col gap-1.25 p-2"
              aria-label="Toggle menu"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{ background: "#3a1e08" }}
                  className={`block w-5.5 h-[1.5px] rounded transition-all duration-300 ${
                    isMobileMenuOpen && i === 0 ? "translate-y-[6.5px] rotate-45 bg-orange-500!" :
                    isMobileMenuOpen && i === 1 ? "opacity-0 scale-x-0" :
                    isMobileMenuOpen && i === 2 ? "translate-y-[-6.5px] -rotate-45 bg-orange-500!" : ""
                  }`}
                />
              ))}
            </button>
          </div>
        </div>

        {/* ══════════════════════════════════
            Mobile Drawer
        ══════════════════════════════════ */}
        <div
          className={`md:hidden fixed top-18 right-0 w-[min(300px,calc(100vw-40px))] max-h-[calc(100vh-90px)] overflow-y-auto z-50 rounded-l-2xl transition-transform duration-300 ease-in-out-[cubic-bezier(0.4,0,0.2,1)] ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
          style={{
            background: "linear-gradient(160deg, #241004 0%, #180b02 100%)",
            border: "1px solid rgba(201,124,48,0.2)",
            borderRight: "none",
            boxShadow: "-16px 8px 48px rgba(0,0,0,0.55)",
          }}
        >
          {/* top accent */}
          <div style={{ height: 1, margin: "0 16px", background: "linear-gradient(90deg, transparent, rgba(201,124,48,0.5), transparent)" }} />

          <div style={{ padding: "8px 12px 16px" }}>
            {navLinks.map((link, i) => (
              <div key={link.name}>
                {i > 0 && <div style={{ height: 1, margin: "2px 8px", background: "rgba(201,124,48,0.09)" }} />}

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderRadius: 12 }}>
                  {link.children ? (
                    <button
                      onClick={() => setOpenMobileDropdown(openMobileDropdown === link.name ? null : link.name)}
                      style={{ flex: 1, padding: "12px 14px", textAlign: "left", fontSize: 14, background: "none", border: "none", cursor: "pointer", color: "#d4a870", fontWeight: 400 }}
                    >
                      {link.name}
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={closeMobileMenu}
                      style={{ flex: 1, padding: "12px 14px", fontSize: 14, textDecoration: "none", color: "#d4a870" }}
                    >
                      {link.name}
                    </Link>
                  )}

                  {link.children && (
                    <button
                      onClick={() => setOpenMobileDropdown(openMobileDropdown === link.name ? null : link.name)}
                      style={{
                        padding: "12px", background: "none", border: "none", cursor: "pointer",
                        color: openMobileDropdown === link.name ? "#f0a040" : "#8a5a28",
                        transition: "color 0.2s",
                      }}
                    >
                      <ChevronDown
                        size={15}
                        style={{
                          transition: "transform 0.2s",
                          transform: openMobileDropdown === link.name ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      />
                    </button>
                  )}
                </div>

                {/* Mobile Submenu */}
                {link.children && (
                  <div style={{
                    overflow: "hidden",
                    maxHeight: openMobileDropdown === link.name ? 200 : 0,
                    transition: "max-height 0.3s ease",
                  }}>
                    <div style={{ paddingBottom: 8, paddingLeft: 10 }}>
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={closeMobileMenu}
                          style={{
                            display: "flex", alignItems: "center", gap: 10,
                            padding: "9px 14px", fontSize: 13,
                            textDecoration: "none", color: "#9a7040",
                            borderRadius: 10, transition: "all 0.15s",
                          }}
                          onMouseEnter={e => { e.currentTarget.style.color = "#f0a040"; e.currentTarget.style.paddingLeft = "20px"; }}
                          onMouseLeave={e => { e.currentTarget.style.color = "#9a7040"; e.currentTarget.style.paddingLeft = "14px"; }}
                        >
                          <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#c97c30", opacity: 0.7, flexShrink: 0 }} />
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Get Directions */}
            <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid rgba(201,124,48,0.12)" }}>
              <button style={{
                width: "100%", display: "flex", alignItems: "center", justifyContent: "center",
                gap: 8, padding: "13px", borderRadius: 12, fontSize: 13.5,
                fontWeight: 500, letterSpacing: "0.04em", cursor: "pointer",
                background: "linear-gradient(135deg, rgba(212,95,16,0.22), rgba(184,48,16,0.16))",
                border: "1px solid rgba(201,124,48,0.3)",
                color: "#e8a030", transition: "all 0.2s",
              }}>
                <MapPin size={14} />
                Get Directions
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;