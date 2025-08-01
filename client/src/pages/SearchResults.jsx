import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const SearchResults = () => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Extract query params
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");
  const category = queryParams.get("category");

  // Fetch suggestions while typing
  const handleChange = async (e) => {
    const value = e.target.value;
    setInput(value);

    if (value.length > 1) {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/costumes/suggestions?query=${value}`
        );
        setSuggestions(res.data);
      } catch (error) {
        console.error("Suggestion error:", error.message);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (suggestion) => {
    const term = suggestion.name || suggestion.category;
    setInput(term);
    setSuggestions([]);

    // Navigate to new URL with selected term
    navigate(`/search?category=${encodeURIComponent(term)}`);
  };

  // Fetch products when category or query changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/costumes/search",
          {
            params: { category, query },
          }
        );
        console.log("Fetched products:", res.data);
        setProducts(res.data);
      } catch (err) {
        console.error("Product fetch error:", err.message);
        setProducts([]);
      }
    };

    if (category || query) {
      fetchProducts();
    }
  }, [category, query]);

  return (
    <div className="w-full max-w-3xl mx-auto mt-6 px-4">
      <div className="relative w-full max-w-md mx-auto">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Search costumes..."
          className="w-full p-2 border border-gray-300 rounded"
        />

        {suggestions.length > 0 && (
          <ul className="absolute bg-white border border-gray-300 rounded w-full mt-1 z-50">
            {suggestions.map((s, idx) => (
              <li
                key={idx}
                onClick={() => handleSelect(s)}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {s.name || s.category}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Search Results Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Search Results</h2>

        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product._id} className="border rounded p-4 shadow-sm">
                <img
                  src={`http://localhost:5000${product.image}`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/default-placeholder.jpg";
                  }}
                  alt={product.name}
                  className="w-full h-40 object-cover mb-2"
                />

                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.category}</p>
                <p className="text-green-600 font-semibold">₹{product.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
