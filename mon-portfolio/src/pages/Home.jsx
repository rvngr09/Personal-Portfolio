import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { animate, createScope, spring, stagger } from "animejs";

import {
  SiReact,
  SiLaravel,
  SiNextdotjs,
  SiFigma,
  SiNodedotjs,
  SiMongodb,
  SiMysql,
  SiDocker,
  SiPython,
  SiTensorflow,
  SiScikitlearn,
  SiPhp,
  SiJavascript,
  SiTypescript,
  SiGit,
  SiPostgresql,
  SiRedis,
} from "react-icons/si";
//import ThreeBackground from '../components/ThreeBackground';
import EnhancedThreeBackground from '../components/EnhancedThreeBackground';
let aminePhoto = null;
try {
  aminePhoto = new URL("../assets/me.jpg", import.meta.url).href;
} catch (_) {}

/* ─────────────────────────── GLOBAL STYLES ─────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Syne:wght@400;500;600;700;800&display=swap');

  :root {
    --ink: #0a0a0f;
    --ink2: #111118;
    --ink3: #1a1a24;
    --surface: #16161f;
    --surface2: #1e1e2a;
    --line: rgba(255,255,255,0.07);
    --line2: rgba(255,255,255,0.12);
    --text: #c8c8d8;
    --text2: #7a7a90;
    --text3: #4a4a60;
    --h: #f0f0f8;
    --accent: #e8d5ff;
    --accent2: #b388ff;
    --accent3: #7c4dff;
    --teal: #64ffda;
    --amber: #ffd740;
    --coral: #ff6b6b;
    --sans: 'Syne', system-ui, sans-serif;
    --serif: 'DM Serif Display', serif;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: var(--ink);
    color: var(--text);
    font-family: var(--sans);
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  ::selection { background: var(--accent3); color: #fff; }

  /* Grain overlay */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    z-index: 9999;
    pointer-events: none;
    opacity: 0.035;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    background-size: 200px;
  }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--ink); }
  ::-webkit-scrollbar-thumb { background: var(--accent3); border-radius: 2px; }

  /* Marquee */
  @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
  .marquee-inner { animation: marquee 28s linear infinite; white-space: nowrap; }

  /* Cursor blink */
  @keyframes blink { 0%, 100% { opacity: 1 } 50% { opacity: 0 } }
  .cursor { display: inline-block; animation: blink 1.1s step-end infinite; }

  /* Skill bar */
  @keyframes fillBar { from { width: 0 } to { width: var(--w) } }

  /* Float orb */
  @keyframes floatOrb { 0%, 100% { transform: translateY(0) scale(1) } 50% { transform: translateY(-28px) scale(1.04) } }
`;

/* ─────────────────────────── DATA ─────────────────────────── */
const SKILLS = [
  { icon: <SiReact />, name: "React & Next.js", level: 85, color: "#61dafb" },
  { icon: <SiLaravel />, name: "Laravel & PHP", level: 78, color: "#ff2d20" },
  {
    icon: <SiJavascript />,
    name: "JavaScript ES6+",
    level: 80,
    color: "#f7df1e",
  },
  { icon: <SiFigma />, name: "UI/UX Design", level: 80, color: "#a259ff" },
  {
    icon: <SiNodedotjs />,
    name: "Node.js & APIs",
    level: 80,
    color: "#68a063",
  },
  { icon: <SiPhp />, name: "PHP Vanilla", level: 75, color: "#8892bf" },
  { icon: <SiMysql />, name: "MySQL & Oracle", level: 72, color: "#4479a1" },
  { icon: <SiPostgresql />, name: "PostgreSQL", level: 80, color: "#336791" },
  { icon: <SiMongodb />, name: "MongoDB", level: 60, color: "#47a248" },
  { icon: <SiRedis />, name: "Redis", level: 55, color: "#dc382d" },
  { icon: <SiPython />, name: "Python", level: 70, color: "#3776ab" },
  { icon: "🧠", name: "NLP & NLTK", level: 58, color: "#e8d5ff" },
  { icon: <SiTensorflow />, name: "TensorFlow", level: 55, color: "#ff6f00" },
  {
    icon: <SiScikitlearn />,
    name: "Scikit-learn",
    level: 60,
    color: "#f89939",
  },
  { icon: "💻", name: "C & Assembly", level: 65, color: "#a8b2d8" },
];

const PROJECTS = [
  {
    num: "01",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
    accent: "#7c4dff",
    tags: ["Python", "NLTK", "Scikit-learn", "TF"],
    name: "Text Categorization AI",
    desc: "Système de classification par IA avec NLP, TF-IDF et apprentissage supervisé.",
    href: "https://github.com/rvngr09?tab=repositories",
  },
  {
    num: "02",
    gradient: "linear-gradient(135deg, #0d1b2a 0%, #1b2838 100%)",
    accent: "#64ffda",
    tags: ["Java", "Swing", "Oracle DB", "PDF"],
    name: "Document Management",
    desc: "Gestion sécurisée de dossiers avec authentification et génération PDF automatisée.",
    href: "https://github.com/rvngr09?tab=repositories",
  },
  {
    num: "03",
    gradient: "linear-gradient(135deg, #1a1012 0%, #2a1418 100%)",
    accent: "#ff6b6b",
    tags: ["Assembly", "8086", "Low-Level"],
    name: "Assembly Calculator",
    desc: "Calculatrice et convertisseur de base en assembleur 8086 avec opérations arithmétiques.",
    href: "https://github.com/rvngr09/Assembley-Calculator",
  },
];

const STATS = [
  { num: "3+", label: "Years Exp." },
  { num: "7", label: "Shipped" },
  { num: "6", label: "Clients" },
  { num: "99%", label: "On-Time" },
];

const MARQUEE_ITEMS = [
  "React",
  "Laravel",
  "Python",
  "Node.js",
  "PostgreSQL",
  "TensorFlow",
  "Figma",
  "MongoDB",
  "PHP",
  "Redis",
  "Assembly",
  "NLP",
  "React",
  "Laravel",
  "Python",
  "Node.js",
  "PostgreSQL",
  "TensorFlow",
  "Figma",
  "MongoDB",
  "PHP",
  "Redis",
  "Assembly",
  "NLP",
];

/* ─────────────────────────── COMPONENT ─────────────────────────── */
export default function Home() {
  const root = useRef(null);
  const scope = useRef(null);
  const [typed, setTyped] = useState("");
  const [skillsVisible, setSkillsVisible] = useState(false);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  /* Typewriter */
  useEffect(() => {
    const words = [
      "Full-Stack Dev",
      "UI/UX Designer",
      "AI Enthusiast",
      "Problem Solver",
    ];
    let wi = 0,
      ci = 0,
      deleting = false;
    const tick = () => {
      const word = words[wi];
      if (!deleting) {
        setTyped(word.slice(0, ci + 1));
        ci++;
        if (ci === word.length) {
          deleting = true;
          setTimeout(tick, 1800);
          return;
        }
      } else {
        setTyped(word.slice(0, ci - 1));
        ci--;
        if (ci === 0) {
          deleting = false;
          wi = (wi + 1) % words.length;
        }
      }
      setTimeout(tick, deleting ? 48 : 88);
    };
    const t = setTimeout(tick, 900);
    return () => clearTimeout(t);
  }, []);

  /* Anime.js hero */
  useEffect(() => {
    scope.current = createScope({ root }).add(() => {
      animate(".orb-1", {
        translateY: [0, -28, 0],
        duration: 6000,
        loop: true,
        ease: "inOutSine",
      });
      animate(".orb-2", {
        translateY: [0, 20, 0],
        duration: 8000,
        loop: true,
        ease: "inOutSine",
        delay: 1000,
      });
      animate(".orb-3", {
        translateY: [0, -16, 0],
        duration: 10000,
        loop: true,
        ease: "inOutSine",
        delay: 2000,
      });
      animate(".hero-eyebrow", {
        opacity: [0, 1],
        y: [20, 0],
        duration: 700,
        ease: "outExpo",
        delay: 200,
      });
      animate(".hero-h1-line", {
        opacity: [0, 1],
        y: [60, 0],
        duration: 1000,
        ease: "outExpo",
        delay: stagger(120, { start: 350 }),
      });
      animate(".hero-sub", {
        opacity: [0, 1],
        y: [24, 0],
        duration: 700,
        ease: "outExpo",
        delay: 800,
      });
      animate(".hero-cta", {
        opacity: [0, 1],
        y: [16, 0],
        scale: [0.95, 1],
        duration: 600,
        ease: "outExpo",
        delay: stagger(80, { start: 950 }),
      });
      animate(".hero-avatar", {
        opacity: [0, 1],
        scale: [0.88, 1],
        duration: 900,
        ease: spring({ stiffness: 160, damping: 16 }),
        delay: 300,
      });
      animate(".stat-card", {
        opacity: [0, 1],
        y: [30, 0],
        scale: [0.9, 1],
        duration: 600,
        ease: "outExpo",
        delay: stagger(80, { start: 1100 }),
      });
    });
    return () => scope.current?.revert();
  }, []);

  /* Scroll observer for skills */
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSkillsVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (skillsRef.current) io.observe(skillsRef.current);

    const io2 = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          animate(".proj-card", {
            opacity: [0, 1],
            y: [60, 0],
            scale: [0.96, 1],
            duration: 750,
            ease: "outExpo",
            delay: stagger(120),
          });
          io2.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (projectsRef.current) io2.observe(projectsRef.current);

    const io3 = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          animate(".contact-inner", {
            opacity: [0, 1],
            y: [50, 0],
            duration: 900,
            ease: "outExpo",
          });
          io3.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    if (contactRef.current) io3.observe(contactRef.current);

    return () => {
      io.disconnect();
      io2.disconnect();
      io3.disconnect();
    };
  }, []);

  const cardEnter = (e) =>
    animate(e.currentTarget, { y: -8, duration: 300, ease: "outExpo" });
  const cardLeave = (e) =>
    animate(e.currentTarget, { y: 0, duration: 400, ease: "outExpo" });
  const btnEnter = (e) =>
    animate(e.currentTarget, { scale: 1.04, duration: 200, ease: "outExpo" });
  const btnLeave = (e) =>
    animate(e.currentTarget, {
      scale: 1,
      duration: 300,
      ease: spring({ bounce: 0.4 }),
    });

  return (
    
    <div
      ref={root}
      style={{
        fontFamily: "var(--sans)",
        background: "var(--ink)",
        color: "var(--text)",
        overflowX: "hidden",
      }}
    > 
   
      <style>{GLOBAL_CSS}</style>
       <EnhancedThreeBackground />
      <Header />

      {/* ════════════════════ HERO ════════════════════ */}
      <section
        style={{
          minHeight: "100svh",
          position: "relative",
          display: "flex",
          alignItems: "center",
          padding: "120px 60px 80px",
          overflow: "hidden",
        }}
      >
        {/* Background orbs */}
        <div
          className="orb-1"
          style={{
            position: "absolute",
            top: "10%",
            right: "8%",
            width: 420,
            height: 420,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(124,77,255,0.18) 0%, transparent 70%)",
            pointerEvents: "none",
            filter: "blur(1px)",
          }}
        />
        <div
          className="orb-2"
          style={{
            position: "absolute",
            bottom: "15%",
            left: "-5%",
            width: 360,
            height: 360,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(100,255,218,0.10) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          className="orb-3"
          style={{
            position: "absolute",
            top: "50%",
            left: "40%",
            width: 200,
            height: 200,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(232,213,255,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Fine grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            pointerEvents: "none",
          }}
        />

        {/* Diagonal accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: "28%",
            width: 1,
            height: "100%",
            background:
              "linear-gradient(to bottom, transparent, rgba(124,77,255,0.3), transparent)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 420px",
            gap: 80,
            alignItems: "center",
          }}
        >
          {/* Left — text */}
          <div>
            <div
              className="hero-eyebrow"
              style={{
                opacity: 0,
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 28,
              }}
            >
              <span
                style={{
                  width: 28,
                  height: 1,
                  background: "var(--accent2)",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--accent2)",
                }}
              >
                Available for freelance
              </span>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#22c55e",
                  display: "inline-block",
                  boxShadow: "0 0 12px #22c55e",
                }}
              />
            </div>

            <h1
              style={{
                fontFamily: "var(--serif)",
                fontSize: "clamp(52px, 7vw, 96px)",
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
                color: "var(--h)",
                marginBottom: 32,
              }}
            >
              <div className="hero-h1-line" style={{ opacity: 0 }}>
                Hi, I'm
              </div>
              <div
                className="hero-h1-line"
                style={{
                  opacity: 0,
                  background:
                    "linear-gradient(135deg, var(--accent) 0%, var(--teal) 60%, var(--accent2) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Amine
              </div>
              <div
                className="hero-h1-line"
                style={{
                  opacity: 0,
                  fontSize: "clamp(28px, 3.5vw, 48px)",
                  fontFamily: "var(--sans)",
                  fontWeight: 400,
                  color: "var(--text2)",
                  marginTop: 8,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span>{typed}</span>
                <span className="cursor" style={{ color: "var(--accent2)" }}>
                  _
                </span>
              </div>
            </h1>

            <p
              className="hero-sub"
              style={{
                opacity: 0,
                fontSize: 17,
                lineHeight: 1.75,
                color: "var(--text)",
                maxWidth: 480,
                marginBottom: 44,
              }}
            >
              I craft high-performance web applications, Saas & Softwares with
              clean code, thoughtful UX, and animations that make every
              interaction feel alive.
            </p>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link
                to="/projects"
                className="hero-cta"
                style={{
                  opacity: 0,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "14px 32px",
                  borderRadius: 2,
                  background: "var(--accent3)",
                  color: "#fff",
                  fontFamily: "var(--sans)",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textDecoration: "none",
                  border: "none",
                  cursor: "pointer",
                  textTransform: "uppercase",
                }}
                onMouseEnter={btnEnter}
                onMouseLeave={btnLeave}
              >
                View Projects <span style={{ fontSize: 16 }}>→</span>
              </Link>
              <Link
                to="/contacts"
                className="hero-cta"
                style={{
                  opacity: 0,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "14px 32px",
                  borderRadius: 2,
                  background: "transparent",
                  color: "var(--accent)",
                  fontFamily: "var(--sans)",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textDecoration: "none",
                  border: "1px solid rgba(232,213,255,0.25)",
                  cursor: "pointer",
                  textTransform: "uppercase",
                }}
                onMouseEnter={btnEnter}
                onMouseLeave={btnLeave}
              >
                Get in Touch
              </Link>
            </div>
          </div>

          {/* Right — avatar */}
          <div
            className="hero-avatar"
            style={{ opacity: 0, position: "relative" }}
          >
            {/* Outer decorative ring */}
            <div
              style={{
                position: "absolute",
                inset: -24,
                borderRadius: "50%",
                border: "1px solid rgba(124,77,255,0.2)",
                borderStyle: "dashed",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: -12,
                borderRadius: "50%",
                border: "1px solid rgba(232,213,255,0.08)",
              }}
            />

            {/* Avatar */}
            <div
              style={{
                width: 360,
                height: 360,
                borderRadius: "50%",
                overflow: "hidden",
                border: "3px solid rgba(124,77,255,0.4)",
                position: "relative",
                zIndex: 1,
              }}
            >
              {aminePhoto ? (
                <img
                  src={aminePhoto}
                  alt="Amine"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "var(--surface2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 88,
                    fontFamily: "var(--serif)",
                    color: "var(--accent2)",
                  }}
                >
                  A
                </div>
              )}
              {/* Purple tint overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(circle at 70% 30%, rgba(124,77,255,0.2) 0%, transparent 60%)",
                }}
              />
            </div>

            {/* Floating badge */}
            <div
              style={{
                position: "absolute",
                bottom: 24,
                right: -16,
                background: "var(--surface2)",
                border: "1px solid var(--line2)",
                borderRadius: 12,
                padding: "12px 18px",
                display: "flex",
                alignItems: "center",
                gap: 10,
                zIndex: 2,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: "rgba(124,77,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                }}
              >
                ⚡
              </div>
              <div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--text2)",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  Open to Work
                </div>
                <div
                  style={{ fontSize: 13, color: "var(--h)", fontWeight: 700 }}
                >
                  Freelance & Remote
                </div>
              </div>
            </div>

            <div
              style={{
                position: "absolute",
                top: 20,
                left: -20,
                background: "var(--surface2)",
                border: "1px solid var(--line2)",
                borderRadius: 12,
                padding: "10px 16px",
                zIndex: 2,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: "var(--text2)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                Stack
              </div>
              <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
                {[
                  <SiReact />,
                  <SiLaravel />,
                  <SiNodedotjs />,
                  <SiPython />,
                ].map((icon, i) => (
                  <div
                    key={i}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 6,
                      background: "var(--ink3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
                      color: "var(--accent2)",
                    }}
                  >
                    {icon}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ STATS BAR ════════════════════ */}
      <div
        style={{
          borderTop: "1px solid var(--line)",
          borderBottom: "1px solid var(--line)",
          background: "var(--ink2)",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
          }}
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="stat-card"
              style={{
                opacity: 0,
                padding: "36px 20px",
                textAlign: "center",
                borderRight: i < 3 ? "1px solid var(--line)" : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: 52,
                  color: "var(--h)",
                  lineHeight: 1,
                  marginBottom: 8,
                }}
              >
                {s.num}
              </div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--text2)",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════ MARQUEE ════════════════════ */}
      <div
        style={{
          borderBottom: "1px solid var(--line)",
          overflow: "hidden",
          padding: "16px 0",
          background: "var(--ink3)",
        }}
      >
        <div
          className="marquee-inner"
          style={{ display: "inline-flex", gap: 40 }}
        >
          {MARQUEE_ITEMS.map((item, i) => (
            <span
              key={i}
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: i % 6 === 0 ? "var(--accent2)" : "var(--text3)",
                whiteSpace: "nowrap",
                display: "flex",
                alignItems: "center",
                gap: 40,
              }}
            >
              {item}
              <span
                style={{
                  display: "inline-block",
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: "var(--text3)",
                  verticalAlign: "middle",
                }}
              />
            </span>
          ))}
        </div>
      </div>

      {/* ════════════════════ ABOUT ════════════════════ */}
      <section
        style={{
          padding: "120px 60px",
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 100,
          alignItems: "center",
        }}
      >
        {/* Left — image */}
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: -20,
              left: -20,
              right: 20,
              bottom: 20,
              border: "1px solid rgba(124,77,255,0.2)",
              borderRadius: 4,
              zIndex: 0,
            }}
          />
          {aminePhoto ? (
            <img
              src={aminePhoto}
              alt="Amine"
              style={{
                width: "100%",
                aspectRatio: "4/5",
                objectFit: "cover",
                borderRadius: 4,
                position: "relative",
                zIndex: 1,
                filter: "grayscale(20%) contrast(1.05)",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                aspectRatio: "4/5",
                background: "var(--surface2)",
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 100,
                position: "relative",
                zIndex: 1,
              }}
            >
              👨‍💻
            </div>
          )}
          {/* Purple tint on image */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 2,
              background:
                "linear-gradient(180deg, transparent 50%, rgba(10,10,15,0.6) 100%)",
              borderRadius: 4,
            }}
          />

          {/* XP badge */}
          <div
            style={{
              position: "absolute",
              bottom: 32,
              left: 32,
              zIndex: 3,
              background: "rgba(10,10,15,0.85)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(124,77,255,0.3)",
              borderRadius: 12,
              padding: "14px 20px",
            }}
          >
            <div
              style={{
                fontSize: 28,
                fontFamily: "var(--serif)",
                color: "var(--h)",
                lineHeight: 1,
              }}
            >
              3+
            </div>
            <div
              style={{
                fontSize: 11,
                color: "var(--text2)",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginTop: 4,
              }}
            >
              Years Experience
            </div>
          </div>
        </div>

        {/* Right — text */}
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 20,
            }}
          >
            <span
              style={{
                width: 20,
                height: 1,
                background: "var(--accent2)",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--accent2)",
              }}
            >
              About me
            </span>
          </div>
          <h2
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(32px, 4vw, 56px)",
              lineHeight: 1.05,
              color: "var(--h)",
              marginBottom: 24,
              letterSpacing: "-0.02em",
            }}
          >
            Turning ideas
            <br />
            into{" "}
            <em style={{ fontStyle: "italic", color: "var(--accent)" }}>
              digital reality
            </em>
          </h2>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.8,
              color: "var(--text)",
              marginBottom: 20,
            }}
          >
            I'm a full-stack developer based in Algeria with 3+ years of
            experience building products that people love. I care deeply about
            clean code, pixel-perfect design, and snappy performance.
          </p>
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.8,
              color: "var(--text2)",
              marginBottom: 44,
            }}
          >
            When I'm not coding, I explore new tools, contribute to open-source,
            or learn about UX.
          </p>
          <div style={{ display: "flex", gap: 14 }}>
            <Link
              to="/resume"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "13px 28px",
                borderRadius: 2,
                background: "transparent",
                color: "var(--accent)",
                fontFamily: "var(--sans)",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.06em",
                textDecoration: "none",
                border: "1px solid rgba(232,213,255,0.25)",
                textTransform: "uppercase",
                zIndex: 10,
              }}
              onMouseEnter={btnEnter}
              onMouseLeave={btnLeave}
            >
              More About Me
            </Link>
            <a
              href="/cv.pdf"
              download
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "13px 28px",
                borderRadius: 2,
                background: "var(--accent3)",
                color: "#fff",
                fontFamily: "var(--sans)",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.06em",
                textDecoration: "none",
                textTransform: "uppercase",
                  zIndex: 10,

              }}
              onMouseEnter={btnEnter}
              onMouseLeave={btnLeave}
            >
              Download CV
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════ SKILLS ════════════════════ */}
      <section
        ref={skillsRef}
        style={{
          padding: "100px 60px",
          background: "var(--ink2)",
          borderTop: "1px solid var(--line)",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: 60,
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 16,
                }}
              >
                <span
                  style={{
                    width: 20,
                    height: 1,
                    background: "var(--accent2)",
                    display: "inline-block",
                  }}
                />
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--accent2)",
                  }}
                >
                  Skills
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: "clamp(32px, 4vw, 52px)",
                  color: "var(--h)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                }}
              >
                What I work with
              </h2>
            </div>
            <p
              style={{
                fontSize: 15,
                color: "var(--text2)",
                maxWidth: 320,
                lineHeight: 1.7,
                textAlign: "right",
              }}
            >
              A curated stack I reach for every day to ship fast and scale well.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 1,
              background: "var(--line)",
            }}
          >
            {SKILLS.map((sk, i) => (
              <div
                key={sk.name}
                style={{
                  background: "var(--ink2)",
                  padding: "24px 28px",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--surface2)";
                  animate(e.currentTarget.querySelector(".skill-bar-fill"), {
                    width: sk.level + "%",
                    duration: 600,
                    ease: "outExpo",
                  });
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--ink2)";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 14,
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 12 }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 8,
                        background: "var(--ink3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 16,
                        color: sk.color,
                      }}
                    >
                      {sk.icon}
                    </div>
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: "var(--h)",
                      }}
                    >
                      {sk.name}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "var(--text3)",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {sk.level}%
                  </span>
                </div>
                <div
                  style={{
                    height: 2,
                    background: "var(--line)",
                    borderRadius: 1,
                    overflow: "hidden",
                  }}
                >
                  <div
                    className="skill-bar-fill"
                    style={{
                      height: "100%",
                      background: `linear-gradient(90deg, ${sk.color}, ${sk.color}88)`,
                      borderRadius: 1,
                      width: skillsVisible ? sk.level + "%" : "0%",
                      transition: skillsVisible
                        ? "width 0.8s cubic-bezier(0.16,1,0.3,1)"
                        : "none",
                      transitionDelay: skillsVisible ? `${i * 40}ms` : "0ms",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ PROJECTS ════════════════════ */}
      <section
        ref={projectsRef}
        style={{ padding: "100px 60px", borderTop: "1px solid var(--line)" }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: 60,
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 16,
                }}
              >
                <span
                  style={{
                    width: 20,
                    height: 1,
                    background: "var(--accent2)",
                    display: "inline-block",
                  }}
                />
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--accent2)",
                  }}
                >
                  Projects
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: "clamp(32px, 4vw, 52px)",
                  color: "var(--h)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                }}
              >
                Featured work
              </h2>
            </div>
            <Link
              to="/projects"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 24px",
                borderRadius: 2,
                background: "transparent",
                color: "var(--text2)",
                fontFamily: "var(--sans)",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.06em",
                textDecoration: "none",
                border: "1px solid var(--line2)",
                textTransform: "uppercase",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--h)";
                e.currentTarget.style.borderColor = "var(--accent2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text2)";
                e.currentTarget.style.borderColor = "var(--line2)";
              }}
            >
              All Projects →
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 1,
              background: "var(--line)",
            }}
          >
            {PROJECTS.map((p) => (
              <Link
                key={p.name}
                to={p.href}
                className="proj-card"
                style={{
                  opacity: 0,
                  background: "var(--ink)",
                  textDecoration: "none",
                  display: "block",
                  position: "relative",
                  overflow: "hidden",
                  transition: "background 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--surface)";
                  cardEnter(e);
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--ink)";
                  cardLeave(e);
                }}
              >
                {/* Thumb */}
                <div
                  style={{
                    height: 200,
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
                      fontSize: 80,
                      color: p.accent,
                      opacity: 0.35,
                      userSelect: "none",
                    }}
                  >
                    {p.num}
                  </span>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: `radial-gradient(circle at 30% 30%, ${p.accent}22 0%, transparent 60%)`,
                    }}
                  />
                </div>

                {/* Body */}
                <div style={{ padding: "28px 28px 32px" }}>
                  <div
                    style={{
                      display: "flex",
                      gap: 6,
                      flexWrap: "wrap",
                      marginBottom: 16,
                    }}
                  >
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                          padding: "4px 10px",
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
                      fontSize: 22,
                      color: "var(--h)",
                      marginBottom: 10,
                      lineHeight: 1.2,
                    }}
                  >
                    {p.name}
                  </h3>
                  <p
                    style={{
                      fontSize: 14,
                      lineHeight: 1.7,
                      color: "var(--text2)",
                      marginBottom: 24,
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
                    View Project <span>→</span>
                  </span>
                </div>

                {/* Hover accent bottom border */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: p.accent,
                    opacity: 0,
                    transition: "opacity 0.3s",
                  }}
                  ref={(el) => {
                    if (el) {
                      el.parentElement.addEventListener(
                        "mouseenter",
                        () => (el.style.opacity = "1"),
                      );
                      el.parentElement.addEventListener(
                        "mouseleave",
                        () => (el.style.opacity = "0"),
                      );
                    }
                  }}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ CONTACT ════════════════════ */}
      <section
        ref={contactRef}
        style={{
          padding: "80px 60px 120px",
          borderTop: "1px solid var(--line)",
        }}
      >
        <div
          className="contact-inner"
          style={{
            opacity: 0,
            maxWidth: 900,
            margin: "0 auto",
            textAlign: "center",
            position: "relative",
          }}
        >
          {/* Background */}
          <div
            style={{
              position: "absolute",
              inset: -60,
              background:
                "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(124,77,255,0.08) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 24,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#22c55e",
                boxShadow: "0 0 14px #22c55e",
              }}
            />
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--accent2)",
              }}
            >
              Open to opportunities
            </span>
          </div>

          <h2
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(40px, 6vw, 80px)",
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              color: "var(--h)",
              marginBottom: 24,
              position: "relative",
            }}
          >
            Let's build something
            <br />
            <em
              style={{
                fontStyle: "italic",
                background:
                  "linear-gradient(135deg, var(--accent) 0%, var(--teal) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              great together
            </em>
          </h2>

          <p
            style={{
              fontSize: 17,
              lineHeight: 1.7,
              color: "var(--text2)",
              maxWidth: 460,
              margin: "0 auto 44px",
            }}
          >
            Have a project in mind or just want to say hello?
            <br />
            My inbox is always open.
          </p>

          <div
            style={{
              display: "flex",
              gap: 14,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              to="/contacts"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "16px 40px",
                borderRadius: 2,
                background: "var(--accent3)",
                color: "#fff",
                fontFamily: "var(--sans)",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textDecoration: "none",
                textTransform: "uppercase",
                boxShadow: "0 0 40px rgba(124,77,255,0.3)",
              }}
              onMouseEnter={btnEnter}
              onMouseLeave={btnLeave}
            >
              Send a Message →
            </Link>
            <a
              href="mailto:aminebenallalghst@gmail.com"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "16px 40px",
                borderRadius: 2,
                background: "transparent",
                color: "var(--text)",
                fontFamily: "var(--sans)",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.04em",
                textDecoration: "none",
                border: "1px solid var(--line2)",
              }}
              onMouseEnter={btnEnter}
              onMouseLeave={btnLeave}
            >
              aminebenallalghst@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════ FOOTER ════════════════════ */}
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
          © {new Date().getFullYear()} — All rights reserved
        </span>
        <div style={{ display: "flex", gap: 20 }}>
          <a
              key="GitHub"
              href="https://github.com/rvngr09"
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "var(--text2)",
                textDecoration: "none",
                letterSpacing: "0.06em",
                transition: "color 0.2s",
                textTransform: "uppercase",
                zIndex:10,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--accent2)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text2)")
              }
            >
              GitHub
            </a>
            <a
              key="LinkedIN"
              href="https://www.linkedin.com/in/amine-benallal-91a3ba389/"
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "var(--text2)",
                textDecoration: "none",
                letterSpacing: "0.06em",
                transition: "color 0.2s",
                textTransform: "uppercase",
                zIndex:10,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--accent2)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text2)")
              }
            >
              LinkedIN
            </a>
            <a
              key="Instagram"
              href="https://www.instagram.com/cdname.ghost/"
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "var(--text2)",
                textDecoration: "none",
                letterSpacing: "0.06em",
                transition: "color 0.2s",
                textTransform: "uppercase",
                zIndex:10,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--accent2)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text2)")
              }
            >
              Instagram
            </a>
        </div>
      </footer>
    </div>
  );
}
