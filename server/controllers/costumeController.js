// server/controllers/costumeController.js
import Costume from '../models/Costume.js';

// GET all costumes
export const getCostumes = async (req, res) => {
  try {
    const costumes = await Costume.find();
    res.json(costumes);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// POST a new costume
export const createCostume = async (req, res) => {
  try {
    const costume = new Costume(req.body);
    await costume.save();
    res.status(201).json(costume);
  } catch (error) {
    console.error("❌ Error creating costume:", error.message); // This will show the exact issue
    res.status(400).json({ message: "Error creating costume", error: error.message });
  }
};


