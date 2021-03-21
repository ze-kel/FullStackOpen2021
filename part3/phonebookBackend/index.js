const express = require('express')
const { response } = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

const moment = require('moment')

var morgan = require('morgan')
morgan.token('showData', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms | :showData'))

app.use(express.json())

let persons = [
    {
        id: 1,
        name: "Arto",
        number: "11243354"
    },
    {
        id: 2,
        name: "Jake",
        number: "967965"
    },
    {
        id: 4,
        name: "Nick",
        number: "456832"
    }
]

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p> <p>${moment().format('MMMM Do YYYY, HH:mm:ss')}</p>` )
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }    
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

const generateId = () => {
    return Math.round(Math.random()*10000)
}
  

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({ 
          error: 'Name is missing' 
        })
    }
    if (!body.number) {
        return response.status(400).json({ 
          error: 'Number is missing' 
        })
    }
    if (persons.some(person => person.name === body.name )) {
        return response.status(400).json({ 
          error: 'Name already exists' 
        })
    }    

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    persons = persons.concat(person)

    response.json(person)
})

const unknownEndpoint = (request, response) => {
response.status(404).send({ error: 'unknown endpoint' })
}
  
app.use(unknownEndpoint)
  
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

