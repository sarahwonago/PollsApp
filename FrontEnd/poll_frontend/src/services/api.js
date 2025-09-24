import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
});

// --- Request interceptor: attach access token ---
api.interceptors.request.use(config => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- Response interceptor: refresh token on 401 ---
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refresh = localStorage.getItem("refresh");
        if (refresh) {
          // Try refreshing token
          const res = await axios.post("http://localhost:8000/api/token/refresh/", {
            refresh,
          });

          const newAccess = res.data.access;
          localStorage.setItem("access", newAccess);

          // Update header & retry original request
          originalRequest.headers.Authorization = `Bearer ${newAccess}`;
          return api(originalRequest);
        }
      } catch (err) {
        console.error("Token refresh failed:", err);
        // Optional: clear tokens and redirect to login
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

// --- Auth ---
export const login = (username, password) =>
  api.post("token/", { username, password });

export const register = (username, email, password) =>
  api.post("register/", { username, email, password });

// --- Polls ---
export const fetchPolls = () => api.get("polls/");
export const fetchPoll = (id) => api.get(`polls/${id}/`);
export const createPoll = (data) => api.post("polls/", data);

// --- Options ---
export const createOption = (data) => api.post("options/", data);

// --- Votes ---
export const castVote = (data) => api.post("votes/", data);

// --- Results ---
export const fetchPollResults = (id) => api.get(`polls/${id}/results/`);

export default api;
