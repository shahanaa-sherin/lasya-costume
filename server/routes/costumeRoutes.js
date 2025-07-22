// server/routes/costumeRoutes.js
import express from 'express';
import { getCostumes, createCostume, deleteCostume } from '../controllers/costumeController.js';

const router = express.Router();

router.get('/', getCostumes);
router.post('/', createCostume);
router.delete('/:id', deleteCostume);


export default router;
