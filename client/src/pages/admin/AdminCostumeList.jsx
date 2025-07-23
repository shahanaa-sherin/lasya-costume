import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminCostumeList = () => {
  const [costumes, setCostumes] = useState([]);

  const fetchCostumes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/costumes");
      setCostumes(res.data);
    } catch (error) {
      console.error("Failed to fetch costumes", error);
    }
  };

  const deleteCostume = async (id) => {
    if (!window.confirm("Are you sure you want to delete this costume?")) return;
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
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Costume List (Admin Panel)</h2>
      <table className="min-w-full bg-white border rounded-md shadow">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Size</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Available</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {costumes.map((costume) => (
            <tr key={costume._id}>
              <td className="p-2 border">{costume.name}</td>
              <td className="p-2 border">{costume.category}</td>
              <td className="p-2 border">{costume.size}</td>
              <td className="p-2 border">₹{costume.price}</td>
              <td className="p-2 border">{costume.available ? "Yes" : "No"}</td>
              <td className="p-2 border flex gap-2">
               <Link to={`/admin/costumes/edit/${costume._id}`} className="text-blue-600">Edit</Link>
                <button
                  onClick={() => deleteCostume(costume._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCostumeList;
