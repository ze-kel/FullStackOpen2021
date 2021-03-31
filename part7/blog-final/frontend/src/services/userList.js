import axios from 'axios'
const baseUrl = '/api/users'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then((response) => response.data)
}

const create = async (newObject) => {
    const response = await axios.post(baseUrl, newObject)
    console.log(response.data)
    return response.data
}

export default { getAll, create }
