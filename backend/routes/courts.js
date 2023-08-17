import express from 'express';

import { getCourt, getCourts, createCourt, updateCourt, deleteCourt, deleteCourts } from '../controllers/courtController.js';

const router = express.Router();

router.get('/', getCourt);
router.get('/all', getCourts);
router.post('/', createCourt);
router.patch('/', updateCourt);
router.delete('/', deleteCourt);
router.delete('/all', deleteCourts);

export default router;