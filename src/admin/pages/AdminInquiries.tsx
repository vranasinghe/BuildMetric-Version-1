import React, { useCallback, useEffect, useState } from "react";
import { api, formatDate, Inquiry, InquiryStatus, STATUS_COLORS, STATUS_LABELS } from "../../lib/api";

type Stats = Record<"clients" | "inquiries" | InquiryStatus, number>;

const STATUS_ORDER: InquiryStatus[] = ["new", "in_progress", "resolved", "closed"];

const StatusBadge = ({ status }: { status: InquiryStatus }) => (
  <span className="adm-status" style={{ background: STATUS_COLORS[status].bg, color: STATUS_COLORS[status].fg }}>
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

  return (
    <div>
      <div className="adm-page-head">
        <div>
          <span className="adm-eyebrow">Clients</span>
          <h1 className="adm-page-title">Client Inquiries</h1>
          <p className="adm-page-sub">Messages sent by logged-in clients from the website inquiry forms.</p>
        </div>
      </div>

      {stats && (
        <div className="adm-stats">
          {[
            { label: "Total inquiries", value: stats.inquiries, color: "#001f5b" },
            ...STATUS_ORDER.map((s) => ({ label: STATUS_LABELS[s], value: stats[s], color: STATUS_COLORS[s].fg })),
            { label: "Registered clients", value: stats.clients, color: "#15161c" },
          ].map((s) => (
            <div key={s.label} className="adm-stat" style={{ "--stat-color": s.color } as React.CSSProperties}>
              <div className="adm-stat-value">{s.value}</div>
              <div className="adm-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      )}

      <div className="adm-tabs" style={{ marginBottom: 18 }}>
        {(["all", ...STATUS_ORDER] as const).map((s) => (
          <button key={s} type="button" onClick={() => setFilter(s)} className={`adm-tab ${filter === s ? "active" : ""}`}>
            {s === "all" ? "All" : STATUS_LABELS[s]}
            {stats && <span style={{ fontWeight: 600, opacity: 0.7 }}>({s === "all" ? stats.inquiries : stats[s]})</span>}
          </button>
        ))}
      </div>

      <div className="adm-toolbar">
        <div className="adm-search">
          <i className="ri-search-line" />
          <input
            type="search"
            placeholder="Search by name, email, service or message"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search inquiries"
          />
        </div>
      </div>

      {error && <div className="adm-notice adm-notice-error">{error}</div>}

      {inquiries === null && !error && <div className="adm-empty">Loading inquiries...</div>}
      {inquiries && inquiries.length === 0 && (
        <div className="adm-empty">
          No inquiries {filter !== "all" ? `with status "${STATUS_LABELS[filter]}"` : "yet"}.
        </div>
      )}

      {inquiries?.map((inq) => {
        const open = openId === inq.id;
        const note = notes[inq.id] ?? inq.admin_note ?? "";
        const noteUnchanged = note === (inq.admin_note ?? "");
        return (
          <div key={inq.id} className="adm-inquiry" style={{ "--row-color": STATUS_COLORS[inq.status].fg } as React.CSSProperties}>
            <button type="button" className="adm-inquiry-summary" onClick={() => setOpenId(open ? null : inq.id)} aria-expanded={open}>
              <div className="adm-inquiry-who">
                <div className="adm-inquiry-name">
                  {inq.name} <span>· {inq.email}</span>
                </div>
                <div className="adm-inquiry-preview">
                  <strong>{inq.service || "General"}</strong> — {inq.message}
                </div>
              </div>
              <div className="adm-inquiry-date">{formatDate(inq.created_at)}</div>
              <StatusBadge status={inq.status} />
              <i className={open ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line"} style={{ fontSize: 20, color: "#737373" }} />
            </button>

            {open && (
              <div className="adm-inquiry-body">
                <div className="adm-detail-grid">
                  <div><span>Email</span><a href={`mailto:${inq.email}`}>{inq.email}</a></div>
                  <div><span>Phone</span>{inq.phone ? <a href={`tel:${inq.phone}`}>{inq.phone}</a> : "—"}</div>
                  <div><span>Sent from</span>{inq.source_page || "—"}</div>
                  <div><span>Account</span>{inq.account_name}</div>
                </div>
                <div className="adm-message">{inq.message}</div>

                <div className="row gy-3">
                  <div className="col-md-4">
                    <label className="adm-label" htmlFor={`status-${inq.id}`}>Status</label>
                    <select
                      id={`status-${inq.id}`}
                      className="adm-input"
                      value={inq.status}
                      onChange={(e) => update(inq.id, { status: e.target.value as InquiryStatus })}
                    >
                      {STATUS_ORDER.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
                    </select>
                    <div style={{ fontSize: 13, color: "#737373", marginTop: 6 }}>Updated {formatDate(inq.updated_at)}</div>
                  </div>
                  <div className="col-md-8">
                    <label className="adm-label" htmlFor={`note-${inq.id}`}>Internal note <span style={{ fontWeight: 400, color: "#737373" }}>(only admins see this)</span></label>
                    <textarea
                      id={`note-${inq.id}`}
                      className="adm-input"
                      value={note}
                      onChange={(e) => setNotes({ ...notes, [inq.id]: e.target.value })}
                      rows={3}
                      maxLength={2000}
                    />
                  </div>
                </div>

                <div className="adm-actions" style={{ marginTop: 16 }}>
                  <button type="button" className="adm-btn adm-btn-sm" disabled={noteUnchanged} onClick={() => update(inq.id, { adminNote: note })}>
                    <i className="ri-save-line" /> Save Note
                  </button>
                  <a href={`mailto:${inq.email}?subject=${encodeURIComponent("Re: your BuildMetric inquiry")}`} className="adm-btn adm-btn-sm adm-btn-outline">
                    <i className="ri-reply-line" /> Reply by Email
                  </a>
                  <button type="button" className="adm-btn-danger-soft" style={{ marginLeft: "auto" }} onClick={() => remove(inq.id)}>
                    <i className="ri-delete-bin-line" /> Delete
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
