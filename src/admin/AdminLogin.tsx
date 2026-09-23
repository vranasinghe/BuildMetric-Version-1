import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

// Shown at /admin until someone with the admin role logs in.
const AdminLogin: React.FC = () => {
  const { user, login, logout } = useAuth();
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

  const inputStyle: React.CSSProperties = {
    width: "100%",
    height: "46px",
    padding: "0 14px",
    border: "1px solid #d6d9df",
    fontSize: "14px",
    marginBottom: "16px",
    fontFamily: "inherit",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0d131f", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", fontFamily: "'Titillium Web', sans-serif" }}>
      <div style={{ width: "100%", maxWidth: "400px", background: "#ffffff", padding: "36px 32px", borderTop: "4px solid #f15a24" }}>
        <div style={{ fontSize: "22px", fontWeight: 700, color: "#141d30", letterSpacing: "1px", marginBottom: "4px" }}>
          BUILD<span style={{ color: "#f15a24" }}>METRIC</span>
        </div>
        <div style={{ fontSize: "13px", color: "#686e7d", marginBottom: "24px" }}>Admin panel sign in</div>

        {user && user.role !== "admin" ? (
          <>
            <div style={{ background: "#fdecec", color: "#991b1b", padding: "12px 14px", fontSize: "14px", marginBottom: "16px" }}>
              You are logged in as <strong>{user.email}</strong>, which is a client account without admin access.
            </div>
            <button onClick={logout} style={{ width: "100%", height: "44px", background: "#001F5B", color: "#fff", border: "none", fontWeight: 700, cursor: "pointer" }}>
              Log out and use an admin account
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && (
              <div role="alert" style={{ background: "#fdecec", color: "#991b1b", padding: "10px 14px", fontSize: "14px", marginBottom: "16px" }}>
                {error}
              </div>
            )}
            <label htmlFor="admin-email" style={{ fontSize: "13px", fontWeight: 600, display: "block", marginBottom: "6px" }}>Email</label>
            <input id="admin-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="username" style={inputStyle} />
            <label htmlFor="admin-password" style={{ fontSize: "13px", fontWeight: 600, display: "block", marginBottom: "6px" }}>Password</label>
            <input id="admin-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" style={inputStyle} />
            <button type="submit" disabled={submitting} style={{ width: "100%", height: "46px", background: "#001F5B", color: "#fff", border: "none", fontWeight: 700, letterSpacing: "0.5px", cursor: "pointer", marginTop: "4px" }}>
              {submitting ? "Signing in..." : "SIGN IN"}
            </button>
          </form>
        )}

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Link to="/" style={{ fontSize: "13px", color: "#001F5B" }}>← Back to website</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
