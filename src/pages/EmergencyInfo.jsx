import { Phone, AlertCircle, ShieldAlert } from "lucide-react";

export default function EmergencyInfo() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Phone size={24} className="text-danger" /> Emergency Information
        </h1>
        <p className="text-sm text-secondary mt-1">
          Important emergency numbers and resources.
        </p>
      </div>

      <div className="card mb-6 border-danger border-2">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-danger text-white flex items-center justify-center mb-4">
            <ShieldAlert size={32} />
          </div>
          <h2 className="text-3xl font-bold text-danger mb-2">112</h2>
          <h3 className="font-bold mb-4">National Emergency Number (India)</h3>
          <p className="text-sm text-secondary mb-6">
            Single emergency helpline for Police, Fire, and Ambulance services.
          </p>
          <a href="tel:112" className="btn btn-danger w-full py-4 text-lg">
            Call 112 Now
          </a>
        </div>
      </div>

      <div className="grid-2 mb-6">
        <div className="card text-center p-4">
          <h3 className="font-bold text-xl text-primary mb-1">1091</h3>
          <p className="text-xs font-semibold text-secondary uppercase">
            Women Helpline
          </p>
        </div>
        <div className="card text-center p-4">
          <h3 className="font-bold text-xl text-primary mb-1">100</h3>
          <p className="text-xs font-semibold text-secondary uppercase">
            Police
          </p>
        </div>
        <div className="card text-center p-4">
          <h3 className="font-bold text-xl text-primary mb-1">108</h3>
          <p className="text-xs font-semibold text-secondary uppercase">
            Ambulance
          </p>
        </div>
        <div className="card text-center p-4">
          <h3 className="font-bold text-xl text-primary mb-1">181</h3>
          <p className="text-xs font-semibold text-secondary uppercase">
            Domestic Abuse
          </p>
        </div>
      </div>

      <div className="bg-orange-50 p-4 rounded-md border border-orange-200 flex items-start gap-3 text-sm text-orange-900 mt-8">
        <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
        <p>
          <strong>Disclaimer:</strong> Emergency numbers may vary by specific
          location and state. Always verify local emergency resources in your
          area. This app is for demonstration purposes.
        </p>
      </div>
    </div>
  );
}
