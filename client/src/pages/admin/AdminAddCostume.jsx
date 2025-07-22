// client/src/pages/admin/AdminAddCostume.jsx
import { useState } from "react";
import axios from "axios";

export default function AdminAddCostume() {
  const [form, setForm] = useState({ name: "", category: "", size: "", price: "", image: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/costumes", form);
      setMessage("🎉 Costume added successfully!");
      setForm({ name: "", category: "", size: "", price: "", image: "" });
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to add costume.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add New Costume</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "category", "size", "price", "image"].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={`Enter ${field}`}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        ))}
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Add Costume
        </button>
      </form>
      {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
    </div>
  );
}
