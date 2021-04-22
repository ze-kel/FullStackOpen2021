/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import { PatientFormValues } from '../AddPatientModal/AddPatientForm';
import AddPatientModal from '../AddPatientModal';
import { Diagnosis, Patient } from '../types';
import { apiBaseUrl } from '../constants';
import HealthRatingBar from '../components/HealthRatingBar';

import { useStateValue } from '../state';
import { useParams } from 'react-router';

const PatientDetails = () => {
    const [{ patients, diagnoses }, dispatch] = useStateValue();
    const [error, setError] = React.useState<string | undefined>();

    const params = useParams<{ id: string }>();
    const id = params.id;
    const patient = patients[id];

    if (!patient) {
        return <div>No patient found</div>;
    }

    const ShowDiagCodes = ({ codes }: { codes: string[] | undefined }) => {
        if (!codes) {
            return <ul></ul>;
        }
        return (
            <ul>
                {codes.map((code) => {
                    const info: Diagnosis | undefined = diagnoses.find(
                        (diag) => diag.code === code
                    );
                    let name = '';
                    if (info) {
                        name = info.name;
                    }
                    return (
                        <li key={code}>
                            {code} {name}
                        </li>
                    );
                })}
            </ul>
        );
    };

    return (
        <div>
            <h2>{patient.name}</h2>
            <h5>{patient.dateOfBirth}</h5>
            <p>Gender: {patient.gender}</p>
            <p>Occupation: {patient.occupation}</p>
            <h2>Entries</h2>
            {patient.entries.map((e) => {
                let diagCodes: Array<string> = [];
                if (e.diagnosisCodes) {
                    diagCodes = e.diagnosisCodes;
                }
                return (
                    <div key={e.id}>
                        <h5>{e.date}</h5>
                        <h4>{e.description}</h4>
                        <ShowDiagCodes codes={e.diagnosisCodes} />
                    </div>
                );
            })}
        </div>
    );
};

export default PatientDetails;
