import diagData from '../../data/diagnoses';

import { Diagnosis } from '../types';

const getDiagData = (): Array<Diagnosis> => {
    return diagData;
};

const addDiagData = () => {
    return null;
};

export default { getDiagData, addDiagData };
