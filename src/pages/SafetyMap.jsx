import React, { useState, useEffect } from "react";
import {
  Navigation,
  TriangleAlert,
  Lightbulb,
  ShieldCheck,
  ChevronRight,
  PlusCircle,
  Users,
  ChevronDown,
  LayoutGrid,
} from "lucide-react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";

const userIcon = L.divIcon({
  className: "bg-transparent",
  html: `<div class="w-6 h-6 rounded-full bg-purple flex items-center justify-center text-white border-2 border-white animate-pulse"></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

// Component to recenter the map dynamically
function MapUpdater({ coordinates }) {
  const map = useMap();
  useEffect(() => {
    if (coordinates) {
      map.flyTo(coordinates, 15, { animate: true, duration: 1.5 });
    }
  }, [coordinates, map]);
  return null;
}

export default function SafetyMap() {
  const [reports] = useState([]);
  const [coordinates, setCoordinates] = useState(null);
  const [mapCenter, setMapCenter] = useState([40.7128, -74.006]); // Default New York

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates([position.coords.latitude, position.coords.longitude]);
          setMapCenter([position.coords.latitude, position.coords.longitude]);
        },
        (error) => console.error("Error fetching location", error),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
      );
    }
  }, []);
  return (
    <div className="flex flex-col lg:flex-row gap-6 max-w-350 mx-auto w-full">
      {/* Left Sidebar */}
      <div className="w-full lg:w-[320px] flex flex-col gap-6 shrink-0">
        {/* Map Filters & Actions */}
        <div className="card p-0 flex flex-col overflow-hidden">
          <div className="p-6 pb-4 border-b border-white/5">
            <h1 className="text-2xl font-bold text-white mb-1">Safety Map</h1>
            <p className="text-sm text-secondary">
              Real reports. Safer communities.
            </p>
          </div>

          <div className="flex flex-col p-3 gap-1">
            <button className="flex items-center justify-between p-3.5 rounded-xl bg-[rgba(139,92,246,0.15)] border border-purple/30 text-white transition hover:bg-[rgba(139,92,246,0.2)]">
              <div className="flex items-center gap-3">
                <LayoutGrid size={18} className="text-purple" />
                <span className="font-semibold text-sm">All Reports</span>
              </div>
              <ChevronRight size={16} className="text-secondary" />
            </button>

            <button className="flex items-center justify-between p-3.5 rounded-xl text-white transition hover:bg-white/5 border border-transparent">
              <div className="flex items-center gap-3">
                <TriangleAlert
                  size={18}
                  className="text-danger"
                  fill="currentColor"
                />
                <span className="font-semibold text-sm">Harassment</span>
              </div>
              <ChevronRight size={16} className="text-secondary" />
            </button>

            <button className="flex items-center justify-between p-3.5 rounded-xl text-white transition hover:bg-white/5 border border-transparent">
              <div className="flex items-center gap-3">
                <Lightbulb
                  size={18}
                  className="text-warning"
                  fill="currentColor"
                />
                <span className="font-semibold text-sm">Poor Lighting</span>
              </div>
              <ChevronRight size={16} className="text-secondary" />
            </button>

            <button className="flex items-center justify-between p-3.5 rounded-xl text-white transition hover:bg-white/5 border border-transparent">
              <div className="flex items-center gap-3">
                <ShieldCheck size={18} className="text-success" />
                <span className="font-semibold text-sm">Verified Safe</span>
              </div>
              <ChevronRight size={16} className="text-secondary" />
            </button>
          </div>

          <div className="p-4 pt-1">
            <button className="w-full py-3.5 bg-linear-to-r from-primary to-primary-light text-white font-bold rounded-xl transition flex items-center justify-center gap-2 transform hover:-translate-y-0.5">
              <PlusCircle size={18} />
              Report Incident
            </button>
          </div>
        </div>

        {/* Promo Card */}
        <div className="card p-6 rounded-xl flex flex-col gap-4 relative overflow-hidden bg-linear-to-b from-[#1b1826] to-[#16141f]">
          <div className="text-purple">
            <Users size={32} />
          </div>
          <h3 className="text-white font-bold text-lg leading-tight">
            A safer community is a stronger tomorrow.
          </h3>
          <p className="text-xs text-secondary leading-relaxed">
            Share what you see. Help others travel with confidence.
          </p>
          <button className="text-purple text-sm font-semibold flex items-center gap-1 hover:text-purple-300 transition mt-2 w-fit">
            Learn more <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Right Main Area */}
      <div className="flex-1 flex flex-col gap-6">
        {/* Map Container */}
        <div className="card p-0 relative overflow-hidden h-125 border border-white/5 rounded-2xl shrink-0 bg-[#0d0c14] z-0">
          <MapContainer
            center={mapCenter}
            zoom={14}
            zoomControl={false}
            style={{ height: "100%", width: "100%", zIndex: 0 }}
          >
            <MapUpdater coordinates={coordinates} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              className="dark-map-tiles"
            />

            {/* User Location */}
            {coordinates ? (
              <Marker position={coordinates} icon={userIcon}>
                <Popup className="dark-popup">
                  <div className="font-bold">You are here</div>
                </Popup>
              </Marker>
            ) : (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-1000 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold border border-white/10 flex items-center gap-2 pointer-events-none">
                <div className="w-2 h-2 rounded-full bg-purple animate-pulse"></div>
                Finding your location...
              </div>
            )}
          </MapContainer>

          {/* Map UI Overlays */}

          {/* Controls Right */}
          <div className="absolute top-6 right-6 z-1000 flex gap-3 pointer-events-auto">
            <button className="bg-[rgba(27,24,38,0.9)] backdrop-blur-md border border-white/10 rounded-full py-2 px-4 flex items-center gap-2 text-sm text-white font-medium hover:bg-white/10 transition shadow-lg">
              <Navigation size={14} className="text-secondary" /> My Location
            </button>
          </div>

          {/* Legend */}
          <div className="absolute bottom-6 right-6 bg-[rgba(27,24,38,0.9)] backdrop-blur-md rounded-full border border-white/10 px-4 py-3 flex items-center gap-4 shadow-xl z-1000 pointer-events-auto">
            <div className="flex items-center gap-2 text-xs text-white">
              <div className="w-5 h-5 rounded-full bg-danger flex items-center justify-center text-white">
                <TriangleAlert size={10} fill="currentColor" />
              </div>
              Incident
            </div>
            <div className="flex items-center gap-2 text-xs text-white">
              <div className="w-5 h-5 rounded-full bg-warning flex items-center justify-center text-white">
                <Lightbulb size={10} fill="currentColor" />
              </div>
              Poor lighting
            </div>
            <div className="flex items-center gap-2 text-xs text-white">
              <div className="w-5 h-5 rounded-full bg-success flex items-center justify-center text-white">
                <ShieldCheck size={10} />
              </div>
              Verified safe
            </div>
            <div className="flex items-center gap-2 text-xs text-white">
              <div className="w-6 h-1 border-b-2 border-dashed border-purple"></div>
              Safe route
            </div>
          </div>
        </div>

        {/* Recent Community Reports List */}
        <div className="card flex flex-col p-0 overflow-hidden">
          <div className="p-6 border-b border-white/5 flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">
                Recent Community Reports
              </h2>
              <p className="text-sm text-secondary">
                Real-time reports from people in your area.
              </p>
            </div>
            <button className="bg-[rgba(255,255,255,0.05)] border border-white/10 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-white/10 transition">
              All Reports <ChevronDown size={16} className="text-secondary" />
            </button>
          </div>

          <div className="flex flex-col min-h-37.5">
            {reports.length === 0 ? (
              <div className="p-8 flex flex-col items-center justify-center text-center text-secondary">
                <LayoutGrid size={32} className="mb-3 opacity-50" />
                <p className="text-white font-medium mb-1">
                  No reports in this area
                </p>
                <p className="text-sm">
                  Be the first to report an incident or verify a safe route.
                </p>
              </div>
            ) : (
              reports.map((report, idx) => (
                <div
                  key={idx}
                  className="flex items-start justify-between p-6 border-b border-white/5 hover:bg-white/2 transition cursor-pointer"
                >
                  {/* Render reports here when data exists */}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
