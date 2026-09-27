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
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md card bg-[#1b1826] border border-white/5 p-8 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-purple/20 flex items-center justify-center text-purple mb-6 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
          <Shield size={32} fill="currentColor" />
        </div>

        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
          Create Account
        </h1>
        <p className="text-secondary text-sm mb-6 text-center">
          Join SafeHer and take control of your personal safety.
        </p>

        {error && (
          <div className="w-full bg-danger/20 border border-danger/50 text-danger text-sm p-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="w-full flex flex-col gap-5">
          <div>
            <label className="block text-sm font-bold text-white mb-2">
              Full Name
            </label>
            <div className="relative w-full bg-[#12101a] border border-white/10 rounded-xl focus-within:border-purple transition">
              <User
                size={18}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#94a3b8]"
              />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full bg-transparent py-3.5 pr-4 text-sm text-white placeholder-[#94a3b8] focus:outline-none"
                style={{ paddingLeft: "3rem" }}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-white mb-2">
              Email Address
            </label>
            <div className="relative w-full bg-[#12101a] border border-white/10 rounded-xl focus-within:border-purple transition">
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
            <label className="block text-sm font-bold text-white mb-2">
              Password
            </label>
            <div className="relative w-full bg-[#12101a] border border-white/10 rounded-xl focus-within:border-purple transition">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#94a3b8]"
              />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                className="w-full bg-transparent py-3.5 pr-4 text-sm text-white placeholder-[#94a3b8] focus:outline-none"
                style={{ paddingLeft: "3rem" }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple to-[#a78bfa] hover:shadow-[0_4px_20px_rgba(139,92,246,0.4)] text-white font-bold py-4 rounded-xl transition mt-4 flex items-center justify-center gap-2 disabled:opacity-50"
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

        <p className="text-secondary text-sm mt-8">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-white font-bold hover:text-purple transition"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
