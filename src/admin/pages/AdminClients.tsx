import { useEffect, useState } from "react";
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

const AdminClients = () => {
  const [clients, setClients] = useState<Client[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api<{ clients: Client[] }>("/admin/clients")
      .then((d) => setClients(d.clients))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <div className="adm-page-head">
        <div>
          <span className="adm-eyebrow">Clients</span>
          <h1 className="adm-page-title">
            Registered Clients {clients && <span style={{ color: "#737373", fontWeight: 600 }}>({clients.length})</span>}
          </h1>
          <p className="adm-page-sub">Everyone who has created an account on the website.</p>
        </div>
      </div>

      {error && <div className="adm-notice adm-notice-error">{error}</div>}
      {clients === null && !error && <div className="adm-empty">Loading clients...</div>}

      {clients && (
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Registered</th>
                <th>Inquiries</th>
                <th>Last inquiry</th>
              </tr>
            </thead>
            <tbody>
              {clients.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", color: "#737373", padding: 40 }}>No clients have registered yet.</td>
                </tr>
              )}
              {clients.map((c) => (
                <tr key={c.id}>
                  <td style={{ fontWeight: 700 }}>{c.name}</td>
                  <td><a href={`mailto:${c.email}`}>{c.email}</a></td>
                  <td>{c.phone || "—"}</td>
                  <td>{formatDate(c.created_at)}</td>
                  <td style={{ fontWeight: 700, color: "#001f5b" }}>{c.inquiry_count}</td>
                  <td>{c.last_inquiry_at ? formatDate(c.last_inquiry_at) : "—"}</td>
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
