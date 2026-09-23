import React, { useState } from "react";
import { useContent } from "../ContentContext";
import { FooterContent } from "../types";

const AdminFooter: React.FC = () => {
  const { content, updateSection, resetSection } = useContent();
  const [formData, setFormData] = useState<FooterContent>({ ...content.footer });
  const [savedNotice, setSavedNotice] = useState(false);

  const handleChange = (field: keyof FooterContent, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Quick Links CRUD
  const handleLinkChange = (index: number, field: "label" | "url", value: string) => {
    const updated = [...formData.quickLinks];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, quickLinks: updated }));
  };

  const addLink = () => {
    setFormData((prev) => ({
      ...prev,
      quickLinks: [
        ...prev.quickLinks,
        { id: `ql-${Date.now()}`, label: "New Footer Link", url: "/" },
      ],
    }));
  };

  const removeLink = (index: number) => {
    if (formData.quickLinks.length <= 1) {
      alert("At least one footer link must remain.");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      quickLinks: prev.quickLinks.filter((_, i) => i !== index),
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSection("footer", formData);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm("Reset Footer content to defaults?")) {
      resetSection("footer");
      setFormData({ ...content.footer });
      setSavedNotice(true);
      setTimeout(() => setSavedNotice(false), 3000);
    }
  };

  return (
    <form onSubmit={handleSave}>
      <div className="adm-page-head">
        <div>
          <span className="adm-eyebrow">
            Footer Section
          </span>
          <h2 className="adm-page-title">
            Footer Components Editor
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
            Save Footer
          </button>
        </div>
      </div>

      {savedNotice && (
        <div
          className="adm-notice"
        >
          ✓ Footer settings saved successfully! Changes are live across all site footers.
        </div>
      )}

      {/* 1. Quick Navigation Links (Full CRUD) */}
      <div className="adm-card">
        <div className="adm-card-head">
          <div>
            <h3 className="adm-card-title-inline">
              1. Footer Navigation Quick Links ({formData.quickLinks.length} Links)
            </h3>
          </div>
          <button
            type="button"
            onClick={addLink}
            className="adm-btn adm-btn-sm adm-btn-outline"
          >
            <i className="ri-add-line" /> Add Footer Link
          </button>
        </div>

        <div className="row gy-3">
          {formData.quickLinks.map((link, idx) => (
            <div key={link.id || idx} className="col-md-6">
              <div className="adm-item">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "#001F5B" }}>
                    Link #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeLink(idx)}
                    className="adm-link-danger"
                  >
                    <i className="ri-delete-bin-line" /> Delete
                  </button>
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <label className="adm-label adm-label-sm">
                    Link Label
                  </label>
                  <input
                    type="text"
                    value={link.label}
                    onChange={(e) => handleLinkChange(idx, "label", e.target.value)}
                    className="adm-input adm-input-sm"
                  />
                </div>
                <div>
                  <label className="adm-label adm-label-sm">
                    URL Route
                  </label>
                  <input
                    type="text"
                    value={link.url}
                    onChange={(e) => handleLinkChange(idx, "url", e.target.value)}
                    className="adm-input adm-input-sm"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Brand Bio & Copyright */}
      <div className="adm-card">
        <h3 className="adm-card-title">
          2. Bio Summary & Copyright Notice
        </h3>
        <div className="row gy-3">
          <div className="col-12">
            <label className="adm-label">
              Company Bio Summary
            </label>
            <textarea
              rows={3}
              value={formData.aboutText}
              onChange={(e) => handleChange("aboutText", e.target.value)}
              className="adm-input"
            />
          </div>
          <div className="col-12">
            <label className="adm-label">
              Copyright Notice Text
            </label>
            <input
              type="text"
              value={formData.copyrightText}
              onChange={(e) => handleChange("copyrightText", e.target.value)}
              className="adm-input"
            />
          </div>
        </div>
      </div>

      {/* 3. Footer Contact Information */}
      <div className="adm-card">
        <h3 className="adm-card-title">
          3. Footer Direct Contact Info
        </h3>
        <div className="row gy-3">
          <div className="col-md-6">
            <label className="adm-label">
              Phone
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="adm-input"
            />
          </div>
          <div className="col-md-6">
            <label className="adm-label">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="adm-input"
            />
          </div>
          <div className="col-md-6">
            <label className="adm-label">
              Address
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              className="adm-input"
            />
          </div>
          <div className="col-md-6">
            <label className="adm-label">
              Working Hours
            </label>
            <input
              type="text"
              value={formData.workingHours}
              onChange={(e) => handleChange("workingHours", e.target.value)}
              className="adm-input"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default AdminFooter;
