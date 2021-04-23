/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Button } from 'semantic-ui-react';

import AddEntryModal from '../AddEntryModal';
import { Diagnosis, Entry, Patient } from '../types';
import HealthRatingBar from '../components/HealthRatingBar';

import { apiBaseUrl } from '../constants';

import { useStateValue, updatePatient } from '../state';
import { useParams } from 'react-router';
import axios from 'axios';

import { EntryFormValues } from '../AddEntryModal/AddEntryForm';

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const PatientDetails = () => {
    const [{ patients, diagnoses }, dispatch] = useStateValue();
    const [error, setError] = React.useState<string | undefined>();

    const params = useParams<{ id: string }>();
    const id = params.id;
    const patient = patients[id];

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    if (!patient) {
        return <div>No patient found</div>;
    }

    const submitNewDiag = async (values: EntryFormValues) => {
        try {
            const { data: updatedPatient } = await axios.post<Patient>(
                `${apiBaseUrl}/patients/${id}`,
                values
            );
            dispatch(updatePatient(updatedPatient));
            closeModal();
        } catch (e) {
            console.error(e.response?.data || 'Unknown Error');
            setError(e.response?.data?.error || 'Unknown error');
        }
    };

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

    const ShowExtraDetail = ({ entry }: { entry: Entry }) => {
        switch (entry.type) {
            case 'Hospital':
                return (
                    <div>
                        In hospital. Discharged at {entry.discharge.date} with{' '}
                        {entry.discharge.criteria}
                    </div>
                );
            case 'HealthCheck':
                return (
                    <div>
                        Performed health check.
                        <HealthRatingBar
                            showText={false}
                            rating={entry.healthCheckRating}
                        />
                    </div>
                );
            case 'OccupationalHealthcare':
                return (
                    <div>
                        Occupational Healthcare. Employer {entry.employerName}.
                        {entry.sickLeave
                            ? ` Sick leave from ${entry.sickLeave.startDate} to ${entry.sickLeave.endDate}`
                            : ''}
                        {entry.healthCheckRating ? (
                            <HealthRatingBar
                                showText={false}
                                rating={entry.healthCheckRating}
                            />
                        ) : (
                            ''
                        )}
                    </div>
                );
            default:
                assertNever;
                return <div></div>;
        }
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
                        <ShowExtraDetail entry={e} />
                    </div>
                );
            })}
            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewDiag}
                error={error}
                onClose={closeModal}
            />
            <Button onClick={() => openModal()}>Add New Entry</Button>
        </div>
    );
};

export default PatientDetails;
