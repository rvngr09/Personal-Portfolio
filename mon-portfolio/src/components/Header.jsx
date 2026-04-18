import React, { useState, useMemo, useEffect } from "react";
import { AppBar, Toolbar, IconButton, Box, Badge } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import ScienceIcon from "@mui/icons-material/Science";
import ContactsIcon from "@mui/icons-material/Contacts";
import { AccountTree } from "@mui/icons-material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import profilePhoto from '../assets/me.jpg'; // Adjust path based on your folder structure
/* ── hide scrollbar in mobile dropdown ── */
if (typeof document !== "undefined" && !document.getElementById("mnav-style")) {
  const s = document.createElement("style");
  s.id = "mnav-style";
  s.innerHTML = `
        .mnav-scroll::-webkit-scrollbar{display:none}
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
    `;
  document.head.appendChild(s);
}

/* ── colour tokens ── */
const C = {
  /* backgrounds */
  navBg: "rgba(8, 10, 18, 0.72)",
  navBorder: "rgba(255, 255, 255, 0.07)",
  dropBg: "#0d1021",
  dropBorder: "rgba(120, 140, 255, 0.18)",
  headerStrip: "linear-gradient(135deg, #1a1f3c 0%, #0f1628 100%)",

  /* brand accent — electric indigo → cyan */
  accent1: "#7c6ef5" /* indigo */,
  accent2: "#38d9f5" /* cyan   */,
  accentGlow: "rgba(124, 110, 245, 0.35)",

  /* text */
  textPrimary: "#e8e6ff",
  textMuted: "#8b8fad",
  textLink: "#b8b4f7",

  /* nav pill hover */
  pillHoverBg: "rgba(124, 110, 245, 0.10)",
  pillHoverBorder: "rgba(124, 110, 245, 0.30)",
  pillHoverText: "#a89ff5",

  /* mobile item hover */
  mobileItemHover: "rgba(124, 110, 245, 0.08)",
};

/* ── animation variants ── */
const menuVariants = {
  hidden: { opacity: 0, y: -10, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.24, ease: [0.4, 0, 0.2, 1] },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.96,
    transition: { duration: 0.18, ease: [0.4, 0, 0.2, 1] },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.06, duration: 0.22, ease: "easeOut" },
  }),
};

/* ── accent dot used on active/hover states ── */
function AccentDot() {
  return (
    <span
      style={{
        display: "inline-block",
        width: 4,
        height: 4,
        borderRadius: "50%",
        background: C.accent1,
        flexShrink: 0,
      }}
    />
  );
}
function GhostIcon({ size = 18, color = "#8b8fad" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 3C7.8 3 4 6.2 4 10v8c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8c0-3.8-3.8-7-8-7z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M8 11h.01M16 11h.01"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M9 15c.5.6 1.5 1 3 1s2.5-.4 3-1"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M4 18l2-2M20 18l-2-2"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ── Profile Section with Photo, Name, and Social Icons ── */
function ProfileSection() {
  const [hoveredIcon, setHoveredIcon] = useState(null);
  
  const socialLinks = [
    // { icon: <GitHubIcon sx={{ fontSize: 18 }} />, href: "https://github.com/rvngr09", label: "GitHub" },
    // { icon: <LinkedInIcon sx={{ fontSize: 18 }} />, href: "https://linkedin.com/in/your-profile", label: "LinkedIn" },
    // { icon: <TwitterIcon sx={{ fontSize: 18 }} />, href: "https://twitter.com/your-handle", label: "Twitter" },
    // { icon: <EmailIcon sx={{ fontSize: 18 }} />, href: "mailto:aminebenallalghst@gmail.com", label: "Email" },
  ];

  return (
    <Link
      to="/"
      style={{
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      {/* Profile Photo */}
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          overflow: "hidden",
          border: `2px solid ${C.accent1}`,
          boxShadow: `0 0 12px ${C.accentGlow}`,
          transition: "all 0.2s ease",
          "&:hover": {
            transform: "scale(1.02)",
            borderColor: C.accent2,
            boxShadow: `0 0 16px rgba(56, 217, 245, 0.4)`,
          },
        }}
      >
        <img
          src={profilePhoto}
          alt="Amine"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "fit",
          }}
          onError={(e) => {
            e.target.src = "";
          }}
        />
      </Box>
      
      {/* Name */}
      <Box>
        <span
  style={{
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: 16,
    letterSpacing: "-0.02em",
    background: `linear-gradient(90deg, ${C.textPrimary} 0%, ${C.accent2} 100%)`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    whiteSpace: "nowrap",
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
  }}
>
  Amine <GhostIcon size={22} />
</span>
        
        
        {/* Social Icons Row */}
        <Box
          sx={{
            display: "flex",
            gap: 0.8,
            mt: 0.5,
          }}
        >
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
                color: hoveredIcon === social.label ? C.accent2 : C.textMuted,
                transition: "all 0.2s ease",
                fontSize: 14,
              }}
              onMouseEnter={() => setHoveredIcon(social.label)}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              {social.icon}
            </a>
          ))}
        </Box>
      </Box>
    </Link>
  );
}

/* ── desktop nav pill ── */
function NavPill({ item }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link to={item.href} style={{ textDecoration: "none" }}>
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileTap={{ scale: 0.96 }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 7,
          padding: "7px 18px",
          borderRadius: 50,
          border: `1.5px solid ${hovered ? C.pillHoverBorder : "transparent"}`,
          background: hovered ? C.pillHoverBg : "transparent",
          color: hovered ? C.pillHoverText : C.textLink,
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 500,
          fontSize: "0.875rem",
          letterSpacing: "0.01em",
          cursor: "pointer",
          transition:
            "color 0.18s ease, background 0.18s ease, border-color 0.18s ease",
          whiteSpace: "nowrap",
          boxShadow: hovered ? `0 0 16px ${C.accentGlow}` : "none",
        }}
      >
        <span
          style={{ display: "flex", fontSize: 15, opacity: hovered ? 1 : 0.7 }}
        >
          {item.icon}
        </span>
        {item.label}
      </motion.div>
    </Link>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* compact the bar on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    {
      icon: <InfoIcon sx={{ fontSize: 16 }} />,
      label: "About",
      href: "/store",
    },
    {
      icon: <AccountTree sx={{ fontSize: 16 }} />,
      label: "Projects",
      href: "/projects",
    },
    {
      icon: <HomeRepairServiceIcon sx={{ fontSize: 16 }} />,
      label: "Resume",
      href: "/resume",
    },
    {
      icon: <ScienceIcon sx={{ fontSize: 16 }} />,
      label: "Experiences",
      href: "/experiences",
    },
    {
      icon: <ContactsIcon sx={{ fontSize: 16 }} />,
      label: "Contact",
      href: "/contacts",
    },
  ];

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        zIndex: 1100,
        pt: scrolled ? "6px" : "10px",
        transition: "padding 0.3s ease",
      }}
    >
      <AppBar
        position="static"
        elevation={0}
        sx={{
          width: { xs: "94%", sm: "88%", md: "78%", lg: "82%" },
          borderRadius: "16px",
          bgcolor: C.navBg,
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          border: `1px solid ${C.navBorder}`,
          boxShadow: scrolled
            ? `0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(124,110,245,0.1)`
            : `0 4px 20px rgba(0,0,0,0.4)`,
          transition: "box-shadow 0.3s ease",
          color: C.textPrimary,
          /* subtle top glow line */
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: "10%",
            right: "10%",
            height: "1px",
            background: `linear-gradient(90deg, transparent, ${C.accent1}55, ${C.accent2}55, transparent)`,
            borderRadius: "0 0 4px 4px",
          },
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            minHeight: scrolled ? "52px !important" : "60px !important",
            transition: "min-height 0.3s ease",
            px: { xs: "12px", sm: "20px" },
          }}
        >
          {/* ── Profile Section with Photo + Name + Social Icons ── */}
          <ProfileSection />

          {/* ── Desktop nav ── */}
          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
              gap: "2px",
              alignItems: "center",
            }}
          >
            {navItems.map((item) => (
              <NavPill key={item.href} item={item} />
            ))}
          </Box>

          {/* ── Desktop CTA (empty slot — fill as needed) ── */}
          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
              gap: 1,
              alignItems: "center",
            }}
          >
            {/* placeholder for login/avatar */}
          </Box>

          {/* ── Mobile hamburger ── */}
          <Box
            sx={{
              display: { xs: "flex", lg: "none" },
              alignItems: "center",
              position: "relative",
            }}
          >
            <IconButton
              onClick={() => setMobileOpen((o) => !o)}
              sx={{
                color: C.accent1,
                background: mobileOpen
                  ? "rgba(124,110,245,0.12)"
                  : "transparent",
                border: `1px solid ${mobileOpen ? "rgba(124,110,245,0.3)" : "transparent"}`,
                borderRadius: "10px",
                transition: "all 0.2s ease",
                "&:hover": {
                  background: "rgba(124,110,245,0.10)",
                  borderColor: "rgba(124,110,245,0.25)",
                },
              }}
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    style={{ display: "flex" }}
                  >
                    <CloseIcon fontSize="small" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    style={{ display: "flex" }}
                  >
                    <MenuIcon fontSize="small" />
                  </motion.div>
                )}
              </AnimatePresence>
            </IconButton>

            {/* ── Mobile dropdown (same as before) ── */}
            <AnimatePresence>
              {mobileOpen && (
                <motion.div
                  key="dropdown"
                  variants={menuVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  style={{
                    position: "absolute",
                    top: "calc(100% + 12px)",
                    right: 0,
                    width: 260,
                    background: C.dropBg,
                    borderRadius: 18,
                    boxShadow: `0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px ${C.dropBorder}`,
                    border: `1px solid ${C.dropBorder}`,
                    overflow: "hidden",
                    zIndex: 1200,
                    maxHeight: "calc(100vh - 90px)",
                    overflowY: "auto",
                    WebkitOverflowScrolling: "touch",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                  className="mnav-scroll"
                >
                  {/* gradient header strip */}
                  <Box
                    sx={{
                      background:
                        "linear-gradient(135deg, #1a1f3c 0%, #0f1628 100%)",
                      borderBottom: "1px solid rgba(124,110,245,0.15)",
                      px: 2.5,
                      py: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                    }}
                  >
                    {/* Mini profile in mobile dropdown */}
                    <Box
                      sx={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        overflow: "hidden",
                        border: `1.5px solid ${C.accent1}`,
                      }}
                    >
                      <img
                        src="/assets/me.jpg"
                        alt="A"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/28x28/1a1f3c/7c6ef5?text=A";
                        }}
                      />
                    </Box>
                    <span
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 700,
                        fontSize: "0.85rem",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        background: `linear-gradient(90deg, ${C.textPrimary}, ${C.accent2})`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      Amine Benallal
                    </span>
                  </Box>

                  {/* nav links */}
                  <Box
                    sx={{
                      p: 1.5,
                      display: "flex",
                      flexDirection: "column",
                      gap: 0.5,
                    }}
                  >
                    {navItems.map((item, i) => (
                      <motion.div
                        key={item.href}
                        custom={i}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <Link
                          to={item.href}
                          onClick={() => setMobileOpen(false)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            padding: "11px 14px",
                            borderRadius: 12,
                            textDecoration: "none",
                            color: C.textLink,
                            fontFamily: "'DM Sans', sans-serif",
                            fontWeight: 500,
                            fontSize: "0.92rem",
                            transition: "all 0.18s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                              C.mobileItemHover;
                            e.currentTarget.style.color = C.accent2;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.color = C.textLink;
                          }}
                        >
                          <Box
                            sx={{
                              width: 34,
                              height: 34,
                              borderRadius: "10px",
                              background: "rgba(124,110,245,0.10)",
                              border: "1px solid rgba(124,110,245,0.15)",
                              flexShrink: 0,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: C.accent1,
                            }}
                          >
                            {item.icon}
                          </Box>
                          {item.label}
                        </Link>
                      </motion.div>
                    ))}
                  </Box>

                  {/* divider */}
                  <Box
                    sx={{
                      mx: 2,
                      borderTop: "1px solid rgba(255,255,255,0.06)",
                    }}
                  />

                  {/* bottom padding */}
                  <Box sx={{ pb: 1.5 }} />
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}