import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Button, Divider, Header, Container } from 'semantic-ui-react';

import { apiBaseUrl } from './constants';
import { useStateValue, setPatientList, setDiagnosisList } from './state';
import { Diagnosis, Patient } from './types';

import PatientListPage from './PatientListPage';
import PatientDetails from './PatientDetails';

const App = () => {
    const [, dispatch] = useStateValue();
    React.useEffect(() => {
        const fetchPatientList = async () => {
            try {
                const { data: patientListFromApi } = await axios.get<Patient[]>(
                    `${apiBaseUrl}/patients`
                );
                dispatch(setPatientList(patientListFromApi));
            } catch (e) {
                console.error(e);
            }
        };
        void fetchPatientList();
    }, [dispatch]);

    React.useEffect(() => {
        const fetchDiagnosistList = async () => {
            try {
                const { data: diagnosesListFromApi } = await axios.get<
                    Diagnosis[]
                >(`${apiBaseUrl}/diagnoses`);
                dispatch(setDiagnosisList(diagnosesListFromApi));
            } catch (e) {
                console.error(e);
            }
        };
        void fetchDiagnosistList();
    }, [dispatch]);

    return (
        <div className="App">
            <Router>
                <Container>
                    <Header as="h1">Patientor</Header>
                    <Button as={Link} to="/" primary>
                        Home
                    </Button>
                    <Divider hidden />
                    <Switch>
                        <Route path="/patients/:id">
                            <PatientDetails />
                        </Route>
                        <Route path="/">
                            <PatientListPage />
                        </Route>
                    </Switch>
                </Container>
            </Router>
        </div>
    );
};

export default App;
