// routes/costume.js
import express from 'express';
import {
  getCostumes,
  getCostumeById,
  createCostume,
  updateCostume,
  deleteCostume,
  searchCostumes,
  getSuggestions,
} from '../controllers/costumeController.js';

const router = express.Router();

router.get('/', getCostumes);
router.get('/search', searchCostumes);     // ✅ specific route first
router.get('/suggestions', getSuggestions);
router.get('/:id', getCostumeById);        // ✅ dynamic route after
router.post('/', createCostume);
router.put('/:id', updateCostume);
router.delete('/:id', deleteCostume);

export default router;
