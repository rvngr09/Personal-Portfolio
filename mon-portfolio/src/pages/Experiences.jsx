import React, { useRef, useEffect, useState } from "react";
import Header from "../components/Header";
import { animate, createScope, stagger } from "animejs";

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
  .exp-nav-list::-webkit-scrollbar {
  width: 2px;
}
.exp-nav-list::-webkit-scrollbar-track {
  background: var(--line);
}
.exp-nav-list::-webkit-scrollbar-thumb {
  background: var(--accent3);
}
`;

const EXPERIENCE = [
  {
    period: "2025 — Present",
    role: "Full-Stack Developer",
    company: "Freelance",
    type: "Freelance",
    color: "var(--accent2)",
    desc: "Building custom web applications for clients across Algeria and internationally. Specializing in React frontends, Laravel APIs, PostgreSQL databases, Docker containerization, and backend development with Java, C, Go, and Python. Experienced in Machine Learning, NLP, ORM frameworks, and RBAC,TOKEN,OTP,CSRF security systems.",
    tags: ["React", "Laravel", "PostgreSQL", "Docker","JAVA","C","Go","Python","Machine Learning","NLP","ORM","RBAC"],
    highlights: [
      "6 projects delivered on time",
      "Avg. 99% client satisfaction",
      "Built 3 SaaS MVPs",
      "AI text categorization system",
    ],
  },
  {
    period: "2024 — 2025",
    role: "UI/UX Designer & Developer",
    company: "Rojo Drip (Personal Brand)",
    type: "Personal Project",
    color: "var(--teal)",
    desc: "Designed and developed a complete brand identity and e-commerce platform. Created all visual assets, brand guidelines, and the full shopping experience.",
    tags: ["Figma", "React", "Node.js", "MongoDB"],
    highlights: [
      "Complete brand design system",
      "E-commerce with 100+ products",
      "Custom admin dashboard",
    ],
  },
  {
    period: "2023 — 2024",
    role: "Graphic Designer",
    company: "Multiple",
    type: "Freelance Projects",
    color: "var(--teal)",
    desc: "Designed and developed complete brand identities and visual systems. Created all graphic assets, brand guidelines, and marketing materials.",
    tags: ["Figma", "PhotoShop", "Illustrator", "Premier Pro"],
    highlights: [
      "Complete brand design system",
      "Marketing ads videos",
      "Social Media posts",
    ],
  },
  {
    period: "2022 — 2023",
    role: "Junior Developer",
    company: "University Projects",
    type: "Academic",
    color: "var(--coral)",
    desc: "Developed various academic projects spanning AI, document management, and low-level programming. Learned system design and software architecture fundamentals.",
    tags: ["Python", "Java", "Assembly", "MySQL"],
    highlights: [
      
      "Document management app",
      "Assembly 8086 calculator",
    ],
  },
];

const EDUCATION = [
  {
    period: "2023 — Present",
    degree: "Bachelor's in Computer Science",
    school: "University of Science & Technology",
    location: "Algeria",
    color: "var(--amber)",
    desc: "Specializing in software engineering, AI/ML, and system architecture. Strong focus on practical project work and real-world applications.",
    gpa: "3.9 / 4.0",
  },
];

const CERTIFICATIONS = [
  { name: "React Developer", issuer: "Meta", year: "2023", color: "#61dafb" },
  {
    name: "Laravel Certification",
    issuer: "Laravel",
    year: "2022",
    color: "#ff2d20",
  },
  { name: "Python for AI", issuer: "Coursera", year: "2022", color: "#3776ab" },
  { name: "UI/UX Design", issuer: "Google", year: "2021", color: "#fbbc04" },
];

function whenVisible(el, cb) {
  if (!el) return;
  const io = new IntersectionObserver(
    ([e]) => {
      if (e.isIntersecting) {
        cb();
        io.disconnect();
      }
    },
    { threshold: 0.1 },
  );
  io.observe(el);
}

export default function Experience() {
  const root = useRef(null);
  const eduRef = useRef(null);
  const certRef = useRef(null);
  const [activeExp, setActiveExp] = useState(0);

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
      animate(".exp-nav-item", {
        opacity: [0, 1],
        x: [-20, 0],
        duration: 500,
        ease: "outExpo",
        delay: stagger(80, { start: 700 }),
      });
      animate(".exp-panel", {
        opacity: [0, 1],
        x: [40, 0],
        duration: 700,
        ease: "outExpo",
        delay: 800,
      });
    });

    whenVisible(eduRef.current, () =>
      animate(".edu-card", {
        opacity: [0, 1],
        y: [40, 0],
        scale: [0.97, 1],
        duration: 700,
        ease: "outExpo",
        delay: stagger(100),
      }),
    );
    whenVisible(certRef.current, () =>
      animate(".cert-card", {
        opacity: [0, 1],
        y: [30, 0],
        scale: [0.95, 1],
        duration: 600,
        ease: "outExpo",
        delay: stagger(70),
      }),
    );

    return () => scope.revert();
  }, []);

  useEffect(() => {
    animate(".exp-panel", {
      opacity: [0.4, 1],
      x: [20, 0],
      duration: 400,
      ease: "outExpo",
    });
  }, [activeExp]);

  const exp = EXPERIENCE[activeExp];

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
            top: 60,
            left: -80,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(100,255,218,0.07) 0%, transparent 70%)",
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
            My journey
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
          Experience &<br />
          <em
            style={{
              fontStyle: "italic",
              background:
                "linear-gradient(135deg, var(--accent) 0%, var(--amber) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Education
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
          A timeline of how I've grown as a developer — through projects,
          studies, and relentless curiosity.
        </p>
      </section>

      {/* Experience tabs */}
      <section
        style={{
          padding: "0 60px 100px",
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "280px 1fr",
          gap: 0,
        }}
      >
        {/* Nav */}
        <div
          style={{
            borderRight: "1px solid var(--line)",
            paddingRight: 0,
            maxHeight: "calc(100vh - 280px)",
            overflowY: "auto",
            overflowX: "hidden",
          }}
          className="exp-nav-list"
        >
          {EXPERIENCE.map((e, i) => (
            <button
              key={i}
              className="exp-nav-item"
              onClick={() => setActiveExp(i)}
              style={{
                opacity: 0,
                width: "100%",
                textAlign: "left",
                padding: "24px 28px",
                background: activeExp === i ? "var(--surface)" : "transparent",
                border: "none",
                borderLeft: `2px solid ${activeExp === i ? e.color : "transparent"}`,
                cursor: "pointer",
                transition: "all 0.2s",
                display: "block",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: activeExp === i ? e.color : "var(--text3)",
                  marginBottom: 6,
                }}
              >
                {e.period}
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: activeExp === i ? "var(--h)" : "var(--text2)",
                }}
              >
                {e.role}
              </div>
              <div
                style={{ fontSize: 12, color: "var(--text3)", marginTop: 3 }}
              >
                {e.company}
              </div>
            </button>
          ))}
        </div>

        {/* Panel */}
        <div className="exp-panel" style={{ opacity: 0, padding: "40px 60px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 8,
            }}
          >
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                padding: "4px 12px",
                borderRadius: 2,
                background: `rgba(${exp.color === "var(--accent2)" ? "179,136,255" : exp.color === "var(--teal)" ? "100,255,218" : "255,107,107"},0.12)`,
                color: exp.color,
                border: `1px solid ${exp.color}33`,
              }}
            >
              {exp.type}
            </span>
          </div>
          <h2
            style={{
              fontFamily: "var(--serif)",
              fontSize: 40,
              color: "var(--h)",
              lineHeight: 1.1,
              marginBottom: 6,
            }}
          >
            {exp.role}
          </h2>
          <div
            style={{
              fontSize: 15,
              color: exp.color,
              fontWeight: 600,
              marginBottom: 24,
            }}
          >
            @ {exp.company} · {exp.period}
          </div>
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.8,
              color: "var(--text)",
              marginBottom: 32,
              maxWidth: 560,
            }}
          >
            {exp.desc}
          </p>

          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              marginBottom: 40,
            }}
          >
            {exp.tags.map((t) => (
              <span
                key={t}
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  padding: "6px 14px",
                  borderRadius: 2,
                  background: "var(--ink3)",
                  color: "var(--text2)",
                  border: "1px solid var(--line)",
                  textTransform: "uppercase",
                }}
              >
                {t}
              </span>
            ))}
          </div>

          <div style={{ borderTop: "1px solid var(--line)", paddingTop: 32 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--text3)",
                marginBottom: 16,
              }}
            >
              Key Highlights
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {exp.highlights.map((h, i) => (
                <div
                  key={i}
                  style={{ display: "flex", alignItems: "center", gap: 14 }}
                >
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 2,
                      background: `${exp.color}22`,
                      border: `1px solid ${exp.color}44`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 10,
                      color: exp.color,
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </div>
                  <span style={{ fontSize: 14, color: "var(--text)" }}>
                    {h}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section
        ref={eduRef}
        style={{
          padding: "80px 60px",
          borderTop: "1px solid var(--line)",
          background: "var(--ink2)",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
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
                background: "var(--amber)",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--amber)",
              }}
            >
              Education
            </span>
          </div>
          <h2
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(28px, 3.5vw, 44px)",
              color: "var(--h)",
              marginBottom: 48,
              letterSpacing: "-0.02em",
            }}
          >
            Academic background
          </h2>

          {EDUCATION.map((e, i) => (
            <div
              key={i}
              className="edu-card"
              style={{
                opacity: 0,
                display: "grid",
                gridTemplateColumns: "200px 1fr",
                gap: 0,
                border: "1px solid var(--line)",
                borderLeft: `3px solid ${e.color}`,
                background: "var(--ink)",
              }}
            >
              <div
                style={{
                  padding: "32px 28px",
                  borderRight: "1px solid var(--line)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: e.color,
                  }}
                >
                  {e.period}
                </div>
                <div style={{ fontSize: 12, color: "var(--text2)" }}>
                  {e.location}
                </div>
                <div
                  style={{
                    marginTop: "auto",
                    fontSize: 12,
                    color: "var(--text3)",
                  }}
                >
                  GPA
                </div>
                <div
                  style={{
                    fontSize: 20,
                    fontFamily: "var(--serif)",
                    color: e.color,
                  }}
                >
                  {e.gpa}
                </div>
              </div>
              <div style={{ padding: "32px 40px" }}>
                <h3
                  style={{
                    fontFamily: "var(--serif)",
                    fontSize: 26,
                    color: "var(--h)",
                    marginBottom: 6,
                    lineHeight: 1.2,
                  }}
                >
                  {e.degree}
                </h3>
                <div
                  style={{
                    fontSize: 14,
                    color: e.color,
                    fontWeight: 600,
                    marginBottom: 16,
                  }}
                >
                  {e.school}
                </div>
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.75,
                    color: "var(--text2)",
                  }}
                >
                  {e.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section
        ref={certRef}
        style={{
          padding: "80px 60px 120px",
          borderTop: "1px solid var(--line)",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
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
                background: "var(--teal)",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--teal)",
              }}
            >
              Certifications
            </span>
          </div>
          <h2
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(28px, 3.5vw, 44px)",
              color: "var(--h)",
              marginBottom: 48,
              letterSpacing: "-0.02em",
            }}
          >
            Credentials
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: 1,
              background: "var(--line)",
            }}
          >
            {CERTIFICATIONS.map((c) => (
              <div
                key={c.name}
                className="cert-card"
                style={{
                  opacity: 0,
                  padding: "28px",
                  background: "var(--ink2)",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "var(--surface)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "var(--ink2)")
                }
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    background: `${c.color}18`,
                    border: `1px solid ${c.color}33`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                  }}
                >
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      background: c.color,
                    }}
                  />
                </div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "var(--h)",
                    marginBottom: 6,
                  }}
                >
                  {c.name}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--text2)",
                    marginBottom: 4,
                  }}
                >
                  {c.issuer}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--text3)",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                  }}
                >
                  {c.year}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
