import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_AXIOS_URL,
});

export const fetchApps = (userId, page, searchName) =>
  axiosInstance.get(
    `${userId}/jobapps?page=${page}&searchName=${encodeURIComponent(
      searchName
    )}`
  );

export const createApp = (newApp) => axiosInstance.post("/", newApp);

export const getUser = (userInfo) => axiosInstance.post("getUser", userInfo);
