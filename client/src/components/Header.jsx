import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    } else {
      // Navigate to home and then scroll (when not on home)
      navigate("/");
      setTimeout(() => {
        const target = document.getElementById(id);
        if (target) target.scrollIntoView({ behavior: "smooth" });
      }, 100); // Delay to allow page load
    }
  };

  return (
    <header className="bg-gradient-to-r from-black via-gray-900 to-black text-white fixed top-0 left-0 w-full z-50 shadow-lg">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-wide text-white text-glow hover:scale-105 transform transition duration-300 ease-in-out"
        >
          LasyaCostumes
        </Link>

        {/* Hamburger Menu */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white text-2xl"
            aria-label="Toggle Menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Navigation */}
        <nav
          className={`flex flex-col md:flex-row md:items-center gap-6 text-base font-medium absolute md:static top-full left-0 w-full md:w-auto bg-black md:bg-transparent px-6 py-4 md:p-0 transition-all duration-300 ease-in-out ${
            menuOpen ? "block" : "hidden md:flex"
          }`}
        >
          {!isAdminRoute ? (
            <>
              <button
                onClick={() => scrollToSection("costumes")}
                className="hover:text-yellow-400 transition duration-300 underline-offset-4 hover:underline"
              >
                Costumes
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="hover:text-yellow-400 transition duration-300 underline-offset-4 hover:underline"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("gallery")}
                className="hover:text-yellow-400 transition duration-300 underline-offset-4 hover:underline"
              >
                Gallery
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="hover:text-yellow-400 transition duration-300 underline-offset-4 hover:underline"
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
