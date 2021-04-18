interface TrainingInfo {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateTraining = (
    data: Array<number>,
    target: number
): TrainingInfo => {
    const periodLength = data.length;
    const trainingDays = data.map((number) => number > 0).length;
    const CalcAverage = (data: Array<number>) =>
        data.reduce((p: number, c: number) => p + c, 0) / data.length;
    const average = CalcAverage(data);

    const success = average >= target;

    let rating;
    let ratingDescription;

    if (average > target) {
        rating = 3;
        ratingDescription = 'good job!';
    } else if (target - average < 0.5) {
        console.log(target - average);
        rating = 2;
        ratingDescription = 'not too bad but could be better';
    } else {
        rating = 1;
        ratingDescription = 'wtf dudee...';
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
};

const getExcCalculation = (trainData: Array<number>, target: number) => {
    if (trainData.length < 1) {
        return 'Wrong input';
    }

    if (isNaN(target)) {
        return 'Wrong input';
    }

    return calculateTraining(trainData, target);
};

export { getExcCalculation };
