import express from 'express';

import diagnosesService from '../src/services/diagnosesService';

import { Diagnose } from '../src/types';

const router = express.Router();

router.get('/', (_req, res) => {
    const data: Array<Diagnose> = diagnosesService.getDiagData();
    res.json(data);
});

router.post('/', (_req, res) => {
    res.send('Saving a diagnosis!');
});

export default router;
