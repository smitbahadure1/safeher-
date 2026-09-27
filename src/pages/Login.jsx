import React, { useState } from "react";
import { Shield, Mail, Lock, ChevronRight, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      localStorage.setItem(
        "safeher_username",
        userCredential.user.displayName || "User",
      );
      navigate("/dashboard");
    } catch (err) {
      setError(err.message.replace("Firebase:", "").trim());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md card bg-[#1b1826] border border-white/5 p-8 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-6 shadow-[0_0_20px_rgba(255,51,102,0.3)]">
          <Shield size={32} fill="currentColor" />
        </div>

        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
          Welcome back
        </h1>
        <p className="text-secondary text-sm mb-6 text-center">
          Enter your details to access your safety dashboard.
        </p>

        {error && (
          <div className="w-full bg-danger/20 border border-danger/50 text-danger text-sm p-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="w-full flex flex-col gap-5">
          <div>
            <label className="block text-sm font-bold text-white mb-2">
              Email Address
            </label>
            <div className="relative w-full bg-[#12101a] border border-white/10 rounded-xl focus-within:border-[#8b5cf6] transition">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#94a3b8]"
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-transparent py-3.5 pr-4 text-sm text-white placeholder-[#94a3b8] focus:outline-none"
                style={{ paddingLeft: "3rem" }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-bold text-white">
                Password
              </label>
              <a
                href="#"
                className="text-xs text-primary hover:text-primary-light transition"
              >
                Forgot password?
              </a>
            </div>
            <div className="relative w-full bg-[#12101a] border border-white/10 rounded-xl focus-within:border-[#8b5cf6] transition">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#94a3b8]"
              />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent py-3.5 pr-4 text-sm text-white placeholder-[#94a3b8] focus:outline-none"
                style={{ paddingLeft: "3rem" }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary to-primary-light hover:shadow-[0_4px_20px_rgba(255,51,102,0.4)] text-white font-bold py-4 rounded-xl transition mt-4 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <>
                Sign In <ChevronRight size={18} />
              </>
            )}
          </button>
        </form>

        <p className="text-secondary text-sm mt-8">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-white font-bold hover:text-primary transition"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
