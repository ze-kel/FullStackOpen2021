import React, { } from 'react'

const Header = ({title}) => {
  return (<h1>{title}</h1>)
}

const Content = ({exercises, id}) => {
  return(
    exercises.map(part => {
    return <li key={part.id}>{part.name} {part.exercises}</li>})
  )
}

const Total = ({exercises}) => {
  return <p>Number of exercises: {exercises.reduce(
    (total, num) => { return { "exercises": total.exercises + num.exercises } }
  ).exercises
  }</p>
}

const Course = ({ course }) => {
  
  return (
    <React.Fragment>
      <Header title={course.name}/>
      <Content exercises={course.parts} id = {course.id}/>
      <Total exercises={course.parts} />
    </React.Fragment>
  )
}

const Courses = ({courses}) => {
  console.log(courses)
  return(
  <React.Fragment>
    {courses.map((course) => <Course key={course.id} course={course}/>)}
  </React.Fragment>
  )
}

export default Courses