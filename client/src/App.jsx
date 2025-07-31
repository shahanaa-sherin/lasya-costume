
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CostumeList from "./components/CostumeList";
import AdminAddCostume from "../src/pages/admin/AdminAddCostume";
import AdminCostumeList from "../src/pages/admin/AdminCostumeList";
import EditCostume from "../src/pages/admin/EditCostume";
import Home from "../src/pages/user/Home"; // ✅ this is user-facing home
import Header from "./components/Header";
import "./App.css";
// In your main entry file, e.g. index.js or App.jsx



function App() {
  return (
    <Router>
      <div className="min-h-screen bg-green-50">
       <Header />
        <Routes>
          {/* 👇 User Route */}
          <Route path="/" element={<Home />} />


          {/* 👇 Admin Routes */}
          <Route path="/admin/add-costume" element={<AdminAddCostume />} />
          <Route path="/admin/costumes" element={<AdminCostumeList />} />
          <Route path="/admin/costumes/edit/:id" element={<EditCostume />} />

          {/* Optional: Public costume list page */}
          <Route path="/costumes" element={<CostumeList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
