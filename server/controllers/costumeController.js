// server/controllers/costumeController.js
import Costume from '../models/costume.js' // PascalCase model name



// GET all costumes
export const getCostumes = async (req, res) => {
  try {
    const costumes = await Costume.find();
    res.json(costumes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//get costume by category
// Search costumes by keyword (name or category)
// Controller: searchCostumes
export const searchCostumes = async (req, res) => {
  try {
    const { query, category } = req.query;

    if (!query?.trim() && !category?.trim()) {
      return res.status(400).json({ message: 'Missing or empty search query or category' });
    }

    let filter = {};

    if (query?.trim()) {
      const regex = new RegExp(query.trim(), 'i'); // case-insensitive
      filter.name = regex;
    }

    if (category?.trim()) {
      filter.category = category.trim();
    }
console.log('Search filter:', filter);
    const costumes = await Costume.find(filter);
    res.json(costumes);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: error.message });
  }
};


// Suggest matching costume names or categories
export const getSuggestions = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: 'Missing search query' });
    }

    const suggestions = await Costume.find(
      {
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { category: { $regex: query, $options: 'i' } }
        ]
      },
      { name: 1, category: 1 } // Only return name and category fields
    ).limit(5);

    res.json(suggestions);
  } catch (error) {
    console.error('Suggestion error:', error);
    res.status(500).json({ message: error.message });
  }
};



// GET costume by ID
export const getCostumeById = async (req, res) => {
  try {
    const costume = await Costume.findById(req.params.id);
    if (!costume) return res.status(404).json({ message: 'Costume not found' });
    res.json(costume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST create costume
export const createCostume = async (req, res) => {
  try {
    // Basic field validation
    if (!req.body.name || !req.body.category) {
      return res.status(400).json({ message: "Name and category are required." });
    }

    const costume = new Costume(req.body);
    const saved = await costume.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// PUT update costume
export const updateCostume = async (req, res) => {
  try {
    const { name, category } = req.body;

    if (!name?.trim() || !category?.trim()) {
      return res.status(400).json({ message: 'Name and category cannot be empty.' });
    }

    const updated = await Costume.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    if (!updated) {
      return res.status(404).json({ message: 'Costume not found.' });
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// DELETE costume
export const deleteCostume = async (req, res) => {
  try {
    await Costume.findByIdAndDelete(req.params.id);
    res.json({ message: 'Costume deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
