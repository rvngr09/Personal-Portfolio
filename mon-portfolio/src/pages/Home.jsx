import React, { useEffect, useRef } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { animate, createScope, spring, stagger } from "animejs";
import {  SiReact, 
  SiLaravel, 
  SiNextdotjs,
  SiFigma,
  SiNodedotjs,
  SiMongodb,
  SiMysql,
  SiDocker,
  SiPython,
 // SiJava,
  SiTensorflow,
  SiScikitlearn,
  SiPhp,
  SiJavascript,
  SiTypescript,
  SiGit,
  SiPostgresql,
  SiRedis } from "react-icons/si";
/* ── try to import photo; fallback emoji shows if file missing ── */
let aminePhoto = null;
try { aminePhoto = new URL("../assets/me.jpg", import.meta.url).href; } catch (_) {}

const S = {
  page: { fontFamily: "var(--sans)", color: "var(--text)", background: "var(--bg)", overflowX: "hidden" },
  hero: { minHeight: "100svh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "120px 40px 80px", position: "relative", textAlign: "center" },
  heroBg: { position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139,44,245,0.10) 0%, transparent 70%)", pointerEvents: "none" },
  heroGrid: { position: "absolute", inset: 0, backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)", backgroundSize: "60px 60px", opacity: 0.35, maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 0%, transparent 70%)", WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 0%, transparent 70%)", pointerEvents: "none" },
  avatarWrap: { position: "relative", width: 110, height: 110, marginBottom: 28, flexShrink: 0 },
  avatarImg: { width: 104, height: 104, borderRadius: "50%", objectFit: "cover", border: "3px solid var(--bg)", position: "relative", zIndex: 1, display: "block" },
  avatarFallback: { width: 104, height: 104, borderRadius: "50%", background: "var(--accent-bg)", border: "3px solid var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, position: "relative", zIndex: 1 },
  availableDot: { position: "absolute", bottom: 6, right: 6, width: 14, height: 14, borderRadius: "50%", background: "#22c55e", border: "2.5px solid var(--bg)", zIndex: 2 },
  heroTag: { display: "inline-flex", alignItems: "center", gap: 7, padding: "6px 16px", borderRadius: 20, background: "var(--accent-bg)", border: "1px solid var(--accent-border)", color: "var(--accent)", fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 20 },
  heroTitle: { fontSize: "clamp(42px, 7vw, 80px)", fontWeight: 800, lineHeight: 1.04, letterSpacing: "-0.04em", color: "var(--text-h)", margin: "0 0 18px", maxWidth: 780 },
  heroAccent: { background: "linear-gradient(135deg, var(--accent) 0%, #38d9f5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" },
  heroSub: { fontSize: "clamp(15px, 2vw, 19px)", lineHeight: 1.7, color: "var(--text)", maxWidth: 540, margin: "0 auto 36px" },
  heroCtas: { display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" },
  btnPrimary: { display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px", borderRadius: 10, background: "var(--accent)", color: "#fff", fontFamily: "var(--sans)", fontSize: 14, fontWeight: 700, border: "none", cursor: "pointer", textDecoration: "none", boxShadow: "0 4px 20px rgba(139,44,245,0.35)" },
  btnGhost: { display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px", borderRadius: 10, background: "var(--accent-bg)", color: "var(--accent)", fontFamily: "var(--sans)", fontSize: 14, fontWeight: 700, border: "1px solid var(--accent-border)", cursor: "pointer", textDecoration: "none" },
  scrollHint: { position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, color: "var(--text-subtle,#9892a8)", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" },
  scrollLine: { width: 1, height: 40, background: "linear-gradient(to bottom, var(--accent), transparent)", transformOrigin: "top center" },
  stats: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 1, borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "var(--border)", overflow: "hidden" },
  statItem: { background: "var(--bg)", padding: "28px 20px", textAlign: "center" },
  statNum: { fontSize: 36, fontWeight: 800, letterSpacing: "-0.04em", color: "var(--text-h)", lineHeight: 1, marginBottom: 6 },
  statLabel: { fontSize: 12, fontWeight: 600, color: "var(--text-subtle,#9892a8)", letterSpacing: "0.06em", textTransform: "uppercase" },
  section: { padding: "96px 40px", maxWidth: 1100, margin: "0 auto", width: "100%", boxSizing: "border-box" },
  sectionLabel: { display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 16 },
  sectionTitle: { fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text-h)", lineHeight: 1.1, margin: "0 0 14px" },
  sectionSub: { fontSize: 17, lineHeight: 1.7, color: "var(--text)", maxWidth: 520, margin: "0 0 56px" },
  aboutImg: { width: "100%", aspectRatio: "4/5", objectFit: "cover", borderRadius: 20, border: "1px solid var(--border)", boxShadow: "0 24px 64px rgba(0,0,0,0.12)", display: "block" },
  aboutImgWrap: { position: "relative" },
  aboutImgDecor: { position: "absolute", top: -16, left: -16, right: 16, bottom: 16, borderRadius: 24, border: "1px solid var(--accent-border)", zIndex: -1 },
  aboutFallback: { width: "100%", aspectRatio: "4/5", borderRadius: 20, background: "var(--accent-bg)", border: "1px solid var(--accent-border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 80 },
  skillsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 },
  skillCard: { background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 16, padding: "24px 26px", boxSizing: "border-box" },
  skillIcon: { width: 44, height: 44, borderRadius: 12, background: "var(--accent-bg)", border: "1px solid var(--accent-border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, marginBottom: 14 },
  skillName: { fontSize: 15, fontWeight: 700, color: "var(--text-h)", marginBottom: 6 },
  skillDesc: { fontSize: 13.5, lineHeight: 1.6, color: "var(--text)" },
  skillBar: { height: 3, borderRadius: 99, background: "var(--border)", marginTop: 14, overflow: "hidden" },
  skillFill: { height: "100%", borderRadius: 99, background: "linear-gradient(90deg, var(--accent), #38d9f5)", width: "0%" },
  projectsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 },
  projectCard: { background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 18, overflow: "hidden", textDecoration: "none", display: "block", boxSizing: "border-box" },
  projectThumb: { height: 180, display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid var(--border)" },
  projectBody: { padding: "20px 22px" },
  projectTags: { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 },
  projectTag: { fontSize: 11, fontWeight: 600, letterSpacing: "0.04em", padding: "3px 10px", borderRadius: 20, background: "var(--code-bg)", color: "var(--accent)", border: "1px solid var(--accent-border)" },
  projectName: { fontSize: 17, fontWeight: 700, color: "var(--text-h)", marginBottom: 8 },
  projectDesc: { fontSize: 13.5, lineHeight: 1.6, color: "var(--text)", marginBottom: 16 },
  projectLink: { fontSize: 13, fontWeight: 700, color: "var(--accent)", display: "inline-flex", alignItems: "center", gap: 5 },
  contactWrap: { background: "var(--bg-alt,#f3f1f8)", border: "1px solid var(--border)", borderRadius: 24, padding: "56px 48px", textAlign: "center", position: "relative", overflow: "hidden", maxWidth: 780, margin: "0 auto", boxSizing: "border-box" },
  contactBg: { position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 70% at 50% 100%, rgba(139,44,245,0.08) 0%, transparent 70%)", pointerEvents: "none" },
  contactTitle: { fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text-h)", marginBottom: 14 },
  contactSub: { fontSize: 17, lineHeight: 1.7, color: "var(--text)", maxWidth: 460, margin: "0 auto 32px" },
};

const SKILLS = [
  { icon: <SiReact className="skill-icon" />, name: "React & Next.js", desc: "Composants modernes, hooks, server components et applications SPA performantes.", level: 85 },
  { icon: <SiLaravel className="skill-icon" />, name: "Laravel & PHP", desc: "API REST, Eloquent ORM, authentification, middleware et architecture MVC.", level: 78 },
  { icon: <SiJavascript className="skill-icon" />, name: "JavaScript (ES6+)", desc: "Manipulation DOM, async/await, Promises et programmation fonctionnelle.", level: 80 },
  
  // Design
  { icon: <SiFigma className="skill-icon" />, name: "UI/UX Design", desc: "Design d'interfaces, prototypage, wireframes et identité visuelle (Rojo Drip).", level: 80 },
  
  // Backend & APIs
  { icon: <SiNodedotjs className="skill-icon" />, name: "Node.js & APIs", desc: "API RESTful, Express.js, authentification JWT et intégrations base de données.", level: 80 },
  { icon: <SiPhp className="skill-icon" />, name: "PHP (Vanilla)", desc: "Développement backend natif, sessions, formulaires et connexions BDD.", level: 75 },
  
  // Base de données
  { icon: <SiMysql className="skill-icon" />, name: "MySQL & Oracle DB", desc: "Conception de bases de données, requêtes SQL optimisées et gestion de transactions.", level: 72 },
  { icon: <SiPostgresql className="skill-icon" />, name: "PostgreSQL", desc: "Relations avancées, indexes et optimisation de requêtes.", level: 80 },
  { icon: <SiMongodb className="skill-icon" />, name: "MongoDB", desc: "Bases de données NoSQL, agrégations et modélisation document.", level: 60 },
  { icon: <SiRedis className="skill-icon" />, name: "Redis", desc: "Cache, gestion de sessions et files d'attente.", level: 55 },
  
  // Langages de programmation
  { icon: <SiPython className="skill-icon" />, name: "Python", desc: "NLP, analyse de données, scripts automatisés et backends.", level: 70 },
//   { icon: <SiJava className="skill-icon" />, name: "Java", desc: "Applications desktop (Swing, JDBC), Oracle DB et génération PDF (iText).", level: 68 },
   { icon: "💻", name: "C & Assembly", desc: "Programmation bas niveau, jeu SDL2, calculatrice 8086 et gestion mémoire.", level: 65 },
  
  // AI & Machine Learning
  { icon: <SiTensorflow className="skill-icon" />, name: "TensorFlow", desc: "Modèles de deep learning, réseaux de neurones et classification.", level: 55 },
  { icon: <SiScikitlearn className="skill-icon" />, name: "Scikit-learn", desc: "TF-IDF, modèles de classification supervisée et NLP preprocessing.", level: 60 },
  { icon: "🧠", name: "NLP (NLTK)", desc: "Traitement du langage naturel, tokenisation, stemming et vectorisation.", level: 58 },
];

const PROJECTS = [
    {
    emoji: "🧮",
    gradient: "linear-gradient(135deg, #6b7280, #1f2937)",
    tags: ["Assembly", "8086", "Low-Level"],
    name: "Assembly Calculator",
    desc: "Calculatrice et convertisseur de base en assembleur 8086. Opérations arithmétiques et logiques.",
    href: "https://github.com/rvngr09/Assembley-Calculator"
  },
  {
    emoji: "📊",
    gradient: "linear-gradient(135deg, #8b2cf5, #38d9f5)",
    tags: ["Python", "NLTK", "Scikit-learn", "TensorFlow"],
    name: "Text Categorization AI",
    desc: "Système de classification de texte par IA avec NLP, TF-IDF et modèles d'apprentissage supervisé.",
    href: "https://github.com/rvngr09?tab=repositories",
    github: "https://github.com/rvngr09"
  },
  {
    emoji: "📁",
    gradient: "linear-gradient(135deg, #f97316, #ec4899)",
    tags: ["Java", "Swing", "Oracle DB", "iText PDF"],
    name: "Document Management System",
    desc: "Gestion de dossiers et documents avec authentification sécurisée et génération PDF automatisée.",
    href: "https://github.com/rvngr09?tab=repositories",
    github: "https://github.com/rvngr09"
  }

];

const STATS = [
  { num: "2+", label: "Years Experience" },
  { num: "7", label: "Projects Shipped" },
  { num: "6", label: "Happy Clients" },
  { num: "99%",label: "On-Time Delivery" },
];

function whenVisible(el, cb, threshold = 0.12) {
  if (!el) return;
  const io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { cb(); io.disconnect(); }
  }, { threshold });
  io.observe(el);
}

export default function Home() {
  const root        = useRef(null);
  const scope       = useRef(null);
  const statsRef    = useRef(null);
  const skillsRef   = useRef(null);
  const projectsRef = useRef(null);
  const aboutRef    = useRef(null);
  const contactRef  = useRef(null);

  /* hero + ring animations (run once on mount) */
  useEffect(() => {
    scope.current = createScope({ root }).add(() => {
      animate(".avatar-ring", { rotate: 360, duration: 8000, loop: true, ease: "linear" });
      animate(".hero-tag",    { opacity: [0,1], y: [20,0],  duration: 700, ease: "outExpo", delay: 200 });
      animate(".hero-title",  { opacity: [0,1], y: [40,0],  duration: 900, ease: "outExpo", delay: 380 });
      animate(".hero-sub",    { opacity: [0,1], y: [24,0],  duration: 700, ease: "outExpo", delay: 560 });
      animate(".hero-cta",    { opacity: [0,1], y: [16,0], scale: [0.95,1], duration: 600, ease: "outExpo", delay: stagger(80, { start: 700 }) });
      animate(".scroll-line", { scaleY: [0,1], duration: 900, ease: "outExpo", delay: 1100, loop: true, loopDelay: 800, direction: "alternate" });
    });
    return () => scope.current?.revert();
  }, []);

  /* scroll-triggered sections */
  useEffect(() => {
    whenVisible(statsRef.current, () =>
      animate(".stat-item", { opacity: [0,1], y: [30,0], scale: [0.85,1], duration: 700, ease: spring({ stiffness: 220, damping: 18 }), delay: stagger(100) })
    );
    whenVisible(aboutRef.current, () => {
      animate(".about-img-col",  { opacity: [0,1], x: [-50,0], duration: 900, ease: "outExpo" });
      animate(".about-text-col", { opacity: [0,1], x: [50,0],  duration: 900, ease: "outExpo", delay: 150 });
    });
    whenVisible(skillsRef.current, () => {
      animate(".skill-card",  { opacity: [0,1], y: [40,0], scale: [0.95,1], duration: 650, ease: "outExpo", delay: stagger(80) });
      animate(".skill-fill",  { width: (el) => ["0%", el.dataset.level + "%"], duration: 1000, ease: "outExpo", delay: stagger(100, { start: 300 }) });
    });
    whenVisible(projectsRef.current, () =>
      animate(".project-card", { opacity: [0,1], y: [50,0], scale: [0.97,1], duration: 700, ease: "outExpo", delay: stagger(110) })
    );
    whenVisible(contactRef.current, () =>
      animate(".contact-inner", { opacity: [0,1], y: [40,0], scale: [0.97,1], duration: 800, ease: "outExpo" })
    );
  }, []);

  const cardEnter = (e) => animate(e.currentTarget, { y: -6, scale: 1.02, duration: 280, ease: "outExpo" });
  const cardLeave = (e) => animate(e.currentTarget, { y:  0, scale: 1.00, duration: 350, ease: "outExpo" });
  const btnEnter  = (e) => animate(e.currentTarget, { scale: 1.05, duration: 200, ease: "outExpo" });
  const btnLeave  = (e) => animate(e.currentTarget, { scale: 1.00, duration: 300, ease: spring({ bounce: 0.5 }) });

  return (
    <div ref={root} style={S.page}>
      <Header />

      {/* HERO */}
      <section style={S.hero}>
        <div style={S.heroBg} />
        <div style={S.heroGrid} />

        <div style={S.avatarWrap}>
          <div className="avatar-ring" style={{ position:"absolute", inset:-4, borderRadius:"50%", background:"conic-gradient(var(--accent),#38d9f5,var(--accent))", padding:3 }} />
          <div style={{ position:"absolute", inset:0, borderRadius:"50%", background:"var(--bg)", margin:3 }} />
          {aminePhoto
            ? <img src={aminePhoto} alt="Amine" style={S.avatarImg} onError={(e) => { e.target.style.display="none"; e.target.nextSibling.style.display="flex"; }} />
            : null}
          <div style={{ ...S.avatarFallback, display: aminePhoto ? "none" : "flex" }}>👨‍💻</div>
          <div style={S.availableDot} />
        </div>

        <div className="hero-tag" style={{ ...S.heroTag, opacity:0 }}>
          <span style={{ width:7, height:7, borderRadius:"50%", background:"#22c55e", display:"inline-block" }} />
          Available for freelance
        </div>

        <h1 className="hero-title" style={{ ...S.heroTitle, opacity:0 }}>
          Hi, I'm <span style={S.heroAccent}>Amine</span><br />Full-Stack Developer
        </h1>

        <p className="hero-sub" style={{ ...S.heroSub, opacity:0 }}>
          I craft high-performance web applications with clean code, thoughtful UX,
          and animations that make every interaction feel alive.
        </p>

        <div style={S.heroCtas}>
          <Link to="/projects" className="hero-cta" style={{ ...S.btnPrimary, opacity:0 }} onMouseEnter={btnEnter} onMouseLeave={btnLeave}>View Projects →</Link>
          <Link to="/contacts" className="hero-cta" style={{ ...S.btnGhost,   opacity:0 }} onMouseEnter={btnEnter} onMouseLeave={btnLeave}>Get in Touch</Link>
        </div>

        <div style={S.scrollHint}>
          <div className="scroll-line" style={S.scrollLine} />
          <span>scroll</span>
        </div>
      </section>

      {/* STATS */}
      <div ref={statsRef} style={S.stats}>
        {STATS.map((s) => (
          <div key={s.label} className="stat-item" style={{ ...S.statItem, opacity:0 }}>
            <div style={S.statNum}>{s.num}</div>
            <div style={S.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ABOUT */}
      <div ref={aboutRef} style={{ borderBottom:"1px solid var(--border)" }}>
        <div style={{ ...S.section, display:"grid", gridTemplateColumns:"1fr 1.2fr", gap:72, alignItems:"center" }}>
          <div className="about-img-col" style={{ ...S.aboutImgWrap, opacity:0 }}>
            {aminePhoto
              ? <img src={aminePhoto} alt="Amine" style={S.aboutImg} onError={(e) => { e.target.replaceWith(Object.assign(document.createElement("div"), { style: "width:100%;aspect-ratio:4/5;border-radius:20px;background:var(--accent-bg);display:flex;align-items:center;justify-content:center;font-size:80px", textContent:"👨‍💻" })); }} />
              : <div style={S.aboutFallback}>👨‍💻</div>
            }
            <div style={S.aboutImgDecor} />
          </div>
          <div className="about-text-col" style={{ opacity:0, textAlign:"left" }}>
            <div style={S.sectionLabel}>
              <span style={{ width:20, height:1, background:"var(--accent)", display:"inline-block" }} />
              About me
            </div>
            <h2 style={{ ...S.sectionTitle, fontSize:"clamp(24px,3.5vw,40px)" }}>Turning ideas into<br />digital reality</h2>
            <p style={{ ...S.sectionSub, margin:"0 0 24px" }}>
              I'm a full-stack developer based in Algeria with 2+ years of experience building products
              that people love. I care deeply about clean code, pixel-perfect design, and snappy performance.
            </p>
            <p style={{ fontSize:15, lineHeight:1.8, color:"var(--text)", marginBottom:32 }}>
              When I'm not coding, I explore new tools, contribute to open-source, or learn about UX.
            </p>
            <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
              <Link to="/store" style={S.btnGhost}   onMouseEnter={btnEnter} onMouseLeave={btnLeave}>More About Me</Link>
              <a href="/cv.pdf" download style={S.btnPrimary} onMouseEnter={btnEnter} onMouseLeave={btnLeave}>Download CV</a>
            </div>
          </div>
        </div>
      </div>

      {/* SKILLS */}
      <div ref={skillsRef} style={{ borderBottom:"1px solid var(--border)", background:"var(--bg-alt,#f3f1f8)" }}>
        <div style={S.section}>
          <div style={{ textAlign:"center", marginBottom:56 }}>
            <div style={S.sectionLabel}>
              <span style={{ width:20, height:1, background:"var(--accent)", display:"inline-block" }} />Skills
              <span style={{ width:20, height:1, background:"var(--accent)", display:"inline-block" }} />
            </div>
            <h2 style={S.sectionTitle}>What I work with</h2>
            <p style={{ ...S.sectionSub, margin:"0 auto" }}>A curated stack of tools I reach for every day to ship fast and scale well.</p>
          </div>
          <div style={S.skillsGrid}>
            {SKILLS.map((sk) => (
              <div key={sk.name} className="skill-card" style={{ ...S.skillCard, opacity:0 }} onMouseEnter={cardEnter} onMouseLeave={cardLeave}>
                <div style={S.skillIcon}>{sk.icon}</div>
                <div style={S.skillName}>{sk.name}</div>
                <div style={S.skillDesc}>{sk.desc}</div>
                <div style={S.skillBar}>
                  <div className="skill-fill" data-level={sk.level} style={S.skillFill} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PROJECTS */}
      <div ref={projectsRef} style={{ borderBottom:"1px solid var(--border)" }}>
        <div style={S.section}>
          <div style={{ textAlign:"center", marginBottom:56 }}>
            <div style={S.sectionLabel}>
              <span style={{ width:20, height:1, background:"var(--accent)", display:"inline-block" }} />Projects
              <span style={{ width:20, height:1, background:"var(--accent)", display:"inline-block" }} />
            </div>
            <h2 style={S.sectionTitle}>Featured work</h2>
            <p style={{ ...S.sectionSub, margin:"0 auto" }}>A selection of projects I'm proud of — each one solving a real problem.</p>
          </div>
          <div style={S.projectsGrid}>
            {PROJECTS.map((p) => (
              <Link key={p.name} to={p.href} className="project-card" style={{ ...S.projectCard, opacity:0 }} onMouseEnter={cardEnter} onMouseLeave={cardLeave}>
                <div style={{ ...S.projectThumb, background:p.gradient }}>
                  <span style={{ fontSize:52 }}>{p.emoji}</span>
                </div>
                <div style={S.projectBody}>
                  <div style={S.projectTags}>{p.tags.map((t) => <span key={t} style={S.projectTag}>{t}</span>)}</div>
                  <div style={S.projectName}>{p.name}</div>
                  <div style={S.projectDesc}>{p.desc}</div>
                  <span style={S.projectLink}>View project →</span>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign:"center", marginTop:48 }}>
            <Link to="/projects" style={S.btnGhost} onMouseEnter={btnEnter} onMouseLeave={btnLeave}>See all projects →</Link>
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <div ref={contactRef} style={{ padding:"80px 40px" }}>
        <div className="contact-inner" style={{ ...S.contactWrap, opacity:0 }}>
          <div style={S.contactBg} />
          <div style={{ ...S.heroTag, display:"inline-flex", marginBottom:20 }}>
            <span style={{ width:7, height:7, borderRadius:"50%", background:"#22c55e", display:"inline-block" }} />
            Open to opportunities
          </div>
          <h2 style={S.contactTitle}>Let's build something<br />great together</h2>
          <p style={S.contactSub}>Have a project in mind or just want to say hello? My inbox is always open.</p>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <Link to="/contacts"               style={S.btnPrimary} onMouseEnter={btnEnter} onMouseLeave={btnLeave}>Send a message →</Link>
            <a href="mailto:aminebenallalghst@gmail.com" style={S.btnGhost}   onMouseEnter={btnEnter} onMouseLeave={btnLeave}>aminebenallalghst@gmail.com</a>
          </div>
        </div>
      </div>
    </div>
  );
}