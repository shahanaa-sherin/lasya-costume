// server/routes/costumeRoutes.js
import express from 'express';
import { getCostumes, createCostume } from '../controllers/costumeController.js';

const router = express.Router();

router.get('/', getCostumes);
router.post('/', createCostume);

export default router;
