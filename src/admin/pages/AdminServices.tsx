import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useContent } from "../ContentContext";
import { ServicesPageContent, ServiceCardItem, BenefitItem, ServiceDetailArticle } from "../types";

const AdminServices: React.FC = () => {
  const { content, updateSection, resetSection } = useContent();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeSubTab = (searchParams.get("subtab") as "main" | "details") || "main";

  const setSubTab = (tab: "main" | "details") => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("subtab", tab);
      return next;
    });
  };

  // State for Main Services Page
  const [pageData, setPageData] = useState<ServicesPageContent>({ ...content.servicesPage });

  // State for Service Details Articles
  const [detailArticles, setDetailArticles] = useState<ServiceDetailArticle[]>([...content.serviceDetailsList]);
  const [selectedDetailIndex, setSelectedDetailIndex] = useState<number>(0);

  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  const selectedArticle = detailArticles[selectedDetailIndex] || detailArticles[0];

  // --- Main Services Page Handlers ---
  const handleBreadcrumbChange = (field: string, value: string) => {
    setPageData((prev) => ({
      ...prev,
      breadcrumb: {
        ...prev.breadcrumb,
        [field]: value,
      },
    }));
  };

  const addServiceCard = () => {
    const nextNum = (pageData.services.length + 1).toString().padStart(2, "0");
    const newService: ServiceCardItem = {
      id: `service-${Date.now()}`,
      num: nextNum,
      title: "New Strategic Consultancy Service",
      icon: "/assets/img/icon/service-icon1-1.png",
      items: [
        "Comprehensive preliminary feasibility analysis",
        "Cost baseline development & statutory benchmarking",
        "Risk mitigation and contract administration support",
      ],
    };
    setPageData((prev) => ({
      ...prev,
      services: [...prev.services, newService],
    }));
  };

  const handleServiceCardChange = (index: number, field: keyof ServiceCardItem, value: any) => {
    const updated = [...pageData.services];
    updated[index] = { ...updated[index], [field]: value };
    setPageData((prev) => ({ ...prev, services: updated }));
  };

  const removeServiceCard = (index: number) => {
    if (pageData.services.length <= 1) {
      alert("At least one service card must remain.");
      return;
    }
    setPageData((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index),
    }));
  };

  const handleDeliverableChange = (serviceIndex: number, itemIndex: number, value: string) => {
    const updated = [...pageData.services];
    const items = [...updated[serviceIndex].items];
    items[itemIndex] = value;
    updated[serviceIndex].items = items;
    setPageData((prev) => ({ ...prev, services: updated }));
  };

  const addDeliverable = (serviceIndex: number) => {
    const updated = [...pageData.services];
    updated[serviceIndex].items.push("New specialized deliverable item");
    setPageData((prev) => ({ ...prev, services: updated }));
  };

  const removeDeliverable = (serviceIndex: number, itemIndex: number) => {
    const updated = [...pageData.services];
    updated[serviceIndex].items = updated[serviceIndex].items.filter((_, i) => i !== itemIndex);
    setPageData((prev) => ({ ...prev, services: updated }));
  };

  const addBenefit = () => {
    const nextNum = (pageData.benefitsList.length + 1).toString().padStart(2, "0");
    const newBenefit: BenefitItem = {
      id: `benefit-${Date.now()}`,
      number: nextNum,
      title: "Advanced Engineering Delivery",
      desc: "Delivering unparalleled precision through structured commercial governance and certified cost planning.",
    };
    setPageData((prev) => ({
      ...prev,
      benefitsList: [...prev.benefitsList, newBenefit],
    }));
  };

  const handleBenefitChange = (index: number, field: keyof BenefitItem, value: string) => {
    const updated = [...pageData.benefitsList];
    updated[index] = { ...updated[index], [field]: value };
    setPageData((prev) => ({ ...prev, benefitsList: updated }));
  };

  const removeBenefit = (index: number) => {
    if (pageData.benefitsList.length <= 1) {
      alert("At least one benefit item must remain.");
      return;
    }
    setPageData((prev) => ({
      ...prev,
      benefitsList: prev.benefitsList.filter((_, i) => i !== index),
    }));
  };

  // --- Service Details Articles Handlers ---
  const addDetailArticle = () => {
    const nextNum = (detailArticles.length + 1).toString().padStart(2, "0");
    const newArticle: ServiceDetailArticle = {
      id: `service-tab-${detailArticles.length + 1}`,
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
    const updated = [...detailArticles, newArticle];
    setDetailArticles(updated);
    setSelectedDetailIndex(updated.length - 1);
  };

  const removeDetailArticle = (index: number) => {
    if (detailArticles.length <= 1) {
      alert("At least one service detail article must remain.");
      return;
    }
    if (window.confirm(`Are you sure you want to delete service article "${detailArticles[index].tabTitle}"?`)) {
      const updated = detailArticles.filter((_, i) => i !== index);
      setDetailArticles(updated);
      setSelectedDetailIndex(Math.max(0, index - 1));
    }
  };

  const handleDetailFieldChange = (field: keyof ServiceDetailArticle, value: any) => {
    const updated = [...detailArticles];
    updated[selectedDetailIndex] = {
      ...updated[selectedDetailIndex],
      [field]: value,
    };
    setDetailArticles(updated);
  };

  const handleSubsectionChange = (subIndex: number, field: "name" | "detail", value: string) => {
    const updated = [...detailArticles];
    const subList = [...updated[selectedDetailIndex].subsections];
    subList[subIndex] = {
      ...subList[subIndex],
      [field]: value,
    };
    updated[selectedDetailIndex].subsections = subList;
    setDetailArticles(updated);
  };

  const addSubsection = () => {
    const updated = [...detailArticles];
    updated[selectedDetailIndex].subsections.push({
      name: "New Capability or Subsection",
      detail: "Detailed description of this specific technical solution or advisory scope.",
    });
    setDetailArticles(updated);
  };

  const removeSubsection = (subIndex: number) => {
    const updated = [...detailArticles];
    updated[selectedDetailIndex].subsections = updated[selectedDetailIndex].subsections.filter((_, i) => i !== subIndex);
    setDetailArticles(updated);
  };

  // --- Save & Reset ---
  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    updateSection("servicesPage", pageData);
    updateSection("serviceDetailsList", detailArticles);
    setSavedNotice("✓ Services settings and detail articles saved successfully! Changes are live on the website.");
    setTimeout(() => setSavedNotice(null), 3000);
  };

  const handleReset = () => {
    if (window.confirm("Reset all Services components to defaults?")) {
      resetSection("servicesPage");
      resetSection("serviceDetailsList");
      setPageData({ ...content.servicesPage });
      setDetailArticles([...content.serviceDetailsList]);
      setSelectedDetailIndex(0);
      setSavedNotice("✓ Services reset to default content.");
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
            Services Management
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
            Save Services
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

      {/* Internal Sub-Tabs for Services Section */}
      <div
        className="adm-tabs"
      >
        <button
          type="button"
          onClick={() => setSubTab("main")}
          className={`adm-tab ${activeSubTab === "main" ? "active" : ""}`}
        >
          <i className="ri-tools-line" />
          1. Services Overview & Cards ({pageData.services.length} Cards)
        </button>
        <button
          type="button"
          onClick={() => setSubTab("details")}
          className={`adm-tab ${activeSubTab === "details" ? "active" : ""}`}
        >
          <i className="ri-file-list-3-line" />
          2. Service Details Articles ({detailArticles.length} In-Depth Articles)
        </button>
      </div>

      {/* --- SUB-TAB 1: MAIN SERVICES PAGE --- */}
      {activeSubTab === "main" && (
        <div>
          {/* Breadcrumb Banner */}
          <div className="adm-card">
            <h3 className="adm-card-title">
              Hero Breadcrumb Banner
            </h3>
            <div className="row gy-3">
              <div className="col-md-6">
                <label className="adm-label">
                  Banner Title
                </label>
                <input
                  type="text"
                  value={pageData.breadcrumb.title}
                  onChange={(e) => handleBreadcrumbChange("title", e.target.value)}
                  className="adm-input"
                />
              </div>
              <div className="col-md-6">
                <label className="adm-label">
                  Trail Page Name
                </label>
                <input
                  type="text"
                  value={pageData.breadcrumb.pageName}
                  onChange={(e) => handleBreadcrumbChange("pageName", e.target.value)}
                  className="adm-input"
                />
              </div>
            </div>
          </div>

          {/* Intro Section */}
          <div className="adm-card">
            <h3 className="adm-card-title">
              Section Intro
            </h3>
            <div className="row gy-3">
              <div className="col-md-4">
                <label className="adm-label">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={pageData.subtitle}
                  onChange={(e) => setPageData({ ...pageData, subtitle: e.target.value })}
                  className="adm-input"
                />
              </div>
              <div className="col-md-8">
                <label className="adm-label">
                  Title
                </label>
                <input
                  type="text"
                  value={pageData.title}
                  onChange={(e) => setPageData({ ...pageData, title: e.target.value })}
                  className="adm-input adm-input-strong"
                />
              </div>
              <div className="col-12">
                <label className="adm-label">
                  Description Paragraph
                </label>
                <textarea
                  rows={2}
                  value={pageData.description}
                  onChange={(e) => setPageData({ ...pageData, description: e.target.value })}
                  className="adm-input"
                />
              </div>
            </div>
          </div>

          {/* Service Cards (Full CRUD) */}
          <div className="adm-card">
            <div className="adm-card-head">
              <div>
                <h3 className="adm-card-title-inline">
                  Service Cards ({pageData.services.length} Cards)
                </h3>
              </div>
              <button
                type="button"
                onClick={addServiceCard}
                className="adm-btn adm-btn-sm adm-btn-outline"
              >
                <i className="ri-add-line" /> Add New Service Card
              </button>
            </div>

            <div className="row gy-4">
              {pageData.services.map((service, sIndex) => (
                <div key={service.id} className="col-md-6">
                  <div
                    style={{
                      background: "#fbfbfc",
                      border: "1px solid #e7e8ec",
                      padding: "18px",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span
                            style={{
                              fontFamily: "var(--title-font)",
                              fontSize: "18px",
                              fontWeight: 700,
                              color: "#001F5B",
                            }}
                          >
                            {service.num}
                          </span>
                          <strong style={{ fontSize: "14px", color: "#001F5B" }}>Card #{sIndex + 1}</strong>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeServiceCard(sIndex)}
                          className="adm-link-danger"
                        >
                          <i className="ri-delete-bin-line" /> Delete Card
                        </button>
                      </div>

                      <div className="mb-3">
                        <label className="adm-label adm-label-sm">
                          Service Title
                        </label>
                        <input
                          type="text"
                          value={service.title}
                          onChange={(e) => handleServiceCardChange(sIndex, "title", e.target.value)}
                          className="adm-input adm-input-sm adm-input-strong"
                        />
                      </div>

                      <div className="mb-3">
                        <label className="adm-label adm-label-sm">
                          Icon Asset URL
                        </label>
                        <input
                          type="text"
                          value={service.icon}
                          onChange={(e) => handleServiceCardChange(sIndex, "icon", e.target.value)}
                          className="adm-input adm-input-sm"
                        />
                      </div>

                      {/* Deliverables List CRUD */}
                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                          <span style={{ fontSize: "12px", fontWeight: 700, color: "#001F5B" }}>
                            Deliverables / Scopes ({service.items.length}) [CRUD]
                          </span>
                          <button
                            type="button"
                            onClick={() => addDeliverable(sIndex)}
                            className="adm-btn adm-btn-sm"
                          >
                            Add
                          </button>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                          {service.items.map((item, iIndex) => (
                            <div key={iIndex} style={{ display: "flex", gap: "6px" }}>
                              <input
                                type="text"
                                value={item}
                                onChange={(e) => handleDeliverableChange(sIndex, iIndex, e.target.value)}
                                style={{ flex: 1, padding: "5px 8px", border: "1px solid #dcdfe5", fontSize: "12px" }}
                              />
                              <button
                                type="button"
                                onClick={() => removeDeliverable(sIndex, iIndex)}
                                className="adm-btn-danger-soft"
                              >
                                <i className="ri-delete-bin-line" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits (01-04) (Full CRUD) */}
          <div className="adm-card">
            <div className="adm-card-head">
              <div>
                <h3 className="adm-card-title-inline">
                  Key Process Benefits ({pageData.benefitsList.length} Steps)
                </h3>
              </div>
              <button
                type="button"
                onClick={addBenefit}
                className="adm-btn adm-btn-sm"
              >
                <i className="ri-add-line" /> Add Benefit Step
              </button>
            </div>

            <div className="row gy-3 mb-4">
              <div className="col-md-6">
                <label className="adm-label">
                  Benefits Section Subtitle
                </label>
                <input
                  type="text"
                  value={pageData.benefitsSubtitle}
                  onChange={(e) => setPageData({ ...pageData, benefitsSubtitle: e.target.value })}
                  className="adm-input"
                />
              </div>
              <div className="col-md-6">
                <label className="adm-label">
                  Benefits Section Title
                </label>
                <input
                  type="text"
                  value={pageData.benefitsTitle}
                  onChange={(e) => setPageData({ ...pageData, benefitsTitle: e.target.value })}
                  className="adm-input adm-input-strong"
                />
              </div>
            </div>

            <div className="row gy-3">
              {pageData.benefitsList.map((benefit, bIndex) => (
                <div key={benefit.id} className="col-md-6">
                  <div className="adm-item">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <span
                        style={{
                          fontFamily: "var(--title-font)",
                          fontSize: "20px",
                          fontWeight: 700,
                          color: "#001F5B",
                        }}
                      >
                        {benefit.number}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeBenefit(bIndex)}
                        className="adm-link-danger"
                      >
                        <i className="ri-delete-bin-line" /> Delete
                      </button>
                    </div>
                    <div style={{ marginBottom: "8px" }}>
                      <label className="adm-label adm-label-sm">
                        Number (e.g. 01, 02)
                      </label>
                      <input
                        type="text"
                        value={benefit.number}
                        onChange={(e) => handleBenefitChange(bIndex, "number", e.target.value)}
                        className="adm-input adm-input-xs"
                      />
                    </div>
                    <div style={{ marginBottom: "8px" }}>
                      <label className="adm-label adm-label-sm">
                        Title
                      </label>
                      <input
                        type="text"
                        value={benefit.title}
                        onChange={(e) => handleBenefitChange(bIndex, "title", e.target.value)}
                        className="adm-input adm-input-xs adm-input-strong"
                      />
                    </div>
                    <div>
                      <label className="adm-label adm-label-sm">
                        Description
                      </label>
                      <textarea
                        rows={2}
                        value={benefit.desc}
                        onChange={(e) => handleBenefitChange(bIndex, "desc", e.target.value)}
                        className="adm-input adm-input-xs"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- SUB-TAB 2: SERVICE DETAILS IN-DEPTH ARTICLES --- */}
      {activeSubTab === "details" && (
        <div>
          {/* Article Selector & Create / Delete Article */}
          <div className="adm-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
              <div>
                <label style={{ fontSize: "14px", fontWeight: 700, color: "#001F5B" }}>
                  Select Service Article To Edit ({detailArticles.length} Total Articles)
                </label>
              </div>
              <button
                type="button"
                onClick={addDetailArticle}
                className="adm-btn adm-btn-sm adm-btn-outline"
              >
                <i className="ri-add-line" /> Add New Service Article
              </button>
            </div>

            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "15px" }}>
              {detailArticles.map((srv, idx) => (
                <button
                  key={srv.id}
                  type="button"
                  onClick={() => setSelectedDetailIndex(idx)}
                  className={`adm-pill ${selectedDetailIndex === idx ? "active" : ""}`}
                >
                  <span style={{ color: selectedDetailIndex === idx ? "#f15a24" : "#888" }}>{srv.num}</span>
                  {srv.tabTitle}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fbfbfc", padding: "10px 15px", border: "1px solid #e7e8ec" }}>
              <span style={{ fontSize: "13px", color: "#686e7d" }}>
                Currently editing Article <strong>#{selectedArticle.num}: {selectedArticle.tabTitle}</strong>
              </span>
              <button
                type="button"
                onClick={() => removeDetailArticle(selectedDetailIndex)}
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
                  value={selectedArticle.num}
                  onChange={(e) => handleDetailFieldChange("num", e.target.value)}
                  className="adm-input adm-input-sm adm-input-strong"
                />
              </div>
              <div className="col-md-5">
                <label className="adm-label">
                  Sidebar Tab Title
                </label>
                <input
                  type="text"
                  value={selectedArticle.tabTitle}
                  onChange={(e) => handleDetailFieldChange("tabTitle", e.target.value)}
                  className="adm-input adm-input-sm"
                />
              </div>
              <div className="col-md-5">
                <label className="adm-label">
                  URL Tab Key (e.g. service-tab-1)
                </label>
                <input
                  type="text"
                  value={selectedArticle.id}
                  onChange={(e) => handleDetailFieldChange("id", e.target.value)}
                  className="adm-input adm-input-sm"
                />
              </div>

              <div className="col-md-8">
                <label className="adm-label">
                  Main Article Headline
                </label>
                <input
                  type="text"
                  value={selectedArticle.serviceTitle}
                  onChange={(e) => handleDetailFieldChange("serviceTitle", e.target.value)}
                  className="adm-input adm-input-sm adm-input-strong"
                />
              </div>
              <div className="col-md-4">
                <label className="adm-label">
                  Feature Image Asset Path
                </label>
                <input
                  type="text"
                  value={selectedArticle.thumb}
                  onChange={(e) => handleDetailFieldChange("thumb", e.target.value)}
                  className="adm-input adm-input-sm"
                />
              </div>

              <div className="col-12">
                <label className="adm-label">
                  Executive Overview Paragraph
                </label>
                <textarea
                  rows={3}
                  value={selectedArticle.desc}
                  onChange={(e) => handleDetailFieldChange("desc", e.target.value)}
                  className="adm-input adm-input-sm"
                />
              </div>
            </div>

            {/* Subsections CRUD */}
            <div style={{ borderTop: "1px solid #f0f1f4", paddingTop: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                <div>
                  <h4 className="adm-card-title-inline">
                    Subsections & Deliverables ({selectedArticle.subsections.length} Items)
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
                {selectedArticle.subsections.map((sub, subIdx) => (
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
              to={`/service-details?tab=${selectedArticle.id}`}
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

export default AdminServices;
