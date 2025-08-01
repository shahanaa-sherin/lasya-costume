import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSearch } from "../context/SearchContext";
import axios from "axios";

const Header = () => {
  const { searchCategory, setSearchCategory } = useSearch();
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminRoute = location.pathname.startsWith("/admin");

  const [menuOpen, setMenuOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Scroll behavior
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    } else {
      navigate("/");
      setTimeout(() => {
        const target = document.getElementById(id);
        if (target) target.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  // Fetch suggestions while typing
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!searchCategory) {
        setSuggestions([]);
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:5000/api/costumes/suggestions?query=${searchCategory}`
        );
        setSuggestions(response.data || []);
      } catch (error) {
        console.error("Suggestion fetch error:", error);
        setSuggestions([]);
      }
    };

    const delayDebounce = setTimeout(fetchSuggestions, 300); // Debounce
    return () => clearTimeout(delayDebounce);
  }, [searchCategory]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchCategory.trim()) {
      navigate(`/search?category=${encodeURIComponent(searchCategory.trim())}`);
      setMenuOpen(false);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchCategory(suggestion);
    navigate(`/search?category=${encodeURIComponent(suggestion)}`);
    setShowSuggestions(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/80 text-white shadow-md backdrop-blur-md border-b border-yellow-500">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/images/headerimg/LasyaLogo.png"
            alt="Lasya Logo"
            className="w-28 h-auto object-contain drop-shadow-md rounded-full"
          />
        </Link>

        {/* Mobile menu */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white text-2xl"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Navigation */}
        <nav
          className={`absolute md:static bg-black md:bg-transparent left-0 w-full md:w-auto transition-all duration-300 ease-in-out px-6 md:px-0 py-4 md:py-0 md:flex items-center gap-6 text-sm font-medium ${
            menuOpen ? "block" : "hidden md:flex"
          }`}
        >
          {!isAdminRoute ? (
            <>
              {/* Search with Autocomplete */}
              <form
                onSubmit={handleSearch}
                className="relative flex flex-col gap-1 mb-4 md:mb-0"
              >
                <input
                  type="text"
                  placeholder="Search by category..."
                  value={searchCategory}
                  onChange={(e) => {
                    setSearchCategory(e.target.value);
                    setShowSuggestions(true);
                  }}
                  className="px-3 py-1 rounded-md text-black"
                />

                {showSuggestions && suggestions.length > 0 && (
                  <ul className="absolute top-full left-0 w-full bg-white text-black border border-gray-300 rounded shadow-md z-50 max-h-40 overflow-y-auto">
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                       {suggestion.name} - {suggestion.category}
                      </li>
                    ))}
                  </ul>
                )}
              </form>

              {/* Scrollable links */}
              <button
                onClick={() => scrollToSection("costumes")}
                className="hover:text-yellow-400 transition"
              >
                Costumes
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="hover:text-yellow-400 transition"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("gallery")}
                className="hover:text-yellow-400 transition"
              >
                Gallery
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="hover:text-yellow-400 transition"
              >
                Contact
              </button>
            </>
          ) : (
            <>
              <Link
                to="/admin/costumes"
                className="hover:text-yellow-400 transition"
              >
                Admin List
              </Link>
              <Link
                to="/admin/add-costume"
                className="hover:text-yellow-400 transition"
              >
                Add Costume
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
