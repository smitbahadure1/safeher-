import { Link } from "react-router-dom";
import { ShieldAlert, MapPin, Navigation, MessageCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-brand mb-2 flex items-center justify-center gap-2">
          <img src="/vite.svg" alt="SafeHer Logo" className="w-8 h-8" /> SafeHer
        </h1>
        <h2 className="text-lg font-semibold text-primary mb-2">
          Technology that helps you stay connected and prepared.
        </h2>
        <p className="text-secondary text-sm px-4">
          Practical safety tools, emergency assistance, journey monitoring and
          AI-powered guidance in one place.
        </p>
      </div>

      <div className="flex flex-col gap-4 w-full mb-8">
        <Link to="/dashboard" className="btn btn-primary text-lg py-4">
          Open Safety Dashboard
        </Link>
        <Link to="/ai-assistant" className="btn btn-outline text-lg py-4">
          Try Safety Guide
        </Link>
      </div>

      <div className="grid-2 w-full mb-8">
        <div className="card feature-card">
          <div className="feature-icon icon-red mb-2">
            <ShieldAlert size={20} />
          </div>
          <h3 className="font-bold text-sm">Emergency SOS</h3>
          <p className="text-secondary text-xs">
            Quickly access emergency assistance and notify trusted contacts.
          </p>
        </div>

        <div className="card feature-card">
          <div className="feature-icon icon-blue mb-2">
            <MapPin size={20} />
          </div>
          <h3 className="font-bold text-sm">Safety Map</h3>
          <p className="text-secondary text-xs">
            Find nearby police stations, hospitals and public places.
          </p>
        </div>

        <div className="card feature-card">
          <div className="feature-icon icon-green mb-2">
            <Navigation size={20} />
          </div>
          <h3 className="font-bold text-sm">Safe Journey</h3>
          <p className="text-secondary text-xs">
            Share and monitor your journey with trusted contacts.
          </p>
        </div>

        <div className="card feature-card">
          <div className="feature-icon icon-purple mb-2">
            <MessageCircle size={20} />
          </div>
          <h3 className="font-bold text-sm">Safety Guide</h3>
          <p className="text-secondary text-xs">
            Get practical guidance when you're unsure what to do.
          </p>
        </div>
      </div>

      <div className="card w-full mb-6 text-left">
        <h3 className="font-bold mb-4 text-center">How it works</h3>
        <div className="flex flex-col gap-2 text-sm text-secondary">
          <p>
            <strong>1.</strong> Set up your trusted contacts
          </p>
          <p className="text-center">↓</p>
          <p>
            <strong>2.</strong> Start a journey or use a safety tool
          </p>
          <p className="text-center">↓</p>
          <p>
            <strong>3.</strong> Get help when you need it
          </p>
          <p className="text-center">↓</p>
          <p>
            <strong>4.</strong> Contact trusted people or emergency services
          </p>
        </div>
      </div>

      <div className="demo-badge mb-8">College Project / Demo Mode</div>
    </div>
  );
}
