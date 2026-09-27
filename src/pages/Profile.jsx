import { useState } from "react";
import { User, Shield, MapPin, Bell, ChevronRight, Save } from "lucide-react";

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "College Student",
    locationEnabled: true,
    notificationsEnabled: true,
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, save to backend/localStorage
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <User size={24} className="text-primary" /> Safety Profile
        </h1>
        <p className="text-sm text-secondary mt-1">
          Manage your personal settings and preferences.
        </p>
      </div>

      <div className="card mb-6 p-6 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center text-3xl font-bold mb-4 shadow-md">
          {profile.name.charAt(0)}
        </div>

        {isEditing ? (
          <div className="w-full flex flex-col gap-2 max-w-xs mx-auto">
            <input
              type="text"
              className="input-field text-center"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
            <button
              onClick={handleSave}
              className="btn btn-primary text-sm py-2 flex justify-center gap-2"
            >
              <Save size={16} /> Save Name
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold">{profile.name}</h2>
            <button
              onClick={() => setIsEditing(true)}
              className="text-sm text-primary font-semibold mt-2"
            >
              Edit Name
            </button>
          </>
        )}
      </div>

      <h3 className="font-bold mb-3 text-sm text-secondary uppercase tracking-wider">
        Privacy & Permissions
      </h3>
      <div className="card mb-6 p-0 overflow-hidden flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="icon-blue p-2 rounded-md">
              <MapPin size={18} />
            </div>
            <div>
              <p className="font-semibold text-sm">Location Access</p>
              <p className="text-xs text-secondary">Required for SOS and Map</p>
            </div>
          </div>
          <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
            <input
              type="checkbox"
              name="toggle"
              id="location-toggle"
              className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-200 ease-in-out"
              checked={profile.locationEnabled}
              onChange={() =>
                setProfile({
                  ...profile,
                  locationEnabled: !profile.locationEnabled,
                })
              }
              style={{
                transform: profile.locationEnabled
                  ? "translateX(1.25rem)"
                  : "translateX(0)",
              }}
            />
            <label
              htmlFor="location-toggle"
              className={`toggle-label block overflow-hidden h-5 rounded-full cursor-pointer ${profile.locationEnabled ? "bg-primary" : "bg-gray-300"}`}
            ></label>
          </div>
        </div>

        <div className="p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="icon-purple p-2 rounded-md">
              <Bell size={18} />
            </div>
            <div>
              <p className="font-semibold text-sm">Notifications</p>
              <p className="text-xs text-secondary">
                Check-in alerts & reminders
              </p>
            </div>
          </div>
          <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
            <input
              type="checkbox"
              name="toggle"
              id="notif-toggle"
              className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-200 ease-in-out"
              checked={profile.notificationsEnabled}
              onChange={() =>
                setProfile({
                  ...profile,
                  notificationsEnabled: !profile.notificationsEnabled,
                })
              }
              style={{
                transform: profile.notificationsEnabled
                  ? "translateX(1.25rem)"
                  : "translateX(0)",
              }}
            />
            <label
              htmlFor="notif-toggle"
              className={`toggle-label block overflow-hidden h-5 rounded-full cursor-pointer ${profile.notificationsEnabled ? "bg-primary" : "bg-gray-300"}`}
            ></label>
          </div>
        </div>
      </div>

      <h3 className="font-bold mb-3 text-sm text-secondary uppercase tracking-wider">
        Account Data
      </h3>
      <div className="card p-0 overflow-hidden flex flex-col">
        <button className="p-4 border-b flex justify-between items-center hover:bg-gray-50 transition-colors text-left w-full">
          <div className="flex items-center gap-3">
            <div className="icon-red p-2 rounded-md">
              <ShieldAlert size={18} />
            </div>
            <p className="font-semibold text-sm text-danger">
              Clear Local Data
            </p>
          </div>
          <ChevronRight size={16} className="text-gray-400" />
        </button>
      </div>

      <div className="text-center mt-8 pb-4">
        <p className="text-xs text-secondary">SafeHer App v1.0.0 (Demo Mode)</p>
      </div>
    </div>
  );
}
