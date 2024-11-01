import axios from "axios";
import Cookies from "js-cookie";

const httpClient = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get("refreshToken");

        if (!refreshToken) throw new Error("No refresh token available");

        const newAccessToken = await refreshAccessToken(refreshToken);

        localStorage.setItem("accessToken", newAccessToken);
        httpClient.defaults.headers["Authorization"] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return httpClient(originalRequest);
      } catch (refreshError) {
        Promise.reject(refreshError);

        localStorage.removeItem("accessToken");
        window.location.href = "http://localhost:5173/auth";
      }
    }
    return Promise.reject(error);
  }
);

const refreshAccessToken = async (refreshToken: string): Promise<string> => {
  if (!refreshToken) throw new Error("No refresh token available");

  const response = await axios.post("http://localhost:3000/api/v1/auth/refresh-token", {
    token: refreshToken,
  });

  return response.data.accessToken;
};

export default httpClient;
