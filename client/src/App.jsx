import { SearchProvider } from "./context/SearchContext"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CostumeList from "./components/CostumeList";
import AdminAddCostume from "../src/pages/admin/AdminAddCostume";
import AdminCostumeList from "../src/pages/admin/AdminCostumeList";
import EditCostume from "../src/pages/admin/EditCostume";
import Home from "../src/pages/user/Home"; // ✅ this is user-facing home
import Header from "./components/Header";
import "./App.css";
import SearchResults from "./pages/SearchResults";
// In your main entry file, e.g. index.js or App.jsx



function App() {
  return (
    <SearchProvider>
      <Router>
        <div className="min-h-screen bg-green-50">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />

            {/* admin routes */}
            <Route path="/admin/add-costume" element={<AdminAddCostume />} />
            <Route path="/admin/costumes" element={<AdminCostumeList />} />
            <Route path="/admin/costumes/edit/:id" element={<EditCostume />} />
            {/* optional costume list */}
            <Route path="/costumes" element={<CostumeList />} />
            <Route path="/search" element={<SearchResults />} />
          </Routes>
        </div>
      </Router>
    </SearchProvider>
  );
}

export default App;
