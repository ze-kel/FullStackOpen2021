import React, { useState, useEffect } from 'react'
import bookServer from './bookServer'




const PhoneListEntry = ({ person, handleDelete }) => {

  return (
    <p>{person.name} | {person.number} <button onClick={() => handleDelete(person.id, person.name)}>Delete</button> </p> 
  )
}

const RenderPhoneList = ({ persons,handleDelete }) => {
  return (
    <div>
      {persons.map(person => <PhoneListEntry key={person.id} person={person} handleDelete={handleDelete}/>)}
    </div>)
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

const Notification = ({message}) =>{
    if(message){
      return <p className="message">{message}</p>
    }else{
      return null
    }
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterVal, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  let personsToshow = filterVal.length === 0 ? persons : persons.filter(person => person.name.toLowerCase().includes(filterVal.toLowerCase()))


  useEffect(() => {
      bookServer
      .getAll()
      .then(response => {
        setPersons(response)
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
  const handleDelete = (id, name) =>{
    if(window.confirm(`Delete ${name}?`)){
      bookServer
      .remove(id)
      .then(() =>{
        setPersons(persons.filter( (person) => person.id != id ) )
      })
    }
  }

  const sendMessage = (message) =>{
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage("");
    }, 4000);
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (newName.length === 0 || newNumber.length === 0) {
      alert("Can't have empty fields")
      return
    }
    const newPerson = { name: newName, number: newNumber }

    let existingPerson = persons.filter(person => person.name === newPerson.name)[0]

    if (existingPerson) {
      if(!window.confirm(`${newPerson.name} exists. Update?`)){return}
      bookServer
      .updateExisting(existingPerson.id, newPerson)
      .then(response => {
        setPersons(persons.map((person) => person.id !== existingPerson.id ? person : response))
        sendMessage(`Changed ${newPerson.name}`)
      })
      .catch(error =>{
        console.log(error.response.data)
        sendMessage(error.response.data.error)
        return
      })

    }else{
      bookServer
      .addNew(newPerson)
      .then(response => {
        setPersons(persons.concat(response))
        sendMessage(`Added ${newPerson.name}`)
      })
      .catch(error =>{
        console.log(error.response.data)
        sendMessage(error.response.data.error)
        return
      })
    }


    setNewName("")
    setNewNumber("")
  }


  return (
    <div>
      <Notification message={errorMessage}/>
      <h2>Phonebook</h2>
      <FilterForm value={filterVal} call={handleFilterChange} />
      <h2>Add new</h2>
      <PersonForm name={newName} number={newNumber} handleName={handleNameChange} handleNumber={handleNumberChange} Submit={addPerson} />
      <h2>Numbers</h2>
      <RenderPhoneList persons={personsToshow} handleDelete={handleDelete}  />
    </div>
  )
}

export default App
