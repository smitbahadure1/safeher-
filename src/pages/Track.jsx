import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { Shield, MapPin, Activity } from "lucide-react";

const userIcon = L.divIcon({
  className: "bg-transparent",
  html: `<div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white border-2 border-white animate-pulse"></div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

function MapUpdater({ coordinates }) {
  const map = useMap();
  useEffect(() => {
    if (coordinates) {
      map.flyTo(coordinates, 16, { animate: true, duration: 1.5 });
    }
  }, [coordinates, map]);
  return null;
}

export default function Track() {
  const [coordinates, setCoordinates] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    // Initial load
    const loadCoords = () => {
      const data = localStorage.getItem("live_tracking_coords");
      if (data) {
        const parsed = JSON.parse(data);
        setCoordinates([parsed.lat, parsed.lng]);
        setLastUpdated(parsed.timestamp);
      } else {
        setCoordinates(null);
      }
    };

    loadCoords();

    // Listen to changes across tabs
    const handleStorage = (e) => {
      if (e.key === "live_tracking_coords") {
        loadCoords();
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] w-full max-w-300 mx-auto gap-4">
      <div className="bg-[#1b1826] border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            {coordinates ? (
              <Activity size={24} className="animate-pulse" />
            ) : (
              <Shield size={24} />
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">
              Live Tracking Viewer
            </h1>
            <p className="text-secondary text-sm">
              {coordinates ? (
                <span className="text-success flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>{" "}
                  Receiving live GPS data
                </span>
              ) : (
                "Waiting for user to start a live trip..."
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 card p-0 relative overflow-hidden border border-white/10 rounded-2xl bg-[#0d0c14]">
        {coordinates ? (
          <MapContainer
            center={coordinates}
            zoom={16}
            zoomControl={false}
            attributionControl={false}
            style={{ height: "100%", width: "100%", zIndex: 0 }}
          >
            <MapUpdater coordinates={coordinates} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              className="dark-map-tiles"
            />
            <Marker position={coordinates} icon={userIcon}>
              <Popup className="dark-popup">
                <div className="font-bold text-primary">Live User Location</div>
                <div className="text-xs">
                  {lastUpdated
                    ? `Updated ${new Date(lastUpdated).toLocaleTimeString()}`
                    : "Updated just now"}
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-secondary">
            <MapPin size={48} className="mb-4 opacity-30" />
            <h2 className="text-xl font-bold text-white mb-2">
              No Active Trip Found
            </h2>
            <p className="max-w-md text-center text-sm">
              The user has not started a live tracking session. Once they tap
              "Start Trip" on their device, their real-time location will appear
              here automatically.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
