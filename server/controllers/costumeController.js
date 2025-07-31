// server/controllers/costumeController.js
import costume from '../models/costume.js';

// GET all costumes
export const getCostumes = async (req, res) => {
  try {
    const costumes = await costume.find();
    res.json(costumes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET costume by ID
export const getCostumeById = async (req, res) => {
  try {
    const costume = await costume.findById(req.params.id);
    if (!costume) return res.status(404).json({ message: 'Costume not found' });
    res.json(costume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST create costume
export const createCostume = async (req, res) => {
  try {
    const costume = new costume(req.body);
    const saved = await costume.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT update costume
export const updateCostume = async (req, res) => {
  try {
    const updated = await costume.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE costume
export const deleteCostume = async (req, res) => {
  try {
    await costume.findByIdAndDelete(req.params.id);
    res.json({ message: 'Costume deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
