import React, { useEffect, useState } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { useContent } from "./ContentContext";
import AdminDashboard from "./pages/AdminDashboard";
import AdminHome from "./pages/AdminHome";
import AdminAbout from "./pages/AdminAbout";
import AdminServices from "./pages/AdminServices";
import AdminProjects from "./pages/AdminProjects";
import AdminContact from "./pages/AdminContact";
import AdminInquiries from "./pages/AdminInquiries";
import AdminClients from "./pages/AdminClients";
import { useAuth } from "../auth/AuthContext";
import { api } from "../lib/api";
import "./admin.css";

interface NavItem {
  id: string;
  label: string;
  icon: string;
  previewUrl: string;
}

const navGroups: { label: string; items: NavItem[] }[] = [
  {
    label: "Overview",
    items: [{ id: "dashboard", label: "Dashboard", icon: "ri-dashboard-3-line", previewUrl: "/" }],
  },
  {
    label: "Clients",
    items: [
      { id: "inquiries", label: "Inquiries", icon: "ri-mail-open-line", previewUrl: "/contact" },
      { id: "clients", label: "Clients", icon: "ri-group-line", previewUrl: "" },
    ],
  },
  {
    label: "Website Content",
    items: [
      { id: "home", label: "Home", icon: "ri-home-4-line", previewUrl: "/" },
      { id: "about", label: "About", icon: "ri-information-line", previewUrl: "/about" },
      { id: "services", label: "Services", icon: "ri-tools-line", previewUrl: "/service" },
      { id: "projects", label: "Projects", icon: "ri-building-line", previewUrl: "/project" },
      { id: "contact", label: "Contact", icon: "ri-contacts-book-2-line", previewUrl: "/contact" },
    ],
  },
];

const navItems = navGroups.flatMap((g) => g.items);

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "A";

const AdminLayout: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get("tab") || "dashboard";
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newInquiries, setNewInquiries] = useState(0);
  const { content, saveState, saveError, lastSaved } = useContent();
  const { user, loading, logout } = useAuth();
  const isAdmin = user?.role === "admin";

  // Keep the "new inquiries" count in the sidebar fresh as the admin moves around.
  useEffect(() => {
    if (!isAdmin) return;
    api<{ stats: { new: number } }>("/admin/stats")
      .then((d) => setNewInquiries(d.stats.new))
      .catch(() => undefined);
  }, [isAdmin, currentTab]);

  const activeNavItem =
    navItems.find((item) => item.id === currentTab) ||
    (currentTab === "service-details" ? navItems.find((n) => n.id === "services") : undefined) ||
    (currentTab === "project-details" ? navItems.find((n) => n.id === "projects") : undefined) ||
    navItems[0];

  const handleTabChange = (tabId: string) => {
    setSearchParams({ tab: tabId });
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderActiveSection = () => {
    switch (currentTab) {
      case "dashboard":
        return <AdminDashboard />;
      case "home":
        return <AdminHome />;
      case "about":
        return <AdminAbout />;
      case "services":
      case "service-details":
        return <AdminServices />;
      case "projects":
      case "project-details":
        return <AdminProjects />;
      case "contact":
        return <AdminContact />;
      case "inquiries":
        return <AdminInquiries />;
      case "clients":
        return <AdminClients />;
      default:
        return <AdminDashboard />;
    }
  };

  if (loading) {
    return (
      <div className="bm-admin" dir="ltr" lang="en" style={{ alignItems: "center", justifyContent: "center" }}>
        Loading...
      </div>
    );
  }
  if (!user || !isAdmin) {
    // The admin area has no login page of its own and isn't advertised anywhere:
    // guests are sent to the normal login (an admin is brought back here after
    // logging in), and signed-in clients are sent to the home page.
    return user ? <Navigate to="/" replace /> : <Navigate to="/login?redirect=%2Fadmin" replace />;
  }

  return (
    <div className="bm-admin" dir="ltr" lang="en">
      <header className="adm-topbar">
        <Link to="/admin" className="adm-brand" onClick={() => handleTabChange("dashboard")}>
          <img src={content.header.logoUrl || "/assets/img/buildmetric-logo.png"} alt="BuildMetric Consultancy" />
          <span className="adm-brand-tag">Admin</span>
        </Link>

        <div className="adm-topbar-main">
          <nav className="adm-crumbs" aria-label="Breadcrumb">
            <Link to="/admin">Admin</Link>
            <i className="ri-arrow-right-s-line" />
            <strong>{activeNavItem.label}</strong>
          </nav>

          <div className="adm-topbar-actions">
            {saveState === "saving" && (
              <span className="adm-saved">
                <i className="ri-loader-4-line" /> Saving...
              </span>
            )}
            {saveState === "saved" && lastSaved && (
              <span className="adm-saved">
                <i className="ri-checkbox-circle-fill" /> Saved {lastSaved.toLocaleTimeString()}
              </span>
            )}
            {saveState === "error" && (
              <span className="adm-saved adm-saved-error">
                <i className="ri-error-warning-fill" /> Not saved
              </span>
            )}
            {activeNavItem.previewUrl && (
              <Link to={activeNavItem.previewUrl} target="_blank" rel="noopener noreferrer" className="adm-btn adm-btn-sm">
                <i className="ri-external-link-line" />
                <span>View Page</span>
              </Link>
            )}
            <button
              type="button"
              className="adm-menu-toggle"
              aria-label={sidebarOpen ? "Close menu" : "Open menu"}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <i className={sidebarOpen ? "ri-close-line" : "ri-menu-line"} />
            </button>
          </div>
        </div>
      </header>

      <div className="adm-body">
        <aside className={`adm-sidebar ${sidebarOpen ? "open" : ""}`}>
          <nav className="adm-nav">
            {navGroups.map((group) => (
              <div className="adm-nav-group" key={group.label}>
                <span className="adm-nav-label">{group.label}</span>
                {group.items.map((item) => {
                  const isActive = activeNavItem.id === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleTabChange(item.id)}
                      className={`adm-nav-item ${isActive ? "active" : ""}`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <i className={item.icon} />
                      <span>{item.label}</span>
                      {item.id === "inquiries" && newInquiries > 0 && (
                        <span className="adm-nav-count" title={`${newInquiries} new`}>{newInquiries}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>

          <div className="adm-user">
            <div className="adm-user-row">
              <div className="adm-avatar">{initials(user.name)}</div>
              <div style={{ minWidth: 0 }}>
                <div className="adm-user-name">{user.name}</div>
                <div className="adm-user-email">{user.email}</div>
              </div>
            </div>
            <button type="button" onClick={logout} className="adm-btn adm-btn-sm adm-btn-ghost" style={{ width: "100%" }}>
              <i className="ri-logout-box-r-line" /> Log out
            </button>
          </div>
        </aside>

        {sidebarOpen && <div className="adm-backdrop" onClick={() => setSidebarOpen(false)} />}

        <main className="adm-main">
          <div className="adm-main-inner">
            {saveState === "error" && (
              <div className="adm-notice adm-notice-error" role="alert">
                <i className="ri-error-warning-line" />
                Your last change was not saved: {saveError} Please try saving again.
              </div>
            )}
            {renderActiveSection()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
