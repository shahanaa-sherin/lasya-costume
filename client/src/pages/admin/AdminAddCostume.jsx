import { useState } from "react";
import axios from "axios";

export default function AdminAddCostume() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    size: "",
    price: "",
    available: "Yes",
    image: null,
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const res = await axios.post("http://localhost:5000/api/costumes", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("🎉 Costume added successfully!");
      setForm({
        name: "",
        category: "",
        size: "",
        price: "",
        available: "Yes",
        image: null,
      });
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to add costume.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add New Costume</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Text inputs */}
        {["name", "category", "size", "price"].map((field) => (
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

        {/* Availability dropdown (optional) */}
        <select
  name="available"
  value={form.available}
  onChange={handleChange}
  className="w-full p-2 border border-gray-300 rounded"
>
  <option value={true}>Available</option>
  <option value={false}>Not Available</option>
</select>


        {/* Image file input */}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Costume
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
      )}
    </div>
  );
}
