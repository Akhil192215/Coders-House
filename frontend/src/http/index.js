import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

export const sendOtp = (data) =>  api.post("/api/send-otp", data);
export const verifyOtp = (data) => api.post("api/verify-otp", data);
export const activate = (data) => api.post("api/activate-user", data);

export default api;
