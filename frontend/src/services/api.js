// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Make sure backend runs on this
});

// ✅ Add token to Authorization header
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
  },
  (error) => {
    console.error("❌ Request Interceptor Error:", error);
    return Promise.reject(error);
  }
);

// ✅ Handle errors globally (optional)
API.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response) {
      console.error("❌ API Error:", error.response.data);
    } else if (error.request) {
      console.error("❌ No response received from API");
    } else {
      console.error("❌ Request Setup Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default API;
