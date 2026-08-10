import { useState, useEffect } from "react";
import "./Login.css";
import logo from "../assets/mycloudlogo.png";

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M3.5 6.5 12 13l8.5-6.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="4.5" y="10.5" width="15" height="9.5" rx="2" />
      <path d="M7.5 10.5V7a4.5 4.5 0 0 1 9 0v3.5" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 12.5l2.3 2.3L15.5 9.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Toast({ message, detail, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast" role="status">
      <MailIcon />
      <span className="toast-text">
        <strong>{message}</strong>
        {detail}
      </span>
      <button className="toast-close" onClick={onClose} aria-label="Dismiss">
        ×
      </button>
    </div>
  );
}

/**
 * Login
 * Email + password only. On submit, shows a "check your email" toast.
 *
 * Wire up `onLogin` to your real auth call.
 */
export default function Login({ onLogin }) {
  const [step, setStep] = useState("credentials"); // "credentials" | "done"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleCredentialsSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Enter your email and password to continue.");
      return;
    }

    setLoading(true);
    try {
      if (onLogin) {
        await onLogin({ email, password });
      }
      setShowToast(true);
      setStep("done");
    } catch (err) {
      setError(err?.message || "Couldn't sign you in. Check your details and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {showToast && (
        <Toast
          message="Check your inbox"
          detail="We've sent a confirmation to your email — check your spam folder too if it doesn't show up."
          onClose={() => setShowToast(false)}
        />
      )}

      <div className="login-header">
        <img
          src={logo}
          alt="My Cloud logo"
          className="login-logo"
        />
        <h1 className="login-sitename">My Cloud</h1>
      </div>

      <div className="login-card">
        {step === "credentials" && (
          <>
            <h2 className="login-title">Log in</h2>
            <form className="login-form" onSubmit={handleCredentialsSubmit} noValidate>
              <div className="login-field">
                <label htmlFor="email">Email</label>
                <div className="login-input-wrap">
                  <MailIcon />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="login-field">
                <label htmlFor="password">Password</label>
                <div className="login-input-wrap">
                  <LockIcon />
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {error && <p className="login-error">{error}</p>}

              <button type="submit" className="login-button" disabled={loading}>
                {loading ? "Logging in…" : "Log in"}
              </button>
            </form>
          </>
        )}

        {step === "done" && (
          <>
            <CheckIcon />
            <p className="login-subtext login-welcome" style={{ marginTop: 12 }}>
              Welcome back — you're logged in.
            </p>
          </>
        )}
      </div>
    </div>
  );
}