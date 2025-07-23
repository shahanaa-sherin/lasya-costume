import express from 'express';
import {
  getCostumes,
  createCostume,
  updateCostume,
  deleteCostume,
  getCostumeById
} from '../controllers/costumeController.js';

import upload from '../middleware/upload.js'; // ✅ ADD THIS LINE

const router = express.Router();

router.get('/', getCostumes);
router.post('/', upload.single('image'), createCostume); // ✅ image upload
router.get('/:id', getCostumeById);
router.put('/:id', upload.single('image'), updateCostume); // ✅ image update
router.delete('/:id', deleteCostume);

export default router;
