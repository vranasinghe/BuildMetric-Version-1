import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContent } from "../ContentContext";
import { useAuth } from "../../auth/AuthContext";
import { api } from "../../lib/api";

interface Stats {
  clients: number;
  inquiries: number;
  new: number;
  in_progress: number;
  resolved: number;
  closed: number;
}

interface SectionCard {
  title: string;
  headerTag: string;
  route: string;
  adminTab: string;
  icon: string;
  description: string;
  itemsCount: string;
}

const AdminDashboard: React.FC = () => {
  const { content, saveState, lastSaved } = useContent();
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    api<{ stats: Stats }>("/admin/stats")
      .then((d) => setStats(d.stats))
      .catch(() => setStats(null));
  }, []);

  const firstName = user?.name.split(" ")[0] || "Admin";

  const sections: SectionCard[] = [
    {
      title: "Home",
      headerTag: "Home",
      route: "/",
      adminTab: "home",
      icon: "ri-home-4-line",
      description: "Manage Hero Slider banner slides, Counter Statistics, About Teaser Highlights, and Renovation CTA banner.",
      itemsCount: `${content.homeHero.length} Slides, ${content.homeCounter.length} Stats, ${content.homeAbout.checklist.length} Highlights`,
    },
    {
      title: "About",
      headerTag: "About",
      route: "/about",
      adminTab: "about",
      icon: "ri-information-line",
      description: "Manage page banner, company story, 40+ years experience badge, mission & vision, Why Choose Us, and process steps.",
      itemsCount: `${content.aboutPage.whyChooseCards.length} Cards, ${content.aboutPage.processSteps.length} Steps`,
    },
    {
      title: "Services",
      headerTag: "Services",
      route: "/service",
      adminTab: "services",
      icon: "ri-tools-line",
      description: "Manage Main Service Cards, Deliverables, 4 Process Benefits (01-04), and In-Depth Service Detail Articles.",
      itemsCount: `${content.servicesPage.services.length} Cards, ${content.serviceDetailsList.length} Service Detail Articles`,
    },
    {
      title: "Projects",
      headerTag: "Projects",
      route: "/project",
      adminTab: "projects",
      icon: "ri-building-line",
      description: "Manage Showcase Portfolio Project Cards, Technical Specifications, and Detailed Case Study Features.",
      itemsCount: `${content.projectsPage.projects.length} Projects, ${content.projectDetails.specs.length} Specifications`,
    },
    {
      title: "Contact",
      headerTag: "Contact",
      route: "/contact",
      adminTab: "contact",
      icon: "ri-contacts-book-2-line",
      description: "Edit global office locations (Sri Lanka, UAE, London), inquiry form text, button text, and map embed.",
      itemsCount: `${content.contactPage.offices.length} Global Offices`,
    },
  ];

  return (
    <div>
      <div className="adm-welcome">
        <div>
          <span className="adm-eyebrow">Dashboard</span>
          <h1 className="adm-page-title">Welcome back, {firstName}</h1>
          <p className="adm-page-sub">
            Manage client inquiries and edit every section of the BuildMetric website. When you save a section it is
            stored in the database and every visitor sees the update.
          </p>
        </div>
        <div className="adm-actions">
          <Link to="/admin?tab=inquiries" className="adm-btn">
            <i className="ri-mail-open-line" /> View Inquiries
          </Link>
          <Link to="/" target="_blank" rel="noopener noreferrer" className="adm-btn adm-btn-outline">
            <i className="ri-external-link-line" /> View Website
          </Link>
        </div>
      </div>

      <div className="adm-stats">
        {[
          { label: "New inquiries", value: stats?.new, color: "#f15a24", tab: "inquiries" },
          { label: "In progress", value: stats?.in_progress, color: "#263b82", tab: "inquiries" },
          { label: "Total inquiries", value: stats?.inquiries, color: "#001f5b", tab: "inquiries" },
          { label: "Registered clients", value: stats?.clients, color: "#15161c", tab: "clients" },
        ].map((s) => (
          <Link
            key={s.label}
            to={`/admin?tab=${s.tab}`}
            className="adm-stat adm-stat-link"
            style={{ "--stat-color": s.color } as React.CSSProperties}
          >
            <div className="adm-stat-value">{s.value ?? "–"}</div>
            <div className="adm-stat-label">{s.label}</div>
          </Link>
        ))}
      </div>

      <div className="adm-page-head" style={{ marginBottom: 16 }}>
        <h2 className="adm-section-title" style={{ margin: 0 }}>Website content</h2>
        <div className="adm-actions">
          {saveState !== "error" && (
            <span className="adm-saved">
              <i className="ri-database-2-line" />
              {lastSaved ? `Last saved ${lastSaved.toLocaleTimeString()}` : "Saved in the database"}
            </span>
          )}
        </div>
      </div>

      <div className="adm-grid">
        {sections.map((sec) => (
          <div key={sec.adminTab} className="adm-module">
            <div className="adm-module-icon">
              <i className={sec.icon} />
            </div>
            <h3>{sec.title}</h3>
            <p>{sec.description}</p>
            <div className="adm-module-meta">{sec.itemsCount}</div>
            <div className="adm-module-actions">
              <Link to={`/admin?tab=${sec.adminTab}`} className="adm-btn adm-btn-sm">
                Edit Section
              </Link>
              <Link to={sec.route} target="_blank" rel="noopener noreferrer" title="View live page" className="adm-icon-btn">
                <i className="ri-external-link-line" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
