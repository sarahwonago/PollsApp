import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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