import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const fetchCostumes = () => API.get("/costumes");
export const createCostume = (data) => API.post("/costumes", data);
// client/services/api.js
export const updateCostume = async (id, updatedData) => {
  const response = await fetch(`/api/costumes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData),
  });
  return response.json();
};


