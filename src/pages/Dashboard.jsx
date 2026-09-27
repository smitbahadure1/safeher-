import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  MapPin,
  Navigation,
  Shield,
  Users,
  Clock,
  Flame,
  Check,
  ChevronRight,
  Phone,
  ShieldAlert,
  Car,
  Map as MapIcon,
  Activity,
} from "lucide-react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

// Custom User Icon
const userIcon = L.divIcon({
  className: "bg-transparent",
  html: `<div class="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white shadow-[0_0_15px_rgba(255,51,102,0.8)] border-2 border-white animate-pulse"></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

// Component to recenter the map dynamically
function MapUpdater({ coordinates }) {
  const map = useMap();
  React.useEffect(() => {
    if (coordinates) {
      map.flyTo(coordinates, 15, { animate: true, duration: 1.5 });
    }
  }, [coordinates, map]);
  return null;
}

export default function Dashboard() {
  // State for real data integration
  const [userData, setUserData] = useState(() => {
    const savedName =
      auth.currentUser?.displayName ||
      localStorage.getItem("safeher_username") ||
      "User";
    return {
      name: savedName,
      status: "Unknown", // Safe, Unknown, Danger
      lastCheckIn: null,
      contactsShared: 0,
      streak: 0,
      contacts: [],
      nextCheckIn: null,
      currentLocation: null,
      coordinates: null, // User's actual GPS
      mapCenter: [40.7128, -74.006], // Default fallback map center (New York)
      activities: [], // empty array means no recent activity
    };
  });

  // Fetch Contacts from Firestore
  React.useEffect(() => {
    const fetchUserData = async () => {
      const uid = auth.currentUser?.uid;
      if (!uid) return;
      try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().contacts) {
          const loadedContacts = docSnap.data().contacts;
          setUserData((prev) => ({
            ...prev,
            contacts: loadedContacts,
            contactsShared: loadedContacts.length,
          }));
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };
    fetchUserData();
  }, []);

  // Fetch real geolocation on load
  React.useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserData((prev) => ({
            ...prev,
            status: "Safe",
            lastCheckIn: "Just now",
            currentLocation: "Your Location",
            coordinates: [position.coords.latitude, position.coords.longitude],
            mapCenter: [position.coords.latitude, position.coords.longitude],
          }));
        },
        (error) => {
          console.error("Error fetching location", error);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
      );
    }
  }, []);

  const handleScheduleCheckIn = () => {
    if (userData.nextCheckIn) {
      // Clear it to toggle for demo purposes
      setUserData((prev) => ({ ...prev, nextCheckIn: null }));
    } else {
      const futureTime = new Date(Date.now() + 30 * 60000);
      setUserData((prev) => ({
        ...prev,
        nextCheckIn: {
          timeRemaining: "30:00",
          time:
            "Due at " +
            futureTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
        },
      }));
    }
  };

  return (
    <div className="dash-grid">
      {/* Top Status Banner */}
      <div className="status-banner-card">
        <div className="z-10">
          <p className="text-xs text-secondary uppercase font-semibold tracking-wider mb-2">
            GOOD TO SEE YOU, {userData.name}
          </p>
          <h1 className="text-3xl font-bold mb-2">
            Status:{" "}
            <span
              className={
                userData.status === "Safe" ? "text-success" : "text-secondary"
              }
            >
              {userData.status}
            </span>
          </h1>
          <p className="text-sm text-secondary mb-4">
            {userData.lastCheckIn
              ? `Last check-in ${userData.lastCheckIn}`
              : "No recent check-ins"}
          </p>
          <div className="flex items-center gap-2 text-sm text-secondary">
            <div
              className={`w-2 h-2 rounded-full ${userData.contactsShared > 0 ? "bg-success shadow-[0_0_8px_rgba(0,230,118,0.6)]" : "bg-secondary"}`}
            ></div>
            {userData.contactsShared > 0
              ? `Your location is being shared with ${userData.contactsShared} trusted contacts`
              : "Your location is not being shared"}
          </div>
        </div>

        <div className="radar-circle">
          <div className="radar-dot"></div>
        </div>

        <div className="sos-panel">
          <Link
            to="/sos"
            className="bg-gradient-to-br from-[#ff3366] to-[#ff1a4d] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(255,51,102,0.4)] text-white rounded-xl p-4 font-bold flex flex-col items-center justify-center gap-1 w-full shadow-[0_4px_15px_rgba(255,51,102,0.3)] transition"
          >
            <div className="flex items-center gap-2 text-xl">
              <Bell size={24} fill="currentColor" />
              SOS
            </div>
            <span className="text-xs font-normal opacity-90">
              Tap for immediate help
            </span>
          </Link>
          <button className="btn-dark">
            <div className="flex items-center gap-2">
              <Phone size={16} /> Call Emergency Services
            </div>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Trusted Contacts */}
      <div className="card flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="text-purple">
              <Users size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{userData.contacts.length}</h2>
              <p className="text-secondary text-sm">trusted contacts</p>
            </div>
          </div>
          <Link to="/contacts">
            <ChevronRight
              size={20}
              className="text-secondary hover:text-white transition cursor-pointer"
            />
          </Link>
        </div>
        <div>
          <div className="avatar-group h-[40px] flex items-center text-sm text-secondary">
            {userData.contacts.length > 0 ? (
              userData.contacts.slice(0, 5).map((c, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-[#ff3366] flex items-center justify-center text-white font-bold border-2 border-[#12101a] -ml-2 first:ml-0 shadow-lg"
                >
                  {c.initials}
                </div>
              ))
            ) : (
              <span className="text-sm">No contacts added yet.</span>
            )}
          </div>
          <p className="text-xs text-secondary mt-3">
            Family, friends and people you trust
          </p>
        </div>
      </div>

      {/* Next Check-in */}
      <div className="card flex flex-col justify-between">
        <div className="flex flex-col items-center justify-center h-full gap-2">
          <div className="flex items-center gap-2 text-purple">
            <Clock size={24} />
            <span className="text-sm">Next check-in</span>
          </div>
          {userData.nextCheckIn ? (
            <>
              <h2 className="text-3xl font-bold">
                {userData.nextCheckIn.timeRemaining}
              </h2>
              <p className="text-xs text-secondary">
                {userData.nextCheckIn.time}
              </p>
            </>
          ) : (
            <p className="text-lg font-bold text-secondary mt-2">
              No check-ins scheduled
            </p>
          )}
        </div>
        <button className="btn-dark mt-4" onClick={handleScheduleCheckIn}>
          <div className="flex items-center gap-2 text-sm">
            <Clock size={16} />{" "}
            {userData.nextCheckIn ? "Cancel check-in" : "Schedule a check-in"}
          </div>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Streak */}
      <div className="card flex flex-col justify-between">
        <div className="flex items-center gap-3 mb-2">
          <div className="text-primary">
            <Flame size={28} fill="currentColor" />
          </div>
          <div>
            <h2 className="text-xl font-bold">
              Streak: {userData.streak} days
            </h2>
            <p className="text-xs text-secondary">
              You've been checking in regularly
            </p>
          </div>
        </div>
        <div className="streak-days">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
            <div key={day} className="streak-day">
              <div
                className={`streak-dot ${i < userData.streak ? "active" : ""}`}
              ></div>
              <span className="text-xs text-secondary">{day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Map Location */}
      <div
        className="card map-card p-0 overflow-hidden relative"
        style={{ minHeight: "280px" }}
      >
        <div className="p-6 bg-[rgba(27,24,38,0.9)] absolute top-0 left-0 right-0 z-10 backdrop-blur-sm border-b border-white/5 flex justify-between items-start">
          <div className="flex gap-3">
            <div className="text-purple">
              <MapPin size={24} fill="currentColor" />
            </div>
            <div>
              <h3 className="font-bold">
                {userData.currentLocation
                  ? `Currently at ${userData.currentLocation}`
                  : "Location unknown"}
              </h3>
              <div className="flex items-center gap-2 text-xs text-secondary mt-1">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${userData.currentLocation ? "bg-success" : "bg-secondary"}`}
                ></div>
                {userData.currentLocation
                  ? "Live location • Updated just now"
                  : "Location services disabled"}
              </div>
            </div>
          </div>
          <Link to="/journey" className="btn-dark w-auto py-1.5 text-xs">
            View Live Tracking <ChevronRight size={14} />
          </Link>
        </div>

        {/* Real Leaflet Map Background */}
        <div className="absolute inset-0 bg-[#15131d] overflow-hidden flex items-center justify-center z-0">
          <MapContainer
            center={userData.mapCenter}
            zoom={15}
            zoomControl={false}
            attributionControl={false}
            style={{ height: "100%", width: "100%", zIndex: 0 }}
          >
            <MapUpdater coordinates={userData.coordinates} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              className="dark-map-tiles"
            />

            {userData.coordinates ? (
              <>
                <Circle
                  center={userData.coordinates}
                  radius={150}
                  pathOptions={{
                    color: "#ff3366",
                    fillColor: "#ff3366",
                    fillOpacity: 0.1,
                    weight: 1,
                  }}
                />
                <Marker position={userData.coordinates} icon={userIcon} />
              </>
            ) : (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1000] bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold border border-white/10 flex items-center gap-2 pointer-events-none">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                Finding your location...
              </div>
            )}
          </MapContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card activity-card flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold">Recent activity</h3>
          {userData.activities.length > 0 && (
            <span className="text-purple text-sm font-semibold cursor-pointer">
              View all
            </span>
          )}
        </div>

        <div className="flex-1 flex flex-col">
          {userData.activities.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-secondary h-full min-h-[150px]">
              <Activity size={32} className="mb-3 opacity-50" />
              <p className="text-sm font-medium text-white mb-1">
                No recent activity
              </p>
              <p className="text-xs text-center max-w-[200px]">
                Check-ins, trips, and alerts will appear here.
              </p>
            </div>
          ) : (
            userData.activities.map((activity, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-line"></div>
                <div
                  className={`timeline-icon ${activity.type === "check-in" ? "success" : activity.type === "trip" ? "purple" : "gray"}`}
                >
                  {activity.type === "check-in" ? (
                    <Check size={12} strokeWidth={3} />
                  ) : activity.type === "trip" ? (
                    <Car size={12} />
                  ) : (
                    <Clock size={12} />
                  )}
                </div>
                <div className="ml-8 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#2c283a] flex items-center justify-center">
                    {activity.type === "trip" ? (
                      <Car size={14} className="text-secondary" />
                    ) : (
                      <Clock size={14} className="text-secondary" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {activity.title}{" "}
                      <span className="text-secondary font-normal ml-1">
                        · {activity.time}
                      </span>
                    </p>
                    <p className="text-xs text-secondary mt-0.5">
                      {activity.description}
                    </p>
                  </div>
                  <ChevronRight
                    size={16}
                    className="text-secondary ml-auto mt-1"
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Bottom Banners */}
      <div className="col-span-1 lg:col-span-3 mt-2">
        <Link
          to="/map"
          className="card flex items-center justify-between hover:bg-surface-hover transition cursor-pointer w-full"
        >
          <div className="flex items-center gap-4">
            <div className="text-purple">
              <MapIcon size={32} />
            </div>
            <div>
              <h3 className="font-bold text-white">Explore the Safety Map</h3>
              <p className="text-xs text-secondary">
                See community reports and safer places near you.
              </p>
            </div>
          </div>
          <ChevronRight size={20} className="text-secondary" />
        </Link>
      </div>
    </div>
  );
}
