import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Boot from "./pages/Boot";
import Login from "./pages/Login";
import NetraDashboard from "./pages/NetraDashboard";

export default function App() {
  const [booted, setBooted] = useState(false);

  return (
    <BrowserRouter>
      {!booted ? (
        <Boot onFinish={() => setBooted(true)} />
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<NetraDashboard />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}