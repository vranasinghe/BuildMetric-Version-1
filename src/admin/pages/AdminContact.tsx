import React, { useState } from "react";
import { useContent } from "../ContentContext";
import { ContactPageContent, OfficeLocation } from "../types";

const AdminContact: React.FC = () => {
  const { content, updateSection, resetSection } = useContent();
  const [formData, setFormData] = useState<ContactPageContent>({ ...content.contactPage });
  const [savedNotice, setSavedNotice] = useState(false);

  // Global Offices CRUD
  const addOffice = () => {
    const newOffice: OfficeLocation = {
      id: `office-${Date.now()}`,
      title: "Singapore Regional Office",
      phone: "+65 6789 0123 / +65 6789 0124",
      email: "singapore@buildmetric.com",
      hours: "Mon - Fri : 8.30am - 6.00pm",
      thumb: "/assets/img/icon/contact-icon1-1.png",
    };
    setFormData((prev) => ({
      ...prev,
      offices: [...prev.offices, newOffice],
    }));
  };

  const handleOfficeChange = (index: number, field: keyof OfficeLocation, value: string) => {
    const updated = [...formData.offices];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, offices: updated }));
  };

  const removeOffice = (index: number) => {
    if (formData.offices.length <= 1) {
      alert("At least one office location must remain.");
      return;
    }
    if (window.confirm(`Delete office "${formData.offices[index].title}"?`)) {
      setFormData((prev) => ({
        ...prev,
        offices: prev.offices.filter((_, i) => i !== index),
      }));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSection("contactPage", formData);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm("Reset Contact Page to defaults?")) {
      resetSection("contactPage");
      setFormData({ ...content.contactPage });
      setSavedNotice(true);
      setTimeout(() => setSavedNotice(false), 3000);
    }
  };

  return (
    <form onSubmit={handleSave}>
      <div className="adm-page-head">
        <div>
          <span className="adm-eyebrow">
            Header: CONTACT
          </span>
          <h2 className="adm-page-title">
            Contact Page Components Editor
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
            Save Contact Page
          </button>
        </div>
      </div>

      {savedNotice && (
        <div
          className="adm-notice"
        >
          ✓ Contact page updated successfully! Check the Contact Us page.
        </div>
      )}

      {/* 1. Global Offices (Full CRUD) */}
      <div className="adm-card">
        <div className="adm-card-head">
          <div>
            <h3 className="adm-card-title-inline">
              1. Global Branch Offices ({formData.offices.length} Offices)
            </h3>
          </div>
          <button
            type="button"
            onClick={addOffice}
            className="adm-btn adm-btn-sm adm-btn-outline"
          >
            <i className="ri-add-line" /> Add New Office
          </button>
        </div>

        <div className="row gy-4">
          {formData.offices.map((office, idx) => (
            <div key={office.id || idx} className="col-md-6">
              <div className="adm-item">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#001F5B" }}>
                    Office #{idx + 1}: {office.title}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeOffice(idx)}
                    className="adm-btn-danger-soft"
                    title="Delete Office"
                  >
                    <i className="ri-delete-bin-line" /> Delete
                  </button>
                </div>

                <div className="row gy-2">
                  <div className="col-12">
                    <label className="adm-label adm-label-sm">
                      Office / City Title
                    </label>
                    <input
                      type="text"
                      value={office.title}
                      onChange={(e) => handleOfficeChange(idx, "title", e.target.value)}
                      className="adm-input adm-input-sm adm-input-strong"
                    />
                  </div>
                  <div className="col-12">
                    <label className="adm-label adm-label-sm">
                      Phone Numbers
                    </label>
                    <input
                      type="text"
                      value={office.phone}
                      onChange={(e) => handleOfficeChange(idx, "phone", e.target.value)}
                      className="adm-input adm-input-sm"
                    />
                  </div>
                  <div className="col-12">
                    <label className="adm-label adm-label-sm">
                      Support Email
                    </label>
                    <input
                      type="email"
                      value={office.email}
                      onChange={(e) => handleOfficeChange(idx, "email", e.target.value)}
                      className="adm-input adm-input-sm"
                    />
                  </div>
                  <div className="col-12">
                    <label className="adm-label adm-label-sm">
                      Working Hours
                    </label>
                    <input
                      type="text"
                      value={office.hours}
                      onChange={(e) => handleOfficeChange(idx, "hours", e.target.value)}
                      className="adm-input adm-input-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Inquiry Form Settings */}
      <div className="adm-card">
        <h3 className="adm-card-title">
          2. Inquiry Form Content & Map
        </h3>
        <div className="row gy-3">
          <div className="col-md-6">
            <label className="adm-label">
              Form Subtitle
            </label>
            <input
              type="text"
              value={formData.formSubtitle}
              onChange={(e) => setFormData({ ...formData, formSubtitle: e.target.value })}
              className="adm-input"
            />
          </div>
          <div className="col-md-6">
            <label className="adm-label">
              Form Main Title
            </label>
            <input
              type="text"
              value={formData.formTitle}
              onChange={(e) => setFormData({ ...formData, formTitle: e.target.value })}
              className="adm-input adm-input-strong"
            />
          </div>
          <div className="col-12">
            <label className="adm-label">
              Form Description Text
            </label>
            <textarea
              rows={2}
              value={formData.formDesc}
              onChange={(e) => setFormData({ ...formData, formDesc: e.target.value })}
              className="adm-input"
            />
          </div>
          <div className="col-md-6">
            <label className="adm-label">
              Submit Button Label
            </label>
            <input
              type="text"
              value={formData.submitButtonText}
              onChange={(e) => setFormData({ ...formData, submitButtonText: e.target.value })}
              className="adm-input"
            />
          </div>
          <div className="col-12">
            <label className="adm-label">
              Google Maps Iframe Embed URL
            </label>
            <input
              type="text"
              value={formData.mapEmbedUrl}
              onChange={(e) => setFormData({ ...formData, mapEmbedUrl: e.target.value })}
              className="adm-input adm-input-sm"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default AdminContact;
