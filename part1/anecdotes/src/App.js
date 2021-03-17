import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))
   
  const [selected, setSelected] = useState(0)

  const getRandom = () => {
    function getRandomArbitrary(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    }
    let newVal = getRandomArbitrary(0, anecdotes.length)
    console.log(newVal)
    setSelected(newVal)
  }

  const addPointToSelected = () =>{
    const copy = [...points]
    copy[selected] +=1
    setPoints(copy)
  }

  const findMax = () => {
    let max = 0
    let index = NaN

    const compare = (val, ind) => {
      if(val > max){
        max = val;
        index = ind
      }
    }
    points.forEach(compare)
    return index
  }

  let top = findMax()

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <button onClick={getRandom}>NEW ONE PLS</button>
      <p>Rating: {points[selected]}</p>
      <button onClick={addPointToSelected}>Vote</button>
      <h1>Top anecdote</h1>
      <p>{anecdotes[top]}</p>
      <p>Rating: {points[top]}</p>
    </div>
  )
}

export default App
