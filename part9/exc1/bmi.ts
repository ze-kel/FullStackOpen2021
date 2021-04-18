const calculateBmi = (height: number, weight: number): string => {
    if (isNaN(height) || isNaN(weight)) {
        return 'Wrong input';
    }

    const bmi = weight / (height * 0.01) ** 2;
    if (bmi < 15) {
        return 'Very severely underweight';
    } else if (bmi < 16) {
        return 'Severely underweight';
    } else if (bmi < 18.5) {
        return 'Underweight';
    } else if (bmi < 25) {
        return 'Normal (healthy weight)';
    } else if (bmi < 30) {
        return 'Overweight';
    } else {
        return 'Obese';
    }
};

export { calculateBmi };
