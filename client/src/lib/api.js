import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api"
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("arigya_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const submitAppointment = (payload) => api.post("/appointments", payload);
export const submitLead = (payload) => api.post("/leads", payload);
export const askAssistant = (payload) => api.post("/ai/chat", payload);
export const getSiteSettings = () => api.get("/site/settings");
export const getSiteDoctors = () => api.get("/site/doctors");
