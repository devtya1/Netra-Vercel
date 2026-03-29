import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/* ⏱️ TOTAL ~3.2 MINUTES */
const firstBootSteps = [
  { text: "Initializing NETRA Core...", type: "normal", time: 10000 },

  // ⬇️ MAX TIME HERE (HEAVY INSTALL)
  { text: "Installing System Libraries...", type: "terminal", time: 90000 },

  { text: "Installing AI Core: NETRA v1.0...", type: "ai", time: 40000 },

  { text: "Linking Satellite Network...", type: "satellite", time: 30000 },

  { text: "Establishing Encrypted Channel...", type: "terminal", time: 25000 },

  // ⬇️ DEVICE REGISTRATION STEP
  { text: "Registering Device...", type: "device", time: 35000 },

  { text: "Finalizing Installation...", type: "normal", time: 20000 },
];

const normalBootSteps = [
  { text: "Recognizing Device...", time: 5000 },
  { text: "Verifying Installed Packages...", time: 7000 },
  { text: "Checking Security Layers...", time: 5000 },
  { text: "Launching Interface...", time: 3000 },
];

export default function Boot({ onFinish }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [showPrompt, setShowPrompt] = useState(false);
  const [steps, setSteps] = useState([]);
  const [isFirstBoot, setIsFirstBoot] = useState(false);

  const current = steps[stepIndex] || {};

  useEffect(() => {
  speechSynthesis.onvoiceschanged = () => {
    speechSynthesis.getVoices();
  };
}, []);

  useEffect(() => {
  speechSynthesis.getVoices();

  const initialized = localStorage.getItem("netra_initialized");

  if (!initialized) {
    setIsFirstBoot(true);
    setSteps(firstBootSteps);
  } else {
    setSteps(normalBootSteps);
  }
}, []);

  useEffect(() => {
  if (!steps.length) return;

  if (stepIndex >= steps.length) {
    setTimeout(() => {
      speakFemaleFinal();
      onFinish();
    }, 2000);
    return;
  }

  const current = steps[stepIndex] || {};

  if (current.type === "terminal" || current.type === "device") {
    setShowPrompt(true);

    // SAVE AFTER DEVICE REGISTRATION
    if (current.type === "device" && isFirstBoot) {
      setTimeout(() => {
        localStorage.setItem("netra_initialized", "true");
      }, current.time - 2000);
    }

    const timer = setTimeout(() => {
      setShowPrompt(false);
      setStepIndex(prev => prev + 1);
    }, current.time);

    return () => clearTimeout(timer);

  } else {
    const timer = setTimeout(() => {
      setStepIndex(prev => prev + 1);
    }, current.time);

    return () => clearTimeout(timer);
  }

}, [stepIndex, steps]);

  

  /* 🎙️ VOICE */
const speakFemaleFinal = () => {
  const msg = new SpeechSynthesisUtterance(
    "Hi. I am Netra. Your AI instructor. I will guide you through all your missions from now on."
  );

  const voices = speechSynthesis.getVoices();

  // 🔥 BEST FEMALE VOICE MATCHING
  const femaleVoice =
    voices.find(v => v.name.includes("Zira")) ||        // Windows
    voices.find(v => v.name.includes("Samantha")) ||   // Mac
    voices.find(v => v.name.includes("Google UK English Female")) || 
    voices.find(v => v.lang === "en-IN") ||             // fallback for India
    voices[0];

  msg.voice = femaleVoice;
  msg.rate = 0.9;
  msg.pitch = 1.3;

  speechSynthesis.speak(msg);
};

  return (
    <div className="h-screen w-screen bg-[#05080f] text-cyan-400 flex flex-col justify-center items-center relative overflow-hidden">

      {/* GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* SCANLINE EFFECT */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent"
        animate={{ y: ["-100%", "100%"] }}
        transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
      />

      {/* TITLE */}
      <motion.h1
        className="text-4xl mb-6 tracking-widest"
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        NETRA OS
      </motion.h1>

      <p className="text-sm mb-6 text-cyan-400/70">{current?.text}</p>

      {/* TERMINAL */}
      {showPrompt && <Terminal type={current.type} />}

      {/* AI */}
      {current?.type === "ai" && <AdvancedAI />}

      {/* SATELLITE */}

      {/* PROGRESS BAR */}
      <div className="absolute bottom-20 w-1/3 h-[4px] bg-cyan-900 overflow-hidden">
        <motion.div
          className="h-full bg-cyan-400 relative"
          animate={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
        >
          <motion.div
            className="absolute inset-0 bg-white/20"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </motion.div>
      </div>
    </div>
  );
}

/* 🧾 TERMINAL */
function Terminal({ type }) {
  const [lines, setLines] = useState([]);
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    const generateIP = () =>
  `192.168.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`;

const generateMAC = () =>
  "XX:XX:XX:XX:XX:XX".replace(/X/g, () =>
    "0123456789ABCDEF"[Math.floor(Math.random() * 16)]
  );

const content =
  type === "device"
    ? [
        "Initializing device registration...",
        "Scanning hardware modules...",
        `Assigning Device ID: NX-${Math.floor(Math.random()*99999)}`,
        `IP Address: ${generateIP()}`,
        `MAC Address: ${generateMAC()}`,
        "Registering secure node...",
        "Binding to NETRA network...",
        "Device successfully registered.",
      ]
    : [
        "Fetching packages...",
        "Installing modules...",
        "Linking dependencies...",
        "Compiling...",
        "Optimizing...",
        "Done.",
      ];

    let i = 0;
    const interval = setInterval(() => {
      setLines(prev => [...prev, content[i]]);
      i++;
      if (i >= content.length) clearInterval(interval);
    }, 300);

    const blink = setInterval(() => setCursor(c => !c), 500);

    return () => {
      clearInterval(interval);
      clearInterval(blink);
    };
  }, []);

  return (
    <div className="bg-black border border-cyan-400/30 p-4 w-[520px] h-[220px] font-mono text-xs text-green-400 shadow-lg shadow-cyan-400/10">
      {lines.map((l, i) => (
        <p key={i}>{"> "}{l}</p>
      ))}
      <p>{">"} {cursor && "_"}</p>
    </div>
  );
}

/* 🤖 AI CORE */
function AdvancedAI() {
  return (
    <div className="absolute right-16 flex items-center justify-center">

      {/* AURA */}
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-cyan-400/10 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.05, 0.2],
        }}
        transition={{ repeat: Infinity, duration: 3 }}
      />

      {/* CORE */}
      <motion.div
        className="w-20 h-20 rounded-full bg-cyan-400"
        animate={{
          scale: [1, 1.5, 1],
          boxShadow: [
            "0 0 20px cyan",
            "0 0 120px cyan",
            "0 0 20px cyan",
          ],
        }}
        transition={{ repeat: Infinity, duration: 1.8 }}
      />

      {/* ENERGY PULSE */}
      <motion.div
        className="absolute w-40 h-40 rounded-full border border-cyan-400/20"
        animate={{
          scale: [1, 1.6],
          opacity: [0.3, 0],
        }}
        transition={{ repeat: Infinity, duration: 2 }}
      />
    </div>
  );
}

/* 📡 SATELLITE */
function Satellite() {
  return (
    <motion.div
      className="absolute right-20 w-36 h-36 border border-purple-400 rounded-full"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
    />
  );
}