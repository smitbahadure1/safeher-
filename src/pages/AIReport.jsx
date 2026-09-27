import { useState } from "react";
import { FileText, FilePlus, Download, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AIReport() {
  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [report, setReport] = useState(null);
  const navigate = useNavigate();

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!description.trim()) return;

    setIsGenerating(true);

    // Simulate AI processing
    setTimeout(() => {
      const now = new Date();
      setReport({
        id: Date.now(),
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        location: "Extracted from context (Demo)",
        incidentDescription:
          "The user reported being followed from the station for approximately 10 minutes at around 8:30 PM.",
        additionalDetails: [
          "Time of incident: Evening (approx 8:30 PM)",
          "Duration: 10 minutes",
          "Location: Near station",
        ],
        suggestedSteps: [
          "Review CCTV footage near the station if required.",
          "Inform local authorities or campus security.",
          "Avoid taking the exact same route if traveling alone at night.",
        ],
        status: "Draft",
      });
      setIsGenerating(false);
    }, 2000);
  };

  const handleSave = () => {
    if (!report) return;
    const existing = JSON.parse(
      localStorage.getItem("safeher_incidents") || "[]",
    );
    localStorage.setItem(
      "safeher_incidents",
      JSON.stringify([report, ...existing]),
    );
    navigate("/history");
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <FileText size={24} className="text-primary" /> Smart Incident Report
        </h1>
        <p className="text-sm text-secondary mt-1">
          Describe what happened in your own words. The system will structure it
          into a formal report.
        </p>
      </div>

      {!report && (
        <div className="card">
          <form onSubmit={handleGenerate}>
            <div className="form-group">
              <label className="label mb-2">Incident Description</label>
              <textarea
                className="input-field"
                rows="6"
                placeholder="E.g., I was returning home around 8:30 PM and someone followed me from the station for about 10 minutes..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-primary mt-4 py-3 flex items-center justify-center gap-2"
              disabled={isGenerating || !description.trim()}
            >
              {isGenerating ? (
                <>
                  <FilePlus size={20} className="animate-pulse" /> Generating...
                </>
              ) : (
                <>
                  <FilePlus size={20} /> Generate Report
                </>
              )}
            </button>
            <div className="mt-4 text-center">
              <span className="demo-badge bg-gray-500">Demo Mode</span>
            </div>
          </form>
        </div>
      )}

      {report && (
        <div className="flex flex-col gap-4">
          <div className="card border-primary relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-white text-[10px] px-2 py-1 font-bold tracking-wider rounded-bl-lg">
              AI-ASSISTED
            </div>

            <h2 className="font-bold text-lg mb-4 text-center border-b pb-2">
              Incident Report
            </h2>

            <div className="grid-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-secondary font-semibold uppercase">
                  Date
                </p>
                <p className="font-medium text-sm">{report.date}</p>
              </div>
              <div>
                <p className="text-xs text-secondary font-semibold uppercase">
                  Time
                </p>
                <p className="font-medium text-sm">{report.time}</p>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-secondary font-semibold uppercase">
                  Location
                </p>
                <p className="font-medium text-sm">{report.location}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-xs text-secondary font-semibold uppercase mb-1">
                Incident Description
              </p>
              <p className="text-sm bg-gray-50 p-3 rounded border">
                {report.incidentDescription}
              </p>
            </div>

            <div className="mb-4">
              <p className="text-xs text-secondary font-semibold uppercase mb-1">
                Additional Details
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {report.additionalDetails.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            </div>

            <div className="mb-2">
              <p className="text-xs text-secondary font-semibold uppercase mb-1">
                Suggested Next Steps
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {report.suggestedSteps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              className="btn btn-outline flex-1 py-3"
              onClick={() => alert("Report downloaded! (Demo)")}
            >
              <Download size={18} /> Download
            </button>
            <button
              onClick={handleSave}
              className="btn btn-primary flex-1 py-3"
            >
              <Save size={18} /> Save Report
            </button>
          </div>
          <button
            onClick={() => setReport(null)}
            className="btn btn-ghost py-2 text-sm"
          >
            Edit Description
          </button>
        </div>
      )}
    </div>
  );
}
