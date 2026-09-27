import React, { useState } from "react";
import {
  Clock,
  Navigation,
  Battery,
  Signal,
  Users,
  ChevronRight,
  Bell,
  Square,
  Moon,
  Cloud,
  Plus,
  Minus,
  Send,
  MapPin,
  Home,
  Activity,
} from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Link } from "react-router-dom";

const userIcon = L.divIcon({
  className: "bg-transparent",
  html: `<div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white shadow-[0_0_20px_rgba(255,51,102,0.8)] border-2 border-white animate-pulse"></div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

export default function Journey() {
  const [activeJourney, setActiveJourney] = useState(null);
  const [coordinates, setCoordinates] = useState(null);

  React.useEffect(() => {
    let watchId;
    if (activeJourney && "geolocation" in navigator) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const newCoords = [
            position.coords.latitude,
            position.coords.longitude,
          ];
          setCoordinates(newCoords);

          // Broadcast location to localStorage for the tracker tab
          localStorage.setItem(
            "live_tracking_coords",
            JSON.stringify({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              timestamp: Date.now(),
            }),
          );
        },
        (error) => console.error("Error watching location:", error),
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 },
      );
    } else {
      localStorage.removeItem("live_tracking_coords");
    }
    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, [activeJourney]);

  if (!activeJourney) {
    return (
      <div className="flex flex-col gap-4 max-w-[1200px] mx-auto w-full h-[600px] items-center justify-center">
        <div className="card p-12 flex flex-col items-center justify-center text-center border border-white/5 bg-[#1b1826] w-full max-w-2xl">
          <Activity size={64} className="text-secondary mb-6 opacity-30" />
          <h2 className="text-3xl font-bold text-white mb-3">
            No Active Journey
          </h2>
          <p className="text-secondary text-base mb-8 max-w-md mx-auto">
            Start a live trip to share your real-time location with your trusted
            contacts and get safety alerts.
          </p>
          <button
            onClick={() => setActiveJourney(true)}
            className="bg-primary hover:bg-primary-light text-white font-bold py-4 px-10 rounded-xl transition shadow-[0_4px_15px_rgba(255,51,102,0.3)] text-lg"
          >
            Start a New Trip
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 max-w-[1200px] mx-auto w-full">
      {/* Existing UI with empty state data */}

      {/* Large Map Area */}
      <div className="card p-0 relative overflow-hidden h-[400px] border border-white/5 rounded-2xl flex-shrink-0">
        {/* Dark Map Background */}
        <div className="absolute inset-0 bg-[#0d0c14] z-0">
          {coordinates ? (
            <MapContainer
              center={coordinates}
              zoom={16}
              zoomControl={false}
              attributionControl={false}
              style={{ height: "100%", width: "100%", zIndex: 0 }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                className="dark-map-tiles"
              />
              <Marker position={coordinates} icon={userIcon}>
                <Popup className="dark-popup">
                  <div className="font-bold text-primary">Live Location</div>
                  <div className="text-xs">Updating in real-time...</div>
                </Popup>
              </Marker>
            </MapContainer>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-secondary">
              <MapPin size={32} className="mb-2 opacity-50 animate-bounce" />
              <span className="text-sm">Fetching GPS signal...</span>
            </div>
          )}
        </div>

        {/* Map UI Elements */}

        {/* Top Left Floating Status */}
        <div className="absolute top-4 left-4 bg-[rgba(27,24,38,0.9)] backdrop-blur-md px-4 py-3 rounded-xl border border-white/10 shadow-lg z-[1000] pointer-events-auto">
          <div className="flex items-center gap-2 mb-1">
            <Users size={16} className="text-purple" />
            <span className="font-bold text-white text-sm">
              Sharing with 0 contacts
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse shadow-[0_0_8px_rgba(0,230,118,0.8)]"></div>
            <span className="text-xs text-secondary">
              Your live location is being shared in real time
            </span>
          </div>
        </div>

        {/* Share Link Button */}
        <div className="absolute top-4 right-4 z-[1000] pointer-events-auto">
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.origin + "/track");
              alert(
                "Live tracking link copied to clipboard! Open it in a new tab.",
              );
            }}
            className="bg-primary hover:bg-primary-light text-white font-bold px-4 py-2 rounded-lg border border-white/10 shadow-lg text-xs uppercase tracking-wider transition"
          >
            Copy Tracking Link
          </button>
        </div>

        {/* Bottom Left Weather */}
        <div className="absolute bottom-4 left-4 bg-[rgba(27,24,38,0.9)] backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-lg z-[1000] flex items-center gap-3">
          <Moon size={14} className="text-blue-200" fill="currentColor" />
          <span className="text-xs text-white font-semibold">--°C</span>
          <span className="text-xs text-secondary">Loading...</span>
        </div>

        {/* Right Side Map Controls */}
        <div className="absolute right-4 bottom-4 flex flex-col gap-2 z-[1000] pointer-events-auto">
          <button className="bg-[rgba(27,24,38,0.9)] backdrop-blur-md rounded-lg border border-white/10 shadow-lg p-2.5 text-white hover:bg-white/10 transition mt-2 flex flex-col items-center justify-center">
            <Send size={18} className="transform -rotate-45" />
          </button>
        </div>
      </div>

      {/* 3 Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Elapsed */}
        <div className="card flex items-center gap-4 py-4 px-5">
          <div className="w-12 h-12 rounded-full border-2 border-purple flex items-center justify-center">
            <Clock size={20} className="text-purple" />
          </div>
          <div>
            <p className="text-xs text-secondary mb-0.5">Elapsed</p>
            <h3 className="text-2xl font-bold tracking-tight text-white">
              0:00
            </h3>
          </div>
        </div>

        {/* ETA */}
        <div className="card flex items-center gap-4 py-4 px-5">
          <div className="w-12 h-12 rounded-full border-2 border-primary/20 bg-primary/10 flex items-center justify-center">
            <Navigation
              size={20}
              className="text-primary transform rotate-45 -translate-y-0.5"
              fill="currentColor"
            />
          </div>
          <div>
            <p className="text-xs text-secondary mb-0.5">ETA</p>
            <h3 className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
              -- min
            </h3>
            <p className="text-[10px] text-secondary mt-0.5">Calculating...</p>
          </div>
        </div>

        {/* Battery & Signal */}
        <div className="card flex items-center justify-between py-4 px-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border-2 border-success flex items-center justify-center">
              <Battery size={20} className="text-success" fill="currentColor" />
            </div>
            <div>
              <p className="text-xs text-secondary mb-0.5">Battery</p>
              <h3 className="text-2xl font-bold tracking-tight text-white">
                --%
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-2 text-secondary">
            <Signal size={16} className="text-success" />
            <Bell size={14} />
            <span className="text-xs font-semibold text-white">4G</span>
          </div>
        </div>
      </div>

      {/* Trusted Contacts List */}
      <div className="card p-0 overflow-hidden">
        <div className="p-5 border-b border-white/5 flex justify-between items-center bg-[#1b1826]">
          <h3 className="font-bold text-white text-sm">
            Your trusted contacts (0)
          </h3>
        </div>

        <div className="flex flex-col p-8 items-center justify-center text-center text-secondary">
          <Users size={32} className="mb-3 opacity-50" />
          <p className="text-white font-medium mb-1">No contacts watching</p>
          <p className="text-sm">
            You haven't shared this journey with anyone yet.
          </p>
        </div>
      </div>

      {/* Action Buttons Footer */}
      <div className="flex gap-4 mt-2">
        <button
          onClick={() => setActiveJourney(null)}
          className="card flex-1 py-4 flex items-center justify-center gap-2 hover:bg-[#221f30] transition border-white/5 shadow-none rounded-xl"
        >
          <Square size={16} className="text-white" fill="currentColor" />
          <span className="font-bold text-white">End Trip</span>
        </button>

        <Link
          to="/sos"
          className="flex-[2] bg-gradient-to-br from-[#ff3366] to-[#ff1a4d] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(255,51,102,0.4)] text-white rounded-xl py-4 flex flex-row items-center justify-center gap-3 shadow-[0_4px_15px_rgba(255,51,102,0.3)] transition"
        >
          <Bell size={20} fill="currentColor" />
          <span className="font-bold text-lg tracking-wide">SOS</span>
        </Link>
      </div>
    </div>
  );
}
