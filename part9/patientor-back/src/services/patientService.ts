import patientData from '../../data/patients';

import { v1 as uuid } from 'uuid';

import { Patient, NonSensitivePatient, NewPatient, NewEntry } from '../types';

const getPatientsData = (): Patient[] => {
    return patientData;
};

const getNonSensitivePatientsData = (): NonSensitivePatient[] => {
    const mappedData = patientData.map(
        ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
            id,
            name,
            dateOfBirth,
            gender,
            occupation,
            entries,
        })
    );
    return mappedData;
};

const getNonSensitivePatientData = (id: string): NonSensitivePatient => {
    const data = patientData.filter((patientData) => patientData.id === id);
    if (data.length < 1) {
        throw new Error('No patient with such id found');
    }
    return data[0];
};

const addPatientData = (patient: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        ...patient,
    };
    patientData.push(newPatient);
    return newPatient;
};

const addEntry = (id: string, entry: NewEntry): Patient => {
    const targetIndex = patientData.findIndex((patient) => patient.id === id);
    const entryWithId = { id: uuid(), ...entry };
    const target = patientData[targetIndex];

    target.entries.push(entryWithId);
    console.log(target);

    return target;
};

export default {
    getPatientsData,
    addPatientData,
    getNonSensitivePatientData,
    getNonSensitivePatientsData,
    addEntry,
};
