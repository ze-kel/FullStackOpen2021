import diagData from '../../data/diagnoses';

import { Diagnose } from '../types';

const getDiagData = (): Array<Diagnose> => {
    return diagData;
};

const addDiagData = () => {
    return null;
};

export default { getDiagData, addDiagData };
