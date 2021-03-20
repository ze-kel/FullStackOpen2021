import React, { useState, useEffect  } from 'react'
import axios from 'axios'



const PhoneListEntry = ({name, number}) => <li>{name} | {number} </li>

const RenderPhoneList = ({ persons }) => {
  return (
    <ul>
      {persons.map(person => <PhoneListEntry key={person.name} name={person.name} number={person.number} />)}
    </ul>)
}

const PersonForm = ({ name, number, handleName, handleNumber, Submit }) => {
  return (<form>
    <div>
      name: <input value={name} onChange={handleName} />
    </div>
    <div>
      number: <input value={number} onChange={handleNumber} />
    </div>
    <div>
      <button type="submit" onClick={Submit}>add</button>
    </div>
  </form>)
}

const FilterForm = ({value, call}) => <input value={value} onChange={call} />


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterVal, setFilter] = useState('')

  let personsToshow = filterVal.length === 0 ? persons : persons.filter(person => person.name.toLowerCase().includes(filterVal.toLowerCase()))


  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })

  }, [])


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    if (newName.length === 0 || newNumber.length === 0) {
      alert("Can't have empty fields")
      return
    }

    setPersons(persons.concat({ name: newName, number: newNumber }))
    setNewName("")
    setNewNumber("")
  }


  return (
    <div>

      <h2>Phonebook</h2>
      <FilterForm value={filterVal} call={handleFilterChange} />
      <h2>Add new</h2>
      <PersonForm name={newName} number={newNumber} handleName={handleNameChange} handleNumber={handleNumberChange} Submit={addPerson} />
      <h2>Numbers</h2>
      <RenderPhoneList persons={personsToshow} />
    </div>
  )
}

export default App
