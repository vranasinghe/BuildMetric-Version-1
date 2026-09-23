import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContent } from "../ContentContext";
import { ServiceDetailArticle } from "../types";

const AdminServiceDetails: React.FC = () => {
  const { content, updateSection } = useContent();
  const [services, setServices] = useState<ServiceDetailArticle[]>([...content.serviceDetailsList]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [savedNotice, setSavedNotice] = useState(false);

  const selectedService = services[selectedIndex] || services[0];

  // Service Articles CRUD
  const addServiceArticle = () => {
    const nextNum = (services.length + 1).toString().padStart(2, "0");
    const newArticle: ServiceDetailArticle = {
      id: `service-tab-${services.length + 1}`,
      num: nextNum,
      tabTitle: `New Advisory Service ${nextNum}`,
      serviceTitle: `Strategic Advisory & Technical Solutions ${nextNum}`,
      thumb: "/assets/img/service/service_details1_1.png",
      desc: "BuildMetric provides multi-disciplinary advisory, precision quantification, and end-to-end commercial governance for complex infrastructure and high-rise developments.",
      subsections: [
        {
          name: "1. Core Strategic Deliverables",
          detail: "Detailed operational framework, baseline scheduling, and statutory compliance protocols.",
        },
        {
          name: "2. Commercial Risk Management",
          detail: "Independent audit governance, risk register compilation, and dispute mitigation strategies.",
        },
      ],
    };
    const updated = [...services, newArticle];
    setServices(updated);
    setSelectedIndex(updated.length - 1);
  };

  const removeServiceArticle = (index: number) => {
    if (services.length <= 1) {
      alert("At least one service detail article must remain.");
      return;
    }
    if (window.confirm(`Are you sure you want to delete service article "${services[index].tabTitle}"?`)) {
      const updated = services.filter((_, i) => i !== index);
      setServices(updated);
      setSelectedIndex(Math.max(0, index - 1));
    }
  };

  const handleFieldChange = (field: keyof ServiceDetailArticle, value: any) => {
    const updated = [...services];
    updated[selectedIndex] = {
      ...updated[selectedIndex],
      [field]: value,
    };
    setServices(updated);
  };

  // Subsections CRUD
  const handleSubsectionChange = (subIndex: number, field: "name" | "detail", value: string) => {
    const updated = [...services];
    const subList = [...updated[selectedIndex].subsections];
    subList[subIndex] = {
      ...subList[subIndex],
      [field]: value,
    };
    updated[selectedIndex].subsections = subList;
    setServices(updated);
  };

  const addSubsection = () => {
    const updated = [...services];
    updated[selectedIndex].subsections.push({
      name: "New Capability or Subsection",
      detail: "Detailed description of this specific technical solution or advisory scope.",
    });
    setServices(updated);
  };

  const removeSubsection = (subIndex: number) => {
    const updated = [...services];
    updated[selectedIndex].subsections = updated[selectedIndex].subsections.filter((_, i) => i !== subIndex);
    setServices(updated);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSection("serviceDetailsList", services);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };


  return (
    <form onSubmit={handleSave}>
      <div className="adm-page-head">
        <div>
          <span className="adm-eyebrow">
            Header: SERVICES &gt; Service Details
          </span>
          <h2 className="adm-page-title">
            Service Details Articles Editor
          </h2>
        </div>
        <div className="adm-actions">
          <button
            type="submit"
            className="adm-btn"
          >
            <i className="ri-save-line" />
            Save All Articles
          </button>
        </div>
      </div>

      {savedNotice && (
        <div
          className="adm-notice"
        >
          ✓ Service detail articles updated! Check the live Service Details page.
        </div>
      )}

      {/* Select Service Tab + CRUD Create / Delete Article */}
      <div className="adm-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
          <div>
            <label style={{ fontSize: "14px", fontWeight: 700, color: "#001F5B" }}>
              Select Service Article To Edit ({services.length} Total Articles)
            </label>
          </div>
          <button
            type="button"
            onClick={addServiceArticle}
            className="adm-btn adm-btn-sm adm-btn-outline"
          >
            <i className="ri-add-line" /> Add New Service Article
          </button>
        </div>

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "15px" }}>
          {services.map((srv, idx) => (
            <button
              key={srv.id}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={`adm-pill ${selectedIndex === idx ? "active" : ""}`}
            >
              <span style={{ color: selectedIndex === idx ? "#f15a24" : "#888" }}>{srv.num}</span>
              {srv.tabTitle}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fbfbfc", padding: "10px 15px", border: "1px solid #e7e8ec" }}>
          <span style={{ fontSize: "13px", color: "#686e7d" }}>
            Currently editing Article <strong>#{selectedService.num}: {selectedService.tabTitle}</strong>
          </span>
          <button
            type="button"
            onClick={() => removeServiceArticle(selectedIndex)}
            className="adm-btn-danger-soft"
          >
            <i className="ri-delete-bin-line" /> Delete This Article
          </button>
        </div>
      </div>

      {/* Editor for Selected Service Article */}
      <div className="adm-card">
        <h3 className="adm-card-title">
          Article Details & Content
        </h3>

        <div className="row gy-3 mb-4">
          <div className="col-md-2">
            <label className="adm-label">
              Number (e.g. 01)
            </label>
            <input
              type="text"
              value={selectedService.num}
              onChange={(e) => handleFieldChange("num", e.target.value)}
              className="adm-input adm-input-sm adm-input-strong"
            />
          </div>
          <div className="col-md-5">
            <label className="adm-label">
              Sidebar Tab Title
            </label>
            <input
              type="text"
              value={selectedService.tabTitle}
              onChange={(e) => handleFieldChange("tabTitle", e.target.value)}
              className="adm-input adm-input-sm"
            />
          </div>
          <div className="col-md-5">
            <label className="adm-label">
              URL Tab Key (e.g. service-tab-1)
            </label>
            <input
              type="text"
              value={selectedService.id}
              onChange={(e) => handleFieldChange("id", e.target.value)}
              className="adm-input adm-input-sm"
            />
          </div>

          <div className="col-md-8">
            <label className="adm-label">
              Main Article Headline
            </label>
            <input
              type="text"
              value={selectedService.serviceTitle}
              onChange={(e) => handleFieldChange("serviceTitle", e.target.value)}
              className="adm-input adm-input-sm adm-input-strong"
            />
          </div>
          <div className="col-md-4">
            <label className="adm-label">
              Feature Image Asset Path
            </label>
            <input
              type="text"
              value={selectedService.thumb}
              onChange={(e) => handleFieldChange("thumb", e.target.value)}
              className="adm-input adm-input-sm"
            />
          </div>

          <div className="col-12">
            <label className="adm-label">
              Executive Overview Paragraph
            </label>
            <textarea
              rows={3}
              value={selectedService.desc}
              onChange={(e) => handleFieldChange("desc", e.target.value)}
              className="adm-input adm-input-sm"
            />
          </div>
        </div>

        {/* Subsections CRUD */}
        <div style={{ borderTop: "1px solid #f0f1f4", paddingTop: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
            <div>
              <h4 className="adm-card-title-inline">
                Subsections & Deliverables ({selectedService.subsections.length} Items)
              </h4>
            </div>
            <button
              type="button"
              onClick={addSubsection}
              className="adm-btn adm-btn-sm"
            >
              <i className="ri-add-line" /> Add Subsection
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {selectedService.subsections.map((sub, subIdx) => (
              <div
                key={subIdx}
                className="adm-item"
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "#001F5B" }}>
                    Subsection #{subIdx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeSubsection(subIdx)}
                    className="adm-link-danger"
                  >
                    <i className="ri-delete-bin-line" /> Delete Subsection
                  </button>
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <label className="adm-label adm-label-sm">
                    Heading / Title
                  </label>
                  <input
                    type="text"
                    value={sub.name}
                    onChange={(e) => handleSubsectionChange(subIdx, "name", e.target.value)}
                    className="adm-input adm-input-sm adm-input-strong"
                  />
                </div>
                <div>
                  <label className="adm-label adm-label-sm">
                    Detailed Text
                  </label>
                  <textarea
                    rows={2}
                    value={sub.detail}
                    onChange={(e) => handleSubsectionChange(subIdx, "detail", e.target.value)}
                    className="adm-input adm-input-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: "#f8f9fa", border: "1px solid #e7e8ec", padding: "15px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "13px", color: "#686e7d" }}>
          Want to test how this service appears on the public website?
        </span>
        <Link
          to={`/service-details?tab=${selectedService.id}`}
          target="_blank"
          className="adm-btn adm-btn-sm adm-btn-outline"
        >
          View On Public Site <i className="ri-external-link-line" />
        </Link>
      </div>
    </form>
  );
};

export default AdminServiceDetails;
