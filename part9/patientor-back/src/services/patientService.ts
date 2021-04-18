import patientData from '../../data/patients';

import { v1 as uuid } from 'uuid';

import { Patient, NonSensitivePatient, NewPatient } from '../types';

const getPatientData = (): Patient[] => {
    return patientData;
};

const getNonSensitivePatientData = (): NonSensitivePatient[] => {
    const mappedData = patientData.map(
        ({ id, name, dateOfBirth, gender, occupation }) => ({
            id,
            name,
            dateOfBirth,
            gender,
            occupation,
        })
    );
    return mappedData;
};

const addPatientData = (patient: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        ...patient,
    };
    patientData.push(newPatient);
    return newPatient;
};

export default { getPatientData, addPatientData, getNonSensitivePatientData };
