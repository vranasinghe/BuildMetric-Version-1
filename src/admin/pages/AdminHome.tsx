import React, { useState } from "react";
import { useContent } from "../ContentContext";
import { HeroSlide, CounterItem, HomeAboutContent, CtaContent } from "../types";

const AdminHome: React.FC = () => {
  const { content, updateSection, resetSection } = useContent();

  const [activeTab, setActiveTab] = useState<"hero" | "counter" | "about" | "cta">("hero");
  const [slides, setSlides] = useState<HeroSlide[]>([...content.homeHero]);
  const [counters, setCounters] = useState<CounterItem[]>([...content.homeCounter]);
  const [homeAbout, setHomeAbout] = useState<HomeAboutContent>({ ...content.homeAbout });
  const [cta, setCta] = useState<CtaContent>({ ...content.ctaFour });
  const [savedNotice, setSavedNotice] = useState(false);

  // Hero Slides CRUD
  const handleSlideChange = (index: number, field: keyof HeroSlide, value: string) => {
    const updated = [...slides];
    updated[index] = { ...updated[index], [field]: value };
    setSlides(updated);
  };

  const addSlide = () => {
    const newSlide: HeroSlide = {
      id: `slide-${Date.now()}`,
      subtitle: "Engineering Excellence",
      title: "New High-Impact Construction Project Headline",
      text: "Transforming vision into sustainable reality with certified project commercial and technical excellence.",
      bgImage: "/assets/img/hero/hero_bg_4_1.png",
      btnText: "Discover More",
      btnLink: "/about",
    };
    setSlides([...slides, newSlide]);
  };

  const removeSlide = (index: number) => {
    if (slides.length <= 1) {
      alert("At least one slide must remain in the hero section.");
      return;
    }
    setSlides(slides.filter((_, i) => i !== index));
  };

  // Counter Statistics CRUD
  const handleCounterChange = (index: number, field: keyof CounterItem, value: any) => {
    const updated = [...counters];
    updated[index] = { ...updated[index], [field]: value };
    setCounters(updated);
  };

  const addCounter = () => {
    const newCounter: CounterItem = {
      id: `counter-${Date.now()}`,
      number: 100,
      suffix: "+",
      label: "New Project Metric",
    };
    setCounters([...counters, newCounter]);
  };

  const removeCounter = (index: number) => {
    if (counters.length <= 1) {
      alert("At least one counter item must remain.");
      return;
    }
    setCounters(counters.filter((_, i) => i !== index));
  };

  // About Teaser Checklist CRUD
  const handleChecklistChange = (index: number, value: string) => {
    const updated = [...homeAbout.checklist];
    updated[index] = value;
    setHomeAbout((prev) => ({ ...prev, checklist: updated }));
  };

  const addChecklistItem = () => {
    setHomeAbout((prev) => ({
      ...prev,
      checklist: [...prev.checklist, "New certified engineering milestone or service highlight"],
    }));
  };

  const removeChecklistItem = (index: number) => {
    setHomeAbout((prev) => ({
      ...prev,
      checklist: prev.checklist.filter((_, i) => i !== index),
    }));
  };

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    updateSection("homeHero", slides);
    updateSection("homeCounter", counters);
    updateSection("homeAbout", homeAbout);
    updateSection("ctaFour", cta);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div>
      <div className="adm-page-head">
        <div>
          <span className="adm-eyebrow">
            Header: HOME
          </span>
          <h2 className="adm-page-title">
            Home Page Components Editor
          </h2>
        </div>
        <div className="adm-actions">
          <button
            type="button"
            onClick={() => {
              if (window.confirm("Reset all Home Page components to defaults?")) {
                resetSection("homeHero");
                resetSection("homeCounter");
                resetSection("homeAbout");
                resetSection("ctaFour");
                setSlides([...content.homeHero]);
                setCounters([...content.homeCounter]);
                setHomeAbout({ ...content.homeAbout });
                setCta({ ...content.ctaFour });
                setSavedNotice(true);
                setTimeout(() => setSavedNotice(false), 3000);
              }
            }}
            className="adm-btn adm-btn-ghost"
          >
            Reset Defaults
          </button>
          <button
            onClick={handleSaveAll}
            className="adm-btn"
          >
            <i className="ri-save-line" />
            Save Home Page
          </button>
        </div>
      </div>

      {savedNotice && (
        <div
          className="adm-notice"
        >
          ✓ Home components saved successfully! Check the home page to see changes.
        </div>
      )}

      {/* Sub tabs for Home components */}
      <div
        className="adm-tabs"
      >
        {[
          { id: "hero", label: `Hero Slider (${slides.length} Slides)`, badge: "CRUD" },
          { id: "counter", label: `Counter Stats (${counters.length} Metrics)`, badge: "CRUD" },
          { id: "about", label: `About Teaser (${homeAbout.checklist.length} Highlights)`, badge: "CRUD" },
          { id: "cta", label: "Renovation CTA Banner", badge: "Live" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`adm-tab ${activeTab === tab.id ? "active" : ""}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Hero Slides (Full CRUD) */}
      {activeTab === "hero" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
            <p style={{ fontSize: "14px", color: "#686e7d", margin: 0 }}>
              Manage full slider banner cards displayed on the homepage hero area.
            </p>
            <button
              type="button"
              onClick={addSlide}
              className="adm-btn adm-btn-sm adm-btn-outline"
            >
              <i className="ri-add-line" /> Add New Slide
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                style={{
                  background: "#ffffff",
                  border: "1px solid #e7e8ec",
                  borderLeft: "4px solid #f15a24",
                  padding: "20px",
                }}
              >
                <div className="adm-card-head">
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ background: "#001F5B", color: "#ffffff", padding: "3px 8px", fontSize: "11px", fontWeight: 700 }}>
                      Slide #{index + 1}
                    </span>
                    <strong style={{ fontSize: "15px", color: "#001F5B" }}>{slide.title}</strong>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSlide(index)}
                    className="adm-btn-danger-soft"
                  >
                    <i className="ri-delete-bin-line" /> Delete Slide
                  </button>
                </div>

                <div className="row gy-3">
                  <div className="col-md-4">
                    <label className="adm-label">
                      Subtitle Badge
                    </label>
                    <input
                      type="text"
                      value={slide.subtitle}
                      onChange={(e) => handleSlideChange(index, "subtitle", e.target.value)}
                      className="adm-input adm-input-sm"
                    />
                  </div>
                  <div className="col-md-8">
                    <label className="adm-label">
                      Main Headline
                    </label>
                    <input
                      type="text"
                      value={slide.title}
                      onChange={(e) => handleSlideChange(index, "title", e.target.value)}
                      className="adm-input adm-input-sm adm-input-strong"
                    />
                  </div>
                  <div className="col-12">
                    <label className="adm-label">
                      Description Paragraph
                    </label>
                    <textarea
                      rows={2}
                      value={slide.text}
                      onChange={(e) => handleSlideChange(index, "text", e.target.value)}
                      className="adm-input adm-input-sm"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="adm-label">
                      Background Image URL
                    </label>
                    <input
                      type="text"
                      value={slide.bgImage}
                      onChange={(e) => handleSlideChange(index, "bgImage", e.target.value)}
                      className="adm-input adm-input-sm"
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="adm-label">
                      Button Label
                    </label>
                    <input
                      type="text"
                      value={slide.btnText}
                      onChange={(e) => handleSlideChange(index, "btnText", e.target.value)}
                      className="adm-input adm-input-sm"
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="adm-label">
                      Button Link
                    </label>
                    <input
                      type="text"
                      value={slide.btnLink}
                      onChange={(e) => handleSlideChange(index, "btnLink", e.target.value)}
                      className="adm-input adm-input-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Counter Statistics (Full CRUD) */}
      {activeTab === "counter" && (
        <div className="adm-card">
          <div className="adm-card-head">
            <div>
              <h3 className="adm-card-title-inline">
                Home Counter Statistics ({counters.length} Metrics)
              </h3>
            </div>
            <button
              type="button"
              onClick={addCounter}
              className="adm-btn adm-btn-sm adm-btn-outline"
            >
              <i className="ri-add-line" /> Add New Metric
            </button>
          </div>

          <div className="row gy-4">
            {counters.map((c, idx) => (
              <div key={c.id} className="col-md-6">
                <div className="adm-item">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                    <span style={{ fontSize: "12px", fontWeight: 700, color: "#001F5B" }}>
                      Metric #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeCounter(idx)}
                      className="adm-link-danger"
                    >
                      <i className="ri-delete-bin-line" /> Delete
                    </button>
                  </div>
                  <div className="row gy-2">
                    <div className="col-3">
                      <label className="adm-label adm-label-sm">
                        Prefix (e.g. $)
                      </label>
                      <input
                        type="text"
                        value={c.prefix || ""}
                        placeholder="$"
                        onChange={(e) => handleCounterChange(idx, "prefix", e.target.value)}
                        className="adm-input adm-input-sm adm-input-strong"
                      />
                    </div>
                    <div className="col-5">
                      <label className="adm-label adm-label-sm">
                        Number Value
                      </label>
                      <input
                        type="number"
                        value={c.number}
                        onChange={(e) => handleCounterChange(idx, "number", parseInt(e.target.value) || 0)}
                        className="adm-input adm-input-sm adm-input-strong"
                      />
                    </div>
                    <div className="col-4">
                      <label className="adm-label adm-label-sm">
                        Suffix (e.g. +, B+, %)
                      </label>
                      <input
                        type="text"
                        value={c.suffix}
                        onChange={(e) => handleCounterChange(idx, "suffix", e.target.value)}
                        className="adm-input adm-input-sm adm-input-strong"
                      />
                    </div>
                    <div className="col-12">
                      <label className="adm-label adm-label-sm">
                        Primary Title / Label
                      </label>
                      <input
                        type="text"
                        value={c.label}
                        onChange={(e) => handleCounterChange(idx, "label", e.target.value)}
                        className="adm-input adm-input-sm adm-input-strong"
                      />
                    </div>
                    <div className="col-8">
                      <label className="adm-label adm-label-sm">
                        Consultancy Subtext / Detail
                      </label>
                      <input
                        type="text"
                        value={c.sublabel || ""}
                        placeholder="e.g. Strategic Cost & Commercial Management"
                        onChange={(e) => handleCounterChange(idx, "sublabel", e.target.value)}
                        className="adm-input adm-input-sm"
                      />
                    </div>
                    <div className="col-4">
                      <label className="adm-label adm-label-sm">
                        Icon (RemixIcon)
                      </label>
                      <input
                        type="text"
                        value={c.icon || ""}
                        placeholder="ri-funds-line"
                        onChange={(e) => handleCounterChange(idx, "icon", e.target.value)}
                        className="adm-input adm-input-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: About Teaser (Full CRUD for Checklist) */}
      {activeTab === "about" && (
        <div className="adm-card">
          <h3 className="adm-card-title">
            Homepage About Teaser Section
          </h3>
          <div className="row gy-3 mb-4">
            <div className="col-md-4">
              <label className="adm-label">
                Section Tag / Subtitle
              </label>
              <input
                type="text"
                value={homeAbout.subtitle}
                onChange={(e) => setHomeAbout({ ...homeAbout, subtitle: e.target.value })}
                className="adm-input adm-input-sm"
              />
            </div>
            <div className="col-md-8">
              <label className="adm-label">
                Main Headline
              </label>
              <input
                type="text"
                value={homeAbout.title}
                onChange={(e) => setHomeAbout({ ...homeAbout, title: e.target.value })}
                className="adm-input adm-input-sm adm-input-strong"
              />
            </div>
            <div className="col-12">
              <label className="adm-label">
                Primary Narrative
              </label>
              <textarea
                rows={3}
                value={homeAbout.desc1}
                onChange={(e) => setHomeAbout({ ...homeAbout, desc1: e.target.value })}
                className="adm-input adm-input-sm"
              />
            </div>
            <div className="col-md-6">
              <label className="adm-label">
                Years Experience Number
              </label>
              <input
                type="number"
                value={homeAbout.experienceYears}
                onChange={(e) => setHomeAbout({ ...homeAbout, experienceYears: parseInt(e.target.value) || 0 })}
                className="adm-input adm-input-sm"
              />
            </div>
            <div className="col-md-6">
              <label className="adm-label">
                Experience Badge Label
              </label>
              <input
                type="text"
                value={homeAbout.experienceLabel}
                onChange={(e) => setHomeAbout({ ...homeAbout, experienceLabel: e.target.value })}
                className="adm-input adm-input-sm"
              />
            </div>
          </div>

          {/* Checklist CRUD */}
          <div style={{ borderTop: "1px solid #f0f1f4", paddingTop: "18px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <strong style={{ fontSize: "14px", color: "#001F5B" }}>
                Highlights Checklist ({homeAbout.checklist.length} Points) [CRUD]
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
              {homeAbout.checklist.map((item, i) => (
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
      )}

      {/* Tab 4: Renovation CTA */}
      {activeTab === "cta" && (
        <div className="adm-card">
          <h3 className="adm-card-title">
            Home Renovation Callout Banner
          </h3>
          <div className="row gy-3">
            <div className="col-md-6">
              <label className="adm-label">
                Headline Line 1
              </label>
              <input
                type="text"
                value={cta.title1}
                onChange={(e) => setCta({ ...cta, title1: e.target.value })}
                className="adm-input adm-input-sm adm-input-strong"
              />
            </div>
            <div className="col-md-6">
              <label className="adm-label">
                Headline Line 2 (Orange Accent)
              </label>
              <input
                type="text"
                value={cta.title2}
                onChange={(e) => setCta({ ...cta, title2: e.target.value })}
                style={{ width: "100%", padding: "8px 10px", border: "1px solid #dcdfe5", fontSize: "13px", fontWeight: 700, color: "#001F5B" }}
              />
            </div>
            <div className="col-md-6">
              <label className="adm-label">
                Button Text
              </label>
              <input
                type="text"
                value={cta.btnText}
                onChange={(e) => setCta({ ...cta, btnText: e.target.value })}
                className="adm-input adm-input-sm"
              />
            </div>
            <div className="col-md-6">
              <label className="adm-label">
                Button Link
              </label>
              <input
                type="text"
                value={cta.btnLink}
                onChange={(e) => setCta({ ...cta, btnLink: e.target.value })}
                className="adm-input adm-input-sm"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHome;
