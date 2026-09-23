import React, { useState } from "react";
import { useContent } from "../ContentContext";
import { HeaderContent, NavLink, SocialLink, LanguageOption } from "../types";

const AdminHeader: React.FC = () => {
  const { content, updateSection, resetSection } = useContent();
  const [formData, setFormData] = useState<HeaderContent>({
    ...content.header,
    navLinks: content.header.navLinks || [
      { id: "nav-1", label: "Home", url: "/" },
      { id: "nav-2", label: "About Us", url: "/about" },
      { id: "nav-3", label: "Services", url: "/services" },
      { id: "nav-4", label: "Projects", url: "/project" },
      { id: "nav-5", label: "Contact", url: "/contact" },
    ],
    languages: content.header.languages || [
      { id: "lang-en", code: "EN", name: "English" },
      { id: "lang-ar", code: "AR", name: "العربية" },
    ],
  });
  const [savedNotice, setSavedNotice] = useState(false);

  const handleChange = (field: keyof HeaderContent, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Nav Links CRUD
  const addNavLink = () => {
    const newNav: NavLink = {
      id: `nav-${Date.now()}`,
      label: "New Nav Item",
      url: "/",
    };
    setFormData((prev) => ({ ...prev, navLinks: [...prev.navLinks, newNav] }));
  };

  const updateNavLink = (index: number, field: keyof NavLink, value: string) => {
    const updated = [...formData.navLinks];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, navLinks: updated }));
  };

  const deleteNavLink = (index: number) => {
    if (formData.navLinks.length <= 1) {
      alert("At least one navigation link must remain.");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      navLinks: prev.navLinks.filter((_, i) => i !== index),
    }));
  };

  // Social Links CRUD
  const addSocial = () => {
    const newSocial: SocialLink = {
      id: `soc-${Date.now()}`,
      icon: "ri-global-line",
      url: "https://",
    };
    setFormData((prev) => ({
      ...prev,
      socialLinks: [...prev.socialLinks, newSocial],
    }));
  };

  const handleSocialChange = (index: number, field: "icon" | "url", value: string) => {
    const updatedSocials = [...formData.socialLinks];
    updatedSocials[index] = { ...updatedSocials[index], [field]: value };
    setFormData((prev) => ({ ...prev, socialLinks: updatedSocials }));
  };

  const removeSocial = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index),
    }));
  };

  // Languages CRUD
  const addLanguage = () => {
    const newLang: LanguageOption = {
      id: `lang-${Date.now()}`,
      code: "FR",
      name: "Français",
    };
    setFormData((prev) => ({
      ...prev,
      languages: [...prev.languages, newLang],
    }));
  };

  const handleLanguageChange = (index: number, field: keyof LanguageOption, value: string) => {
    const updated = [...formData.languages];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, languages: updated }));
  };

  const removeLanguage = (index: number) => {
    if (formData.languages.length <= 1) {
      alert("At least one language must remain.");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index),
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSection("header", formData);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm("Reset Header & Topbar to default settings?")) {
      resetSection("header");
      setFormData({
        ...content.header,
        navLinks: content.header.navLinks || [],
        languages: content.header.languages || [],
      });
      setSavedNotice(true);
      setTimeout(() => setSavedNotice(false), 3000);
    }
  };

  return (
    <form onSubmit={handleSave}>
      <div className="adm-page-head">
        <div>
          <span className="adm-eyebrow">
            Header Section
          </span>
          <h2 className="adm-page-title">
            Header & Top Bar Editor
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
            Save Changes
          </button>
        </div>
      </div>

      {savedNotice && (
        <div
          className="adm-notice"
        >
          ✓ Header settings saved successfully! Changes are live on the website.
        </div>
      )}

      {/* Group 1: Navigation Menu Items (Full CRUD) */}
      <div className="adm-card">
        <div className="adm-card-head">
          <div>
            <h3 className="adm-card-title-inline">
              1. Main Navigation Menu Links ({formData.navLinks.length} Items)
            </h3>
          </div>
          <button
            type="button"
            onClick={addNavLink}
            className="adm-btn adm-btn-sm adm-btn-outline"
          >
            <i className="ri-add-line" /> Add Menu Item
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {formData.navLinks.map((link, idx) => (
            <div
              key={link.id || idx}
              style={{
                display: "flex",
                gap: "12px",
                alignItems: "center",
                background: "#fbfbfc",
                border: "1px solid #e7e8ec",
                padding: "12px 16px",
              }}
            >
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#9aa0ac", width: "25px" }}>
                #{idx + 1}
              </span>
              <div style={{ flex: 1 }}>
                <label className="adm-label adm-label-sm">
                  Menu Label
                </label>
                <input
                  type="text"
                  value={link.label}
                  onChange={(e) => updateNavLink(idx, "label", e.target.value)}
                  className="adm-input adm-input-sm"
                />
              </div>
              <div style={{ flex: 2 }}>
                <label className="adm-label adm-label-sm">
                  Destination Route / URL
                </label>
                <input
                  type="text"
                  value={link.url}
                  onChange={(e) => updateNavLink(idx, "url", e.target.value)}
                  className="adm-input adm-input-sm"
                />
              </div>
              <div style={{ alignSelf: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => deleteNavLink(idx)}
                  title="Delete Navigation Item"
                  className="adm-btn-danger-soft"
                >
                  <i className="ri-delete-bin-line" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Group 2: Languages Switcher (Full CRUD) */}
      <div className="adm-card">
        <div className="adm-card-head">
          <div>
            <h3 className="adm-card-title-inline">
              2. Supported Languages Switcher ({formData.languages.length} Languages)
            </h3>
          </div>
          <button
            type="button"
            onClick={addLanguage}
            className="adm-btn adm-btn-sm"
          >
            <i className="ri-add-line" /> Add Language
          </button>
        </div>

        <div className="row gy-3">
          {formData.languages.map((lang, idx) => (
            <div key={lang.id || idx} className="col-md-6">
              <div style={{ background: "#fbfbfc", border: "1px solid #e7e8ec", padding: "14px", display: "flex", gap: "10px", alignItems: "flex-end" }}>
                <div style={{ width: "80px" }}>
                  <label className="adm-label adm-label-sm">
                    Code
                  </label>
                  <input
                    type="text"
                    value={lang.code}
                    onChange={(e) => handleLanguageChange(idx, "code", e.target.value)}
                    className="adm-input adm-input-sm adm-input-strong"
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label className="adm-label adm-label-sm">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={lang.name}
                    onChange={(e) => handleLanguageChange(idx, "name", e.target.value)}
                    className="adm-input adm-input-sm"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeLanguage(idx)}
                  title="Remove Language"
                  className="adm-btn-danger-soft"
                >
                  <i className="ri-delete-bin-line" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Group 3: Logo & Branding */}
      <div className="adm-card">
        <h3 className="adm-card-title">
          3. Logo & Branding
        </h3>
        <div className="row gy-3">
          <div className="col-md-8">
            <label className="adm-label">
              Logo Asset Path / URL
            </label>
            <input
              type="text"
              value={formData.logoUrl}
              onChange={(e) => handleChange("logoUrl", e.target.value)}
              className="adm-input"
            />
          </div>
          <div className="col-md-4">
            <label className="adm-label">
              Logo Preview
            </label>
            <div style={{ background: "#141d30", padding: "10px 15px", display: "inline-block" }}>
              <img src={formData.logoUrl} alt="Logo Preview" style={{ maxHeight: "35px" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Group 4: Top Bar Contact & Location */}
      <div className="adm-card">
        <h3 className="adm-card-title">
          4. Top Bar Contact & Working Hours
        </h3>
        <div className="row gy-3">
          <div className="col-md-6">
            <label className="adm-label">
              Working Hours Notice
            </label>
            <input
              type="text"
              value={formData.workingHours}
              onChange={(e) => handleChange("workingHours", e.target.value)}
              className="adm-input"
            />
          </div>
          <div className="col-md-6">
            <label className="adm-label">
              Phone Number
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
              Email Address
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
              Physical Address
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              className="adm-input"
            />
          </div>
        </div>
      </div>

      {/* Group 5: Region Settings */}
      <div className="adm-card">
        <h3 className="adm-card-title">
          5. Region Settings
        </h3>
        <div className="row gy-3">
          <div className="col-md-6">
            <label className="adm-label">
              Region Name
            </label>
            <input
              type="text"
              value={formData.regionName}
              onChange={(e) => handleChange("regionName", e.target.value)}
              className="adm-input"
            />
          </div>
          <div className="col-md-6">
            <label className="adm-label">
              Region Flag URL
            </label>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <input
                type="text"
                value={formData.regionFlagUrl}
                onChange={(e) => handleChange("regionFlagUrl", e.target.value)}
                style={{ flex: 1, padding: "9px 12px", border: "1px solid #dcdfe5", fontSize: "14px" }}
              />
              <img src={formData.regionFlagUrl} alt="Flag" style={{ width: "24px", height: "auto", border: "1px solid #ccc" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Group 6: Social Media Links (Full CRUD) */}
      <div className="adm-card">
        <div className="adm-card-head">
          <div>
            <h3 className="adm-card-title-inline">
              6. Social Media Accounts ({formData.socialLinks.length} Platforms)
            </h3>
          </div>
          <button
            type="button"
            onClick={addSocial}
            className="adm-btn adm-btn-sm"
          >
            <i className="ri-add-line" /> Add Platform
          </button>
        </div>

        <div className="row gy-3">
          {formData.socialLinks.map((soc, idx) => (
            <div key={soc.id || idx} className="col-md-6">
              <div className="adm-item">
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <i className={soc.icon} style={{ fontSize: "18px", color: "#001F5B" }} />
                    <span style={{ fontSize: "12px", fontWeight: 700, color: "#001F5B" }}>Platform #{idx + 1}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSocial(idx)}
                    className="adm-link-danger"
                  >
                    <i className="ri-delete-bin-line" /> Delete
                  </button>
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <label className="adm-label adm-label-sm">
                    Remixicon Icon Class
                  </label>
                  <input
                    type="text"
                    value={soc.icon}
                    onChange={(e) => handleSocialChange(idx, "icon", e.target.value)}
                    className="adm-input adm-input-sm"
                  />
                </div>
                <div>
                  <label className="adm-label adm-label-sm">
                    Target Profile URL
                  </label>
                  <input
                    type="text"
                    value={soc.url}
                    onChange={(e) => handleSocialChange(idx, "url", e.target.value)}
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

export default AdminHeader;
