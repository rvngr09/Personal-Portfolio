import React, { useRef, useEffect } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
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
  
  @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
  @keyframes spinReverse { 0% { transform: rotate(360deg); } 100% { transform: rotate(0deg); } }
  @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
  
  .gear-1 { animation: spin 20s linear infinite; transform-origin: center; }
  .gear-2 { animation: spinReverse 15s linear infinite; transform-origin: center; }
  .gear-3 { animation: spin 25s linear infinite; transform-origin: center; }
  .floating { animation: float 6s ease-in-out infinite; }
`;

export default function ComingSoon() {
  const root = useRef(null);

  useEffect(() => {
    const scope = createScope({ root }).add(() => {
      animate(".coming-eyebrow", {
        opacity: [0, 1],
        y: [20, 0],
        duration: 700,
        ease: "outExpo",
        delay: 200,
      });
      animate(".coming-title", {
        opacity: [0, 1],
        y: [60, 0],
        duration: 900,
        ease: "outExpo",
        delay: 350,
      });
      animate(".coming-sub", {
        opacity: [0, 1],
        y: [24, 0],
        duration: 700,
        ease: "outExpo",
        delay: 550,
      });
      animate(".coming-gear", {
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 800,
        ease: "outExpo",
        delay: 100,
      });
      animate(".coming-btn", {
        opacity: [0, 1],
        y: [30, 0],
        duration: 600,
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

      {/* Hero Section */}
      <section
        style={{
          minHeight: "calc(100svh - 80px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 60px",
          position: "relative",
        }}
      >
        {/* Background Orbs */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "-10%",
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
            bottom: "10%",
            right: "-5%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(100,255,218,0.07) 0%, transparent 70%)",
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

        {/* Main Content */}
        <div
          style={{
            maxWidth: 800,
            margin: "0 auto",
            textAlign: "center",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Gears */}
          <div className="coming-gear" style={{ opacity: 0, marginBottom: 40 }}>
            <svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              style={{ margin: "0 auto", display: "block" }}
            >
              {/* Main Gear */}
              <g className="gear-1" transform-origin="50 50">
                <circle cx="50" cy="50" r="22" fill="none" stroke="var(--accent3)" strokeWidth="2.5" />
                <circle cx="50" cy="50" r="12" fill="var(--accent3)" opacity="0.15" />
                {[...Array(10)].map((_, i) => {
                  const angle = (i * 36) * Math.PI / 180;
                  const x1 = 50 + 30 * Math.cos(angle);
                  const y1 = 50 + 30 * Math.sin(angle);
                  const x2 = 50 + 38 * Math.cos(angle);
                  const y2 = 50 + 38 * Math.sin(angle);
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="var(--accent3)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  );
                })}
              </g>

              {/* Small Gear Top Right */}
              <g className="gear-2" transform-origin="80 20">
                <circle cx="80" cy="20" r="10" fill="none" stroke="var(--teal)" strokeWidth="2" />
                <circle cx="80" cy="20" r="5" fill="var(--teal)" opacity="0.2" />
                {[...Array(8)].map((_, i) => {
                  const angle = (i * 45) * Math.PI / 180;
                  const x1 = 80 + 14 * Math.cos(angle);
                  const y1 = 20 + 14 * Math.sin(angle);
                  const x2 = 80 + 18 * Math.cos(angle);
                  const y2 = 20 + 18 * Math.sin(angle);
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="var(--teal)"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  );
                })}
              </g>

              {/* Small Gear Bottom Left */}
              <g className="gear-3" transform-origin="18 82">
                <circle cx="18" cy="82" r="10" fill="none" stroke="var(--amber)" strokeWidth="2" />
                <circle cx="18" cy="82" r="5" fill="var(--amber)" opacity="0.15" />
                {[...Array(8)].map((_, i) => {
                  const angle = (i * 45) * Math.PI / 180;
                  const x1 = 18 + 14 * Math.cos(angle);
                  const y1 = 82 + 14 * Math.sin(angle);
                  const x2 = 18 + 18 * Math.cos(angle);
                  const y2 = 82 + 18 * Math.sin(angle);
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="var(--amber)"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  );
                })}
              </g>
            </svg>
          </div>

          {/* Eyebrow */}
          <div
            className="coming-eyebrow"
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
              Coming Soon
            </span>
          </div>

          {/* Title */}
          <h1
            className="coming-title"
            style={{
              opacity: 0,
              fontFamily: "var(--serif)",
              fontSize: "clamp(56px, 8vw, 100px)",
              lineHeight: 0.95,
              color: "var(--h)",
              marginBottom: 24,
              letterSpacing: "-0.02em",
            }}
          >
            Something
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
              is coming
            </em>
          </h1>

          {/* Description */}
          <p
            className="coming-sub"
            style={{
              opacity: 0,
              fontSize: 17,
              lineHeight: 1.75,
              color: "var(--text2)",
              maxWidth: 480,
              margin: "0 auto 48px",
            }}
          >
            I'm working on something fresh and exciting.
            <br />
            Stay tuned for the reveal.
          </p>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              to="/contacts"
              className="coming-btn"
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
                letterSpacing: "0.08em",
                textDecoration: "none",
                textTransform: "uppercase",
                boxShadow: "0 0 40px rgba(124,77,255,0.3)",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              Get Notified
            </Link>
            <Link
              to="/"
              className="coming-btn"
              style={{
                opacity: 0,
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "14px 32px",
                borderRadius: 2,
                background: "transparent",
                color: "var(--text)",
                fontFamily: "var(--sans)",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textDecoration: "none",
                border: "1px solid var(--line2)",
                textTransform: "uppercase",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent2)";
                e.currentTarget.style.color = "var(--accent2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--line2)";
                e.currentTarget.style.color = "var(--text)";
              }}
            >
              Back Home
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
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