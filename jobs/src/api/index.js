import axios from "axios";

const url = "http://localhost:5000/";

export const fetchApps = () => axios.get(url);

export const createApp = (newApp) => axios.post(url, newApp);
