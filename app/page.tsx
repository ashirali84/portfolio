"use client";
import { useEffect, useState, useRef } from "react";

const CURSES = ["DOMAIN EXPANSION", "CURSED TECHNIQUE", "BLACK FLASH", "HOLLOW PURPLE", "RED ∞ BLUE"];

const BOOT = [
  "> Initializing cursed energy...",
  "> Loading domain expansion protocol...",
  "> Bypassing Jujutsu HQ firewall...",
  "> ACCESS GRANTED — Welcome, Sakuna.",
];

const CTF_CERTS = [
  { id: 1, name: "CultRang IIT GOA", image: "/certs/CultRand.jpg", grade: "S-GRADE" },
  { id: 2, name: "Bypass CTF", image: "/certs/Bypass_ctf.jpg", grade: "S-GRADE" },
  { id: 3, name: "UNI6CTF",  image: "/certs/UNI6CTF.jpeg", grade: "A-GRADE" },
  { id: 4, name: "Cyber Geek", image: "/certs/CyberGeek26.jpeg", grade: "S-GRADE" },
  { id: 5, name: "Cyber Leelawat",  image: "/certs/CyberLeelawat.jpeg", grade: "A-GRADE" },
  { id: 6, name: "Thunder Cipher", image: "/certs/DIgitalManhunt_ctf.jpg", grade: "B-GRADE" },
];

const SKILLS = [
  { name: "Web Exploitation", level: 90, color: "#7c3aed" },
  { name: "Binary Exploitation", level: 75, color: "#2563eb" },
  { name: "Reverse Engineering", level: 80, color: "#7c3aed" },
  { name: "Cryptography", level: 85, color: "#2563eb" },
  { name: "OSINT", level: 40, color: "#7c3aed" },
  { name: "Forensics", level: 50, color: "#2563eb" },
  { name: "Python Programming", level: 92, color: "#7c3aed" },
  { name: "C Programming", level: 70, color: "#2563eb" },
  { name: "Java Programming", level: 65, color: "#7c3aed" },
];

const TOOLS = [
  { name: "Burp Suite", level: 90, color: "#7c3aed" },
  { name: "Ghidra", level: 80, color: "#2563eb" },
  { name: "IDA Pro", level: 75, color: "#7c3aed" },
  { name: "Wireshark", level: 85, color: "#2563eb" },
  { name: "Metasploit", level: 90, color: "#7c3aed" },
  { name: "Nmap", level: 88, color: "#2563eb" },
  { name: "John the Ripper", level: 78, color: "#7c3aed" },
  { name: "Hashcat", level: 82, color: "#2563eb" },
  { name: "Kali Linux", level: 92, color: "#7c3aed" },
]

export default function Home() {
  const [typed, setTyped] = useState("");
  const [curseIndex, setCurseIndex] = useState(0);
  const [glitch, setGlitch] = useState(false);
  const [termLines, setTermLines] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < BOOT.length) {
        setTermLines(prev => [...prev, BOOT[i] ?? ""]);
        i++;
      } else clearInterval(interval);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const word = CURSES[curseIndex];
    let i = 0;
    setTyped("");
    const t = setInterval(() => {
      if (i <= word.length) { setTyped(word.slice(0, i)); i++; }
      else {
        clearInterval(t);
        setTimeout(() => {
          setGlitch(true);
          setTimeout(() => { setGlitch(false); setCurseIndex(c => (c + 1) % CURSES.length); }, 300);
        }, 1200);
      }
    }, 80);
    return () => clearInterval(t);
  }, [curseIndex]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      color: Math.random() > 0.5 ? "#7c3aed" : "#1d4ed8",
      alpha: Math.random() * 0.6 + 0.2,
    }));

    let raf: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      className="relative min-h-screen"
      style={{
        background: "#050508",
        fontFamily: "'Courier New', monospace",
        cursor: "crosshair",
        overflowX: "clip",
      }}
    >

      {/* ── FIXED BACKGROUND LAYERS (scroll nahi honge) ── */}
      <video
        autoPlay loop muted playsInline
        className="fixed inset-0 w-full h-full object-cover z-0 opacity-20"
        style={{ pointerEvents: "none" }}
      >
        <source src="/video/bg-template.mp4" type="video/mp4" />
      </video>

      <canvas ref={canvasRef} className="fixed inset-0 z-10 pointer-events-none" />

      <div
        className="fixed inset-0 z-10 pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
        }}
      />

      <div
        className="fixed inset-0 z-10 pointer-events-none"
        style={{ boxShadow: "inset 0 0 120px rgba(124,58,237,0.15), inset 0 0 60px rgba(29,78,216,0.1)" }}
      />

      {/* ── STICKY NAV ── */}
      <nav
        className="sticky top-0 left-0 right-0 z-[9999] flex items-center justify-between px-8 py-5 border-b border-purple-900/40 backdrop-blur-md"
        style={{ background: "rgba(5,5,8,0.85)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-sm flex items-center justify-center text-xs font-bold text-purple-300 border border-purple-700"
            style={{ background: "rgba(124,58,237,0.15)" }}
          >
            社会
          </div>
          <span className="text-purple-400 text-xs tracking-[0.4em] uppercase">EEGAA Society</span>
        </div>
        <div className="flex items-center gap-6">
          {["#hero", "#skills", "#certs", "#contact"].map((href, i) => (
            <a
              key={href} href={href}
              className="text-purple-300/60 text-xs uppercase hover:text-purple-200 transition-colors"
              style={{ letterSpacing: "0.2em" }}
            >
              {["Domain", "Techniques", "Seals", "Contact"][i]}
            </a>
          ))}
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="hero" className="relative z-30 min-h-screen flex items-center px-8 md:px-20 lg:px-32 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-20 max-w-7xl mx-auto w-full">
          <div className="flex flex-col gap-6 max-w-2xl">

            {/* Terminal */}
            <div
              className="rounded border border-purple-900/60 p-4 text-xs text-green-400/80 mb-2"
              style={{ background: "rgba(0,0,0,0.6)", minHeight: 100 }}
            >
              {termLines.filter(Boolean).map((line, i) => (
                <div key={i} className={line.includes("GRANTED") ? "text-green-300 font-bold" : ""}>
                  {line}
                </div>
              ))}
              {termLines.length < 4 && <span className="animate-pulse">▋</span>}
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              <span className="text-purple-400 text-xs tracking-[0.3em] uppercase">Grade 1 Sorcerer</span>
            </div>

            <h1
              className="text-5xl md:text-7xl font-black text-white leading-tight"
              style={{ fontFamily: "Georgia, serif", textShadow: "0 0 40px rgba(124,58,237,0.5)" }}
            >
              Md Shahid<br />
              <span style={{
                background: "linear-gradient(135deg, #7c3aed, #2563eb, #7c3aed)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 20px rgba(124,58,237,0.8))",
              }}>
                Hasan
              </span>
            </h1>

            <div className="flex items-center gap-3">
              <span className="text-purple-600 text-sm">呪術 :</span>
              <span
                className={`text-lg font-bold tracking-widest ${glitch ? "opacity-0" : "opacity-100"} transition-opacity`}
                style={{ color: "#a78bfa", fontFamily: "monospace", minWidth: 280 }}
              >
                {typed}<span className="animate-pulse">_</span>
              </span>
            </div>

            <p className="text-gray-400 text-base leading-relaxed max-w-md">
              Cyber Security student. CTF player. I hunt vulnerabilities like Sukuna hunts prey —
              methodical, relentless, inevitable.
            </p>

            <div className="flex items-center gap-4 mt-2">
              <a
                href="#certs"
                className="group flex items-center gap-2 px-6 py-3 text-sm font-bold text-white rounded transition-all duration-300 hover:scale-105"
                style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb)", boxShadow: "0 0 20px rgba(124,58,237,0.4)" }}
              >
                View Seals
                <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
              </a>
              <a
                href="#contact"
                className="px-6 py-3 text-sm font-bold text-purple-300 border border-purple-700 rounded hover:bg-purple-900/30 transition-all"
              >
                ∞ Connect
              </a>
            </div>

            <div className="flex gap-8 mt-4 pt-6 border-t border-purple-900/40">
              {[["2", "CTFs Won"], ["100+", "Flags Captured"], ["Grade 1", "Sakuna Rank"]].map(([n, l]) => (
                <div key={l} className="flex flex-col gap-1">
                  <span className="text-2xl font-black text-purple-300">{n}</span>
                  <span className="text-gray-500 text-xs uppercase tracking-wider">{l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Profile */}
          <div className="relative flex-shrink-0">
            <div
              className="absolute -inset-8 opacity-40 blur-3xl rounded-full"
              style={{ background: "radial-gradient(circle, #7c3aed 0%, #1d4ed8 50%, transparent 70%)" }}
            />
            <div
              className="relative w-84 h-84 lg:w-92 lg:h-92"
              style={{
                clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
                background: "linear-gradient(135deg, #7c3aed, #2563eb)",
                padding: 3,
              }}
            >
              <div
                className="w-full h-full overflow-hidden"
                style={{ clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)" }}
              >
                <img src="/images/profile-1.jpeg" alt="Profile" className="w-full mt-2 h-full object-cover" />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(124,58,237,0.5))" }}
                />
              </div>
            </div>
            {[
              { text: "呪", top: "0%", right: "-20%", size: "text-2xl" },
              { text: "術", bottom: "10%", left: "-18%", size: "text-xl" },
              { text: "師", top: "45%", right: "-25%", size: "text-lg" },
            ].map(({ text, size, ...pos }) => (
              <div key={text} className={`absolute ${size} font-black text-purple-500/60 animate-pulse`} style={{ ...pos }}>
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="relative z-30 px-8 md:px-20 lg:px-32 py-24">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span className="text-purple-600 text-sm font-mono">// 02</span>
            <h2 className="text-3xl font-black text-white" style={{ fontFamily: "Georgia, serif" }}>
              Cursed <span className="text-purple-400">Techniques</span>
            </h2>
            <div className="flex-1 h-px bg-purple-900/60" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SKILLS.map((skill, i) => (
              <div
                key={skill.name}
                className="rounded border border-purple-900/40 p-5 group hover:border-purple-600/60 transition-all"
                style={{ background: "rgba(10,5,20,0.8)" }}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-200 text-sm font-bold uppercase tracking-wider">{skill.name}</span>
                  <span className="text-purple-400 text-xs font-mono">{skill.level}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-gray-800">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${skill.level}%`,
                      background: `linear-gradient(90deg, ${skill.color}, ${i % 2 === 0 ? "#2563eb" : "#7c3aed"})`,
                      boxShadow: `0 0 8px ${skill.color}80`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* TOOLS */}
      <section id="tools" className="relative z-30 px-8 md:px-20 lg:px-32 py-24 border-t border-purple-900/30">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span className="text-purple-600 text-sm font-mono">// 02.5</span>
            <h2 className="text-3xl font-black text-white" style={{ fontFamily: "Georgia, serif" }}>
              Cursed <span className="text-purple-400">Tools</span>
            </h2>
            <div className="flex-1 h-px bg-purple-900/60" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TOOLS.map((tool, i) => (
              <div
                key={tool.name}
                className="rounded border border-purple-900/40 p-5 group hover:border-purple-600/60 transition-all"
                style={{ background: "rgba(10,5,20,0.8)" }}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-200 text-sm font-bold uppercase tracking-wider">{tool.name}</span>
                  <span className="text-purple-400 text-xs font-mono">{tool.level}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-gray-800">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${tool.level}%`,
                      background: `linear-gradient(90deg, ${tool.color}, ${i % 2 === 0 ? "#2563eb" : "#7c3aed"})`,
                      boxShadow: `0 0 8px ${tool.color}80`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTF CERTS ── */}
      <section id="certs" className="relative z-30 px-8 md:px-20 lg:px-32 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-purple-600 text-sm font-mono">// 03</span>
            <h2 className="text-3xl font-black text-white" style={{ fontFamily: "Georgia, serif" }}>
              Binding <span className="text-purple-400">Seals</span>
            </h2>
            <div className="flex-1 h-px bg-purple-900/60" />
          </div>
          <p className="text-gray-500 text-sm mb-12 ml-12 font-mono">
            {">"} CTF certifications — proof of cursed techniques mastered
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CTF_CERTS.map((cert, i) => (
              <div
                key={cert.id}
                className="group relative rounded-lg overflow-hidden border border-purple-900/40 hover:border-purple-500/70 transition-all duration-300 cursor-pointer"
                style={{ background: "rgba(10,5,20,0.9)" }}
              >
                <div className="relative h-44 overflow-hidden bg-gray-900/50">
                  <img
                    src={cert.image} alt={cert.name}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center"
                    style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(29,78,216,0.2))" }}
                  >
                    {/* <span className="text-4xl font-black text-purple-400/40">{cert.platform}</span> */}
                    {/* <span className="text-xs text-purple-600/60 mt-2 font-mono">Upload cert image</span> */}
                  </div>
                  <div
                    className="absolute top-3 right-3 px-2 py-1 text-xs font-black rounded"
                    style={{
                      background: cert.grade === "S-GRADE" ? "rgba(124,58,237,0.8)" : "rgba(29,78,216,0.8)",
                      color: "#e9d5ff", border: "1px solid rgba(167,139,250,0.4)",
                    }}
                  >
                    {cert.grade}
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-white text-sm font-bold">{cert.name}</p>
                    <p className="text-purple-600 text-xs font-mono mt-0.5">#{String(i + 1).padStart(3, "0")}</p>
                  </div>
                  <div className="w-8 h-8 flex items-center justify-center rounded border border-purple-800 text-purple-400 text-lg">封</div>
                </div>
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "linear-gradient(90deg, #7c3aed, #2563eb)" }}
                />
              </div>
            ))}
          </div>
          
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="relative z-30 px-8 md:px-20 lg:px-32 py-24 border-t border-purple-900/30">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-purple-600 text-xs font-mono mb-4">// 04</p>
          <h2 className="text-4xl font-black text-white mb-4" style={{ fontFamily: "Georgia, serif" }}>
            Open a <span className="text-purple-400">Domain</span>
          </h2>
          <p className="text-gray-500 text-sm mb-8 font-mono">Unlimited Void — nowhere to run, Sakuna.</p>
          <div className="flex justify-center gap-4 flex-wrap">

            {[
              { label: "GitHub", icon: "⌥", href: "https://github.com/ashirali84" },
              { label: "LinkedIn", icon: "◈", href: "https://www.linkedin.com/in/md-shahid-hasan-002b0b302/" },
              // { label: "Email", icon: "✉", href: "mdshahidhasan84@gmail.com" },
              { label: "TryHackMe", icon: "⚑", href: "https://tryhackme.com/p/mdshahidhasan84" },
            ].map(({ label, icon, href }) => (
              <a
                target="_blank"
                key={label} href={href}
                className="flex items-center gap-2 px-5 py-3 text-sm font-bold text-purple-300 border border-purple-800 rounded hover:bg-purple-900/30 hover:border-purple-500 transition-all font-mono"
              >
             
                <span className="text-purple-500">{icon}</span> {label}
              </a>
            ))}
             <a href="mailto:mdshahidhasan84@gmail.com"
               className="flex items-center gap-2 px-5 py-3 text-sm font-bold text-purple-300 border border-purple-800 rounded hover:bg-purple-900/30 hover:border-purple-500 transition-all font-mono"
              >✉ Email</a>
          </div>
        </div>
      </section>

      <footer className="relative z-30 text-center py-6 border-t border-purple-900/30">
        <p className="text-gray-700 text-xs font-mono">
          呪術廻戦 × EEGAA_Scoety — Built with cursed energy &amp; Next.js
        </p>
      </footer>
    </div>
  );
}