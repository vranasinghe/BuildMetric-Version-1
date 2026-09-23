import React, { useEffect, useState } from "react";
import { api, formatDate } from "../../lib/api";

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  created_at: string;
  inquiry_count: number;
  last_inquiry_at: string | null;
}

const th: React.CSSProperties = {
  textAlign: "left",
  padding: "12px 14px",
  fontSize: "12px",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  color: "#686e7d",
  borderBottom: "1px solid #e7e8ec",
  whiteSpace: "nowrap",
};
const td: React.CSSProperties = { padding: "12px 14px", fontSize: "14px", borderBottom: "1px solid #f0f1f3", color: "#141d30" };

const AdminClients: React.FC = () => {
  const [clients, setClients] = useState<Client[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api<{ clients: Client[] }>("/admin/clients")
      .then((d) => setClients(d.clients))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <div style={{ marginBottom: "22px" }}>
        <span style={{ fontSize: "12px", color: "#f15a24", fontWeight: 700, textTransform: "uppercase" }}>Clients: ACCOUNTS</span>
        <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#001F5B", margin: "4px 0 0 0" }}>
          Registered Clients {clients && <span style={{ color: "#686e7d", fontSize: "18px" }}>({clients.length})</span>}
        </h2>
      </div>

      {error && (
        <div style={{ background: "#fdecec", color: "#991b1b", padding: "12px 16px", marginBottom: "16px", borderLeft: "4px solid #dc2626", fontSize: "14px" }}>
          {error}
        </div>
      )}
      {clients === null && !error && <div style={{ color: "#686e7d" }}>Loading clients...</div>}

      {clients && (
        <div style={{ background: "#ffffff", border: "1px solid #e7e8ec", overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "640px" }}>
            <thead>
              <tr>
                <th style={th}>Name</th>
                <th style={th}>Email</th>
                <th style={th}>Phone</th>
                <th style={th}>Registered</th>
                <th style={th}>Inquiries</th>
                <th style={th}>Last inquiry</th>
              </tr>
            </thead>
            <tbody>
              {clients.length === 0 && (
                <tr><td style={{ ...td, textAlign: "center", color: "#686e7d" }} colSpan={6}>No clients have registered yet.</td></tr>
              )}
              {clients.map((c) => (
                <tr key={c.id}>
                  <td style={{ ...td, fontWeight: 700 }}>{c.name}</td>
                  <td style={td}><a href={`mailto:${c.email}`}>{c.email}</a></td>
                  <td style={td}>{c.phone || "—"}</td>
                  <td style={td}>{formatDate(c.created_at)}</td>
                  <td style={{ ...td, fontWeight: 700, color: "#001F5B" }}>{c.inquiry_count}</td>
                  <td style={td}>{c.last_inquiry_at ? formatDate(c.last_inquiry_at) : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminClients;
