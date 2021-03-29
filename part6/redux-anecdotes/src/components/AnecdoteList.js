import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'


const AnecdoteList = (props) => {

  const anecdotes = props.anecdotes

  const vote = (anecdote) => {
    props.addVote(anecdote.id)
    props.setNotification(`You voted for '${anecdote.content}'`, 5)
  }

  return (anecdotes.map(anecdote =>
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </div>
  )
  )
}

const mapStateToProps = (state) => {
  const filtered = state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
  filtered.sort((a, b) => b.votes - a.votes)
  return {
    anecdotes: filtered
  }
}

const mapDispatchToProps = {
  addVote,
  setNotification
}

const connectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default connectedAnecdoteList