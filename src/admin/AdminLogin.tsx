import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useContent } from "./ContentContext";
import "./admin.css";

// Shown at /admin until someone with the admin role logs in.
const AdminLogin: React.FC = () => {
  const { user, login, logout } = useAuth();
  const { content } = useContent();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const u = await login(email, password);
      if (u.role !== "admin") setError("This account does not have admin access.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bm-admin">
      <div className="adm-login">
        <div className="adm-login-card">
          <img src={content.header.logoUrl || "/assets/img/buildmetric-logo.png"} alt="BuildMetric Consultancy" />
          <span className="adm-eyebrow">Admin Panel</span>
          <h1>Sign in</h1>
          <p>Manage website content, client inquiries and registered clients.</p>

          {user && user.role !== "admin" ? (
            <>
              <div className="adm-notice adm-notice-error">
                You are logged in as {user.email}, which is a client account without admin access.
              </div>
              <button type="button" onClick={logout} className="adm-btn" style={{ width: "100%" }}>
                Log out and use an admin account
              </button>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="adm-notice adm-notice-error" role="alert">
                  <i className="ri-error-warning-line" /> {error}
                </div>
              )}
              <label htmlFor="admin-email" className="adm-label">Email address</label>
              <input
                id="admin-email"
                type="email"
                className="adm-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="username"
              />
              <label htmlFor="admin-password" className="adm-label">Password</label>
              <input
                id="admin-password"
                type="password"
                className="adm-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button type="submit" className="adm-btn" disabled={submitting} style={{ width: "100%", padding: "16px 22px" }}>
                {submitting ? "Signing in..." : "Sign in"}
                {!submitting && <i className="ri-arrow-right-up-line" />}
              </button>
            </form>
          )}

          <Link to="/" className="adm-login-back">
            <i className="ri-arrow-left-line" /> Back to website
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
