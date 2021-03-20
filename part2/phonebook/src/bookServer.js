import axisos from "axios"

const baseurl = "http://localhost:3001/persons"

const getAll = () => {
    const request = axisos.get(baseurl)
    return request.then(response => response.data)
}

const addNew = person => {
    const request = axisos.post(baseurl, person)
    return request.then(response => response.data)
}

const remove = (id) => {
    const request = axisos.delete(baseurl + "/" + id)
    return request.then(response => response.status)
}

const updateExisting = (id, person) => {
    const request = axisos.put(baseurl + "/" + id, person)
    return request.then(response => response.data)
}

export default {getAll, addNew, remove , updateExisting}