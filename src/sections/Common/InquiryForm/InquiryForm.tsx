import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../auth/AuthContext";
import { loginHref } from "../../../auth/redirect";
import { api } from "../../../lib/api";
import ContactDropdown from "../ContactDropdown/ContactDropdown";
import "../../../styles/account.css";

// "Have a project in mind?" form used on the Contact, Services and Project
// Details pages. Visitors must be logged in; submissions are saved to the
// database and appear in the admin panel under Inquiries.
const InquiryForm = () => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const returnTo = location.pathname + "#inquiry";

  const [form, setForm] = useState({ name: "", phone: "", service: "", message: "" });
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Prefill from the account once it has loaded.
  useEffect(() => {
    if (user) setForm((f) => ({ ...f, name: f.name || user.name, phone: f.phone || user.phone || "" }));
  }, [user]);

  if (loading) return <p className="bm-signed-in-as">Loading...</p>;

  if (!user) {
    return (
      <div className="bm-login-prompt" id="inquiry">
        <div className="icon"><i className="ri-lock-2-line"></i></div>
        <h4>Log in to send an inquiry</h4>
        <p>Create a free account or log in so our team can reply to you and you can track your request.</p>
        <div className="bm-btn-row">
          <Link to={loginHref("login", returnTo)} className="btn">
            Log In <i className="ri-arrow-right-up-line"></i>
          </Link>
          <Link to={loginHref("register", returnTo)} className="btn bm-btn-outline">
            Create Account
          </Link>
        </div>
      </div>
    );
  }

  const update = (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await api("/inquiries", { method: "POST", body: { ...form, sourcePage: location.pathname } });
      setSent(true);
      setForm({ name: form.name, phone: form.phone, service: "", message: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form" id="inquiry">
      <p className="bm-signed-in-as">
        Signed in as <strong>{user.email}</strong>. We will reply to this email.
      </p>
      {sent && (
        <div className="bm-alert success" role="status">
          Thank you! Your inquiry has been sent. You can follow its status in{" "}
          <Link className="bm-muted-link" to="/account">My Account</Link>.
        </div>
      )}
      {error && <div className="bm-alert error" role="alert">{error}</div>}
      <div className="row gy-4">
        <div className="col-md-6">
          <div className="form-group">
            <input type="text" className="form-control" name="name" placeholder="Your Name" aria-label="Your name"
              value={form.name} onChange={update("name")} required maxLength={120} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <input type="email" className="form-control" name="email" aria-label="Email address"
              value={user.email} readOnly title="Inquiries are sent from your account email" />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <input type="tel" className="form-control" name="phone" placeholder="Phone Number" aria-label="Phone number"
              value={form.phone} onChange={update("phone")} maxLength={40} />
          </div>
        </div>
        <ContactDropdown value={form.service} onChange={(service) => setForm({ ...form, service })} />
        <div className="col-12">
          <div className="form-group">
            <textarea name="message" rows={3} className="form-control" placeholder="Message..." aria-label="Message"
              value={form.message} onChange={update("message")} required maxLength={5000}></textarea>
          </div>
        </div>
        <div className="form-btn col-12">
          <button type="submit" className="btn w-100" disabled={submitting}>
            {submitting ? "Sending..." : "Submit Now"} {!submitting && <i className="ri-arrow-right-up-line"></i>}
          </button>
        </div>
      </div>
    </form>
  );
};

export default InquiryForm;
