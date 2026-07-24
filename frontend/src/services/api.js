import axios from "axios";

const api = axios.create({
    baseURL: "https://budget-control-system-production.up.railway.app"
});

export default api;
