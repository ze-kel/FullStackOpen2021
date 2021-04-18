/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';

import patientService from '../src/services/patientService';

import ToNewPatient from '../src/utils';

import { NonSensitivePatient } from '../src/types';

const router = express.Router();

router.get('/', (_req, res) => {
    const data: Array<NonSensitivePatient> = patientService.getNonSensitivePatientData();
    res.json(data);
});

router.post('/', (req, res) => {
    console.log(req.body);
    const newPatient = ToNewPatient(req.body);
    const createdPatient = patientService.addPatientData(newPatient);
    res.send(createdPatient);
});

export default router;
