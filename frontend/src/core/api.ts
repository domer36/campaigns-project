export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

export const API_URLS = {
  LOGIN: `${API_BASE_URL}/login/`,
  USERS: `${API_BASE_URL}/users/`,
  REGISTER: `${API_BASE_URL}/register/`,
  DASHBOARD: `${API_BASE_URL}/dashboard/`,
  CAMPAIGNS: `${API_BASE_URL}/campaigns/`,
  LANDING: (id?: number) =>
    id ? `${API_BASE_URL}/landing/${id}/` : `${API_BASE_URL}/landing/`,
};
