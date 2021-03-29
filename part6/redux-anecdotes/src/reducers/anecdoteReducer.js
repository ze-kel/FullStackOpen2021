import anecdoteService from '../services/anecdotes'


export const addVote = (id) => {
  return async dispatch => {
    const updatedAnec = await anecdoteService.addVote(id)
    dispatch({
      type: 'vote',
      id: id,
      newVoteCount: updatedAnec.votes
    })
  }
}

export const addAnec = (text) => {
  return async dispatch => {
    const newanec = await anecdoteService.createNew(text)
    dispatch({
      type: 'add',
      anec: newanec
    })
  }
}


export const initializeAnecdotes = () => {
  return async dispatch => {
    const initAnecs = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECS',
      content: initAnecs
    })
  }
}


const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'vote':
      return state.map(anec => anec.id === action.id ? { ...anec, votes: action.newVoteCount } : anec)
    case 'add':
      return [...state, action.anec]
    case 'INIT_ANECS':
      return action.content
    default:
      return state
  }
}

export default anecdoteReducer