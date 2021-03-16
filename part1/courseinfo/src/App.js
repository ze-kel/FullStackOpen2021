import React from 'react'

const Header = (info) =>{
  return(<h1>{info.course}</h1>)
}

const Content = (info) =>{
  return([<p>{info.parts[0].name + " " + info.parts[0].exercises}</p>,
  <p>{info.parts[1].name + " " + info.parts[1].exercises} </p>,
  <p>{info.parts[2].name + " " + info.parts[2].exercises} </p>])
}

const Total = (info) =>{
  return (<p>Number of exercises {info.parts[0].exercises+info.parts[1].exercises+info.parts[2].exercises}</p>)
}
 
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header  course={course.name}/>
      <Content  parts={course.parts}/>
      <Total  parts={course.parts} />
    </div>
  )
}

export default App
