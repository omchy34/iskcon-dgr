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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenMobileDropdown(null);
  };

  const handleDesktopToggle = (linkName: string) => {
    setOpenDropdown((prev) => (prev === linkName ? null : linkName));
  };

  return (
    <>
      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-black/90 backdrop-blur-xl shadow-2xl border-b border-orange-500/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden ring-1 ring-orange-500/30">
                <Image src="/iskcon_logo.png" alt="ISKCON Logo" fill className="object-cover" />
              </div>
              <div>
                <h1
                  className="text-sm font-semibold text-orange-400 tracking-wide leading-tight"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  ISKCON Durgapur
                </h1>
                <p className="text-[10px] text-orange-900 tracking-widest uppercase">
                  Hare Krishna Temple
                </p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div ref={dropdownRef} className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <div key={link.name} className="relative">
                  {/*
                   * If the link has children:
                   *   — clicking the button toggles the dropdown (no navigation)
                   *   — a "View all →" entry inside the dropdown navigates to link.href
                   * If the link has NO children:
                   *   — it is a plain <Link> that navigates directly
                   */}
                  {link.children ? (
                    <button
                      onClick={() => handleDesktopToggle(link.name)}
                      className="flex items-center gap-1 px-3.5 py-2 rounded-md text-[13.5px] text-gray-400 hover:text-orange-400 hover:bg-orange-500/8 transition-all duration-200"
                    >
                      {link.name}
                      <ChevronDown
                        size={12}
                        className={`transition-transform duration-200 opacity-60 ${
                          openDropdown === link.name ? "rotate-180 opacity-100" : ""
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className="flex items-center gap-1 px-3.5 py-2 rounded-md text-[13.5px] text-gray-400 hover:text-orange-400 hover:bg-orange-500/8 transition-all duration-200"
                    >
                      {link.name}
                    </Link>
                  )}

                  {/* Desktop Dropdown */}
                  {link.children && (
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 transition-all duration-200 ${
                        openDropdown === link.name
                          ? "opacity-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 -translate-y-1 pointer-events-none"
                      }`}
                    >
                      {/* Arrow tip */}
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#080502] border-l border-t border-orange-500/15 rotate-45" />
                      <div className="min-w-[190px] bg-[rgba(8,5,2,0.97)] border border-orange-500/15 rounded-xl p-1.5 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setOpenDropdown(null)}
                            className="group flex items-center gap-2 px-3 py-2.5 rounded-lg text-[13px] text-[#b09070] hover:text-orange-400 hover:bg-orange-500/10 transition-all duration-150 hover:pl-4"
                          >
                            <span className="w-1 h-1 rounded-full bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop Location Button */}
            <button className="hidden md:flex items-center gap-2 bg-gradient-to-r from-orange-600 to-red-600 hover:opacity-90 text-white px-5 py-2 rounded-full text-[13px] font-medium tracking-wide transition-all duration-200 hover:-translate-y-px">
              <MapPin size={14} />
              Location
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex flex-col gap-[5px] p-1.5 rounded-md"
              aria-label="Toggle menu"
            >
              <span
                className={`block w-[22px] h-[1.5px] bg-gray-400 rounded transition-all duration-300 ${
                  isMobileMenuOpen ? "translate-y-[6.5px] rotate-45 bg-orange-400" : ""
                }`}
              />
              <span
                className={`block w-[22px] h-[1.5px] bg-gray-400 rounded transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                className={`block w-[22px] h-[1.5px] bg-gray-400 rounded transition-all duration-300 ${
                  isMobileMenuOpen ? "-translate-y-[6.5px] -rotate-45 bg-orange-400" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <div
          className={`md:hidden fixed top-[72px] right-0 w-[min(320px,calc(100vw-48px))] max-h-[calc(100vh-90px)] overflow-y-auto z-50
            bg-[rgba(8,5,2,0.98)] backdrop-blur-2xl
            border border-orange-500/12 border-r-0 rounded-l-2xl
            shadow-[-20px_10px_60px_rgba(0,0,0,0.7)]
            transition-transform duration-350 ease-[cubic-bezier(0.4,0,0.2,1)]
            ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="p-3">
            {navLinks.map((link, i) => (
              <div key={link.name}>
                {i > 0 && <div className="h-px bg-orange-500/8 mx-2" />}

                <div className="flex items-center justify-between rounded-lg hover:bg-orange-500/6 transition-colors">
                  {/*
                   * Mobile — same logic:
                   *   With children  → tapping the name toggles the dropdown only
                   *   Without children → tapping navigates and closes the menu
                   */}
                  {link.children ? (
                    <button
                      onClick={() =>
                        setOpenMobileDropdown(
                          openMobileDropdown === link.name ? null : link.name
                        )
                      }
                      className="flex-1 px-3.5 py-3 text-left text-[14px] text-[#c4a882] font-light"
                    >
                      {link.name}
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={closeMobileMenu}
                      className="flex-1 px-3.5 py-3 text-[14px] text-[#c4a882] font-light"
                    >
                      {link.name}
                    </Link>
                  )}

                  {link.children && (
                    <button
                      onClick={() =>
                        setOpenMobileDropdown(
                          openMobileDropdown === link.name ? null : link.name
                        )
                      }
                      className="px-3 py-3 text-[#78573a] hover:text-orange-400 transition-colors"
                      aria-label={`Toggle ${link.name}`}
                    >
                      <ChevronDown
                        size={15}
                        className={`transition-transform duration-250 ${
                          openMobileDropdown === link.name ? "rotate-180 text-orange-400" : ""
                        }`}
                      />
                    </button>
                  )}
                </div>

                {/* Mobile Submenu */}
                {link.children && (
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openMobileDropdown === link.name ? "max-h-56" : "max-h-0"
                    }`}
                  >
                    <div className="pb-1.5 pl-2">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={closeMobileMenu}
                          className="flex items-center gap-2 px-3.5 py-2.5 text-[13px] text-[#906040] hover:text-orange-400 hover:pl-5 transition-all duration-150 rounded-lg hover:bg-orange-500/8"
                        >
                          <span className="w-[3px] h-[3px] rounded-full bg-current opacity-60 flex-shrink-0" />
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Mobile Location Button */}
            <div className="mt-3 pt-3 border-t border-orange-500/10">
              <button className="w-full flex items-center justify-center gap-2 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/20 py-2.5 rounded-xl text-[13.5px] font-medium tracking-wide transition-all duration-200">
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