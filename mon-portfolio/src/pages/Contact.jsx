import React, { useRef, useEffect, useState } from "react";
import Header from "../components/Header";
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
  input,textarea{outline:none;font-family:var(--sans);}
  input::placeholder,textarea::placeholder{color:var(--text3);}
  @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(0.85)}}
  @keyframes scanline{0%{top:-10%}100%{top:110%}}
`;

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/rvngr09",
    icon: "⌥",
    desc: "Source code & projects",
  },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/amine-benallal-91a3ba389/", icon: "◈", desc: "Professional network" },
  { label: "Instagram", href: "https://www.instagram.com/cdname.ghost/", icon: "◉", desc: "Thoughts & updates" },
  {
    label: "Email",
    href: "mailto:aminebenallalghst@gmail.com",
    icon: "◎",
    desc: "aminebenallalghst@gmail.com",
  },
];

export default function Contacts() {
  const root = useRef(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState(null);

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
      animate(".contact-card", {
        opacity: [0, 1],
        y: [40, 0],
        scale: [0.96, 1],
        duration: 700,
        ease: "outExpo",
        delay: stagger(80, { start: 700 }),
      });
      animate(".form-wrap", {
        opacity: [0, 1],
        x: [40, 0],
        duration: 800,
        ease: "outExpo",
        delay: 600,
      });
    });
    return () => scope.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    animate(".submit-btn", {
      scale: [1, 0.96, 1.02, 1],
      duration: 500,
      ease: "outElastic",
    });
    setTimeout(() => setSent(true), 600);
  };

  const fieldStyle = (name) => ({
    width: "100%",
    padding: "16px 20px",
    background: focused === name ? "var(--surface2)" : "var(--ink3)",
    border: `1px solid ${focused === name ? "rgba(124,77,255,0.5)" : "var(--line)"}`,
    borderRadius: 2,
    color: "var(--h)",
    fontSize: 14,
    fontFamily: "var(--sans)",
    transition: "all 0.2s",
    resize: "none",
  });

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
            right: 0,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(124,77,255,0.1) 0%, transparent 70%)",
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
            Get in touch
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
          Let's start a<br />
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
            conversation
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
          Have a project idea, want to collaborate, or just say hello? Drop me a
          message — I reply within 24 hours.
        </p>
      </section>

      {/* Main grid */}
      <section
        style={{
          padding: "0 60px 120px",
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1.4fr",
          gap: 80,
          alignItems: "start",
        }}
      >
        {/* Left — info cards */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            background: "var(--line)",
          }}
        >
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="contact-card"
              style={{
                opacity: 0,
                display: "flex",
                alignItems: "center",
                gap: 20,
                padding: "28px 28px",
                background: "var(--ink2)",
                textDecoration: "none",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--surface2)";
                animate(e.currentTarget.querySelector(".card-arrow"), {
                  x: 4,
                  duration: 200,
                  ease: "outExpo",
                });
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--ink2)";
                animate(e.currentTarget.querySelector(".card-arrow"), {
                  x: 0,
                  duration: 300,
                  ease: "outExpo",
                });
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  background: "var(--ink3)",
                  border: "1px solid var(--line)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  color: "var(--accent2)",
                  fontFamily: "monospace",
                  flexShrink: 0,
                }}
              >
                {s.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "var(--h)",
                    marginBottom: 4,
                  }}
                >
                  {s.label}
                </div>
                <div style={{ fontSize: 12, color: "var(--text2)" }}>
                  {s.desc}
                </div>
              </div>
              <span
                className="card-arrow"
                style={{ fontSize: 16, color: "var(--text3)" }}
              >
                →
              </span>
            </a>
          ))}

          {/* Availability */}
          <div
            className="contact-card"
            style={{
              opacity: 0,
              padding: "28px 28px",
              background: "var(--ink2)",
              borderTop: "1px solid var(--line)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "#22c55e",
                  animation: "pulse 2s ease-in-out infinite",
                  boxShadow: "0 0 12px #22c55e",
                }}
              />
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#22c55e",
                }}
              >
                Available now
              </span>
            </div>
            <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.7 }}>
              Open to freelance projects, part-time roles, and interesting
              collaborations.
            </p>
            <div
              style={{
                display: "flex",
                gap: 8,
                marginTop: 16,
                flexWrap: "wrap",
              }}
            >
              {["Freelance", "Remote", "Full-time"].map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    padding: "4px 10px",
                    borderRadius: 2,
                    background: "rgba(124,77,255,0.12)",
                    color: "var(--accent2)",
                    border: "1px solid rgba(124,77,255,0.2)",
                    textTransform: "uppercase",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right — form */}
        <div className="form-wrap" style={{ opacity: 0 }}>
          {sent ? (
            <div
              style={{
                textAlign: "center",
                padding: "80px 40px",
                border: "1px solid rgba(100,255,218,0.2)",
                borderRadius: 2,
                background: "rgba(100,255,218,0.04)",
              }}
            >
              <div style={{ fontSize: 56, marginBottom: 24 }}>✓</div>
              <h3
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: 32,
                  color: "var(--teal)",
                  marginBottom: 12,
                }}
              >
                Message sent!
              </h3>
              <p
                style={{ color: "var(--text2)", fontSize: 15, lineHeight: 1.7 }}
              >
                Thanks for reaching out. I'll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                }}
              >
                <div>
                  <label
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--text2)",
                      display: "block",
                      marginBottom: 8,
                    }}
                  >
                    Name
                  </label>
                  <input
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name: e.target.value }))
                    }
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                    placeholder="Your name"
                    style={fieldStyle("name")}
                    required
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--text2)",
                      display: "block",
                      marginBottom: 8,
                    }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    placeholder="your@email.com"
                    style={fieldStyle("email")}
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--text2)",
                    display: "block",
                    marginBottom: 8,
                  }}
                >
                  Subject
                </label>
                <input
                  value={form.subject}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, subject: e.target.value }))
                  }
                  onFocus={() => setFocused("subject")}
                  onBlur={() => setFocused(null)}
                  placeholder="What's this about?"
                  style={fieldStyle("subject")}
                  required
                />
              </div>
              <div>
                <label
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--text2)",
                    display: "block",
                    marginBottom: 8,
                  }}
                >
                  Message
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, message: e.target.value }))
                  }
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  placeholder="Tell me about your project..."
                  rows={7}
                  style={fieldStyle("message")}
                  required
                />
              </div>
              <button
                type="submit"
                className="submit-btn"
                style={{
                  padding: "18px 40px",
                  borderRadius: 2,
                  background: "var(--accent3)",
                  color: "#fff",
                  fontFamily: "var(--sans)",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 0 40px rgba(124,77,255,0.3)",
                  marginTop: 8,
                }}
              >
                Send Message →
              </button>
            </form>
          )}
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
