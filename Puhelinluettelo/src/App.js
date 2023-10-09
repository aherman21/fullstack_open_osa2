import { useEffect, useState } from 'react'
import axios from 'axios'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from './services/persons'
import { v4 as uuidv4} from 'uuid'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')  
  const [filterText, setFilterText] = useState('')


  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const updateNumber = (id, personObject) => {
    if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
    personService.update(id, personObject)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
      })
    }
  }
  
    
  

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const personObject = {
      name: newName,
      number: newNumber,
      id: uuidv4()  //UUID otettu käyttöön jotta ei tule vahingossa duplicate ID casea
    }
    if (persons.some(person =>
      person.name.toLowerCase() === newName.toLowerCase())) {
      updateNumber(persons.find(person => person.name.toLowerCase() === newName.toLowerCase()).id, personObject)
      return
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })

  
}



  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const handleNumberChange = (event) => {
      setNewNumber(event.target.value)  
  }

  const handleRemove = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      personService.remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
      }
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
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
          <Persons filteredPersons={filteredPersons} onRemove={handleRemove}></Persons>
    </div>
  )

}

export default App
