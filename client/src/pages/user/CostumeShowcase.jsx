import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearch } from '../../context/SearchContext.jsx';

const CostumeShowcase = () => {
  const [costumes, setCostumes] = useState([]);
  const [groupedCostumes, setGroupedCostumes] = useState({});
  const { searchCategory } = useSearch();

  useEffect(() => {
    const fetchCostumes = async () => {
      try {
        let url = 'http://localhost:5000/api/costumes';

        // If there's a category to search, apply search API
        if (searchCategory?.trim()) {
          const params = new URLSearchParams();
          params.append('category', searchCategory);
          url = `http://localhost:5000/api/costumes/search?${params.toString()}`;
        }

        const response = await axios.get(url);

        if (Array.isArray(response.data)) {
          setCostumes(response.data);
        } else {
          console.warn('Expected array but got:', response.data);
          setCostumes([]);
        }
      } catch (err) {
        console.error('Error fetching search results:', err);
        setCostumes([]);
      }
    };

    fetchCostumes();
  }, [searchCategory]);

  useEffect(() => {
    const filtered = costumes.filter((item) =>
      item.category.toLowerCase().includes(searchCategory.toLowerCase())
    );

    const grouped = filtered.reduce((acc, item) => {
      const category = item.category || 'Others';
      if (!acc[category]) acc[category] = [];
      acc[category].push(item);
      return acc;
    }, {});

    setGroupedCostumes(grouped);
  }, [costumes, searchCategory]);

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-100">
      <h2 className="text-4xl font-bold text-center mb-12 text-pink-600">Our Products</h2>

      {Object.keys(groupedCostumes).length === 0 ? (
        <p className="text-center text-gray-500">No costumes found for this category.</p>
      ) : (
        Object.entries(groupedCostumes).map(([category, items]) => (
          <div key={category} className="mb-12">
            <h3 className="text-2xl font-semibold mb-6 text-left text-purple-600 border-b-2 border-purple-300 pb-1">
              {category}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="bg-white shadow-xl rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105"
                >
                  <img
                    src={`http://localhost:5000${item.image}`}
                    alt={item.name}
                    className="w-full h-56 object-cover"
                    onError={(e) => (e.target.src = '/fallback-image.png')}
                  />
                  <div className="p-4 text-center">
                    <h4 className="text-lg font-semibold mb-1 text-gray-800">{item.name}</h4>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                    <p className="text-sm text-gray-500">Size: {item.size}</p>
                    <p className="text-pink-600 font-bold">₹{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </section>
  );
};

export default CostumeShowcase;
