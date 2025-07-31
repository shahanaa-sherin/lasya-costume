import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminCostumeList = () => {
  const [costumes, setCostumes] = useState([]);

  const fetchCostumes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/costumes");
      setCostumes(res.data);
      console.log("Fetched costumes:", res.data);
    } catch (error) {
      console.error("Failed to fetch costumes", error);
    }
  };

  const deleteCostume = async (id) => {
    if (!window.confirm("Are you sure you want to delete this costume?"))
      return;
    try {
      await axios.delete(`http://localhost:5000/api/costumes/${id}`);
      fetchCostumes(); // refresh list
      console.log("Deleting costume with ID:", id);
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  useEffect(() => {
    fetchCostumes();
  }, []);

  return (
  <div className="p-6">
    <h2 className="text-3xl font-bold mb-6 text-center text-red-700">Costume List (Admin Panel)</h2>

    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {costumes.map((costume) => (
        <div
          key={costume._id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
        >
          <img
            src={`http://localhost:5000${costume.image}`}
            alt={costume.name}
            className="h-64 w-full object-cover"
            onError={(e) => (e.target.src = "/fallback-image.png")}
          />

          <div className="p-4 space-y-2">
            <h3 className="text-xl font-semibold text-gray-800">{costume.name}</h3>
            <p className="text-sm text-gray-500">Category: {costume.category}</p>
            <p className="text-sm text-gray-500">Size: {costume.size}</p>
            <p className="text-sm text-gray-500">Price: ₹{costume.price}</p>
            <p
              className={`text-sm font-medium ${
                costume.available ? "text-green-600" : "text-red-600"
              }`}
            >
              Available: {costume.available ? "Yes" : "No"}
            </p>

            <div className="flex justify-end gap-4 pt-2">
              <Link
                to={`/admin/costumes/edit/${costume._id}`}
                className="text-blue-600 hover:underline"
              >
                Edit
              </Link>
              <button
                onClick={() => deleteCostume(costume._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

};

export default AdminCostumeList;
