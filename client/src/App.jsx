// // client/src/App.jsx
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import CostumeList from "./components/CostumeList";
// import AdminAddCostume from "./pages/admin/AdminAddCostume";
// import AdminCostumeList from "./pages/admin/AdminCostumeList";
// import EditCostume from "./pages/admin/EditCostume";
// import Home from "./pages/user/Home"

// function App() {
//   return (
//     <Router>
//       <div className="min-h-screen bg-green-50">
//         <h1 className="text-3xl font-bold text-center p-6">Lasya Costumes</h1>
//         <Routes>
//           <Route path="/" element={<CostumeList />} />
//           <Route path="/admin/add-costume" element={<AdminAddCostume />} />
//           <Route path="/admin/costumes" element={<AdminCostumeList />} />
//           <Route path="/admin/costumes/edit/:id" element={<EditCostume />} />
//           <Route path="/" element={<Home />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;





import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CostumeList from "./components/CostumeList";
import AdminAddCostume from "../src/pages/admin/AdminAddCostume";
import AdminCostumeList from "../src/pages/admin/AdminCostumeList";
import EditCostume from "../src/pages/admin/EditCostume";
import Home from "../src/pages/user/Home"; // ✅ this is user-facing home
// In your main entry file, e.g. index.js or App.jsx



function App() {
  return (
    <Router>
      <div className="min-h-screen bg-green-50">
        <h1 className="text-3xl font-bold text-center p-10 text-red-700 bg-black">Lasya Costumes</h1>
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
