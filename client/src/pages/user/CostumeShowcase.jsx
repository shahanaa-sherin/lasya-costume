import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CostumeShowcase = () => {
  const [costumes, setCostumes] = useState([]);

  useEffect(() => {
    const fetchCostumes = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/costumes');
        setCostumes(res.data);
      } catch (error) {
        console.error('Error fetching costumes:', error);
      }
    };

    fetchCostumes();
  }, []);

  return (
    <section className="py-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Our Costumes</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {costumes.map((item) => (
          <div
            key={item._id}
            className="text-center shadow-lg rounded-lg p-4 hover:scale-105 transition-transform duration-300"
          >
            <img
              src={`http://localhost:5000${item.image}`}
              alt={item.name}
              className="w-full h-64 object-cover rounded-md mb-4"
              onError={(e) => (e.target.src = '/fallback-image.png')}
            />
            <h3 className="text-xl font-semibold">{item.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CostumeShowcase;
