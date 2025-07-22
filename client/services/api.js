import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const fetchCostumes = () => API.get("/costumes");
export const createCostume = (data) => API.post("/costumes", data);

