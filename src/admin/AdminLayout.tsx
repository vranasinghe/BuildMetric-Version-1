import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useContent } from "./ContentContext";
import AdminDashboard from "./pages/AdminDashboard";
import AdminHeader from "./pages/AdminHeader";
import AdminHome from "./pages/AdminHome";
import AdminAbout from "./pages/AdminAbout";
import AdminServices from "./pages/AdminServices";
import AdminProjects from "./pages/AdminProjects";
import AdminContact from "./pages/AdminContact";
import AdminFooter from "./pages/AdminFooter";
import AdminBackup from "./pages/AdminBackup";
import AdminInquiries from "./pages/AdminInquiries";
import AdminClients from "./pages/AdminClients";
import AdminLogin from "./AdminLogin";
import { useAuth } from "../auth/AuthContext";

interface NavItem {
  id: string;
  label: string;
  headerTag: string;
  icon: string;
  previewUrl: string;
}

// Only main topics of each header section!
const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", headerTag: "System", icon: "ri-dashboard-3-line", previewUrl: "/" },
  { id: "inquiries", label: "Inquiries", headerTag: "Clients", icon: "ri-mail-open-line", previewUrl: "/contact" },
  { id: "clients", label: "Clients", headerTag: "Clients", icon: "ri-group-line", previewUrl: "" },
  { id: "header", label: "Global Header", headerTag: "Header", icon: "ri-layout-top-line", previewUrl: "/" },
  { id: "home", label: "Home", headerTag: "Home", icon: "ri-home-4-line", previewUrl: "/" },
  { id: "about", label: "About", headerTag: "About", icon: "ri-information-line", previewUrl: "/about" },
  { id: "services", label: "Services", headerTag: "Services", icon: "ri-tools-line", previewUrl: "/service" },
  { id: "projects", label: "Projects", headerTag: "Projects", icon: "ri-building-line", previewUrl: "/project" },
  { id: "contact", label: "Contact", headerTag: "Contact", icon: "ri-contacts-book-2-line", previewUrl: "/contact" },
  { id: "footer", label: "Global Footer", headerTag: "Footer", icon: "ri-layout-bottom-line", previewUrl: "/" },
  { id: "backup", label: "Backup & Sync", headerTag: "Data Sync", icon: "ri-database-2-line", previewUrl: "/admin?tab=backup" },
];

const AdminLayout: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get("tab") || "dashboard";
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { lastSaved, exportJSON } = useContent();
  const { user, loading, logout } = useAuth();

  const activeNavItem = navItems.find((item) => item.id === currentTab) || 
    (currentTab === "service-details" ? navItems.find(n => n.id === "services") : null) ||
    (currentTab === "project-details" ? navItems.find(n => n.id === "projects") : null) ||
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
      case "header":
        return <AdminHeader />;
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
      case "footer":
        return <AdminFooter />;
      case "backup":
        return <AdminBackup />;
      case "inquiries":
        return <AdminInquiries />;
      case "clients":
        return <AdminClients />;
      default:
        return <AdminDashboard />;
    }
  };

  if (loading) {
    return <div style={{ padding: "40px", textAlign: "center", fontFamily: "'Titillium Web', sans-serif" }}>Loading...</div>;
  }
  if (!user || user.role !== "admin") {
    return <AdminLogin />;
  }

  return (
    <div
      style={{
        fontFamily: "'Titillium Web', sans-serif",
        backgroundColor: "#f4f5f7",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <style>{`
        .admin-sidebar-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 18px;
          color: rgba(255, 255, 255, 0.75);
          text-decoration: none;
          font-weight: 600;
          font-size: 13.5px;
          border-left: 3px solid transparent;
          transition: all 0.2s ease;
          cursor: pointer;
          border-radius: 0;
          background: transparent;
          width: 100%;
          text-align: left;
          border-top: none;
          border-right: none;
          border-bottom: none;
        }
        .admin-sidebar-item:hover {
          color: #ffffff;
          background-color: rgba(255, 255, 255, 0.06);
          border-left-color: #f15a24;
        }
        .admin-sidebar-item.active {
          color: #ffffff;
          background-color: #001F5B;
          border-left-color: #f15a24;
          font-weight: 700;
        }
        .admin-nav-badge {
          font-size: 10px;
          padding: 2px 7px;
          background: rgba(255, 255, 255, 0.12);
          border-radius: 2px;
          margin-left: auto;
          color: rgba(255, 255, 255, 0.85);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .admin-sidebar-item.active .admin-nav-badge {
          background: #f15a24;
          color: #ffffff;
        }
        input:focus, textarea:focus, select:focus {
          border-color: #001F5B !important;
          outline: 2px solid rgba(0, 31, 91, 0.2) !important;
        }
        @media (max-width: 991px) {
          .admin-sidebar {
            position: fixed !important;
            top: 0;
            bottom: 0;
            left: 0;
            z-index: 1050;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
          }
          .admin-sidebar.open {
            transform: translateX(0);
          }
        }
      `}</style>

      {/* Top Bar for Admin */}
      <header
        style={{
          backgroundColor: "#141d30",
          color: "#ffffff",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          borderBottom: "2px solid #001F5B",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="d-lg-none"
            style={{
              background: "none",
              border: "none",
              color: "#ffffff",
              fontSize: "22px",
              cursor: "pointer",
            }}
          >
            <i className="ri-menu-line" />
          </button>
          <Link
            to="/admin"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
              color: "#ffffff",
            }}
          >
            <span
              style={{
                fontFamily: "var(--title-font)",
                fontSize: "20px",
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "1px",
              }}
            >
              BUILD<span style={{ color: "#f15a24" }}>METRIC</span>
            </span>
            <span
              style={{
                fontSize: "10px",
                fontWeight: 700,
                background: "#f15a24",
                color: "#ffffff",
                padding: "2px 6px",
                borderRadius: "2px",
                letterSpacing: "0.5px",
              }}
            >
              ADMIN CMS
            </span>
          </Link>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {lastSaved && (
            <span
              style={{
                fontSize: "12px",
                color: "#9aa0ac",
                display: "none",
              }}
              className="d-md-inline"
            >
              Saved: {lastSaved.toLocaleTimeString()}
            </span>
          )}

          <button
            onClick={exportJSON}
            title="Download JSON Backup"
            style={{
              background: "#001F5B",
              color: "#ffffff",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              padding: "6px 12px",
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              borderRadius: "0",
            }}
          >
            <i className="ri-download-2-line" />
            <span className="d-none d-sm-inline">Export Backup</span>
          </button>

          <Link
            to="/"
            target="_blank"
            style={{
              background: "#f15a24",
              color: "#ffffff",
              border: "none",
              padding: "6px 14px",
              fontSize: "12px",
              fontWeight: 700,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              borderRadius: "0",
            }}
          >
            <i className="ri-external-link-line" />
            <span>Live Site</span>
          </Link>
        </div>
      </header>

      {/* Main Body */}
      <div style={{ display: "flex", flex: 1 }}>
        {/* Sidebar */}
        <aside
          className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}
          style={{
            width: "240px",
            backgroundColor: "#0d131f",
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            minHeight: "calc(100vh - 60px)",
            borderRight: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <div style={{ padding: "16px 18px 8px", borderBottom: "1px solid rgba(255, 255, 255, 0.06)" }}>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: "#686e7d",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Main Topics
            </span>
          </div>

          <nav style={{ padding: "8px 0", flex: 1 }}>
            {navItems.map((item) => {
              const isActive = currentTab === item.id || 
                (item.id === "services" && currentTab === "service-details") ||
                (item.id === "projects" && currentTab === "project-details");
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`admin-sidebar-item ${isActive ? "active" : ""}`}
                >
                  <i className={item.icon} style={{ fontSize: "16px", color: isActive ? "#f15a24" : "inherit" }} />
                  <span>{item.label}</span>
                  <span className="admin-nav-badge">{item.headerTag}</span>
                </button>
              );
            })}
          </nav>

          <div
            style={{
              padding: "16px 18px",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              background: "rgba(0, 0, 0, 0.2)",
            }}
          >
            <div style={{ fontSize: "11px", color: "#686e7d", marginBottom: "4px" }}>
              Logged in as
            </div>
            <div style={{ fontSize: "12px", color: "#ffffff", fontWeight: 700 }}>
              {user.name}
            </div>
            <div style={{ fontSize: "11px", color: "#9aa0ac", marginBottom: "10px", wordBreak: "break-all" }}>
              {user.email}
            </div>
            <button
              type="button"
              onClick={logout}
              style={{
                width: "100%",
                padding: "8px 0",
                background: "transparent",
                color: "#ffffff",
                border: "1px solid rgba(255, 255, 255, 0.25)",
                fontSize: "12px",
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <i className="ri-logout-box-r-line" /> Log out
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <main
          style={{
            flex: 1,
            padding: "25px 30px",
            maxWidth: "1400px",
            width: "100%",
          }}
        >
          {/* Top Breadcrumb Bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
              paddingBottom: "12px",
              borderBottom: "1px solid #e7e8ec",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#686e7d" }}>
              <Link to="/admin" style={{ color: "#001F5B", textDecoration: "none", fontWeight: 600 }}>
                Admin
              </Link>
              <span>/</span>
              <span style={{ fontWeight: 700, color: "#f15a24" }}>{activeNavItem?.label}</span>
            </div>

            {activeNavItem && activeNavItem.previewUrl && (
              <Link
                to={activeNavItem.previewUrl}
                target="_blank"
                style={{
                  fontSize: "12px",
                  color: "#001F5B",
                  textDecoration: "none",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <span>Preview Section On Site</span>
                <i className="ri-external-link-line" />
              </Link>
            )}
          </div>

          {/* Active Tab Component */}
          {renderActiveSection()}
        </main>
      </div>

      {/* Dim backdrop for mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            top: "60px",
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 1040,
          }}
        />
      )}
    </div>
  );
};

export default AdminLayout;
