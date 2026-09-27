import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import {
  Home,
  MapPin,
  Navigation,
  Users,
  Bell,
  AlertTriangle,
  LogOut,
} from "lucide-react";
import Dashboard from "./pages/Dashboard";
import Journey from "./pages/Journey";
import SafetyMap from "./pages/SafetyMap";
import Contacts from "./pages/Contacts";
import SOS from "./pages/SOS";
import Track from "./pages/Track";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

function NavigationMenu() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="desktop-nav">
      <Link
        to="/dashboard"
        className={`nav-item ${path === "/dashboard" || path === "/" ? "active" : ""}`}
      >
        <Home size={18} />
        Dashboard
      </Link>
      <Link
        to="/journey"
        className={`nav-item ${path === "/journey" ? "active" : ""}`}
      >
        <Navigation size={18} />
        Live Tracking
      </Link>
      <Link to="/map" className={`nav-item ${path === "/map" ? "active" : ""}`}>
        <MapPin size={18} />
        Safety Map
      </Link>
      <Link
        to="/contacts"
        className={`nav-item ${path === "/contacts" ? "active" : ""}`}
      >
        <Users size={18} />
        Contacts
      </Link>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0c14] flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";
  const userName =
    user?.displayName || localStorage.getItem("safeher_username") || "User";
  const initial = userName.charAt(0).toUpperCase();

  return (
    <div className="app-container">
      {!isAuthPage && (
        <header className="app-header">
          <div className="flex items-center">
            <Link to="/dashboard" className="app-title text-2xl tracking-tight">
              <img src="/vite.svg" alt="SafeHer Logo" className="w-7 h-7" />
              SafeHer
            </Link>
            <span className="app-subtitle hidden md:block">
              Safer journeys. Brighter tomorrows.
            </span>
          </div>

          {user && <NavigationMenu />}

          <div className="header-right">
            {user ? (
              <>
                <Link
                  to="/sos"
                  className="bg-primary hover:bg-primary-light text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition mr-2"
                >
                  <AlertTriangle size={16} /> SOS
                </Link>
                <button className="text-secondary hover:text-white transition hidden sm:block">
                  <Bell size={20} />
                </button>
                <div className="flex items-center gap-3 ml-2">
                  <div className="w-8 h-8 rounded-full bg-purple flex items-center justify-center text-white font-bold text-sm">
                    {initial}
                  </div>
                  <span className="text-sm font-medium hidden sm:block text-white">
                    {userName}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-secondary hover:text-danger transition ml-2"
                    title="Sign Out"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex gap-3">
                <Link
                  to="/login"
                  className="text-white font-medium hover:text-primary transition px-4 py-2"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-primary hover:bg-primary-light text-white font-bold px-4 py-2 rounded-lg transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </header>
      )}

      <main className="main-content">
        <Routes>
          {/* Public/Auth Routes */}
          <Route
            path="/login"
            element={user ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/dashboard" /> : <Signup />}
          />
          <Route path="/track" element={<Track />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/journey"
            element={user ? <Journey /> : <Navigate to="/login" />}
          />
          <Route
            path="/map"
            element={user ? <SafetyMap /> : <Navigate to="/login" />}
          />
          <Route
            path="/contacts"
            element={user ? <Contacts /> : <Navigate to="/login" />}
          />
          <Route
            path="/sos"
            element={user ? <SOS /> : <Navigate to="/login" />}
          />

          <Route
            path="*"
            element={<Navigate to={user ? "/dashboard" : "/login"} />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
