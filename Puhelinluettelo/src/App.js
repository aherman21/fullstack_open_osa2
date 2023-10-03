import { useEffect, useState } from 'react'
import axios from 'axios'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')  
  const [filterText, setFilterText] = useState('')


  useEffect(() => {
    console.log('effect')
    axios
        .get('http://localhost:3001/persons')
        .then(response =>{
          console.log('promise fullfilled')
          setPersons(response.data)
        })
  }, [])
  console.log('render', persons.length, 'persons')
  

  

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    if (persons.some(person =>
      person.name.toLowerCase() === newName.toLowerCase())) {
      alert(`${newName} is already added to phonebook`)
      return
    } else {
      setPersons(persons.concat(personObject))
  }
}

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const handleNumberChange = (event) => {
      console.log(event.target.value)
      setNewNumber(event.target.value)  
  }


  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filterText.toLowerCase()) || person.number.includes(filterText))
 

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter
        filterText={filterText}
        handleFilterChange={handleFilterChange} />
      <h3>Add new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
          <Persons filteredPersons={filteredPersons}></Persons>
    </div>
  )

}

export default App
