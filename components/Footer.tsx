"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Heart } from "lucide-react";
import { FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";

type FooterLink = { name: string; href: string };
type SocialLink = { icon: React.ReactNode; href: string; label: string };
type ContactItem = { icon: React.ReactNode; text: string };

const footerLinks: { explore: FooterLink[]; resources: FooterLink[] } = {
    explore: [
        { name: "Home", href: "/" },
        { name: "About ISKCON", href: "/About/Temple" },
        { name: "Our Founder", href: "/About/Founder" },
        { name: "Darshan", href: "/Darshan" },
    ],
    resources: [
        { name: "Prabhupada Books", href: "/Resources/Prabhupad-Books" },
        { name: "Courses", href: "/Resources/Courses" },
        { name: "Upcoming Festivals", href: "/Events/festivals" },
        { name: "Kirtan Programs", href: "/Events/kirtan" },
    ],
};

const socialLinks: SocialLink[] = [
    { icon: <FaFacebookF size={13} />, href: "#", label: "Facebook" },
    { icon: <FaYoutube size={13} />, href: "#", label: "YouTube" },
    { icon: <FaInstagram size={13} />, href: "#", label: "Instagram" },
];

const contactItems: ContactItem[] = [
    { icon: <MapPin size={14} />, text: "ISKCON Durgapur, City Centre, Durgapur, West Bengal – 713216" },
    { icon: <Clock size={14} />, text: "Open Daily: 4:30 AM – 8:30 PM" },
    { icon: <Phone size={14} />, text: "+91 00000 00000" },
    { icon: <Mail size={14} />, text: "info@iskcondurgapur.org" },
];

// ── Theme tokens ──────────────────────────────────────────────
const T = {
    bg: "#fff8f2",          // page background – warm white
    bgCard: "#fff3e8",          // slightly deeper card surface
    bgStrip: "#fde8d0",          // mahamantra strip
    border: "rgba(220,130,60,0.18)",
    borderHover: "rgba(220,130,60,0.45)",
    accent: "#e8751a",          // primary accent – vivid light orange
    accentMid: "#f09040",          // mid tone
    accentLight: "#f7b87a",          // light tone for social icon bg
    text: "#7a4015",          // body text
    textMuted: "#b07040",          // muted / secondary text
    textHeading: "#c05a10",          // section headings
    bottomBar: "#fdecd8",          // bottom bar bg
};

const linkStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 13,
    color: T.text,
    textDecoration: "none",
    transition: "all 0.2s",
};

const sectionHeadingStyle: React.CSSProperties = {
    fontFamily: "'Cinzel', serif",
    fontSize: 12,
    fontWeight: 600,
    color: T.textHeading,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    marginBottom: 16,
    paddingBottom: 10,
    borderBottom: `1px solid ${T.border}`,
};

const dotStyle: React.CSSProperties = {
    width: 4,
    height: 4,
    borderRadius: "50%",
    background: T.accentMid,
    opacity: 0.7,
    flexShrink: 0,
};

const socialIconStyle: React.CSSProperties = {
    width: 34,
    height: 34,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(232,117,26,0.10)",
    border: `1px solid rgba(232,117,26,0.22)`,
    color: T.accent,
    transition: "all 0.2s",
    cursor: "pointer",
};

const Footer: React.FC = () => {
    return (
        <footer
            style={{
                background: T.bg,
                borderTop: `1px solid ${T.border}`,
            }}
        >
            {/* Top accent line */}
            <div
                style={{
                    height: 2,
                    background: `linear-gradient(90deg, transparent, ${T.accentLight}, ${T.accent}, ${T.accentLight}, transparent)`,
                }}
            />

            {/* Mahamantra strip */}
            <div
                style={{
                    textAlign: "center",
                    padding: "14px 16px",
                    borderBottom: `1px solid ${T.border}`,
                    background: T.bgStrip,
                }}
            >
                <p
                    style={{
                        fontFamily: "'Cinzel', serif",
                        fontSize: 13,
                        letterSpacing: "0.28em",
                        color: T.accent,
                        opacity: 0.9,
                        margin: 0,
                    }}
                >
                    ॐ &nbsp; हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे &nbsp;|&nbsp; हरे राम हरे राम राम राम हरे हरे &nbsp; ॐ
                </p>
            </div>

            {/* Main footer grid */}
            <div className="max-w-7xl mx-auto px-5 lg:px-8 py-14">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* ── Column 1: Brand ── */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center gap-3 mb-5">
                            <div className="relative w-12 h-12 overflow-hidden">
                                <Image
                                    src="/iskcon_logo.png"
                                    alt="ISKCON Logo"
                                    fill
                                    sizes="48px"
                                    className="object-contain"
                                />
                            </div>
                            <div>
                                <h2
                                    style={{
                                        fontFamily: "'Cinzel', serif",
                                        fontSize: 14,
                                        fontWeight: 600,
                                        color: T.accent,
                                        letterSpacing: "0.06em",
                                        lineHeight: 1.3,
                                    }}
                                >
                                    ISKCON Durgapur
                                </h2>
                                <p
                                    style={{
                                        fontSize: 9.5,
                                        color: T.textMuted,
                                        letterSpacing: "0.22em",
                                        textTransform: "uppercase",
                                    }}
                                >
                                    Hare Krishna Temple
                                </p>
                            </div>
                        </Link>

                        <p style={{ fontSize: 13, color: T.text, lineHeight: 1.75, marginBottom: 20 }}>
                            A sanctuary of devotion and spiritual wisdom in the heart of Durgapur.
                            All are welcome to experience the mercy of Sri Sri Radha Madanmohan.
                        </p>

                        {/* Social icons */}
                        <div className="flex gap-3">
                            {socialLinks.map(({ icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    style={socialIconStyle}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = "rgba(232,117,26,0.20)";
                                        e.currentTarget.style.color = T.accentMid;
                                        e.currentTarget.style.borderColor = "rgba(232,117,26,0.50)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = "rgba(232,117,26,0.10)";
                                        e.currentTarget.style.color = T.accent;
                                        e.currentTarget.style.borderColor = "rgba(232,117,26,0.22)";
                                    }}
                                >
                                    {icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* ── Column 2: Explore ── */}
                    <div>
                        <h3 style={sectionHeadingStyle}>Explore</h3>
                        <ul className="flex flex-col gap-3">
                            {footerLinks.explore.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        style={linkStyle}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.color = T.accent;
                                            e.currentTarget.style.paddingLeft = "4px";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.color = T.text;
                                            e.currentTarget.style.paddingLeft = "0px";
                                        }}
                                    >
                                        <span style={dotStyle} />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ── Column 3: Resources & Events ── */}
                    <div>
                        <h3 style={sectionHeadingStyle}>Resources & Events</h3>
                        <ul className="flex flex-col gap-3">
                            {footerLinks.resources.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        style={linkStyle}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.color = T.accent;
                                            e.currentTarget.style.paddingLeft = "4px";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.color = T.text;
                                            e.currentTarget.style.paddingLeft = "0px";
                                        }}
                                    >
                                        <span style={dotStyle} />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ── Column 4: Visit Us ── */}
                    <div>
                        <h3 style={sectionHeadingStyle}>Visit Us</h3>
                        <ul className="flex flex-col gap-4">
                            {contactItems.map(({ icon, text }, i) => (
                                <li
                                    key={i}
                                    style={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        gap: 10,
                                        fontSize: 13,
                                        color: T.text,
                                        lineHeight: 1.6,
                                    }}
                                >
                                    <span style={{ color: T.accent, marginTop: 2, flexShrink: 0 }}>
                                        {icon}
                                    </span>
                                    {text}
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>

            {/* Bottom bar */}
            <div
                style={{
                    borderTop: `1px solid ${T.border}`,
                    padding: "16px 20px",
                    background: T.bottomBar,
                }}
            >
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p style={{ fontSize: 12, color: T.textMuted, textAlign: "center" }}>
                        © {new Date().getFullYear()} ISKCON Durgapur. All rights reserved.
                    </p>
                    <p
                        style={{
                            fontSize: 12,
                            color: T.textMuted,
                            display: "flex",
                            alignItems: "center",
                            gap: 5,
                        }}
                    >
                        Made with <Heart size={11} style={{ color: T.accent }} /> for the pleasure of Sri Krishna
                    </p>
                </div>
            </div>

            {/* Bottom accent line */}
            <div
                style={{
                    height: 3,
                    background: `linear-gradient(90deg, transparent, ${T.accentLight}, ${T.accent}, ${T.accentLight}, transparent)`,
                }}
            />
        </footer>
    );
};

export default Footer;