import { useState, useEffect } from "react";
import { ShieldCheck, FileText, Download, Trash2, Eye } from "lucide-react";

export default function IncidentHistory() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("safeher_incidents");
    if (saved) {
      setIncidents(JSON.parse(saved));
    } else {
      const demoIncidents = [
        {
          id: "001",
          date: "27 Sept 2026",
          time: "20:30",
          location: "Railway station",
          incidentDescription:
            "Someone followed me from the station for about 10 minutes.",
          status: "Draft",
        },
        {
          id: "002",
          date: "20 Sept 2026",
          time: "14:15",
          location: "College area",
          incidentDescription:
            "Harassment by a group of individuals near the college gate.",
          status: "Completed",
        },
      ];
      setIncidents(demoIncidents);
      localStorage.setItem("safeher_incidents", JSON.stringify(demoIncidents));
    }
  }, []);

  const handleDelete = (id) => {
    const updated = incidents.filter((inc) => inc.id !== id);
    setIncidents(updated);
    localStorage.setItem("safeher_incidents", JSON.stringify(updated));
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <ShieldCheck size={24} className="text-primary" /> Incident History
        </h1>
        <p className="text-sm text-secondary mt-1">
          Manage and view your saved incident reports.
        </p>
      </div>

      <div className="bg-blue-50 p-3 rounded-md border border-blue-100 flex items-start gap-2 mb-6 text-sm text-blue-800">
        <ShieldCheck size={18} className="flex-shrink-0 mt-0.5" />
        <p>
          These reports are saved locally on your device. They are{" "}
          <strong>not</strong> automatically reported to the police.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {incidents.length === 0 ? (
          <div className="text-center py-8 text-secondary">
            <FileText size={48} className="mx-auto mb-4 opacity-50" />
            <p>No incident reports saved.</p>
          </div>
        ) : (
          incidents.map((incident) => (
            <div key={incident.id} className="card p-4">
              <div className="flex justify-between items-start mb-3 border-b pb-2">
                <div>
                  <h3 className="font-bold text-sm">Incident #{incident.id}</h3>
                  <p className="text-xs text-secondary">
                    {incident.date} • {incident.time}
                  </p>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${
                    incident.status === "Completed"
                      ? "bg-success text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {incident.status}
                </span>
              </div>

              <div className="mb-4">
                <p className="text-xs font-semibold text-secondary uppercase">
                  Location
                </p>
                <p className="text-sm truncate">
                  {incident.location || "Not specified"}
                </p>
                <p className="text-xs font-semibold text-secondary uppercase mt-2">
                  Description
                </p>
                <p className="text-sm line-clamp-2">
                  {incident.incidentDescription}
                </p>
              </div>

              <div className="flex gap-2">
                <button className="btn btn-outline py-1.5 px-3 text-xs flex-1 flex items-center justify-center gap-1">
                  <Eye size={14} /> View
                </button>
                <button className="btn btn-outline py-1.5 px-3 text-xs flex-1 flex items-center justify-center gap-1">
                  <Download size={14} /> Download
                </button>
                <button
                  onClick={() => handleDelete(incident.id)}
                  className="btn btn-outline py-1.5 px-3 text-xs flex-none text-danger border-danger-light hover:bg-red-50"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
