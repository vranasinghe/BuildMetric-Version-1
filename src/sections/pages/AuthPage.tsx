import React, { useState } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { loginHref, safeRedirect } from "../../auth/redirect";
import FooterBuildMetric from "../Common/Footer/FooterBuildMetric";
import HeaderOne from "../Common/Header/HeaderOne";
import PageBanner from "../Common/PageBanner/PageBanner";
import ScrollTopButton from "../Common/Scroll/Scroll";
import Wrapper from "../Common/Wrapper";
import "../../styles/account.css";

const AuthPage = ({ mode }: { mode: "login" | "register" }) => {
  const { user, loading, login, register } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const redirect = safeRedirect(params.get("redirect"));
  const isRegister = mode === "register";

  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!loading && user) {
    return <Navigate to={user.role === "admin" && redirect === "/account" ? "/admin" : redirect} replace />;
  }

  const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (isRegister && form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    setSubmitting(true);
    try {
      if (isRegister) {
        await register({ name: form.name, email: form.email, phone: form.phone, password: form.password });
      } else {
        await login(form.email, form.password);
      }
      navigate(redirect, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Wrapper>
      <div style={{ overflow: "hidden" }}>
        <HeaderOne />
        <PageBanner title={isRegister ? "Create Account" : "Client Login"} crumb={isRegister ? "REGISTER" : "LOGIN"} />
        <section className="bm-auth-section">
          <div className="container">
            <div className="bm-card bm-auth-card">
              <div className="bm-auth-tabs">
                <Link to={loginHref("login", redirect)} className={!isRegister ? "active" : ""}>Log In</Link>
                <Link to={loginHref("register", redirect)} className={isRegister ? "active" : ""}>Register</Link>
              </div>

              <p className="bm-signed-in-as">
                {isRegister
                  ? "Create a free account to send inquiries and follow their progress."
                  : "Log in to send inquiries and see the status of your requests."}
              </p>

              {error && <div className="bm-alert error" role="alert">{error}</div>}

              <form onSubmit={handleSubmit}>
                {isRegister && (
                  <div className="bm-field">
                    <label htmlFor="auth-name">Full name</label>
                    <input id="auth-name" className="form-control" value={form.name} onChange={update("name")}
                      required maxLength={120} autoComplete="name" />
                  </div>
                )}
                <div className="bm-field">
                  <label htmlFor="auth-email">Email address</label>
                  <input id="auth-email" type="email" className="form-control" value={form.email} onChange={update("email")}
                    required maxLength={255} autoComplete="email" />
                </div>
                {isRegister && (
                  <div className="bm-field">
                    <label htmlFor="auth-phone">Phone number <span style={{ fontWeight: 400, color: "#686e7d" }}>(optional)</span></label>
                    <input id="auth-phone" type="tel" className="form-control" value={form.phone} onChange={update("phone")}
                      maxLength={40} autoComplete="tel" />
                  </div>
                )}
                <div className="bm-field">
                  <label htmlFor="auth-password">Password</label>
                  <input id="auth-password" type="password" className="form-control" value={form.password} onChange={update("password")}
                    required minLength={isRegister ? 8 : undefined} maxLength={128}
                    autoComplete={isRegister ? "new-password" : "current-password"} />
                  {isRegister && <div className="bm-hint">At least 8 characters.</div>}
                </div>
                {isRegister && (
                  <div className="bm-field">
                    <label htmlFor="auth-confirm">Confirm password</label>
                    <input id="auth-confirm" type="password" className="form-control" value={form.confirm} onChange={update("confirm")}
                      required maxLength={128} autoComplete="new-password" />
                  </div>
                )}
                <button type="submit" className="btn w-100" disabled={submitting} style={{ marginTop: 8 }}>
                  {submitting ? "Please wait..." : isRegister ? "Create Account" : "Log In"}
                  {!submitting && <i className="ri-arrow-right-up-line"></i>}
                </button>
              </form>

              <p className="bm-hint" style={{ textAlign: "center", marginTop: 20 }}>
                {isRegister ? "Already have an account? " : "New to BuildMetric? "}
                <Link className="bm-muted-link" to={loginHref(isRegister ? "login" : "register", redirect)}>
                  {isRegister ? "Log in" : "Create an account"}
                </Link>
              </p>
            </div>
          </div>
        </section>
        <FooterBuildMetric />
        <ScrollTopButton />
      </div>
    </Wrapper>
  );
};

export default AuthPage;
