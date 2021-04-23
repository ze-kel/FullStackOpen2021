/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';

import patientService from '../src/services/patientService';

import ultils from '../src/utils';

import { NonSensitivePatient } from '../src/types';

const router = express.Router();

router.get('/', (_req, res) => {
    const data: Array<NonSensitivePatient> = patientService.getNonSensitivePatientsData();
    res.json(data);
});

router.get('/:id', (req, res) => {
    try {
        const data: NonSensitivePatient = patientService.getNonSensitivePatientData(
            req.params.id
        );
        res.json(data);
    } catch (e) {
        res.status(400).send('Patient not found');
    }
});

router.post('/', (req, res) => {
    console.log(req.body);
    const newPatient = ultils.ToNewPatient(req.body);
    const createdPatient = patientService.addPatientData(newPatient);
    res.send(createdPatient);
});

router.post('/:id', (req, res) => {
    console.log(req.params.id);
    console.log(req.body);

    const newEntry = ultils.ToNewEntry(req.body);

    const updatedPatient = patientService.addEntry(req.params.id, newEntry);

    res.json(updatedPatient);
});

export default router;
