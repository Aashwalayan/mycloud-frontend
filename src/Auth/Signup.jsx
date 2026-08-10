import { useState, useEffect } from "react";
import "./Signup.css";

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

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c1.4-3.6 4.4-5.5 7.5-5.5s6.1 1.9 7.5 5.5" strokeLinecap="round" />
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
 * Signup
 * Step 1: email + password → shows a "check your email" toast
 * Step 2: ask for the user's name
 *
 * Wire up `onSignup` and `onNameSubmit` to your real API calls.
 */
export default function Signup({ onSignup, onNameSubmit }) {
  const [step, setStep] = useState("credentials"); // "credentials" | "name" | "done"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
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
      if (onSignup) {
        await onSignup({ email, password });
      }
      setShowToast(true);
      setStep("name");
    } catch (err) {
      setError(err?.message || "Couldn't create your account. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleNameSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Enter your name to continue.");
      return;
    }

    setLoading(true);
    try {
      if (onNameSubmit) {
        await onNameSubmit(name.trim());
      }
      setStep("done");
    } catch (err) {
      setError(err?.message || "Something went wrong saving your name.");
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
          src="../assets/mycloudlogo.png"
          alt="My Cloud logo"
          className="login-logo"
        />
        <h1 className="login-sitename">My Cloud</h1>
      </div>

      <div className="login-card">
        {step === "credentials" && (
          <>
            <h2 className="login-title">Sign up</h2>
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
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {error && <p className="login-error">{error}</p>}

              <button type="submit" className="login-button" disabled={loading}>
                {loading ? "Creating account…" : "Sign up"}
              </button>
            </form>
          </>
        )}

        {step === "name" && (
          <>
            <h2 className="login-title">One more thing</h2>
            <form className="login-form" onSubmit={handleNameSubmit} noValidate>
              <p className="login-subtext">Your account's created. What should we call you?</p>

              <div className="login-field">
                <label htmlFor="name">Your name</label>
                <div className="login-input-wrap">
                  <UserIcon />
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                  />
                </div>
              </div>

              {error && <p className="login-error">{error}</p>}

              <button type="submit" className="login-button" disabled={loading}>
                {loading ? "Saving…" : "Continue"}
              </button>
            </form>
          </>
        )}

        {step === "done" && (
          <>
            <CheckIcon />
            <p className="login-subtext login-welcome" style={{ marginTop: 12 }}>
              Welcome, {name}. You're all set.
            </p>
          </>
        )}
      </div>
    </div>
  );
}