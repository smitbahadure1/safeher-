import React, { useState, useEffect } from "react";
import {
  ShieldAlert,
  X,
  Phone,
  Users,
  MapPin,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SOS() {
  const [countdown, setCountdown] = useState(5);
  const [status, setStatus] = useState("counting"); // 'counting', 'active', 'cancelled'
  const navigate = useNavigate();

  const contacts = JSON.parse(localStorage.getItem("safety_contacts") || "[]");
  const contactNames = contacts.map((c) => c.name).join(", ");

  useEffect(() => {
    if (status === "counting" && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (status === "counting" && countdown === 0) {
      setStatus("active");
    }
  }, [countdown, status]);

  const handleCancel = () => {
    setStatus("cancelled");
    setTimeout(() => {
      navigate("/dashboard"); // Go back to dashboard
    }, 1500);
  };

  const handleTriggerNow = () => {
    setStatus("active");
    setCountdown(0);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] max-w-2xl mx-auto w-full px-4">
      {status === "counting" && (
        <div className="card w-full border-[#ff3366]/30 bg-[#ff3366]/10 flex flex-col items-center py-16 px-6 text-center shadow-[0_0_50px_rgba(255,51,102,0.15)] relative overflow-hidden">
          <div className="absolute inset-0 bg-[#ff3366]/10 animate-pulse pointer-events-none"></div>

          <div className="w-24 h-24 rounded-full bg-[#ff3366]/20 flex items-center justify-center mb-6 relative z-10">
            <div className="w-16 h-16 rounded-full bg-[#ff3366] flex items-center justify-center shadow-[0_0_30px_rgba(255,51,102,0.8)] animate-ping absolute"></div>
            <ShieldAlert size={36} className="text-white relative z-10" />
          </div>

          <h1 className="text-3xl font-bold text-white mb-2 relative z-10">
            Triggering SOS
          </h1>
          <p className="text-xl text-[#94a3b8] mb-8 relative z-10">
            Alerting emergency contacts in
          </p>

          <div
            className="text-8xl font-black text-white mb-12 tabular-nums tracking-tighter relative z-10"
            style={{ textShadow: "0 0 20px rgba(255,51,102,0.8)" }}
          >
            00:0{countdown}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full relative z-10">
            <button
              onClick={handleCancel}
              className="flex-1 bg-[#1b1826] hover:bg-[#2c283a] border border-white/10 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition"
            >
              <X size={20} /> Cancel SOS
            </button>
            <button
              onClick={handleTriggerNow}
              className="flex-[2] bg-[#ff3366] hover:bg-[#ff5c85] text-white font-bold py-4 rounded-xl shadow-[0_4px_15px_rgba(255,51,102,0.4)] transition uppercase tracking-wider"
            >
              Trigger Immediately
            </button>
          </div>
        </div>
      )}

      {status === "active" && (
        <div className="card w-full border-[#00e676]/30 bg-[#1b1826] flex flex-col items-center py-12 px-6 text-center shadow-[0_0_50px_rgba(0,230,118,0.1)]">
          <div className="w-20 h-20 rounded-full bg-[#00e676]/20 flex items-center justify-center mb-6">
            <div className="w-12 h-12 rounded-full bg-[#00e676] flex items-center justify-center shadow-[0_0_20px_rgba(0,230,118,0.6)]">
              <CheckCircle size={28} className="text-white" />
            </div>
          </div>
          <div className="bg-[#ff3366]/20 border border-[#ff3366]/50 rounded-xl py-2 px-4 mb-6 inline-block">
            <p className="text-[#ff3366] font-bold text-xs uppercase tracking-widest">
              🚨 DEMO MODE ACTIVE 🚨
            </p>
          </div>

          <h1 className="text-3xl font-bold text-white mb-4">SOS Active</h1>
          <p className="text-[#94a3b8] mb-8 max-w-sm">
            Emergency alerts have been generated. No real police were contacted.
          </p>

          <div className="w-full space-y-3 mb-8 text-left">
            <div className="bg-[#12101a] border border-white/5 p-4 rounded-xl flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#8b5cf6]/20 flex items-center justify-center text-[#8b5cf6]">
                <Users size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-white">
                  Contacts Notified via SMS
                </p>
                <p className="text-xs text-[#94a3b8]">
                  {contacts.length > 0
                    ? `Simulated SMS sent to: ${contactNames}`
                    : "No contacts saved yet."}
                </p>
              </div>
            </div>

            <div className="bg-[#12101a] border border-white/5 p-4 rounded-xl flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#00e676]/20 flex items-center justify-center text-[#00e676]">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-white">
                  Live Tracking Started
                </p>
                <p className="text-xs text-[#94a3b8]">
                  Broadcasting real-time location
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full">
            <button className="bg-transparent border border-white/10 hover:bg-white/5 text-white font-bold py-4 rounded-xl transition flex flex-col items-center justify-center gap-2">
              <Phone size={24} className="text-white" />
              <span className="text-xs">Call 112</span>
            </button>
            <button
              onClick={handleCancel}
              className="bg-transparent border border-[#ff3366]/50 hover:bg-[#ff3366]/10 text-[#ff3366] font-bold py-4 rounded-xl transition flex flex-col items-center justify-center gap-2"
            >
              <X size={24} />
              <span className="text-xs">End SOS</span>
            </button>
          </div>
        </div>
      )}

      {status === "cancelled" && (
        <div className="card w-full border-white/5 bg-[#1b1826] flex flex-col items-center py-16 px-6 text-center">
          <div className="w-16 h-16 rounded-full bg-[#12101a] flex items-center justify-center mb-6 border border-white/10">
            <X size={32} className="text-[#94a3b8]" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">SOS Cancelled</h1>
          <p className="text-[#94a3b8]">Returning you to safety...</p>
        </div>
      )}
    </div>
  );
}
