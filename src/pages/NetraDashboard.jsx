import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Database,
  Globe,
  Settings,
  Folder,
  Wifi,
  Cpu,
  User,
  Activity,
  IdCard,
  Radio
} from "lucide-react";

export default function NetraDashboard() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [activeApp, setActiveApp] = useState(null);
  const [battery, setBattery] = useState(100);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null);

  const activateNetra = () => {
  setListening(true);

  clearTimeout(window.netraTimeout);

  window.netraTimeout = setTimeout(() => {
    setListening(false);
  }, 5000);
};

const startListening = () => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) return;

  // 🔥 STOP OLD INSTANCE FIRST
  if (recognitionRef.current) {
    recognitionRef.current.stop();
    recognitionRef.current = null;
  }

  const recognition = new SpeechRecognition();

  recognition.continuous = false; // 🔥 IMPORTANT CHANGE
  recognition.interimResults = false;
  recognition.lang = "en-IN";

  recognition.onstart = () => {
    console.log("🎤 Mic started");
    setTranscript(""); // 🔥 CLEAR OLD TEXT
  };

  recognition.onresult = (event) => {
    const text = event.results[0][0].transcript.toLowerCase();

    console.log("🎤 Heard:", text);
    setTranscript(text);

    if (
      text.includes("go netra") ||
      text.includes("netra")
    ) {
      activateNetra();
      startListening();
    }
  };

  recognition.onend = () => {
    console.log("🛑 Mic stopped");
  };

  recognition.onerror = (e) => {
    console.error("Mic error:", e);
  };

  recognition.start();

  // 🔥 SAVE INSTANCE
  recognitionRef.current = recognition;
};
  

useEffect(() => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Speech Recognition not supported");
    return;
  }

  const recognition = new SpeechRecognition();

  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-IN";

  recognition.onstart = () => {
    console.log("🎤 Mic started");
  };

  recognition.onresult = (event) => {
    const text =
      event.results[event.results.length - 1][0].transcript.toLowerCase();

    console.log("🎤 Heard:", text);

    setTranscript(text);

    if (
      text.includes("go netra") ||
      text.includes("netra") ||
      text.includes("metra")
    ) {
      activateNetra();
      startListening();
    }
  };

  recognition.onerror = (e) => {
    console.error("❌ Mic error:", e.error);
  };

  recognition.onend = () => {
    console.log("🔁 Restarting mic...");
  };

  recognition.start();
}, []);

useEffect(() => {
  navigator.getBattery?.().then(batt => {
    const updateBattery = () => {
      setBattery(Math.round(batt.level * 100));
    };

    updateBattery();

    batt.addEventListener("levelchange", updateBattery);

    return () => {
      batt.removeEventListener("levelchange", updateBattery);
    };
  });
}, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const apps = [
    { name: "Browser", icon: <Globe size={22} /> },
    { name: "System", icon: <Cpu size={22} /> },
    { name: "Settings", icon: <Settings size={22} /> },
    { name: "Database", icon: <Database size={22} /> },
    { name: "Files", icon: <Folder size={22} /> },
    { name: "Communications", icon: <Radio size={22} /> },
    { name: "Operations", icon: <Shield size={22} /> },
    { name: "ID Card", icon: <IdCard size={22} /> },
  ];

  return (
    <div className="h-screen w-screen bg-[#02040a] text-cyan-300 flex flex-col overflow-hidden font-mono">

      {/* TOP BAR */}
      <div className="flex justify-between items-center px-6 py-3 border-b border-cyan-400/10 text-xs">
        <div className="flex items-center gap-2"><Wifi size={14}/> SECURE NETWORK</div>
        <div>{time}</div>
        <div>BATTERY {battery}%</div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-6 p-6">

        {/* LEFT PANEL */}
        <div className="col-span-3 flex flex-col gap-4">
          <div className="border border-cyan-400/10 rounded-xl p-4 bg-black/40">
            <p className="text-xs mb-3 text-cyan-400/60">APPLICATIONS</p>
            <div className="grid grid-cols-2 gap-3">
              {apps.map((app, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setActiveApp(app.name)}
                  className="flex flex-col items-center justify-center p-4 border border-cyan-400/10 rounded-lg cursor-pointer hover:bg-cyan-400/5"
                >
                  {app.icon}
                  <span className="text-[10px] mt-2">{app.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CENTER CORE */}
        <div className="col-span-6 flex items-center justify-center relative pointer-events: none;">

          <div className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-3xl pointer-events: none;" />

          <motion.div
            className="absolute w-[420px] h-[420px] border border-cyan-400/20 rounded-full pointer-events: none;"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            onClick={() => {activateNetra(); startListening();}}
          />

          <motion.div
            className="absolute w-[300px] h-[300px] border border-cyan-400/10 rounded-full pointer-events: none;"
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
            onClick={() => {activateNetra(); startListening();}}
          />

          <motion.div
            className="absolute w-[400px] h-[2px] bg-cyan-400/30 pointer-events: none;"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
            onClick={() => {activateNetra(); startListening();}}
          />

          <motion.div
            className="w-24 h-24 rounded-full bg-cyan-400 relative z-10 pointer-events: none;"
            animate={{
              scale: [1, 1.25, 1],
              boxShadow: [
                "0 0 20px cyan",
                "0 0 120px cyan",
                "0 0 20px cyan",
              ],
            }}
            transition={{ repeat: Infinity, duration: 2 }}
            onClick={() => {activateNetra(); startListening();}}
          />

          <div className="absolute bottom-10 text-xs text-cyan-400/60 tracking-widest pointer-events: none;">
            NETRA AI CORE
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="col-span-3 flex flex-col gap-4">

          <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-400/10">
            <p className="text-xs text-cyan-400/60">AGENT</p>
            <p className="mt-2 text-lg">{localStorage.getItem("netra_user") || "UNKNOWN"}</p>
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-cyan-400/10">
            <p className="text-xs text-cyan-400/60">DEVICE ID</p>
            <p className="mt-1">{localStorage.getItem("device_id") || "N/A"}</p>
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-cyan-400/10">
            <p className="text-xs text-cyan-400/60">SYSTEM LOAD</p>
            <div className="mt-3 space-y-2">
              {[70, 45, 85].map((v, i) => (
                <div key={i} className="w-full h-2 bg-cyan-900/50">
                  <motion.div
                    className="h-full bg-cyan-400"
                    animate={{ width: `${v}%` }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-cyan-400/10">
            <p className="text-xs text-cyan-400/60 flex items-center gap-2"><Activity size={12}/> LIVE SIGNAL</p>
            <div className="flex items-end gap-[2px] mt-3 h-[40px]">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-[2px] bg-cyan-400"
                  animate={{ height: [5, Math.random()*40, 5] }}
                  transition={{ repeat: Infinity, duration: 1 + i*0.03 }}
                />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* 🔥 NEW PROFESSIONAL BOTTOM PANEL */}
      <div className="h-16 border-t border-cyan-400/10 bg-black/60 flex items-center justify-between px-6">

        {/* LEFT: SYSTEM TEXT */}
        <div className="text-xs text-cyan-400/60 tracking-widest">
          NETRA OS v1.0 • CLASSIFIED SYSTEM
        </div>

        {/* CENTER: QUICK ACTIONS */}
        <div className="flex gap-6">
          {apps.slice(0,5).map((app, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.2 }}
              onClick={() => setActiveApp(app.name)}
              className="text-cyan-400/70 hover:text-cyan-300"
            >
              {app.icon}
            </motion.button>
          ))}
        </div>

        {/* RIGHT: STATUS */}
        <div className="text-xs text-green-400 tracking-widest">
          ● SYSTEM ONLINE
        </div>

      </div>

      {/* APP VIEW */}
      {activeApp && (
        <div className="absolute inset-0 bg-[#010308] flex flex-col p-6">
          <div className="flex justify-between mb-4">
            <h2 className="text-lg tracking-widest">{activeApp}</h2>
            <button onClick={() => setActiveApp(null)}>CLOSE</button>
          </div>
          <div className="flex-1 flex items-center justify-center text-cyan-400/40">
            {activeApp} MODULE INITIALIZING...
          </div>
        </div>
      )}
      {listening && (
  <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50">
    
    <div className="flex flex-col items-center">

      {/* PULSE CIRCLE */}
      <motion.div
        className="w-24 h-24 rounded-full bg-cyan-400"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.8, 0.3, 0.8],
        }}
        transition={{ repeat: Infinity, duration: 1.2 }}
      />

      {/* TEXT */}
      <p className="mt-6 text-sm tracking-widest text-cyan-300">
        NETRA LISTENING...
      </p>

      {/* TRANSCRIPT */}
      <p className="text-xs mt-2 text-cyan-400/60">
        {transcript}
      </p>

    </div>
  </div>
)}
    </div>
  );
}
