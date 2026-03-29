import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

// 🔥 FIREBASE
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";

import { useNavigate } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyDTDsMGSGMqIWt1Z75XnL2kTGYdxEhxUqc",
  authDomain: "netra-os-v10.firebaseapp.com",
  databaseURL: "https://netra-os-v10-default-rtdb.firebaseio.com",
  projectId: "netra-os-v10",
  storageBucket: "netra-os-v10.firebasestorage.app",
  messagingSenderId: "442533086554",
  appId: "1:442533086554:web:e227016642894714369f63"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default function Login() {
const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState("");

  const handleLogin = async () => {

  // 🔹 Access code = username
  const accessCode = password;

  if (accessCode.length !== 10) {
    setStatus("invalid");
    setTimeout(() => setStatus(""), 1500);
    return;
  }

  try {
    const userRef = ref(db, `users/${accessCode}`);
    const snapshot = await get(userRef);

    // ✅ USER EXISTS → LOGIN SUCCESS
    if (snapshot.exists()) {
      setStatus("granted");

      setTimeout(() => {
        navigate("/dashboard");
      }, 800);

    } else {
      // ❌ USER NOT FOUND
      setStatus("denied");
      setTimeout(() => setStatus(""), 1500);
    }

  } catch (err) {
    console.error(err);
    setStatus("denied");
    setTimeout(() => setStatus(""), 1500);
  }
};

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#05080f] text-cyan-400 relative overflow-hidden">

      {/* GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* SCAN LINE */}
      <motion.div
        className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400/30"
        animate={{ y: ["0%", "100%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />

      {/* LOGIN CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-[500px] p-10 border border-cyan-400/30 rounded-2xl backdrop-blur-xl bg-black/50 shadow-[0_0_25px_rgba(0,255,255,0.2)]"
      >
        <h1 className="text-4xl font-bold text-center tracking-widest">
          NETRA OS
        </h1>

        <p className="text-center text-sm text-cyan-400/60 mb-8">
          AUTHORIZED ACCESS ONLY
        </p>

        {/* INPUT + EYE */}
        <div className="relative">
          <input
            type={show ? "text" : "password"}
            placeholder="ENTER 10-DIGIT ACCESS CODE"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-5 text-lg tracking-widest bg-transparent border border-cyan-400/40 rounded-xl outline-none focus:shadow-[0_0_15px_cyan] pr-14"
          />

          {/* Eye Button */}
          <button
            onClick={() => setShow(!show)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-400/70 hover:text-cyan-300"
          >
            {show ? <EyeOff size={22} /> : <Eye size={22} />}
          </button>
        </div>

        {/* LOGIN BUTTON */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleLogin}
          className="mt-8 w-full py-4 text-lg border border-cyan-400 rounded-xl hover:bg-cyan-400/10 transition-all"
        >
          INITIALIZE LOGIN
        </motion.button>

        {/* STATUS */}
        <div className="h-6 mt-4 text-center">
          {status === "granted" && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-400"
            >
              ACCESS GRANTED
            </motion.p>
          )}

          {status === "denied" && (
            <motion.p
              initial={{ x: -10 }}
              animate={{ x: [10, -10, 0] }}
              className="text-red-400"
            >
              ACCESS DENIED
            </motion.p>
          )}

          {status === "invalid" && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-yellow-400"
            >
              INVALID ACCESS CODE
            </motion.p>
          )}
        </div>

        {/* FORGOT */}
        <p className="text-center text-sm mt-4 text-cyan-400/50 hover:text-cyan-300 cursor-pointer">
          Forgot Access Code?
        </p>
      </motion.div>
    </div>
  );
}