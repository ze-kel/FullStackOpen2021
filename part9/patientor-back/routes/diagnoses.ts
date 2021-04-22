import express from 'express';

import diagnosesService from '../src/services/diagnosesService';

import { Diagnosis } from '../src/types';

const router = express.Router();

router.get('/', (_req, res) => {
    const data: Array<Diagnosis> = diagnosesService.getDiagData();
    res.json(data);
});

router.post('/', (_req, res) => {
    res.send('Saving a diagnosis!');
});

export default router;
