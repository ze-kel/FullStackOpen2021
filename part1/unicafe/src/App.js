import React, { useState } from 'react'


const Button  = ({ handleClick, text }) => {
  console.log("CLICKED")
  return <button onClick={handleClick}>{text}</button>
}

const Statistic = ({text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}


const Statistics = ({ good, neutral, bad }) => {
  return (
  <div>
    <h1>Statistics</h1>
    <table>
      <tbody>
        <Statistic text="Good" value={good} />
        <Statistic text="Neutral" value={neutral} />
        <Statistic text="Bad" value={bad} />
        <Statistic text="All" value={good + neutral + bad} />
        <Statistic text="Average" value={(good + neutral + bad)/3} />
        <Statistic text="Positive" value={good/(good+neutral+bad)*100 + "%"} />
      </tbody>
    </table>
  </div>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => { setGood(good + 1) }
  const addNeutral = () => { setNeutral(neutral + 1) }
  const addBad = () => { setBad(bad + 1) }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={addGood} text={"Good"} />
      <Button handleClick={addNeutral} text={"Neutral"} />
      <Button handleClick={addBad} text={"Bad"} />
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App
