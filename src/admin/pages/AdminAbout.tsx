import React, { useState } from "react";
import { useContent } from "../ContentContext";
import { AboutPageContent } from "../types";

const AdminAbout: React.FC = () => {
  const { content, updateSection } = useContent();
  const [formData, setFormData] = useState<AboutPageContent>({
    ...content.aboutPage,
    whyChooseCards: content.aboutPage.whyChooseCards || [],
    processSteps: content.aboutPage.processSteps || [],
    checklist: content.aboutPage.checklist || [],
  });
  const [savedNotice, setSavedNotice] = useState(false);

  const handleChange = (field: keyof AboutPageContent, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBreadcrumbChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      breadcrumb: {
        ...prev.breadcrumb,
        [field]: value,
      },
    }));
  };

  // Why Choose Us Cards CRUD
  const addWhyChooseCard = () => {
    const newCard = {
      id: `wc-${Date.now()}`,
      title: "Certified Quality Assurance",
      desc: "Comprehensive multi-disciplinary audits and commercial risk mitigations.",
      icon: "/assets/img/icon/about-icon1-1.png",
    };
    setFormData((prev) => ({
      ...prev,
      whyChooseCards: [...prev.whyChooseCards, newCard],
    }));
  };

  const handleWhyChooseChange = (index: number, field: string, value: string) => {
    const updated = [...formData.whyChooseCards];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, whyChooseCards: updated }));
  };

  const removeWhyChooseCard = (index: number) => {
    if (formData.whyChooseCards.length <= 1) {
      alert("At least one Why Choose Us card must remain.");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      whyChooseCards: prev.whyChooseCards.filter((_, i) => i !== index),
    }));
  };

  // Checklist CRUD
  const addChecklistItem = () => {
    setFormData((prev) => ({
      ...prev,
      checklist: [...prev.checklist, "New engineering capability point"],
    }));
  };

  const handleChecklistChange = (index: number, value: string) => {
    const updated = [...formData.checklist];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, checklist: updated }));
  };

  const removeChecklistItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      checklist: prev.checklist.filter((_, i) => i !== index),
    }));
  };

  // Process Steps CRUD
  const addProcessStep = () => {
    const nextNum = (formData.processSteps.length + 1).toString().padStart(2, "0");
    const newStep = {
      id: `step-${Date.now()}`,
      number: nextNum,
      title: "Strategic Milestone Execution",
      desc: "Structured phased delivery adhering strictly to international standards.",
    };
    setFormData((prev) => ({
      ...prev,
      processSteps: [...prev.processSteps, newStep],
    }));
  };

  const handleProcessStepChange = (index: number, field: string, value: string) => {
    const updated = [...formData.processSteps];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, processSteps: updated }));
  };

  const removeProcessStep = (index: number) => {
    if (formData.processSteps.length <= 1) {
      alert("At least one process step must remain.");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      processSteps: prev.processSteps.filter((_, i) => i !== index),
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSection("aboutPage", formData);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };


  return (
    <form onSubmit={handleSave}>
      <div className="adm-page-head">
        <div>
          <span className="adm-eyebrow">
            Header: ABOUT
          </span>
          <h2 className="adm-page-title">
            About Page Components Editor
          </h2>
        </div>
        <div className="adm-actions">
          <button
            type="submit"
            className="adm-btn"
          >
            <i className="ri-save-line" />
            Save About Page
          </button>
        </div>
      </div>

      {savedNotice && (
        <div
          className="adm-notice"
        >
          ✓ About page components saved successfully! Check the About Us page.
        </div>
      )}

      {/* 1. Breadcrumb */}
      <div className="adm-card">
        <h3 className="adm-card-title">
          1. Hero Breadcrumb Banner
        </h3>
        <div className="row gy-3">
          <div className="col-md-6">
            <label className="adm-label">
              Banner Title
            </label>
            <input
              type="text"
              value={formData.breadcrumb.title}
              onChange={(e) => handleBreadcrumbChange("title", e.target.value)}
              className="adm-input"
            />
          </div>
          <div className="col-md-6">
            <label className="adm-label">
              Page Name In Trail
            </label>
            <input
              type="text"
              value={formData.breadcrumb.pageName}
              onChange={(e) => handleBreadcrumbChange("pageName", e.target.value)}
              className="adm-input"
            />
          </div>
        </div>
      </div>

      {/* 2. Main Company Story */}
      <div className="adm-card">
        <h3 className="adm-card-title">
          2. Company Story & Experience
        </h3>
        <div className="row gy-3">
          <div className="col-md-4">
            <label className="adm-label">
              Subtitle Tag
            </label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => handleChange("subtitle", e.target.value)}
              className="adm-input"
            />
          </div>
          <div className="col-md-8">
            <label className="adm-label">
              Headline
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="adm-input adm-input-strong"
            />
          </div>
          <div className="col-12">
            <label className="adm-label">
              Paragraph 1
            </label>
            <textarea
              rows={3}
              value={formData.desc1}
              onChange={(e) => handleChange("desc1", e.target.value)}
              className="adm-input"
            />
          </div>
          <div className="col-12">
            <label className="adm-label">
              Paragraph 2
            </label>
            <textarea
              rows={3}
              value={formData.desc2}
              onChange={(e) => handleChange("desc2", e.target.value)}
              className="adm-input"
            />
          </div>
          <div className="col-md-6">
            <label className="adm-label">
              Experience Number (e.g. 40)
            </label>
            <input
              type="number"
              value={formData.experienceYears}
              onChange={(e) => handleChange("experienceYears", parseInt(e.target.value) || 0)}
              className="adm-input"
            />
          </div>
          <div className="col-md-6">
            <label className="adm-label">
              Experience Label (e.g. Business Experience)
            </label>
            <input
              type="text"
              value={formData.experienceLabel}
              onChange={(e) => handleChange("experienceLabel", e.target.value)}
              className="adm-input"
            />
          </div>
        </div>

        {/* Checklist CRUD */}
        <div style={{ borderTop: "1px solid #f0f1f4", paddingTop: "18px", marginTop: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <strong style={{ fontSize: "14px", color: "#001F5B" }}>
              Key Accomplishments Checklist ({formData.checklist.length} Points) [CRUD]
            </strong>
            <button
              type="button"
              onClick={addChecklistItem}
              className="adm-btn adm-btn-sm"
            >
              Add Point
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {formData.checklist.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "8px" }}>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleChecklistChange(i, e.target.value)}
                  style={{ flex: 1, padding: "7px 10px", border: "1px solid #dcdfe5", fontSize: "13px" }}
                />
                <button
                  type="button"
                  onClick={() => removeChecklistItem(i)}
                  className="adm-btn-danger-soft"
                >
                  <i className="ri-delete-bin-line" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Why Choose Us Section (Full CRUD) */}
      <div className="adm-card">
        <div className="adm-card-head">
          <div>
            <h3 className="adm-card-title-inline">
              3. Why Choose Us Benefit Cards ({formData.whyChooseCards.length} Cards)
            </h3>
          </div>
          <button
            type="button"
            onClick={addWhyChooseCard}
            className="adm-btn adm-btn-sm adm-btn-outline"
          >
            <i className="ri-add-line" /> Add Benefit Card
          </button>
        </div>

        <div className="row gy-3 mb-4">
          <div className="col-md-6">
            <label className="adm-label">
              Subtitle
            </label>
            <input
              type="text"
              value={formData.whyChooseSubtitle}
              onChange={(e) => handleChange("whyChooseSubtitle", e.target.value)}
              className="adm-input"
            />
          </div>
          <div className="col-md-6">
            <label className="adm-label">
              Section Title
            </label>
            <input
              type="text"
              value={formData.whyChooseTitle}
              onChange={(e) => handleChange("whyChooseTitle", e.target.value)}
              className="adm-input adm-input-strong"
            />
          </div>
        </div>

        <div className="row gy-3">
          {formData.whyChooseCards.map((card, idx) => (
            <div key={card.id || idx} className="col-md-6">
              <div className="adm-item">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "#001F5B" }}>
                    Card #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeWhyChooseCard(idx)}
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
                    value={card.title}
                    onChange={(e) => handleWhyChooseChange(idx, "title", e.target.value)}
                    className="adm-input adm-input-sm adm-input-strong"
                  />
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <label className="adm-label adm-label-sm">
                    Icon Asset URL
                  </label>
                  <input
                    type="text"
                    value={card.icon}
                    onChange={(e) => handleWhyChooseChange(idx, "icon", e.target.value)}
                    className="adm-input adm-input-sm"
                  />
                </div>
                <div>
                  <label className="adm-label adm-label-sm">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={card.desc}
                    onChange={(e) => handleWhyChooseChange(idx, "desc", e.target.value)}
                    className="adm-input adm-input-sm"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Process Steps (Full CRUD) */}
      <div className="adm-card">
        <div className="adm-card-head">
          <div>
            <h3 className="adm-card-title-inline">
              4. Working Milestones / Process Steps ({formData.processSteps.length} Steps)
            </h3>
          </div>
          <button
            type="button"
            onClick={addProcessStep}
            className="adm-btn adm-btn-sm"
          >
            <i className="ri-add-line" /> Add Process Step
          </button>
        </div>

        <div className="row gy-3">
          {formData.processSteps.map((step, idx) => (
            <div key={step.id || idx} className="col-md-4">
              <div className="adm-item">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <span style={{ fontSize: "14px", fontWeight: 800, color: "#001F5B" }}>
                    Step #{step.number}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeProcessStep(idx)}
                    className="adm-link-danger"
                  >
                    <i className="ri-delete-bin-line" /> Delete
                  </button>
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <label className="adm-label adm-label-sm">
                    Number Label
                  </label>
                  <input
                    type="text"
                    value={step.number}
                    onChange={(e) => handleProcessStepChange(idx, "number", e.target.value)}
                    className="adm-input adm-input-sm"
                  />
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <label className="adm-label adm-label-sm">
                    Step Title
                  </label>
                  <input
                    type="text"
                    value={step.title}
                    onChange={(e) => handleProcessStepChange(idx, "title", e.target.value)}
                    className="adm-input adm-input-sm adm-input-strong"
                  />
                </div>
                <div>
                  <label className="adm-label adm-label-sm">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={step.desc}
                    onChange={(e) => handleProcessStepChange(idx, "desc", e.target.value)}
                    className="adm-input adm-input-sm"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};

export default AdminAbout;
