const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

export function saveToken(token) {
  localStorage.setItem("access_token", token);
}

export function getToken() {
  return localStorage.getItem("access_token");
}

export function clearToken() {
  localStorage.removeItem("access_token");
}

export async function apiRequest(path, options = {}) {
  const token = getToken();
  const headers = {
    ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };
  const response = await fetch(`${API_URL}${path}`, { ...options, headers });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.detail || data.message || "Server qátesi");
  }
  return data;
}

export const authApi = {
  login: (email, password) => apiRequest("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),
  register: (payload) => apiRequest("/auth/register", { method: "POST", body: JSON.stringify(payload) }),
};

export function mapApiRole(role) {
  return {
    admin: "Administrator",
    teacher: "Oqıtıwshı",
    student: "Student",
  }[role] || role;
}

export const subjectApi = {
  list: () => apiRequest("/subjects"),
  create: (payload) => apiRequest("/subjects", { method: "POST", body: JSON.stringify(payload) }),
};

export const assignmentApi = {
  list: () => apiRequest("/assignments"),
  create: (payload) => apiRequest("/assignments", { method: "POST", body: JSON.stringify(payload) }),
};

export const submissionApi = {
  create: (payload) => apiRequest("/submissions", { method: "POST", body: JSON.stringify(payload) }),
  aiCheck: (id) => apiRequest(`/ai/check-submission/${id}`, { method: "POST" }),
  confirmGrade: (id, payload) => apiRequest(`/teacher/confirm-grade/${id}`, { method: "POST", body: JSON.stringify(payload) }),
};
