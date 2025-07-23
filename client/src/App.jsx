// client/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CostumeList from "./components/CostumeList";
import AdminAddCostume from "./pages/admin/AdminAddCostume";
import AdminCostumeList from "./pages/admin/AdminCostumeList";
import EditCostume from "./pages/admin/EditCostume";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-green-50">
        <h1 className="text-3xl font-bold text-center p-6">Lasya Costumes</h1>
        <Routes>
          <Route path="/" element={<CostumeList />} />
          <Route path="/admin/add-costume" element={<AdminAddCostume />} />
          <Route path="/admin/costumes" element={<AdminCostumeList />} />
          <Route path="/admin/costumes/edit/:id" element={<EditCostume />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;
