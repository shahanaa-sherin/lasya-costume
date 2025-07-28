// server/controllers/costumeController.js
import Costume from "../models/Costume.js";

// GET all costumes
export const getCostumes = async (req, res) => {
  try {
    const costumes = await Costume.find();
    res.json(costumes);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
// Get a single costume by ID
export const getCostumeById = async (req, res) => {
  try {
    const costume = await Costume.findById(req.params.id);
    if (!costume) {
      return res.status(404).json({ message: "Costume not found" });
    }
    res.json(costume);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching costume", error: error.message });
  }
};
// POST a new costume
export const createCostume = async (req, res) => {
  try {
    // Convert available to boolean
    req.body.available =
      req.body.available === "true" || req.body.available === true;

    // ✅ Attach uploaded image path (not just filename)
    if (req.file) {
      req.body.image = `/uploads/${req.file.filename}`; // Important: this lets the frontend access it
    }

    // Create a new Costume with full req.body (includes image path now)
    const costume = new Costume(req.body);
    await costume.save();

    res.status(201).json(costume);
  } catch (error) {
    console.error("❌ Error creating costume:", error.message);
    res
      .status(400)
      .json({ message: "Error creating costume", error: error.message });
  }
};

export const deleteCostume = async (req, res) => {
  try {
    const deleted = await Costume.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Costume not found" });
    res.status(200).json({ message: "Costume deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// server/controllers/costumeController.js
export const updateCostume = async (req, res) => {
  const { name, category, size, price, available } = req.body;

  req.body.available = available === "true" || available === true;

  const costume = await Costume.findById(req.params.id);
  if (costume) {
    costume.name = name;
    costume.category = category;
    costume.size = size;
    costume.price = price;
    costume.available = req.body.available;

    // ✅ Add this line
    if (req.file) {
      costume.image = `/uploads/${req.file.filename}`;
    }

    const updated = await costume.save();
    res.json(updated);
  } else {
    res.status(404).json({ message: "Costume not found" });
  }
};
