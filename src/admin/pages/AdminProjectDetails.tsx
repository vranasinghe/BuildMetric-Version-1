import React, { useState } from "react";
import { useContent } from "../ContentContext";
import { ProjectDetailsContent } from "../types";

const AdminProjectDetails: React.FC = () => {
  const { content, updateSection } = useContent();
  const [formData, setFormData] = useState<ProjectDetailsContent>({
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
  const [savedNotice, setSavedNotice] = useState(false);

  // Project Specs CRUD
  const addSpec = () => {
    const newSpec = {
      id: `spec-${Date.now()}`,
      label: "New Specification",
      value: "Specification details / parameters",
    };
    setFormData((prev) => ({
      ...prev,
      specs: [...prev.specs, newSpec],
    }));
  };

  const handleSpecChange = (index: number, field: "label" | "value", value: string) => {
    const updated = [...formData.specs];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, specs: updated }));
  };

  const removeSpec = (index: number) => {
    if (formData.specs.length <= 1) {
      alert("At least one specification item must remain.");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      specs: prev.specs.filter((_, i) => i !== index),
    }));
  };

  // Feature Highlights CRUD
  const addFeature = () => {
    const newFeature = {
      id: `feat-${Date.now()}`,
      title: "New Technical High-Performance Capability",
      desc: "Robust architectural governance, statutory assurance, and structural engineering integrity.",
      icon: "/assets/img/icon/service-icon1-1.png",
    };
    setFormData((prev) => ({
      ...prev,
      featureHighlights: [...prev.featureHighlights, newFeature],
    }));
  };

  const handleFeatureChange = (index: number, field: string, value: string) => {
    const updated = [...formData.featureHighlights];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, featureHighlights: updated }));
  };

  const removeFeature = (index: number) => {
    if (formData.featureHighlights.length <= 1) {
      alert("At least one feature highlight must remain.");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      featureHighlights: prev.featureHighlights.filter((_, i) => i !== index),
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSection("projectDetails", formData);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };


  return (
    <form onSubmit={handleSave}>
      <div className="adm-page-head">
        <div>
          <span className="adm-eyebrow">
            Header: PROJECTS &gt; Project Details
          </span>
          <h2 className="adm-page-title">
            Project Details Components Editor
          </h2>
        </div>
        <div className="adm-actions">
          <button
            type="submit"
            className="adm-btn"
          >
            <i className="ri-save-line" />
            Save Project Details
          </button>
        </div>
      </div>

      {savedNotice && (
        <div
          className="adm-notice"
        >
          ✓ Project details updated successfully! Changes are live on the Project Details page.
        </div>
      )}

      {/* 1. Project Specifications Grid (Full CRUD) */}
      <div className="adm-card">
        <div className="adm-card-head">
          <div>
            <h3 className="adm-card-title-inline">
              1. Project Specifications ({formData.specs.length} Specifications)
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
          {formData.specs.map((spec, sIdx) => (
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

      {/* 2. Feature Highlights (Full CRUD) */}
      <div className="adm-card">
        <div className="adm-card-head">
          <div>
            <h3 className="adm-card-title-inline">
              2. Key Feature Highlights ({formData.featureHighlights.length} Highlights)
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
          {formData.featureHighlights.map((feat, fIdx) => (
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

      {/* 3. Overview Narrative */}
      <div className="adm-card">
        <h3 className="adm-card-title">
          3. Project Narrative & Case Study
        </h3>
        <div className="row gy-3">
          <div className="col-12">
            <label className="adm-label">
              Overview Headline
            </label>
            <input
              type="text"
              value={formData.overviewTitle}
              onChange={(e) => setFormData({ ...formData, overviewTitle: e.target.value })}
              className="adm-input adm-input-strong"
            />
          </div>
          <div className="col-12">
            <label className="adm-label">
              Overview Text
            </label>
            <textarea
              rows={3}
              value={formData.overviewText}
              onChange={(e) => setFormData({ ...formData, overviewText: e.target.value })}
              className="adm-input"
            />
          </div>
          <div className="col-12">
            <label className="adm-label">
              Feature Project Banner Image URL
            </label>
            <input
              type="text"
              value={formData.mainImage}
              onChange={(e) => setFormData({ ...formData, mainImage: e.target.value })}
              className="adm-input"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default AdminProjectDetails;
