import React, { useState } from "react";
import { useContent } from "../ContentContext";

const AdminBackup: React.FC = () => {
  const { exportJSON, importJSON, resetAll } = useContent();
  const [jsonText, setJsonText] = useState("");
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setJsonText(result);
        const res = importJSON(result);
        if (res.success) {
          setStatusMsg({ type: "success", text: res.message });
        } else {
          setStatusMsg({ type: "error", text: res.message });
        }
      }
    };
    reader.readAsText(file);
  };

  const handleManualImport = () => {
    if (!jsonText.trim()) {
      setStatusMsg({ type: "error", text: "Please paste valid JSON before importing." });
      return;
    }
    const res = importJSON(jsonText);
    if (res.success) {
      setStatusMsg({ type: "success", text: res.message });
    } else {
      setStatusMsg({ type: "error", text: res.message });
    }
  };

  const handleFullReset = () => {
    if (window.confirm("CAUTION: This will reset ALL components, texts, and slides across the entire site to original factory defaults. Continue?")) {
      resetAll();
      setStatusMsg({ type: "success", text: "Entire website reset to factory defaults successfully." });
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "25px" }}>
        <span className="adm-eyebrow">
          System Tools
        </span>
        <h2 className="adm-page-title">
          Data Backup, Export & Factory Reset
        </h2>
      </div>

      {statusMsg && (
        <div
          style={{
            backgroundColor: statusMsg.type === "success" ? "#e3fcef" : "#ffebe6",
            color: statusMsg.type === "success" ? "#008060" : "#de3618",
            padding: "12px 18px",
            marginBottom: "20px",
            borderLeft: `4px solid ${statusMsg.type === "success" ? "#008060" : "#de3618"}`,
            fontWeight: 600,
            fontSize: "14px",
          }}
        >
          {statusMsg.text}
        </div>
      )}

      {/* Export Section */}
      <div className="adm-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "15px" }}>
          <div>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#001F5B", margin: "0 0 4px 0" }}>
              1. Export Full Site Configuration (.JSON)
            </h3>
            <p style={{ margin: 0, color: "#686e7d", fontSize: "13px" }}>
              Download a complete snapshot of all your edited components, slides, texts, services, and contacts.
            </p>
          </div>
          <button
            type="button"
            onClick={exportJSON}
            className="adm-btn"
          >
            <i className="ri-download-2-line" />
            Download Backup File
          </button>
        </div>
      </div>

      {/* Import Section */}
      <div className="adm-card">
        <h3 className="adm-card-title">
          2. Import Configuration from Backup File
        </h3>
        <p style={{ margin: "0 0 16px 0", color: "#686e7d", fontSize: "13px" }}>
          Upload a previously exported JSON file or paste the JSON text directly below to restore your edits.
        </p>

        <div style={{ marginBottom: "16px" }}>
          <input
            type="file"
            accept=".json,application/json"
            onChange={handleFileUpload}
            className="adm-file"
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label className="adm-label">
            Or Paste JSON Configuration Content:
          </label>
          <textarea
            rows={6}
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            placeholder='{"header": { ... }, "homeHero": [ ... ]}'
            style={{
              width: "100%",
              padding: "10px 12px",
              border: "1px solid #dcdfe5",
              fontFamily: "monospace",
              fontSize: "12px",
            }}
          />
        </div>

        <button
          type="button"
          onClick={handleManualImport}
          className="adm-btn adm-btn-accent"
        >
          <i className="ri-upload-2-line" />
          Apply & Restore JSON
        </button>
      </div>

      {/* Danger Zone: Factory Reset */}
      <div style={{ background: "#ffffff", border: "1px solid #ffccd2", borderLeft: "5px solid #d13b3b", padding: "25px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#d13b3b", margin: "0 0 6px 0" }}>
          3. Factory Reset Entire Website
        </h3>
        <p style={{ margin: "0 0 16px 0", color: "#686e7d", fontSize: "13px" }}>
          Permanently clear all saved changes from browser memory and revert every single page and component to the original default state.
        </p>
        <button
          type="button"
          onClick={handleFullReset}
          className="adm-btn adm-btn-danger"
        >
          <i className="ri-refresh-line" />
          Reset All to Factory Defaults
        </button>
      </div>
    </div>
  );
};

export default AdminBackup;
