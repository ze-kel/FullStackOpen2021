import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}



const createNew = async (content) => {
    const newAnec = { votes: 0, content: content }
    const response = await axios.post(baseUrl, newAnec)
    return response.data
}

const addVote = async (id) => {
    const targeturl = baseUrl + '/' + id
    const current = await axios.get(targeturl)
    const newAnec = { ...current.data, votes: current.data.votes + 1 }
    const response = await axios.put(targeturl, newAnec)
    return response.data
}



export default { getAll, createNew, addVote }
