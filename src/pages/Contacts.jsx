import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  MoreVertical,
  Users,
  ChevronRight,
  Check,
} from "lucide-react";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch from Firestore on mount
  useEffect(() => {
    const fetchContacts = async () => {
      const uid = auth.currentUser?.uid;
      if (!uid) {
        setIsLoaded(true);
        return;
      }
      try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().contacts) {
          setContacts(docSnap.data().contacts);
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
      } finally {
        setIsLoaded(true);
      }
    };
    fetchContacts();
  }, []);

  // Save to Firestore when contacts change
  useEffect(() => {
    if (isLoaded && auth.currentUser?.uid) {
      const uid = auth.currentUser.uid;
      setDoc(doc(db, "users", uid), { contacts }, { merge: true }).catch(
        (err) => console.error("Error saving contacts:", err),
      );
    }
  }, [contacts, isLoaded]);

  // Form State
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [notifySOS, setNotifySOS] = useState(true);
  const [notifyCheckIn, setNotifyCheckIn] = useState(true);
  const [notifyLive, setNotifyLive] = useState(true);

  const handleSaveContact = () => {
    if (!name.trim() || !relationship) {
      alert("Please enter a name and select a relationship.");
      return;
    }

    let prefs = [];
    if (notifySOS) prefs.push("SOS");
    if (notifyCheckIn) prefs.push("Check-ins");
    if (notifyLive) prefs.push("Trips");

    const newContact = {
      name: name.trim(),
      initials: name.trim().substring(0, 2).toUpperCase(),
      relationship:
        relationship.charAt(0).toUpperCase() + relationship.slice(1),
      preference: prefs.join(", ") || "None",
      status: "Active",
    };

    setContacts([...contacts, newContact]);

    // Reset form
    setName("");
    setRelationship("");
    setNotifySOS(true);
    setNotifyCheckIn(true);
    setNotifyLive(true);
  };

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  return (
    <div className="flex flex-col max-w-[1400px] mx-auto w-full gap-8">
      {/* Top Header Area */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <p className="text-xs text-[#94a3b8] font-bold tracking-widest uppercase mb-2">
            Trusted Contacts
          </p>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
            People who have{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff3366] to-[#ff5c85]">
              your back
            </span>
          </h1>
          <p className="text-[#94a3b8] text-base">
            They'll receive your SOS alerts and check-in notifications.
          </p>
        </div>
        <button className="bg-[#ff3366] hover:bg-[#ff5c85] text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 transition shadow-[0_4px_15px_rgba(255,51,102,0.3)]">
          <Plus size={18} /> Add Contact
        </button>
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Contacts List */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="card p-0 overflow-hidden border border-white/5 bg-[#1b1826]">
            {/* Table Header */}
            <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
              <h2 className="text-xl font-bold text-white w-full sm:w-auto text-left">
                Your contacts ({filteredContacts.length})
              </h2>

              <div className="flex items-center w-full sm:w-64 bg-[#12101a] border border-white/10 rounded-lg px-3 focus-within:border-[#8b5cf6]">
                <Search size={16} className="text-[#94a3b8] flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search contacts..."
                  className="w-full bg-transparent py-2 pl-2 text-sm text-white placeholder-[#94a3b8] focus:outline-none border-none outline-none ring-0"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto min-h-[200px]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-xs text-[#94a3b8] font-semibold uppercase tracking-wider">
                    <th className="py-4 px-6 font-semibold">Name</th>
                    <th className="py-4 px-6 font-semibold">Relationship</th>
                    <th className="py-4 px-6 font-semibold">
                      Notification Preference
                    </th>
                    <th className="py-4 px-6 font-semibold">Status</th>
                    <th className="py-4 px-6 font-semibold text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContacts.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="py-12">
                        <div className="flex flex-col items-center justify-center text-[#94a3b8] w-full text-center">
                          <Users size={40} className="mb-3 opacity-50" />
                          <p className="text-base font-medium text-white mb-1">
                            No contacts found
                          </p>
                          <p className="text-sm">
                            You haven't added any trusted contacts yet.
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredContacts.map((contact, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-white/5 hover:bg-white/[0.02] transition"
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-[#ff3366] flex items-center justify-center text-white font-bold">
                              {contact.initials}
                            </div>
                            <span className="font-bold text-white">
                              {contact.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-sm text-[#94a3b8]">
                          {contact.relationship}
                        </td>
                        <td className="py-4 px-6 text-sm text-[#94a3b8]">
                          {contact.preference}
                        </td>
                        <td className="py-4 px-6">
                          <div
                            className={`flex items-center gap-2 text-sm font-medium ${contact.status === "Active" ? "text-[#00e676]" : "text-[#94a3b8]"}`}
                          >
                            <div
                              className={`w-2 h-2 rounded-full ${contact.status === "Active" ? "bg-[#00e676]" : "bg-[#94a3b8]"}`}
                            ></div>{" "}
                            {contact.status}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button className="text-[#94a3b8] hover:text-white transition p-1">
                            <MoreVertical size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Promo Card */}
          <div className="card bg-gradient-to-r from-[#1b1826] to-[#12101a] border border-white/5 p-6 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="text-[#8b5cf6]">
                <Users size={36} />
              </div>
              <div>
                <h3 className="text-white font-bold text-base mb-1">
                  A safer journey together
                </h3>
                <p className="text-sm text-[#94a3b8]">
                  Add people you trust to stay connected and safer, wherever you
                  go.
                </p>
              </div>
            </div>
            <button className="text-[#8b5cf6] text-sm font-semibold flex items-center gap-1 hover:text-[#a78bfa] transition whitespace-nowrap">
              Learn more <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Right Column: Add Contact Form */}
        <div className="lg:col-span-1">
          <div className="card border border-white/5 bg-[#1b1826] p-6 flex flex-col h-full">
            <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
              Add a New Contact
            </h2>
            <p className="text-sm text-[#94a3b8] mb-8 leading-relaxed">
              They'll receive your SOS alerts and check-in notifications.
            </p>

            <div className="flex flex-col gap-6 flex-1">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-bold text-white mb-2">
                  Full name
                </label>
                <div className="w-full bg-[#12101a] border border-white/10 rounded-lg focus-within:border-[#8b5cf6] transition flex items-center">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter full name"
                    className="w-full bg-transparent px-4 py-3 text-sm text-white placeholder-[#94a3b8] focus:outline-none border-none outline-none ring-0"
                  />
                </div>
              </div>

              {/* Relationship */}
              <div>
                <label className="block text-sm font-bold text-white mb-2">
                  Relationship
                </label>
                <div className="relative w-full bg-[#12101a] border border-white/10 rounded-lg focus-within:border-[#8b5cf6] transition">
                  <select
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value)}
                    className="w-full bg-transparent px-4 py-3 text-sm text-white appearance-none focus:outline-none border-none outline-none ring-0 cursor-pointer"
                  >
                    <option value="" disabled>
                      Select relationship
                    </option>
                    <option value="family">Family</option>
                    <option value="friend">Friend</option>
                    <option value="partner">Partner</option>
                    <option value="colleague">Colleague</option>
                  </select>
                  <ChevronDown
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#94a3b8] pointer-events-none"
                    size={16}
                  />
                </div>
              </div>

              {/* Notify For Checkboxes */}
              <div>
                <label className="block text-sm font-bold text-white mb-4 mt-2">
                  Notify for:
                </label>

                <div className="flex flex-col gap-4">
                  {/* SOS Checkbox */}
                  <label className="flex items-start gap-4 cursor-pointer group">
                    <div className="relative flex items-center justify-center mt-0.5">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={notifySOS}
                        onChange={(e) => setNotifySOS(e.target.checked)}
                      />
                      <div className="w-6 h-6 rounded bg-[#12101a] border border-white/20 peer-checked:bg-[#ff3366] peer-checked:border-[#ff3366] transition"></div>
                      <Check
                        size={16}
                        className="absolute text-white opacity-0 peer-checked:opacity-100 transition pointer-events-none"
                        strokeWidth={3}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white mb-0.5">SOS</p>
                      <p className="text-xs text-[#94a3b8]">
                        Get notified when you send an SOS alert
                      </p>
                    </div>
                  </label>

                  {/* Check-ins Checkbox */}
                  <label className="flex items-start gap-4 cursor-pointer group">
                    <div className="relative flex items-center justify-center mt-0.5">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={notifyCheckIn}
                        onChange={(e) => setNotifyCheckIn(e.target.checked)}
                      />
                      <div className="w-6 h-6 rounded bg-[#12101a] border border-white/20 peer-checked:bg-[#ff3366] peer-checked:border-[#ff3366] transition"></div>
                      <Check
                        size={16}
                        className="absolute text-white opacity-0 peer-checked:opacity-100 transition pointer-events-none"
                        strokeWidth={3}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white mb-0.5">
                        Check-ins
                      </p>
                      <p className="text-xs text-[#94a3b8]">
                        Get notified when you miss or complete a check-in
                      </p>
                    </div>
                  </label>

                  {/* Live Trips Checkbox */}
                  <label className="flex items-start gap-4 cursor-pointer group">
                    <div className="relative flex items-center justify-center mt-0.5">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={notifyLive}
                        onChange={(e) => setNotifyLive(e.target.checked)}
                      />
                      <div className="w-6 h-6 rounded bg-[#12101a] border border-white/20 peer-checked:bg-[#ff3366] peer-checked:border-[#ff3366] transition"></div>
                      <Check
                        size={16}
                        className="absolute text-white opacity-0 peer-checked:opacity-100 transition pointer-events-none"
                        strokeWidth={3}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white mb-0.5">
                        Live Trips
                      </p>
                      <p className="text-xs text-[#94a3b8]">
                        Get notified when you start or end a live trip
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <button
              onClick={handleSaveContact}
              className="w-full bg-[#ff3366] hover:bg-[#ff5c85] text-white font-bold py-3.5 rounded-xl transition mt-8 shadow-[0_4px_15px_rgba(255,51,102,0.3)]"
            >
              Save Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Quick component for ChevronDown since it's not imported at the top to save space
function ChevronDown(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
