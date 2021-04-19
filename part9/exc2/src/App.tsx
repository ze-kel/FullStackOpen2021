import React from 'react';

const Header = ({ name }: { name: string }) => {
    return <h1>{name}</h1>;
};

interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
}

interface CourseWithDescription extends CoursePartBase {
    description: string;
}

interface CourseNormalPart extends CourseWithDescription {
    type: 'normal';
}
interface CourseProjectPart extends CoursePartBase {
    type: 'groupProject';
    groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseWithDescription {
    type: 'submission';
    exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CourseWithDescription {
    type: 'special';
    requirements: Array<string>;
}

type CoursePart =
    | CourseNormalPart
    | CourseProjectPart
    | CourseSubmissionPart
    | CourseSpecialPart;

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Part = ({ part }: { part: CoursePart }) => {
    switch (part.type) {
        case 'normal':
            return (
                <div>
                    {part.name} {part.exerciseCount} exc.
                </div>
            );
        case 'groupProject':
            return (
                <div>
                    {part.name} {part.exerciseCount} exc.{' '}
                    {part.groupProjectCount} group projects
                </div>
            );
        case 'submission':
            return (
                <div>
                    {part.name} {part.exerciseCount} exc.{' '}
                    {part.exerciseSubmissionLink}
                </div>
            );
        case 'special':
            return (
                <div>
                    {part.name} {part.exerciseCount} exc. requirements:{' '}
                    {part.requirements.map((req) => req + ' ')}
                </div>
            );
        default:
            return assertNever(part);
    }
};

const Content = ({ parts }: { parts: CoursePart[] }) => {
    return (
        <div>
            {parts.map((part) => (
                <Part key={part.name} part={part} />
            ))}
        </div>
    );
};

const TotalExc = ({ parts }: { parts: CoursePart[] }) => {
    return (
        <p>
            Number of exercises{' '}
            {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </p>
    );
};

const App = () => {
    const courseName = 'Half Stack application development';
    const courseParts: CoursePart[] = [
        {
            name: 'Fundamentals',
            exerciseCount: 10,
            description: 'This is the leisured course part',
            type: 'normal',
        },
        {
            name: 'Advanced',
            exerciseCount: 7,
            description: 'This is the harded course part',
            type: 'normal',
        },
        {
            name: 'Using props to pass data',
            exerciseCount: 7,
            groupProjectCount: 3,
            type: 'groupProject',
        },
        {
            name: 'Deeper type usage',
            exerciseCount: 14,
            description: 'Confusing description',
            exerciseSubmissionLink:
                'https://fake-exercise-submit.made-up-url.dev',
            type: 'submission',
        },
        {
            name: 'Backend development',
            exerciseCount: 21,
            description: 'Typing the backend',
            requirements: ['nodejs', 'jest'],
            type: 'special',
        },
    ];

    return (
        <div>
            <Header name={courseName} />
            <Content parts={courseParts} />
            <TotalExc parts={courseParts} />
        </div>
    );
};

export default App;
