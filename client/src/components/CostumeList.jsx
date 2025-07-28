import { useEffect, useState } from "react";
import { fetchCostumes } from "../../services/api";

export default function CostumeList() {
  const [costumes, setCostumes] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchCostumes();
        console.log("Fetched costumes:", res.data); // 👈 check this
        setCostumes(res.data);
      } catch (error) {
        console.error("Error fetching costumes:", error); // 👈 see if there's any error
      }
    };
    loadData();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {costumes.map((item) => (
        <div key={item._id} className="bg-white shadow rounded-xl p-4">
          <img
            src={
              item.image
                ? `http://localhost:5000${item.image}`
                : "https://via.placeholder.com/300x200?text=No+Image"
            }
            alt={item.name}
            className="w-full h-48 object-cover rounded-lg mb-2"
          />

          <h3 className="text-lg font-bold">{item.name}</h3>
          <p>{item.description}</p>
          <p className="text-sm text-gray-500">₹{item.price}</p>
        </div>
      ))}
    </div>
  );
}
