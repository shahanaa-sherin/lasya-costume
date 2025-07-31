// routes/costume.js
import express from 'express';
import {
  getCostumes,
  getCostumeById,
  createCostume,
  updateCostume,
  deleteCostume,
} from '../controllers/costumeController.js';

const router = express.Router();

router.get('/', getCostumes);
router.get('/:id', getCostumeById);
router.post('/', createCostume);
router.put('/:id', updateCostume);
router.delete('/:id', deleteCostume);

export default router;
