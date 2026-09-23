// Small wrapper around fetch for the BuildMetric API (/api/*).
// The session is an httpOnly cookie, so requests just need credentials included.

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export async function api<T>(path: string, options: { method?: string; body?: unknown } = {}): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`/api${path}`, {
      method: options.method || "GET",
      credentials: "include",
      headers: options.body !== undefined ? { "Content-Type": "application/json" } : undefined,
      body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    });
  } catch {
    throw new ApiError("Cannot reach the server. Please check your connection and try again.", 0);
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new ApiError(data.error || "Something went wrong. Please try again.", res.status);
  }
  return data as T;
}

export type InquiryStatus = "new" | "in_progress" | "resolved" | "closed";

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  role: "client" | "admin";
  createdAt: string;
}

export interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
  source_page: string | null;
  status: InquiryStatus;
  admin_note: string | null;
  created_at: string;
  updated_at: string;
  user_id?: number;
  account_name?: string;
}

export const STATUS_LABELS: Record<InquiryStatus, string> = {
  new: "New",
  in_progress: "In Progress",
  resolved: "Resolved",
  closed: "Closed",
};

export const STATUS_COLORS: Record<InquiryStatus, { bg: string; fg: string }> = {
  new: { bg: "#fff1eb", fg: "#c2410c" },
  in_progress: { bg: "#e8edf8", fg: "#263b82" },
  resolved: { bg: "#e7f6ec", fg: "#15803d" },
  closed: { bg: "#f1f2f4", fg: "#686e7d" },
};

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
