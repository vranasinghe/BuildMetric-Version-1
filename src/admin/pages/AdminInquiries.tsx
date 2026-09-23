import React, { useCallback, useEffect, useState } from "react";
import { api, formatDate, Inquiry, InquiryStatus, STATUS_COLORS, STATUS_LABELS } from "../../lib/api";

type Stats = Record<"clients" | "inquiries" | InquiryStatus, number>;

const STATUS_ORDER: InquiryStatus[] = ["new", "in_progress", "resolved", "closed"];

const StatusBadge = ({ status }: { status: InquiryStatus }) => (
  <span
    style={{
      background: STATUS_COLORS[status].bg,
      color: STATUS_COLORS[status].fg,
      fontSize: "11px",
      fontWeight: 700,
      padding: "3px 8px",
      textTransform: "uppercase",
      letterSpacing: "0.4px",
      whiteSpace: "nowrap",
    }}
  >
    {STATUS_LABELS[status]}
  </span>
);

const AdminInquiries: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[] | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [filter, setFilter] = useState<"all" | InquiryStatus>("all");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [openId, setOpenId] = useState<number | null>(null);
  const [notes, setNotes] = useState<Record<number, string>>({});

  const load = useCallback(async () => {
    setError("");
    try {
      const qs = new URLSearchParams({ status: filter });
      if (search.trim()) qs.set("q", search.trim());
      const [list, s] = await Promise.all([
        api<{ inquiries: Inquiry[] }>(`/admin/inquiries?${qs}`),
        api<{ stats: Stats }>("/admin/stats"),
      ]);
      setInquiries(list.inquiries);
      setStats(s.stats);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load inquiries.");
    }
  }, [filter, search]);

  useEffect(() => {
    const t = setTimeout(load, 250);
    return () => clearTimeout(t);
  }, [load]);

  const update = async (id: number, body: { status?: InquiryStatus; adminNote?: string }) => {
    try {
      const { inquiry } = await api<{ inquiry: Inquiry }>(`/admin/inquiries/${id}`, { method: "PATCH", body });
      setInquiries((list) => list?.map((i) => (i.id === id ? { ...i, ...inquiry } : i)) ?? null);
      api<{ stats: Stats }>("/admin/stats").then((s) => setStats(s.stats)).catch(() => undefined);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed.");
    }
  };

  const remove = async (id: number) => {
    if (!window.confirm("Delete this inquiry permanently?")) return;
    try {
      await api(`/admin/inquiries/${id}`, { method: "DELETE" });
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed.");
    }
  };

  const card: React.CSSProperties = { background: "#ffffff", border: "1px solid #e7e8ec" };

  return (
    <div>
      <div style={{ marginBottom: "22px" }}>
        <span style={{ fontSize: "12px", color: "#f15a24", fontWeight: 700, textTransform: "uppercase" }}>Clients: INQUIRIES</span>
        <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#001F5B", margin: "4px 0 0 0" }}>Client Inquiries</h2>
      </div>

      {stats && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "12px", marginBottom: "20px" }}>
          {[
            { label: "Total inquiries", value: stats.inquiries, color: "#001F5B" },
            ...STATUS_ORDER.map((s) => ({ label: STATUS_LABELS[s], value: stats[s], color: STATUS_COLORS[s].fg })),
            { label: "Registered clients", value: stats.clients, color: "#001F5B" },
          ].map((s) => (
            <div key={s.label} style={{ ...card, padding: "14px 16px" }}>
              <div style={{ fontSize: "26px", fontWeight: 700, color: s.color, lineHeight: 1.1 }}>{s.value}</div>
              <div style={{ fontSize: "12px", color: "#686e7d", marginTop: "4px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "16px" }}>
        {(["all", ...STATUS_ORDER] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilter(s)}
            style={{
              padding: "8px 14px",
              fontSize: "13px",
              fontWeight: 700,
              cursor: "pointer",
              border: "1px solid",
              borderColor: filter === s ? "#001F5B" : "#e7e8ec",
              background: filter === s ? "#001F5B" : "#ffffff",
              color: filter === s ? "#ffffff" : "#141d30",
            }}
          >
            {s === "all" ? "All" : STATUS_LABELS[s]}
          </button>
        ))}
        <input
          type="search"
          placeholder="Search name, email, service or message"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: "1 1 240px", height: "38px", padding: "0 12px", border: "1px solid #e7e8ec", fontSize: "13px", fontFamily: "inherit" }}
        />
      </div>

      {error && (
        <div style={{ background: "#fdecec", color: "#991b1b", padding: "12px 16px", marginBottom: "16px", borderLeft: "4px solid #dc2626", fontSize: "14px" }}>
          {error}
        </div>
      )}

      {inquiries === null && !error && <div style={{ color: "#686e7d" }}>Loading inquiries...</div>}
      {inquiries && inquiries.length === 0 && (
        <div style={{ ...card, padding: "40px", textAlign: "center", color: "#686e7d" }}>
          No inquiries {filter !== "all" ? `with status "${STATUS_LABELS[filter]}"` : "yet"}.
        </div>
      )}

      {inquiries?.map((inq) => {
        const open = openId === inq.id;
        const note = notes[inq.id] ?? inq.admin_note ?? "";
        return (
          <div key={inq.id} style={{ ...card, marginBottom: "10px", borderLeft: `4px solid ${STATUS_COLORS[inq.status].fg}` }}>
            <button
              type="button"
              onClick={() => setOpenId(open ? null : inq.id)}
              style={{ width: "100%", background: "none", border: "none", textAlign: "left", padding: "14px 18px", cursor: "pointer", display: "flex", gap: "14px", alignItems: "center", flexWrap: "wrap", fontFamily: "inherit" }}
            >
              <div style={{ flex: "1 1 220px", minWidth: 0 }}>
                <div style={{ fontWeight: 700, color: "#141d30", fontSize: "15px" }}>
                  {inq.name} <span style={{ fontWeight: 400, color: "#686e7d", fontSize: "13px" }}>· {inq.email}</span>
                </div>
                <div style={{ fontSize: "13px", color: "#686e7d", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  <strong style={{ color: "#263b82" }}>{inq.service || "General"}</strong> — {inq.message}
                </div>
              </div>
              <div style={{ fontSize: "12px", color: "#686e7d", whiteSpace: "nowrap" }}>{formatDate(inq.created_at)}</div>
              <StatusBadge status={inq.status} />
              <i className={open ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line"} style={{ fontSize: "18px", color: "#686e7d" }} />
            </button>

            {open && (
              <div style={{ padding: "0 18px 18px", borderTop: "1px solid #f0f1f3" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "10px", fontSize: "13px", margin: "14px 0" }}>
                  <div><span style={{ color: "#686e7d" }}>Email:</span> <a href={`mailto:${inq.email}`}>{inq.email}</a></div>
                  <div><span style={{ color: "#686e7d" }}>Phone:</span> {inq.phone ? <a href={`tel:${inq.phone}`}>{inq.phone}</a> : "—"}</div>
                  <div><span style={{ color: "#686e7d" }}>Sent from:</span> {inq.source_page || "—"}</div>
                  <div><span style={{ color: "#686e7d" }}>Account:</span> {inq.account_name}</div>
                </div>
                <div style={{ background: "#f8f9fb", padding: "14px", fontSize: "14px", whiteSpace: "pre-wrap", color: "#141d30", marginBottom: "14px" }}>
                  {inq.message}
                </div>

                <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap", marginBottom: "12px" }}>
                  <label style={{ fontSize: "13px", fontWeight: 600 }} htmlFor={`status-${inq.id}`}>Status</label>
                  <select
                    id={`status-${inq.id}`}
                    value={inq.status}
                    onChange={(e) => update(inq.id, { status: e.target.value as InquiryStatus })}
                    style={{ height: "36px", padding: "0 10px", border: "1px solid #e7e8ec", fontFamily: "inherit" }}
                  >
                    {STATUS_ORDER.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
                  </select>
                  <span style={{ fontSize: "12px", color: "#686e7d" }}>Updated {formatDate(inq.updated_at)}</span>
                </div>

                <label style={{ fontSize: "13px", fontWeight: 600, display: "block", marginBottom: "6px" }} htmlFor={`note-${inq.id}`}>
                  Internal note (only admins see this)
                </label>
                <textarea
                  id={`note-${inq.id}`}
                  value={note}
                  onChange={(e) => setNotes({ ...notes, [inq.id]: e.target.value })}
                  rows={2}
                  maxLength={2000}
                  style={{ width: "100%", padding: "10px", border: "1px solid #e7e8ec", fontFamily: "inherit", fontSize: "13px" }}
                />
                <div style={{ display: "flex", gap: "10px", marginTop: "10px", flexWrap: "wrap" }}>
                  <button
                    type="button"
                    disabled={note === (inq.admin_note ?? "")}
                    onClick={() => update(inq.id, { adminNote: note })}
                    style={{ padding: "8px 16px", background: "#001F5B", color: "#fff", border: "none", fontWeight: 700, fontSize: "13px", cursor: "pointer", opacity: note === (inq.admin_note ?? "") ? 0.5 : 1 }}
                  >
                    Save note
                  </button>
                  <a
                    href={`mailto:${inq.email}?subject=${encodeURIComponent("Re: your BuildMetric inquiry")}`}
                    style={{ padding: "8px 16px", background: "#f15a24", color: "#fff", fontWeight: 700, fontSize: "13px", textDecoration: "none" }}
                  >
                    Reply by email
                  </a>
                  <button
                    type="button"
                    onClick={() => remove(inq.id)}
                    style={{ padding: "8px 16px", background: "#ffffff", color: "#b91c1c", border: "1px solid #f3c4c4", fontWeight: 700, fontSize: "13px", cursor: "pointer", marginLeft: "auto" }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AdminInquiries;
