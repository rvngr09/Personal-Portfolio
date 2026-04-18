import React, { useRef, useEffect } from "react";
import Header from "../components/Header";
import { animate, createScope, stagger } from "animejs";
import {
  SiReact,
  SiLaravel,
  SiNodedotjs,
  SiPython,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiDocker,
  SiFigma,
  SiGit,
  SiJavascript,
  SiPhp,
  SiC,
  
} from "react-icons/si";
import { FaJava  } from "react-icons/fa";            
import { FiCpu, FiTerminal } from 'react-icons/fi';
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
  @media print {
    body::before { display: none !important; }
    .no-print { display: none !important; }
    body { background: #fff !important; color: #000 !important; }
    .resume-sheet { box-shadow: none !important; border: none !important; }
  }
`;

const TECH_STACK = [
  { icon: <FaJava />, name: "Java", color: "#61dafb" },
  { icon: <SiC/>, name: "C", color: "#61dafb" },
  { icon: <FiCpu/>, name: "Assembley", color: "#61dafb" },
  { icon: <SiReact />, name: "React", color: "#61dafb" },
  { icon: <SiLaravel />, name: "Laravel", color: "#ff2d20" },
  { icon: <SiNodedotjs />, name: "Node.js", color: "#68a063" },
  { icon: <SiPython />, name: "Python", color: "#3776ab" },
  { icon: <SiJavascript />, name: "JavaScript", color: "#f7df1e" },
  { icon: <SiPhp />, name: "PHP", color: "#8892bf" },
  { icon: <SiPostgresql />, name: "PostgreSQL", color: "#336791" },
  { icon: <SiMysql />, name: "MySQL", color: "#4479a1" },
  { icon: <SiMongodb />, name: "MongoDB", color: "#47a248" },
  { icon: <SiFigma />, name: "Figma", color: "#a259ff" },
  { icon: <SiDocker />, name: "Docker", color: "#2496ed" },
  { icon: <SiGit />, name: "Git", color: "#f05032" },
  
];

const Section = ({ label, color = "var(--accent2)", children }) => (
  <div style={{ marginBottom: 48 }}>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 28,
        paddingBottom: 16,
        borderBottom: "1px solid var(--line)",
      }}
    >
      <span
        style={{
          width: 3,
          height: 20,
          background: color,
          borderRadius: 2,
          display: "inline-block",
        }}
      />
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color,
        }}
      >
        {label}
      </span>
    </div>
    {children}
  </div>
);

export default function Resume() {
  const root = useRef(null);

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
      animate(".resume-sheet", {
        opacity: [0, 1],
        y: [40, 0],
        duration: 900,
        ease: "outExpo",
        delay: 700,
      });
    });
    return () => scope.revert();
  }, []);

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
          padding: "140px 60px 60px",
          maxWidth: 1280,
          margin: "0 auto",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 80,
            right: 0,
            width: 600,
            height: 400,
            background:
              "radial-gradient(ellipse, rgba(100,255,218,0.06) 0%, transparent 70%)",
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
              background: "var(--teal)",
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--teal)",
            }}
          >
            Résumé
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          <div>
            <h1
              className="page-title"
              style={{
                opacity: 0,
                fontFamily: "var(--serif)",
                fontSize: "clamp(52px, 7vw, 88px)",
                lineHeight: 0.95,
                color: "var(--h)",
                marginBottom: 16,
                letterSpacing: "-0.02em",
              }}
            >
              Curriculum
              <br />
              <em
                style={{
                  fontStyle: "italic",
                  background:
                    "linear-gradient(135deg, var(--teal) 0%, var(--accent) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Vitae
              </em>
            </h1>
            <p
              className="page-sub"
              style={{
                opacity: 0,
                fontSize: 17,
                lineHeight: 1.75,
                color: "var(--text2)",
                maxWidth: 400,
              }}
            >
              Full-stack developer · UI/UX Designer · AI enthusiast. Based in
              Algeria.
            </p>
          </div>

          <div className="no-print" style={{ display: "flex", gap: 12 }}>
            <a
              href="/cv.pdf"
              download
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "14px 28px",
                borderRadius: 2,
                background: "var(--accent3)",
                color: "#fff",
                fontFamily: "var(--sans)",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textDecoration: "none",
                textTransform: "uppercase",
                boxShadow: "0 0 30px rgba(124,77,255,0.25)",
              }}
            >
              ↓ Download PDF
            </a>
            <button
              onClick={() => window.print()}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "14px 28px",
                borderRadius: 2,
                background: "transparent",
                color: "var(--text2)",
                fontFamily: "var(--sans)",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                border: "1px solid var(--line2)",
                cursor: "pointer",
              }}
            >
              ⎙ Print
            </button>
          </div>
        </div>
      </section>

      {/* Resume sheet */}
      <div
        style={{ padding: "0 60px 120px", maxWidth: 1280, margin: "0 auto" }}
      >
        <div
          className="resume-sheet"
          style={{
            opacity: 0,
            border: "1px solid var(--line)",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          {/* Header strip */}
          <div
            style={{
              background: "var(--ink3)",
              padding: "48px 56px",
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: 40,
              alignItems: "center",
              borderBottom: "1px solid var(--line)",
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: 52,
                  color: "var(--h)",
                  lineHeight: 1,
                  marginBottom: 10,
                }}
              >
                Amine Benallal
              </h2>
              <div
                style={{
                  fontSize: 16,
                  color: "var(--accent2)",
                  fontWeight: 600,
                  marginBottom: 16,
                }}
              >
                Full-Stack Developer & UI/UX Designer
              </div>
              <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                {[
                  { icon: "✉", val: "aminebenallalghst@gmail.com" },
                  { icon: "⌂", val: "Algeria" },
                  { icon: "⌥", val: "github.com/rvngr09" },
                ].map((item) => (
                  <div
                    key={item.val}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 7,
                      fontSize: 13,
                      color: "var(--text2)",
                    }}
                  >
                    <span style={{ color: "var(--text3)" }}>{item.icon}</span>
                    {item.val}
                  </div>
                ))}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                textAlign: "right",
              }}
            >
              {[
                { num: "3+", label: "Years Exp." },
                { num: "10", label: "Projects" },
                { num: "6", label: "Clients" },
              ].map((s) => (
                <div key={s.label}>
                  <div
                    style={{
                      fontFamily: "var(--serif)",
                      fontSize: 32,
                      color: "var(--h)",
                      lineHeight: 1,
                    }}
                  >
                    {s.num}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--text3)",
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Body */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 320px",
              gap: 0,
            }}
          >
            {/* Main column */}
            <div
              style={{
                padding: "48px 56px",
                borderRight: "1px solid var(--line)",
              }}
            >
              {/* Summary */}
              <Section label="Summary" color="var(--accent2)">
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.85,
                    color: "var(--text)",
                    maxWidth: 560,
                  }}
                >
                  Full-stack developer with 3+ years of experience building web
                  applications, AI systems, and desktop software. Passionate
                  about clean architecture, pixel-perfect UI, and
                  high-performance systems. Currently open to freelance projects
                  and remote roles.
                </p>
              </Section>

              {/* Experience */}
              <Section label="Experience" color="var(--teal)">
                {[
                  {
                    role: "Full-Stack Developer",
                    company: "Freelance",
                    period: "2025 — Present",
                    points: [
                      "Built 6 client web applications with React, Laravel, and PostgreSQL",
                      "Designed and developed complete brand identity for Rojo Drip",
                      "Implemented QR payment system for AgroConnect platform",
                      "Delivered all projects on-time with 99% client satisfaction",
                       "Developed AI text categorization system using Python, NLTK, and Scikit-learn",
                    ],
                  },
                  {
                    role: "Software Developer",
                    company: "University Projects",
                    period: "2023 — 2025",
                    points: [
                     
                      "Built enterprise document management system in Java with Oracle DB integration",
                      "Created low-level Assembly 8086 calculator with custom memory management",
                      "Built 2D game engine in C using SDL2 with physics simulation",
                    ],
                  },
                ].map((e, i) => (
                  <div
                    key={i}
                    style={{
                      marginBottom: 32,
                      paddingLeft: 20,
                      borderLeft: "1px solid var(--line)",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        left: -5,
                        top: 6,
                        width: 9,
                        height: 9,
                        borderRadius: "50%",
                        background: "var(--teal)",
                        border: "2px solid var(--ink2)",
                      }}
                    />
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        justifyContent: "space-between",
                        marginBottom: 4,
                        flexWrap: "wrap",
                        gap: 8,
                      }}
                    >
                      <h4
                        style={{
                          fontSize: 16,
                          fontWeight: 700,
                          color: "var(--h)",
                        }}
                      >
                        {e.role}
                      </h4>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                          color: "var(--text3)",
                          textTransform: "uppercase",
                        }}
                      >
                        {e.period}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: "var(--teal)",
                        fontWeight: 600,
                        marginBottom: 12,
                      }}
                    >
                      {e.company}
                    </div>
                    <ul
                      style={{
                        listStyle: "none",
                        display: "flex",
                        flexDirection: "column",
                        gap: 7,
                      }}
                    >
                      {e.points.map((pt, j) => (
                        <li
                          key={j}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 10,
                            fontSize: 13,
                            color: "var(--text2)",
                            lineHeight: 1.6,
                          }}
                        >
                          <span
                            style={{
                              color: "var(--text3)",
                              flexShrink: 0,
                              marginTop: 1,
                            }}
                          >
                            ›
                          </span>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </Section>

              {/* Education */}
              <Section label="Education" color="var(--amber)">
                <div
                  style={{
                    paddingLeft: 20,
                    borderLeft: "1px solid var(--line)",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: -5,
                      top: 6,
                      width: 9,
                      height: 9,
                      borderRadius: "50%",
                      background: "var(--amber)",
                      border: "2px solid var(--ink2)",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "space-between",
                      marginBottom: 4,
                      flexWrap: "wrap",
                      gap: 8,
                    }}
                  >
                    <h4
                      style={{
                        fontSize: 16,
                        fontWeight: 700,
                        color: "var(--h)",
                      }}
                    >
                      Bachelor's in Computer Science (3 rd year)
                    </h4>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        color: "var(--text3)",
                        textTransform: "uppercase",
                      }}
                    >
                      2023 — Present
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "var(--amber)",
                      fontWeight: 600,
                      marginBottom: 10,
                    }}
                  >
                    University of Science & Technology, Algeria
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text2)" }}>
                    GPA: 3.905 / 4.0 · Specialization: Software Engineering & AI
                  </div>
                </div>
              </Section>
            </div>

            {/* Sidebar */}
            <div style={{ padding: "48px 36px", background: "var(--ink2)" }}>
              {/* Tech stack */}
              <Section label="Tech Stack" color="var(--coral)">
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 10 }}
                >
                  {TECH_STACK.map((t) => (
                    <div
                      key={t.name}
                      style={{ display: "flex", alignItems: "center", gap: 10 }}
                    >
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 6,
                          background: "var(--ink3)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 14,
                          color: t.color,
                          flexShrink: 0,
                        }}
                      >
                        {t.icon}
                      </div>
                      <span style={{ fontSize: 13, color: "var(--text)" }}>
                        {t.name}
                      </span>
                    </div>
                  ))}
                </div>
              </Section>

              {/* Languages */}
              <Section label="Languages" color="var(--accent2)">
                {[
                  { lang: "Arabic", level: "Native", pct: 100 },
                  { lang: "English", level: "Professional", pct: 90 },
                  { lang: "French", level: "Fluent", pct: 80 },
                  
                ].map((l) => (
                  <div key={l.lang} style={{ marginBottom: 16 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 6,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 13,
                          color: "var(--text)",
                          fontWeight: 600,
                        }}
                      >
                        {l.lang}
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          color: "var(--text3)",
                          fontWeight: 600,
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                        }}
                      >
                        {l.level}
                      </span>
                    </div>
                    <div
                      style={{
                        height: 2,
                        background: "var(--line)",
                        borderRadius: 1,
                      }}
                    >
                      <div
                        style={{
                          width: l.pct + "%",
                          height: "100%",
                          background: "var(--accent2)",
                          borderRadius: 1,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </Section>

              {/* Interests */}
              <Section label="Interests" color="var(--teal)">
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {[
                    "Start-ups",
                    "Plateform dev",
                    "Saas",
                    "Open Source",
                    "AI/ML",
                    "UI/UX",
                    "Game Dev",
                    "Low-Level",
                    "DevOps",
                    "Photography",
                  ].map((i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        padding: "5px 10px",
                        borderRadius: 2,
                        background: "var(--ink3)",
                        color: "var(--text2)",
                        border: "1px solid var(--line)",
                        textTransform: "uppercase",
                      }}
                    >
                      {i}
                    </span>
                  ))}
                </div>
              </Section>

              {/* Availability */}
              <div
                style={{
                  padding: "20px",
                  background: "rgba(124,77,255,0.08)",
                  border: "1px solid rgba(124,77,255,0.2)",
                  borderRadius: 2,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 10,
                  }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#22c55e",
                      boxShadow: "0 0 8px #22c55e",
                    }}
                  />
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#22c55e",
                    }}
                  >
                    Available
                  </span>
                </div>
                <p
                  style={{
                    fontSize: 12,
                    color: "var(--text2)",
                    lineHeight: 1.6,
                  }}
                >
                  Open to freelance & full-time remote opportunities worldwide.
                </p>
              </div>
            </div>
          </div>
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
