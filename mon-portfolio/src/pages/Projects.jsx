import React, { useRef, useEffect, useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { animate, createScope, stagger, spring } from "animejs";

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Syne:wght@400;500;600;700;800&display=swap');
  :root {
    --ink:#0a0a0f;--ink2:#111118;--ink3:#1a1a24;--surface:#16161f;--surface2:#1e1e2a;
    --line:rgba(255,255,255,0.07);--line2:rgba(255,255,255,0.12);
    --text:#c8c8d8;--text2:#7a7a90;--text3:#4a4a60;--h:#f0f0f8;
    --accent:#e8d5ff;--accent2:#b388ff;--accent3:#7c4dff;
    --teal:#64ffda;--amber:#ffd740;--coral:#ff6b6b;
    --sans:'Syne',system-ui,sans-serif;--serif:'DM Serif Display',serif;
  }
  *{box-sizing:border-box;margin:0;padding:0;}
  body{background:var(--ink);color:var(--text);font-family:var(--sans);-webkit-font-smoothing:antialiased;overflow-x:hidden;}
  ::selection{background:var(--accent3);color:#fff;}
  body::before{content:'';position:fixed;inset:0;z-index:9999;pointer-events:none;opacity:0.035;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    background-size:200px;}
  ::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-track{background:var(--ink);}::-webkit-scrollbar-thumb{background:var(--accent3);border-radius:2px;}
  @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
`;

const ALL_PROJECTS = [
  {
    num: "01",
    category: "AI/ML",
    featured: true,
    accent: "#b388ff",
    gradient: "linear-gradient(135deg, #1a1028 0%, #2a1a40 100%)",
    tags: ["Python", "NLTK", "Scikit-learn", "TF-IDF", "TensorFlow"],
    name: "Text Categorization AI",
    desc: "An AI-powered text classification system using natural language processing. Built with TF-IDF vectorization, multiple ML algorithms, and deep learning models to categorize text with high accuracy.",
    href: "/comming-soon",
    year: "2022",
    status: "Completed",
  },
  {
    num: "02",
    category: "Full-Stack",
    featured: true,
    accent: "#64ffda",
    gradient: "linear-gradient(135deg, #0a1f1a 0%, #0d2a22 100%)",
    tags: ["React", "Laravel", "PostgreSQL", "Docker", "JWT"],
    name: "AgroConnect Platform (Start-up)",
    desc: "A full-stack agricultural marketplace connecting farmers with equipment renters, investors, and service providers. Features real-time notifications, QR payment system, and multi-language support.",
    href: "/comming-soon",
    year: "2023",
    status: "In Progress",
  },
  {
    num: "03",
    category: "Desktop App",
    featured: false,
    accent: "#ffd740",
    gradient: "linear-gradient(135deg, #1a1500 0%, #2a2000 100%)",
    tags: ["Java", "Swing", "Oracle DB", "iText PDF", "JDBC"],
    name: "Document Management System",
    desc: "Enterprise-grade document management with role-based access control, automated PDF generation, and Oracle database integration. Built for a Algerian government project.",
    href: "https://github.com/rvngr09?tab=repositories",
    year: "2022",
    status: "Completed",
  },
  {
    num: "04",
    category: "Low-Level",
    featured: false,
    accent: "#ff6b6b",
    gradient: "linear-gradient(135deg, #1a0808 0%, #2a1010 100%)",
    tags: ["Assembly", "8086", "DOS", "Low-Level"],
    name: "Assembly Calculator",
    desc: "A fully functional calculator and number base converter written in 8086 assembly language. Implements all arithmetic and logical operations with custom memory management routines.",
    href: "https://github.com/rvngr09/Assembley-Calculator",
    year: "2021",
    status: "Completed",
  },
  {
    num: "05",
    category: "E-Commerce",
    featured: false,
    accent: "#ff4081",
    gradient: "linear-gradient(135deg, #1a0812 0%, #2a0f1e 100%)",
    tags: ["React", "Node.js", "MongoDB", "Stripe", "Figma"],
    name: "Rojo Drip Store",
    desc: "A complete streetwear brand identity and e-commerce platform. Custom Figma design system, React storefront, Node.js backend, and Stripe payment integration.",
    href: "/comming-soon",
    year: "2023",
    status: "Live",
  },
  {
    num: "06",
    category: "Game",
    featured: false,
    accent: "#40c4ff",
    gradient: "linear-gradient(135deg, #081420 0%, #0f1e30 100%)",
    tags: ["C", "SDL2", "Game Dev", "Physics"],
    name: "SDL2 Game Engine",
    desc: "A 2D game built from scratch in C using SDL2. Features custom physics engine, sprite animation system, collision detection, and level editor.",
    href: "#",
    year: "2022",
    status: "Completed",
  },
];

const FILTERS = [
  "All",
  "AI/ML",
  "Full-Stack",
  "Desktop App",
  "Low-Level",
  "E-Commerce",
  "Game",
];

export default function Projects() {
  const root = useRef(null);
  const gridRef = useRef(null);
  const [filter, setFilter] = useState("All");
  const [hovered, setHovered] = useState(null);

  const filtered =
    filter === "All"
      ? ALL_PROJECTS
      : ALL_PROJECTS.filter((p) => p.category === filter);

  useEffect(() => {
    const scope = createScope({ root }).add(() => {
      animate(".page-eyebrow", {
        opacity: [0, 1],
        y: [20, 0],
        duration: 700,
        ease: "outExpo",
        delay: 200,
      });
      animate(".page-title", {
        opacity: [0, 1],
        y: [60, 0],
        duration: 900,
        ease: "outExpo",
        delay: 350,
      });
      animate(".page-sub", {
        opacity: [0, 1],
        y: [24, 0],
        duration: 700,
        ease: "outExpo",
        delay: 550,
      });
      animate(".filter-btn", {
        opacity: [0, 1],
        y: [16, 0],
        duration: 500,
        ease: "outExpo",
        delay: stagger(50, { start: 700 }),
      });
      animate(".proj-item", {
        opacity: [0, 1],
        y: [50, 0],
        scale: [0.97, 1],
        duration: 700,
        ease: "outExpo",
        delay: stagger(100, { start: 800 }),
      });
    });
    return () => scope.revert();
  }, []);

  useEffect(() => {
    animate(".proj-item", {
      opacity: [0, 1],
      y: [30, 0],
      scale: [0.97, 1],
      duration: 500,
      ease: "outExpo",
      delay: stagger(60),
    });
  }, [filter]);

  return (
    <div
      ref={root}
      style={{
        fontFamily: "var(--sans)",
        background: "var(--ink)",
        color: "var(--text)",
        minHeight: "100svh",
      }}
    >
      <style>{GLOBAL_CSS}</style>
      <Header />

      {/* Hero */}
      <section
        style={{
          padding: "140px 60px 80px",
          maxWidth: 1280,
          margin: "0 auto",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 80,
            right: 100,
            width: 500,
            height: 300,
            background:
              "radial-gradient(ellipse, rgba(124,77,255,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)",
            backgroundSize: "80px 80px",
            pointerEvents: "none",
          }}
        />

        <div
          className="page-eyebrow"
          style={{
            opacity: 0,
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 24,
          }}
        >
          <span
            style={{
              width: 28,
              height: 1,
              background: "var(--coral)",
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--coral)",
            }}
          >
            My work
          </span>
        </div>
        <h1
          className="page-title"
          style={{
            opacity: 0,
            fontFamily: "var(--serif)",
            fontSize: "clamp(52px, 7vw, 88px)",
            lineHeight: 0.95,
            color: "var(--h)",
            marginBottom: 24,
            letterSpacing: "-0.02em",
          }}
        >
          Projects &<br />
          <em
            style={{
              fontStyle: "italic",
              background:
                "linear-gradient(135deg, var(--coral) 0%, var(--amber) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Case Studies
          </em>
        </h1>
        <p
          className="page-sub"
          style={{
            opacity: 0,
            fontSize: 17,
            lineHeight: 1.75,
            color: "var(--text2)",
            maxWidth: 420,
          }}
        >
          {ALL_PROJECTS.length} projects shipped across AI, web, mobile, and
          systems programming.
        </p>
      </section>

      {/* Filters */}
      <div style={{ padding: "0 60px 60px", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {FILTERS.map((f) => (
            <button
              key={f}
              className="filter-btn"
              onClick={() => setFilter(f)}
              style={{
                opacity: 0,
                padding: "8px 20px",
                borderRadius: 2,
                background: filter === f ? "var(--accent3)" : "var(--ink3)",
                color: filter === f ? "#fff" : "var(--text2)",
                fontFamily: "var(--sans)",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.08em",
                border: `1px solid ${filter === f ? "var(--accent3)" : "var(--line)"}`,
                cursor: "pointer",
                textTransform: "uppercase",
                transition: "all 0.2s",
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Projects grid */}
      <div
        ref={gridRef}
        style={{ padding: "0 60px 120px", maxWidth: 1280, margin: "0 auto" }}
      >
        {/* Featured row */}
        {filter === "All" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.6fr 1fr",
              gap: 1,
              background: "var(--line)",
              marginBottom: 1,
            }}
          >
            {ALL_PROJECTS.filter((p) => p.featured).map((p) => (
              <ProjectCard
                key={p.num}
                p={p}
                large
                hovered={hovered}
                setHovered={setHovered}
              />
            ))}
          </div>
        )}

        {/* Regular grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 1,
            background: "var(--line)",
          }}
        >
          {filtered
            .filter((p) => (filter === "All" ? !p.featured : true))
            .map((p) => (
              <ProjectCard
                key={p.num}
                p={p}
                hovered={hovered}
                setHovered={setHovered}
              />
            ))}
        </div>
      </div>

      <footer
        style={{
          borderTop: "1px solid var(--line)",
          padding: "32px 60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "var(--ink2)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--serif)",
            fontSize: 18,
            color: "var(--accent2)",
          }}
        >
          Amine.
        </span>
        <span
          style={{
            fontSize: 12,
            color: "var(--text3)",
            letterSpacing: "0.06em",
          }}
        >
          © {new Date().getFullYear()}
        </span>
      </footer>
    </div>
  );
}

function ProjectCard({ p, large, hovered, setHovered }) {
  const isHov = hovered === p.num;
  return (
    <Link
      to={p.href}
      className="proj-item"
      style={{
        opacity: 0,
        textDecoration: "none",
        display: "block",
        background: "var(--ink)",
        transition: "background 0.3s",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        setHovered(p.num);
        e.currentTarget.style.background = "var(--surface)";
      }}
      onMouseLeave={(e) => {
        setHovered(null);
        e.currentTarget.style.background = "var(--ink)";
      }}
    >
      {/* Thumb */}
      <div
        style={{
          height: large ? 260 : 180,
          background: p.gradient,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontFamily: "var(--serif)",
            fontSize: large ? 100 : 72,
            color: p.accent,
            opacity: 0.2,
            userSelect: "none",
            transition: "opacity 0.3s",
            ...(isHov ? { opacity: 0.35 } : {}),
          }}
        >
          {p.num}
        </span>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at 30% 30%, ${p.accent}20 0%, transparent 60%)`,
          }}
        />
        {/* Status badge */}
        <div
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "4px 10px",
            borderRadius: 2,
            background:
              p.status === "Live"
                ? "rgba(34,197,94,0.2)"
                : p.status === "In Progress"
                  ? `${p.accent}22`
                  : "rgba(255,255,255,0.08)",
            color:
              p.status === "Live"
                ? "#22c55e"
                : p.status === "In Progress"
                  ? p.accent
                  : "var(--text2)",
            border: `1px solid ${p.status === "Live" ? "rgba(34,197,94,0.3)" : p.status === "In Progress" ? p.accent + "33" : "var(--line)"}`,
          }}
        >
          {p.status}
        </div>
        <div
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "4px 10px",
            borderRadius: 2,
            background: "rgba(0,0,0,0.5)",
            color: "var(--text2)",
          }}
        >
          {p.year}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: large ? "32px 36px 36px" : "24px 28px 28px" }}>
        <div
          style={{
            display: "flex",
            gap: 6,
            flexWrap: "wrap",
            marginBottom: 14,
          }}
        >
          {p.tags.slice(0, 4).map((t) => (
            <span
              key={t}
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.08em",
                padding: "3px 9px",
                borderRadius: 2,
                background: "rgba(255,255,255,0.04)",
                color: "var(--text2)",
                border: "1px solid var(--line)",
                textTransform: "uppercase",
              }}
            >
              {t}
            </span>
          ))}
        </div>
        <h3
          style={{
            fontFamily: "var(--serif)",
            fontSize: large ? 28 : 20,
            color: "var(--h)",
            marginBottom: 10,
            lineHeight: 1.2,
          }}
        >
          {p.name}
        </h3>
        <p
          style={{
            fontSize: 13,
            lineHeight: 1.7,
            color: "var(--text2)",
            marginBottom: 20,
          }}
        >
          {p.desc}
        </p>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 12,
            fontWeight: 700,
            color: p.accent,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          View Project →
        </span>
      </div>

      {/* Bottom accent */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background: p.accent,
          opacity: isHov ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      />
    </Link>
  );
}
