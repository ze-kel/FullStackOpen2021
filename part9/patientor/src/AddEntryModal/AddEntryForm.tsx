/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';

import {
    TextField,
    SelectField,
    DiagnosisSelection,
    NumberField,
} from './FormField';
import { Entry, HealthCheckRating } from '../types';

import { useStateValue } from '../state';

export type EntryFormValues = {
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes: string[];
    type: 'Hospital' | 'OccupationalHealthcare' | 'HealthCheck';
    employerName: string;
    discharge: {
        date: string;
        criteria: string;
    };
    sickleave: {
        startDate: string;
        endDate: string;
    };
    healthCheckRating: HealthCheckRating;
};

const typeOptions = [
    { value: 'Hospital', label: 'Hospital' },
    { value: 'OccupationalHealthcare', label: 'Occupational Healthcare' },
    { value: 'HealthCheck', label: 'Health Check' },
];

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
}

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
    const [{ diagnoses }, dispatch] = useStateValue();
    return (
        <Formik
            initialValues={{
                description: 'test1',
                date: 'test2',
                specialist: 'test3',
                diagnosisCodes: [''],
                type: 'Hospital',
                employerName: 'test4',
                discharge: {
                    date: 'test5',
                    criteria: 'test6',
                },
                sickleave: {
                    startDate: 'test7',
                    endDate: 'test8',
                },
                healthCheckRating: 0,
            }}
            onSubmit={onSubmit}
            validate={(values) => {
                const requiredError = 'Field is required';
                const errors: { [field: string]: string } = {};
                if (!values.description) {
                    errors.description = requiredError;
                }
                if (!values.date) {
                    errors.date = requiredError;
                }
                if (!values.specialist) {
                    errors.diagnosisCodes = requiredError;
                }
                if (values.type === 'Hospital') {
                    if (!values.discharge.date) {
                        errors.discharge = requiredError;
                    }
                    if (!values.discharge.criteria) {
                        errors.discharge = requiredError;
                    }
                }
                if (values.type === 'OccupationalHealthcare') {
                    if (!values.employerName) {
                        errors.employerName = requiredError;
                    }
                }
                if (values.type === 'HealthCheck') {
                    if (!values.healthCheckRating) {
                        errors.healthCheckRating = requiredError;
                    }
                }
                return errors;
            }}
        >
            {({ isValid, dirty, setFieldTouched, setFieldValue, values }) => {
                return (
                    <Form className="form ui">
                        <Field
                            label="Description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            label="Date"
                            placeholder="YYYY-MM-DD"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="Specialist"
                            placeholder="Doctor House MD"
                            name="specialist"
                            component={TextField}
                        />
                        <Field
                            label="Occupation"
                            placeholder="Occupation"
                            diagnoses={diagnoses}
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            component={DiagnosisSelection}
                        />
                        <SelectField
                            label="Type"
                            name="type"
                            options={typeOptions}
                        />
                        {values.type === 'Hospital' ? (
                            <React.Fragment>
                                <Field
                                    label="Discrarge Date"
                                    placeholder="YYYY-MM-DD"
                                    name="discharge.date"
                                    component={TextField}
                                />
                                <Field
                                    label="Discrarge criteria"
                                    placeholder="The illness was healed"
                                    name="discharge.criteria"
                                    component={TextField}
                                />
                            </React.Fragment>
                        ) : (
                            ''
                        )}

                        {values.type === 'OccupationalHealthcare' ? (
                            <React.Fragment>
                                <Field
                                    label="Employer Name"
                                    placeholder="Work LTD."
                                    name="employerName"
                                    component={TextField}
                                />
                                <Field
                                    label="Sick leave From (optional)"
                                    placeholder="YYYY-MM-DD"
                                    name="sickleave.startDate"
                                    component={TextField}
                                />
                                <Field
                                    label="Sick leave To (optional)"
                                    placeholder="YYYY-MM-DD"
                                    name="sickleave.endDate"
                                    component={TextField}
                                />
                                <Field
                                    label="Helath Check Rating(optional)"
                                    name="healthCheckRating"
                                    component={NumberField}
                                    min={0}
                                    max={3}
                                />
                            </React.Fragment>
                        ) : (
                            ''
                        )}

                        {values.type === 'HealthCheck' ? (
                            <React.Fragment>
                                <Field
                                    label="Helath Check Rating"
                                    name="healthCheckRating"
                                    component={NumberField}
                                    min={0}
                                    max={3}
                                />
                            </React.Fragment>
                        ) : (
                            ''
                        )}
                        {console.log(values)}
                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button
                                    type="button"
                                    onClick={onCancel}
                                    color="red"
                                >
                                    Cancel
                                </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                                <Button
                                    type="submit"
                                    floated="right"
                                    color="green"
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddEntryForm;
