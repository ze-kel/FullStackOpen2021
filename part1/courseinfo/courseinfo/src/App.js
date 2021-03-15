import React from 'react'

const RenderHeader = (info) =>{
  return(<h1>{info.course}</h1>)
}

const RenderPart = (info) =>{
  return(<p>{info.part + " " + info.exercises} </p>)
}

const RenderNumberOfExcercises = (info) =>{
  return (<p>Number of exercises {info.number}</p>)
}
 
const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <RenderHeader course={course}/>
      <RenderPart part={part2} exercises={exercises2}/>
      <RenderPart part={part1} exercises={exercises1}/>
      <RenderPart part={part3} exercises={exercises3}/>
      <RenderNumberOfExcercises number={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App
