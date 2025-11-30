import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:5000/api/v1";

 
// API for JSON Requests

export const authAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


// API for File Upload 
export const uploadAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

 
const attachToken = (config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

authAPI.interceptors.request.use(attachToken);
uploadAPI.interceptors.request.use(attachToken);

 
// Refresh Token
const refreshInstance = axios.create({ baseURL: BASE_URL }); 

authAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

 
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

 
      if (originalRequest.url.includes("/auth/refresh-token")) {
        localStorage.removeItem("accessToken");
        window.location.href = "/registration";
        return Promise.reject(error);
      }

      try {
 
        const refreshResponse = await refreshInstance.post("/auth/refresh-token");
        const newToken = refreshResponse.data.accessToken;

        localStorage.setItem("accessToken", newToken);

     
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return authAPI(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        window.location.href = "/registration";
        return Promise.reject(refreshError);
      }
    }

    toast.error(error.response?.data?.message || "An error occurred");
    return Promise.reject(error);
  }
);


// API Endpoints
export const api = {
  auth: {
    login: (credentials) => authAPI.post("/auth/login", credentials),
    register: (userData) => authAPI.post("/auth/register", userData),
    logout: () => authAPI.post("/auth/logout"),
    profile: () => authAPI.get("/auth/profile"),
    updateProfile: (data) => uploadAPI.put("/auth/profile", data),
    forgetPassword: (data) => authAPI.post("/auth/forgot-password", data),
    resetPassword: (data) => authAPI.post("/auth/reset-password", data),
  },

  users: {
    getAll: () => authAPI.get("/users"),
    getById: (id) => authAPI.get(`/users/${id}`),
    create: (data) => uploadAPI.post("/users", data),
    update: (id, data) => uploadAPI.put(`/users/${id}`, data),
    delete: (id) => authAPI.delete(`/users/${id}`),
  },

  hotels: {
    get: () => authAPI.get("/hotel/info"),
    update: (id, data) => uploadAPI.put(`/hotel/info/${id}`, data),
  },

  rooms: {
    getAll: (params) => authAPI.get("/rooms", { params }),
    getById: (id) => authAPI.get(`/rooms/${id}`),
    create: (data) => uploadAPI.post("/rooms", data),
    update: (id, data) => uploadAPI.put(`/rooms/${id}`, data),
    delete: (id) => authAPI.delete(`/rooms/${id}`),
  },

  bookings: {
    getAll: () => authAPI.get("/bookings"),
    getById: (id) => authAPI.get(`/bookings/${id}`),
    getUserBookings: (id) => authAPI.get(`/bookings/me/${id}`),
    create: (data) => authAPI.post("/bookings", data),
    update: (id, data) => authAPI.put(`/bookings/${id}`, data),
    delete: (id) => authAPI.delete(`/bookings/${id}`),
  },

  reviews: {
    create: (data) => authAPI.post("/reviews", data),
    getByRoomId: (roomId) => authAPI.get(`/reviews/${roomId}`),
    delete: (id) => authAPI.delete(`/reviews/${id}`),
  },
};

export default api;
