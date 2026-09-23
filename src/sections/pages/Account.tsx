import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { loginHref } from "../../auth/redirect";
import { useLanguage } from "../../i18n/LanguageContext";
import { api, formatDate, Inquiry, STATUS_COLORS, STATUS_LABELS } from "../../lib/api";
import FooterBuildMetric from "../Common/Footer/FooterBuildMetric";
import HeaderOne from "../Common/Header/HeaderOne";
import PageBanner from "../Common/PageBanner/PageBanner";
import ScrollTopButton from "../Common/Scroll/Scroll";
import Wrapper from "../Common/Wrapper";
import "../../styles/account.css";

const Account = () => {
  const { user, loading, logout } = useAuth();
  const { tr, lang } = useLanguage();
  const navigate = useNavigate();
  const [inquiries, setInquiries] = useState<Inquiry[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;
    api<{ inquiries: Inquiry[] }>("/inquiries/mine")
      .then((data) => setInquiries(data.inquiries))
      .catch((err) => setError(tr(err.message)));
  }, [user]);

  if (!loading && !user) return <Navigate to={loginHref("login", "/account")} replace />;

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <Wrapper>
      <div style={{ overflow: "hidden" }}>
        <HeaderOne />
        <PageBanner title={tr("My Account")} crumb={tr("MY ACCOUNT")} />
        <section className="bm-auth-section">
          <div className="container">
            <div className="bm-card">
              {user && (
                <div className="bm-account-head">
                  <div>
                    <h3>{tr("Welcome,")} {user.name}</h3>
                    <p className="bm-account-meta">
                      {user.email}
                      {user.phone ? ` · ${user.phone}` : ""}
                    </p>
                  </div>
                  <div className="bm-btn-row">
                    {user.role === "admin" && (
                      <Link to="/admin" className="btn">{tr("Admin Panel")}</Link>
                    )}
                    <Link to="/contact" className="btn">
                      {tr("New Inquiry")} <i className="ri-arrow-right-up-line"></i>
                    </Link>
                    <button type="button" className="btn bm-btn-outline" onClick={handleLogout}>
                      {tr("Log Out")}
                    </button>
                  </div>
                </div>
              )}

              <h4 style={{ marginBottom: 18 }}>{tr("My Inquiries")}</h4>
              {error && <div className="bm-alert error">{error}</div>}
              {!error && inquiries === null && <p className="bm-account-meta">{tr("Loading your inquiries...")}</p>}
              {inquiries && inquiries.length === 0 && (
                <div className="bm-empty">
                  {tr("You have not sent any inquiries yet.")}{" "}
                  <Link className="bm-muted-link" to="/contact">{tr("Send your first inquiry")}</Link>
                </div>
              )}
              {inquiries?.map((inq) => (
                <div className="bm-inquiry-item" key={inq.id}>
                  <div className="bm-inquiry-top">
                    <h5>{tr(inq.service || "General inquiry")}</h5>
                    <span
                      className="bm-status"
                      style={{ background: STATUS_COLORS[inq.status].bg, color: STATUS_COLORS[inq.status].fg }}
                    >
                      {tr(STATUS_LABELS[inq.status])}
                    </span>
                  </div>
                  <div className="bm-inquiry-date" style={{ marginBottom: 10 }}>
                    {tr("Sent")} {formatDate(inq.created_at, lang === "ar" ? "ar" : undefined)}
                  </div>
                  <p className="bm-inquiry-message">{inq.message}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <FooterBuildMetric />
        <ScrollTopButton />
      </div>
    </Wrapper>
  );
};

export default Account;
