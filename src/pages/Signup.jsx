import React, { useState } from "react";
import { Shield, Mail, Lock, User, ChevronRight, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      // Update display name
      await updateProfile(userCredential.user, {
        displayName: name,
      });
      // Save user name locally for Dashboard greeting
      localStorage.setItem("safeher_username", name);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message.replace("Firebase:", "").trim());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#0f0d15]">
      <div className="w-full max-w-md bg-[#1b1826] border border-white/10 rounded-2xl p-8 sm:p-10 flex flex-col items-center shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-purple/20 flex items-center justify-center text-purple mb-6 shadow-[0_0_25px_rgba(139,92,246,0.35)]">
          <Shield size={32} fill="currentColor" />
        </div>

        <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight text-center">
          Create Account
        </h1>
        <p className="text-[#94a3b8] text-sm mb-8 text-center max-w-xs leading-relaxed">
          Join SafeHer and take control of your personal safety.
        </p>

        {error && (
          <div className="w-full bg-danger/20 border border-danger/50 text-danger text-sm p-3.5 rounded-xl mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-white">
              Full Name
            </label>
            <div className="relative w-full bg-[#12101a] border border-white/10 rounded-xl focus-within:border-purple focus-within:ring-1 focus-within:ring-purple/40 transition duration-200">
              <User
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8] pointer-events-none"
              />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full bg-transparent py-3.5 pr-4 pl-12 text-sm text-white placeholder-[#64748b] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-white">
              Email Address
            </label>
            <div className="relative w-full bg-[#12101a] border border-white/10 rounded-xl focus-within:border-purple focus-within:ring-1 focus-within:ring-purple/40 transition duration-200">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8] pointer-events-none"
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-transparent py-3.5 pr-4 pl-12 text-sm text-white placeholder-[#64748b] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-white">
              Password
            </label>
            <div className="relative w-full bg-[#12101a] border border-white/10 rounded-xl focus-within:border-purple focus-within:ring-1 focus-within:ring-purple/40 transition duration-200">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8] pointer-events-none"
              />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                className="w-full bg-transparent py-3.5 pr-4 pl-12 text-sm text-white placeholder-[#64748b] focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-purple w-full mt-2 py-3.5 text-sm font-bold rounded-xl transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <>
                Create Account <ChevronRight size={18} />
              </>
            )}
          </button>
        </form>

        <p className="text-[#94a3b8] text-sm mt-8 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-white font-bold hover:text-purple transition underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
