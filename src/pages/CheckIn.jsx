import { useState, useEffect } from "react";
import { Clock, AlertTriangle, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CheckIn() {
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [duration, setDuration] = useState("15");
  const [customMinutes, setCustomMinutes] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (isActive && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (isActive && timeLeft === 0) {
      setIsFinished(true);
      setIsActive(false);
    }
    return () => clearTimeout(timer);
  }, [isActive, timeLeft]);

  const startTimer = (e) => {
    e.preventDefault();
    let mins = parseInt(duration);
    if (duration === "custom") {
      mins = parseInt(customMinutes);
      if (!mins || mins <= 0) return;
    }

    // For demo purposes, we'll speed up the timer significantly if it's over 1 minute.
    // Actually, let's just use real seconds for demo, but maybe make a "Demo: 5 seconds" option.
    if (duration === "demo") {
      setTimeLeft(5);
    } else {
      setTimeLeft(mins * 60);
    }

    setIsActive(true);
    setIsFinished(false);
  };

  const stopTimer = () => {
    setIsActive(false);
    setTimeLeft(0);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center text-center h-full pt-12">
        <AlertTriangle size={64} className="text-warning mb-6 animate-pulse" />
        <h2 className="text-2xl font-bold mb-4">Check-in time reached.</h2>

        <p className="text-xl font-semibold mb-8">Are you safe?</p>

        <div className="flex flex-col gap-4 w-full">
          <button
            onClick={() => setIsFinished(false)}
            className="btn btn-primary text-lg py-4 flex items-center justify-center gap-2"
          >
            <CheckCircle size={20} /> I'm Safe
          </button>
          <button
            onClick={() => navigate("/sos")}
            className="btn btn-danger text-lg py-4"
          >
            I Need Help
          </button>
        </div>
      </div>
    );
  }

  if (isActive) {
    return (
      <div className="flex flex-col items-center justify-center text-center h-full pt-12">
        <div className="status-banner status-safe mb-8 w-full justify-center">
          <Clock size={20} />
          <span className="font-bold">Check-in active</span>
        </div>

        <div className="w-48 h-48 rounded-full border-8 border-primary flex items-center justify-center mb-8 shadow-lg">
          <span className="text-4xl font-bold font-mono">
            {formatTime(timeLeft)}
          </span>
        </div>

        <button onClick={stopTimer} className="btn btn-outline py-3 px-8 mt-4">
          Cancel Timer
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Clock size={24} className="text-primary" /> Safety Check-In
        </h1>
        <p className="text-sm text-secondary mt-1">
          Set a timer. We'll ask if you're safe when it finishes.
        </p>
      </div>

      <div className="card">
        <form onSubmit={startTimer}>
          <div className="form-group mb-6">
            <label className="label mb-3">Check in after</label>
            <div className="grid-2">
              <label
                className={`card p-3 text-center cursor-pointer ${duration === "15" ? "border-primary bg-purple-50" : ""}`}
              >
                <input
                  type="radio"
                  name="duration"
                  value="15"
                  checked={duration === "15"}
                  onChange={(e) => setDuration(e.target.value)}
                  className="hidden"
                />
                <span className="font-semibold">15 min</span>
              </label>
              <label
                className={`card p-3 text-center cursor-pointer ${duration === "30" ? "border-primary bg-purple-50" : ""}`}
              >
                <input
                  type="radio"
                  name="duration"
                  value="30"
                  checked={duration === "30"}
                  onChange={(e) => setDuration(e.target.value)}
                  className="hidden"
                />
                <span className="font-semibold">30 min</span>
              </label>
              <label
                className={`card p-3 text-center cursor-pointer ${duration === "60" ? "border-primary bg-purple-50" : ""}`}
              >
                <input
                  type="radio"
                  name="duration"
                  value="60"
                  checked={duration === "60"}
                  onChange={(e) => setDuration(e.target.value)}
                  className="hidden"
                />
                <span className="font-semibold">1 hour</span>
              </label>
              <label
                className={`card p-3 text-center cursor-pointer ${duration === "demo" ? "border-primary bg-purple-50" : ""}`}
              >
                <input
                  type="radio"
                  name="duration"
                  value="demo"
                  checked={duration === "demo"}
                  onChange={(e) => setDuration(e.target.value)}
                  className="hidden"
                />
                <span className="font-semibold">5 sec (Demo)</span>
              </label>
            </div>
          </div>

          <button type="submit" className="btn btn-primary mt-4 py-3">
            Start Timer
          </button>
        </form>
      </div>
    </div>
  );
}
