import { Info, Code, Shield, Bot, Layout } from "lucide-react";

export default function About() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Info size={24} className="text-primary" /> About Project
        </h1>
        <p className="text-sm text-secondary mt-1">College Project Overview</p>
      </div>

      <div className="card mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Shield size={20} className="text-danger" />
          <h2 className="font-bold">The Problem</h2>
        </div>
        <p className="text-sm text-secondary leading-relaxed">
          Women may face unsafe situations while traveling, commuting, or being
          alone. Traditional safety apps often rely solely on panic buttons
          without providing guidance in uncertain, non-emergency situations.
        </p>
      </div>

      <div className="card mb-6 border-primary border-2">
        <div className="flex items-center gap-2 mb-2">
          <Layout size={20} className="text-primary" />
          <h2 className="font-bold text-primary">Our Solution: SafeHer</h2>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed mb-4">
          SafeHer combines conventional, reliable web safety tools with
          carefully integrated AI-assisted guidance. We believe AI should add
          value to safety, not replace practical tools.
        </p>
      </div>

      <div className="grid-2 mb-6">
        <div className="card bg-purple-50 border-purple-100">
          <div className="flex items-center gap-2 mb-3 border-b border-purple-200 pb-2">
            <Bot size={18} className="text-primary" />
            <h3 className="font-bold text-sm text-primary">AI Components</h3>
          </div>
          <ul className="text-xs text-gray-700 space-y-2 list-disc pl-4">
            <li>AI Safety Assistant</li>
            <li>AI Incident Report Generator</li>
          </ul>
        </div>

        <div className="card bg-blue-50 border-blue-100">
          <div className="flex items-center gap-2 mb-3 border-b border-blue-200 pb-2">
            <Shield size={18} className="text-blue-600" />
            <h3 className="font-bold text-sm text-blue-600">Core Tools</h3>
          </div>
          <ul className="text-xs text-gray-700 space-y-2 list-disc pl-4">
            <li>Emergency SOS</li>
            <li>Safety Map</li>
            <li>Safe Journey Monitoring</li>
            <li>Check-In Timer</li>
            <li>Trusted Contacts</li>
          </ul>
        </div>
      </div>

      <div className="card mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Code size={20} className="text-secondary" />
          <h2 className="font-bold">Technologies Used</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold">
            React
          </span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold">
            Vite
          </span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold">
            CSS3
          </span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold">
            Leaflet
          </span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold">
            OpenStreetMap
          </span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold">
            Geolocation API
          </span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold">
            LocalStorage
          </span>
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
            Simulated AI
          </span>
        </div>
      </div>

      <div className="text-center pb-6">
        <span className="demo-badge text-[10px]">
          Created as a College Project Demonstration
        </span>
      </div>
    </div>
  );
}
