import express from 'express';

import { calculateBmi } from './bmi';
import { getExcCalculation } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    const bmi = calculateBmi(height, weight);
    if (bmi === 'Wrong input') {
        res.send({
            error: 'malformatted parameters',
        });
    }
    res.send({
        weight,
        height,
        bmi,
    });
});

app.post('/exercises', (req, res) => {
    if (!req.body.daily_exercises || !req.body.target) {
        res.json({
            error: 'parameters missing',
        });
    }

    const exercises = req.body.daily_exercises;
    const target = Number(req.body.target);

    if (exercises.length < 1 || isNaN(target)) {
        res.json({
            error: 'malformed parameteres',
        });
    }

    res.json(getExcCalculation(exercises, target));
});

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
