import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useContent } from "../ContentContext";
import { ProjectsPageContent, ProjectItem, ProjectDetailsContent } from "../types";

const AdminProjects: React.FC = () => {
  const { content, updateSection, resetSection } = useContent();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeSubTab = (searchParams.get("subtab") as "showcase" | "details") || "showcase";

  const setSubTab = (tab: "showcase" | "details") => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("subtab", tab);
      return next;
    });
  };

  // State for Projects Showcase Page
  const [projectsData, setProjectsData] = useState<ProjectsPageContent>({ ...content.projectsPage });

  // State for Project Details
  const [detailsData, setDetailsData] = useState<ProjectDetailsContent>({
    ...content.projectDetails,
    specs: content.projectDetails.specs || [
      { id: "spec-1", label: "Client", value: "Rebecca Tylor / Emaar Group" },
      { id: "spec-2", label: "Category", value: "Building & Commercial Infrastructure" },
      { id: "spec-3", label: "Location", value: "Abu Dhabi & Dubai, UAE" },
      { id: "spec-4", label: "Date", value: "12 January, 2024" },
      { id: "spec-5", label: "Status", value: "Completed & Handed Over" },
      { id: "spec-6", label: "Budget", value: "$200,560,000 USD" },
    ],
    featureHighlights: content.projectDetails.featureHighlights || [],
  });

  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  // --- Showcase Projects Handlers ---
  const handleBreadcrumbChange = (field: string, value: string) => {
    setProjectsData((prev) => ({
      ...prev,
      breadcrumb: {
        ...prev.breadcrumb,
        [field]: value,
      },
    }));
  };

  const handleProjectChange = (index: number, field: keyof ProjectItem, value: string) => {
    const updated = [...projectsData.projects];
    updated[index] = { ...updated[index], [field]: value };
    setProjectsData((prev) => ({ ...prev, projects: updated }));
  };

  const addProject = () => {
    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: "New Landmark Infrastructure / Building Project",
      location: "Abu Dhabi / Dubai, UAE",
      image: "/assets/img/project/project2_1.png",
    };
    setProjectsData((prev) => ({
      ...prev,
      projects: [...prev.projects, newProj],
    }));
  };

  const removeProject = (index: number) => {
    if (projectsData.projects.length <= 1) {
      alert("At least one project should remain.");
      return;
    }
    if (window.confirm(`Delete project "${projectsData.projects[index].title}"?`)) {
      setProjectsData((prev) => ({
        ...prev,
        projects: prev.projects.filter((_, i) => i !== index),
      }));
    }
  };

  // --- Project Details Handlers ---
  const addSpec = () => {
    const newSpec = {
      id: `spec-${Date.now()}`,
      label: "New Specification",
      value: "Specification details / parameters",
    };
    setDetailsData((prev) => ({
      ...prev,
      specs: [...prev.specs, newSpec],
    }));
  };

  const handleSpecChange = (index: number, field: "label" | "value", value: string) => {
    const updated = [...detailsData.specs];
    updated[index] = { ...updated[index], [field]: value };
    setDetailsData((prev) => ({ ...prev, specs: updated }));
  };

  const removeSpec = (index: number) => {
    if (detailsData.specs.length <= 1) {
      alert("At least one specification item must remain.");
      return;
    }
    setDetailsData((prev) => ({
      ...prev,
      specs: prev.specs.filter((_, i) => i !== index),
    }));
  };

  const addFeature = () => {
    const newFeature = {
      id: `feat-${Date.now()}`,
      title: "New Technical High-Performance Capability",
      desc: "Robust architectural governance, statutory assurance, and structural engineering integrity.",
      icon: "/assets/img/icon/service-icon1-1.png",
    };
    setDetailsData((prev) => ({
      ...prev,
      featureHighlights: [...prev.featureHighlights, newFeature],
    }));
  };

  const handleFeatureChange = (index: number, field: string, value: string) => {
    const updated = [...detailsData.featureHighlights];
    updated[index] = { ...updated[index], [field]: value };
    setDetailsData((prev) => ({ ...prev, featureHighlights: updated }));
  };

  const removeFeature = (index: number) => {
    if (detailsData.featureHighlights.length <= 1) {
      alert("At least one feature highlight must remain.");
      return;
    }
    setDetailsData((prev) => ({
      ...prev,
      featureHighlights: prev.featureHighlights.filter((_, i) => i !== index),
    }));
  };

  // --- Save & Reset ---
  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    updateSection("projectsPage", projectsData);
    updateSection("projectDetails", detailsData);
    setSavedNotice("✓ Projects showcase and details updated successfully! Changes are live on the website.");
    setTimeout(() => setSavedNotice(null), 3000);
  };

  const handleReset = () => {
    if (window.confirm("Reset all Projects components to defaults?")) {
      resetSection("projectsPage");
      resetSection("projectDetails");
      setProjectsData({ ...content.projectsPage });
      setDetailsData({ ...content.projectDetails });
      setSavedNotice("✓ Projects reset to default content.");
      setTimeout(() => setSavedNotice(null), 3000);
    }
  };

  return (
    <form onSubmit={handleSaveAll}>
      <div className="adm-page-head">
        <div>
          <span className="adm-eyebrow">
            Header Section
          </span>
          <h2 className="adm-page-title">
            Projects Management
          </h2>
        </div>
        <div className="adm-actions">
          <button
            type="button"
            onClick={handleReset}
            className="adm-btn adm-btn-ghost"
          >
            Reset Defaults
          </button>
          <button
            type="submit"
            className="adm-btn"
          >
            <i className="ri-save-line" />
            Save Projects
          </button>
        </div>
      </div>

      {savedNotice && (
        <div
          className="adm-notice"
        >
          {savedNotice}
        </div>
      )}

      {/* Internal Sub-Tabs for Projects Section */}
      <div
        className="adm-tabs"
      >
        <button
          type="button"
          onClick={() => setSubTab("showcase")}
          className={`adm-tab ${activeSubTab === "showcase" ? "active" : ""}`}
        >
          <i className="ri-building-line" />
          1. Projects Showcase ({projectsData.projects.length} Projects)
        </button>
        <button
          type="button"
          onClick={() => setSubTab("details")}
          className={`adm-tab ${activeSubTab === "details" ? "active" : ""}`}
        >
          <i className="ri-article-line" />
          2. Project Details & Specs ({detailsData.specs.length} Specs, {detailsData.featureHighlights.length} Features)
        </button>
      </div>

      {/* --- SUB-TAB 1: PROJECTS SHOWCASE --- */}
      {activeSubTab === "showcase" && (
        <div>
          {/* Breadcrumb Banner */}
          <div className="adm-card">
            <h3 className="adm-card-title">
              Page Header Banner
            </h3>
            <div className="row gy-3">
              <div className="col-md-6">
                <label className="adm-label">
                  Page Title
                </label>
                <input
                  type="text"
                  value={projectsData.breadcrumb.title}
                  onChange={(e) => handleBreadcrumbChange("title", e.target.value)}
                  className="adm-input"
                />
              </div>
              <div className="col-md-6">
                <label className="adm-label">
                  Banner Background Image URL
                </label>
                <input
                  type="text"
                  value={projectsData.breadcrumb.bgImage}
                  onChange={(e) => handleBreadcrumbChange("bgImage", e.target.value)}
                  className="adm-input"
                />
              </div>
            </div>
          </div>

          {/* Projects Showcase List (Full CRUD) */}
          <div className="adm-card">
            <div className="adm-card-head">
              <div>
                <h3 className="adm-card-title-inline">
                  Showcase Projects Portfolio ({projectsData.projects.length} Projects)
                </h3>
              </div>
              <button
                type="button"
                onClick={addProject}
                className="adm-btn adm-btn-sm adm-btn-outline"
              >
                <i className="ri-add-line" /> Add New Project
              </button>
            </div>

            <div className="row gy-4">
              {projectsData.projects.map((proj, index) => (
                <div key={proj.id || index} className="col-lg-6">
                  <div style={{ background: "#fbfbfc", border: "1px solid #e7e8ec", borderLeft: "4px solid #001F5B", padding: "18px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ background: "#001F5B", color: "#fff", padding: "2px 6px", fontSize: "11px", fontWeight: 700 }}>
                          #{index + 1}
                        </span>
                        <span style={{ fontSize: "13px", fontWeight: 700, color: "#001F5B" }}>
                          {proj.title}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeProject(index)}
                        className="adm-btn-danger-soft"
                        title="Delete Project"
                      >
                        <i className="ri-delete-bin-line" /> Delete
                      </button>
                    </div>

                    <div style={{ display: "flex", gap: "15px", alignItems: "flex-start" }}>
                      <div style={{ width: "90px", height: "70px", overflow: "hidden", background: "#eee", flexShrink: 0, border: "1px solid #ccc" }}>
                        <img src={proj.image} alt={proj.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ marginBottom: "8px" }}>
                          <label className="adm-label adm-label-sm">
                            Project Title
                          </label>
                          <input
                            type="text"
                            value={proj.title}
                            onChange={(e) => handleProjectChange(index, "title", e.target.value)}
                            className="adm-input adm-input-xs adm-input-strong"
                          />
                        </div>
                        <div className="row gy-2">
                          <div className="col-6">
                            <label className="adm-label adm-label-sm">
                              Location
                            </label>
                            <input
                              type="text"
                              value={proj.location}
                              onChange={(e) => handleProjectChange(index, "location", e.target.value)}
                              className="adm-input adm-input-xs"
                            />
                          </div>
                          <div className="col-6">
                            <label className="adm-label adm-label-sm">
                              Image Asset URL
                            </label>
                            <input
                              type="text"
                              value={proj.image}
                              onChange={(e) => handleProjectChange(index, "image", e.target.value)}
                              className="adm-input adm-input-xs"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- SUB-TAB 2: PROJECT DETAILS & SPECS --- */}
      {activeSubTab === "details" && (
        <div>
          {/* Specifications Grid (Full CRUD) */}
          <div className="adm-card">
            <div className="adm-card-head">
              <div>
                <h3 className="adm-card-title-inline">
                  Project Specifications ({detailsData.specs.length} Specifications)
                </h3>
              </div>
              <button
                type="button"
                onClick={addSpec}
                className="adm-btn adm-btn-sm adm-btn-outline"
              >
                <i className="ri-add-line" /> Add Specification
              </button>
            </div>

            <div className="row gy-3">
              {detailsData.specs.map((spec, sIdx) => (
                <div key={spec.id || sIdx} className="col-md-6">
                  <div style={{ background: "#fbfbfc", border: "1px solid #e7e8ec", padding: "12px 16px", display: "flex", gap: "10px", alignItems: "flex-end" }}>
                    <div style={{ width: "130px" }}>
                      <label className="adm-label adm-label-sm">
                        Spec Label
                      </label>
                      <input
                        type="text"
                        value={spec.label}
                        onChange={(e) => handleSpecChange(sIdx, "label", e.target.value)}
                        className="adm-input adm-input-xs adm-input-strong"
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label className="adm-label adm-label-sm">
                        Value / Parameter
                      </label>
                      <input
                        type="text"
                        value={spec.value}
                        onChange={(e) => handleSpecChange(sIdx, "value", e.target.value)}
                        className="adm-input adm-input-xs"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSpec(sIdx)}
                      className="adm-btn-danger-soft"
                      title="Remove Spec"
                    >
                      <i className="ri-delete-bin-line" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feature Highlights (Full CRUD) */}
          <div className="adm-card">
            <div className="adm-card-head">
              <div>
                <h3 className="adm-card-title-inline">
                  Key Feature Highlights ({detailsData.featureHighlights.length} Highlights)
                </h3>
              </div>
              <button
                type="button"
                onClick={addFeature}
                className="adm-btn adm-btn-sm"
              >
                <i className="ri-add-line" /> Add Feature Highlight
              </button>
            </div>

            <div className="row gy-3">
              {detailsData.featureHighlights.map((feat, fIdx) => (
                <div key={feat.id || fIdx} className="col-md-6">
                  <div className="adm-item">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <span style={{ fontSize: "12px", fontWeight: 700, color: "#001F5B" }}>
                        Feature #{fIdx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFeature(fIdx)}
                        className="adm-link-danger"
                      >
                        <i className="ri-delete-bin-line" /> Delete
                      </button>
                    </div>
                    <div style={{ marginBottom: "8px" }}>
                      <label className="adm-label adm-label-sm">
                        Title
                      </label>
                      <input
                        type="text"
                        value={feat.title}
                        onChange={(e) => handleFeatureChange(fIdx, "title", e.target.value)}
                        className="adm-input adm-input-sm adm-input-strong"
                      />
                    </div>
                    <div style={{ marginBottom: "8px" }}>
                      <label className="adm-label adm-label-sm">
                        Icon Asset URL
                      </label>
                      <input
                        type="text"
                        value={feat.icon}
                        onChange={(e) => handleFeatureChange(fIdx, "icon", e.target.value)}
                        className="adm-input adm-input-sm"
                      />
                    </div>
                    <div>
                      <label className="adm-label adm-label-sm">
                        Description
                      </label>
                      <textarea
                        rows={2}
                        value={feat.desc}
                        onChange={(e) => handleFeatureChange(fIdx, "desc", e.target.value)}
                        className="adm-input adm-input-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Overview Narrative & Banner */}
          <div className="adm-card">
            <h3 className="adm-card-title">
              Project Narrative & Banner
            </h3>
            <div className="row gy-3">
              <div className="col-12">
                <label className="adm-label">
                  Overview Headline
                </label>
                <input
                  type="text"
                  value={detailsData.overviewTitle}
                  onChange={(e) => setDetailsData({ ...detailsData, overviewTitle: e.target.value })}
                  className="adm-input adm-input-strong"
                />
              </div>
              <div className="col-12">
                <label className="adm-label">
                  Overview Text
                </label>
                <textarea
                  rows={3}
                  value={detailsData.overviewText}
                  onChange={(e) => setDetailsData({ ...detailsData, overviewText: e.target.value })}
                  className="adm-input"
                />
              </div>
              <div className="col-12">
                <label className="adm-label">
                  Feature Project Banner Image URL
                </label>
                <input
                  type="text"
                  value={detailsData.mainImage}
                  onChange={(e) => setDetailsData({ ...detailsData, mainImage: e.target.value })}
                  className="adm-input"
                />
              </div>
            </div>
          </div>

          <div style={{ background: "#f8f9fa", border: "1px solid #e7e8ec", padding: "15px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "13px", color: "#686e7d" }}>
              Want to see how project details appear on the public website?
            </span>
            <Link
              to="/project-details"
              target="_blank"
              className="adm-btn adm-btn-sm adm-btn-outline"
            >
              View On Public Site <i className="ri-external-link-line" />
            </Link>
          </div>
        </div>
      )}
    </form>
  );
};

export default AdminProjects;
