import React, { useState } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { loginHref, safeRedirect } from "../../auth/redirect";
import { useLanguage } from "../../i18n/LanguageContext";
import FooterBuildMetric from "../Common/Footer/FooterBuildMetric";
import HeaderOne from "../Common/Header/HeaderOne";
import PageBanner from "../Common/PageBanner/PageBanner";
import ScrollTopButton from "../Common/Scroll/Scroll";
import Wrapper from "../Common/Wrapper";
import "../../styles/account.css";

const AuthPage = ({ mode }: { mode: "login" | "register" }) => {
  const { user, loading, login, register } = useAuth();
  const { tr } = useLanguage();
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
      setError(tr("Passwords do not match."));
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
      setError(tr(err instanceof Error ? err.message : "Something went wrong."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Wrapper>
      <div style={{ overflow: "hidden" }}>
        <HeaderOne />
        <PageBanner title={isRegister ? tr("Create Account") : tr("Client Login")} crumb={isRegister ? tr("REGISTER") : tr("LOGIN")} />
        <section className="bm-auth-section">
          <div className="container">
            <div className="bm-card bm-auth-card">
              <div className="bm-auth-tabs">
                <Link to={loginHref("login", redirect)} className={!isRegister ? "active" : ""}>{tr("Log In")}</Link>
                <Link to={loginHref("register", redirect)} className={isRegister ? "active" : ""}>{tr("Register")}</Link>
              </div>

              <p className="bm-signed-in-as">
                {isRegister
                  ? tr("Create a free account to send inquiries and follow their progress.")
                  : tr("Log in to send inquiries and see the status of your requests.")}
              </p>

              {error && <div className="bm-alert error" role="alert">{error}</div>}

              <form onSubmit={handleSubmit}>
                {isRegister && (
                  <div className="bm-field">
                    <label htmlFor="auth-name">{tr("Full name")}</label>
                    <input id="auth-name" className="form-control" value={form.name} onChange={update("name")}
                      required maxLength={120} autoComplete="name" />
                  </div>
                )}
                <div className="bm-field">
                  <label htmlFor="auth-email">{tr("Email address")}</label>
                  <input id="auth-email" type="email" className="form-control" value={form.email} onChange={update("email")}
                    required maxLength={255} autoComplete="email" />
                </div>
                {isRegister && (
                  <div className="bm-field">
                    <label htmlFor="auth-phone">{tr("Phone number")} <span style={{ fontWeight: 400, color: "#686e7d" }}>({tr("optional")})</span></label>
                    <input id="auth-phone" type="tel" className="form-control" value={form.phone} onChange={update("phone")}
                      maxLength={40} autoComplete="tel" />
                  </div>
                )}
                <div className="bm-field">
                  <label htmlFor="auth-password">{tr("Password")}</label>
                  <input id="auth-password" type="password" className="form-control" value={form.password} onChange={update("password")}
                    required minLength={isRegister ? 8 : undefined} maxLength={128}
                    autoComplete={isRegister ? "new-password" : "current-password"} />
                  {isRegister && <div className="bm-hint">{tr("At least 8 characters.")}</div>}
                </div>
                {isRegister && (
                  <div className="bm-field">
                    <label htmlFor="auth-confirm">{tr("Confirm password")}</label>
                    <input id="auth-confirm" type="password" className="form-control" value={form.confirm} onChange={update("confirm")}
                      required maxLength={128} autoComplete="new-password" />
                  </div>
                )}
                <button type="submit" className="btn w-100" disabled={submitting} style={{ marginTop: 8 }}>
                  {submitting ? tr("Please wait...") : isRegister ? tr("Create Account") : tr("Log In")}
                  {!submitting && <i className="ri-arrow-right-up-line"></i>}
                </button>
              </form>

              <p className="bm-hint" style={{ textAlign: "center", marginTop: 20 }}>
                {isRegister ? tr("Already have an account?") : tr("New to BuildMetric?")}{" "}
                <Link className="bm-muted-link" to={loginHref(isRegister ? "login" : "register", redirect)}>
                  {isRegister ? tr("Log in") : tr("Create an account")}
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
