import { useState, useEffect, useRef } from "react";
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
  const [activeSection, setActiveSection] = useState("");
  const suggestionsRef = useRef(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!searchCategory) return setSuggestions([]);
      try {
        const res = await axios.get(
          `http://localhost:5000/api/costumes/suggestions?query=${searchCategory}`
        );
        setSuggestions(res.data || []);
      } catch (err) {
        console.error("Suggestion fetch error:", err);
        setSuggestions([]);
      }
    };
    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [searchCategory]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchCategory.trim()) {
      navigate(`/search?category=${encodeURIComponent(searchCategory.trim())}`);
      setShowSuggestions(false);
      setMenuOpen(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchCategory(suggestion.name || suggestion.category);
    navigate(`/search?category=${encodeURIComponent(suggestion.name || suggestion.category)}`);
    setShowSuggestions(false);
    setMenuOpen(false);
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      const yOffset = -80;
      const y = section.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setMenuOpen(false);
    } else {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          const yOffset = -80;
          const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 200);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/80 text-white shadow-md backdrop-blur-md border-b border-yellow-100">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/images/headerimg/LasyaLogo.png"
            alt="Lasya Logo"
            className="w-16 h-auto object-contain drop-shadow rounded-full"
          />
        </Link>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-2xl focus:outline-none md:hidden"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav
          className={`absolute top-[72px] left-0 w-full bg-black px-6 py-4 flex flex-col gap-4 text-sm font-medium transition-all duration-300 md:static md:bg-transparent md:flex md:flex-row md:gap-6 md:py-0 md:px-0 ${
            menuOpen ? "block" : "hidden md:flex"
          }`}
        >
          {!isAdminRoute ? (
            <>
              {/* Search Box */}
              <form
                onSubmit={handleSearch}
                className="relative w-full md:w-72 lg:w-96"
                ref={suggestionsRef}
              >
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by category..."
                    value={searchCategory}
                    onChange={(e) => {
                      setSearchCategory(e.target.value);
                      setShowSuggestions(true);
                    }}
                    className="w-full px-4 py-2 pr-10 rounded-full text-black shadow-inner focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  {searchCategory && (
                    <button
                      type="button"
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-red-600 text-lg"
                      onClick={() => {
                        setSearchCategory("");
                        setSuggestions([]);
                        setShowSuggestions(false);
                      }}
                    >
                      ×
                    </button>
                  )}
                </div>
                {showSuggestions && suggestions.length > 0 && (
                  <ul className="absolute top-full left-0 w-full bg-white text-black border mt-2 rounded-xl shadow-lg z-50 max-h-52 overflow-y-auto text-sm">
                    {suggestions.map((s, idx) => (
                      <li
                        key={idx}
                        onClick={() => handleSuggestionClick(s)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {s.name} - {s.category}
                      </li>
                    ))}
                  </ul>
                )}
              </form>

              {/* Navigation Sections */}
              {["costumes", "about", "gallery", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => {
                    scrollToSection(section);
                    setActiveSection(section);
                  }}
                  className={`hover:text-yellow-400 transition ${
                    activeSection === section ? "text-yellow-400 font-bold" : ""
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </>
          ) : (
            <>
              <Link to="/admin/costumes" className="hover:text-yellow-400">
                Admin List
              </Link>
              <Link to="/admin/add-costume" className="hover:text-yellow-400">
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
