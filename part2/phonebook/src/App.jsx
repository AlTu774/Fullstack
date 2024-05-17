import { useState, useEffect } from 'react'
import { NewPersonForm } from './components/NewPersonForm'
import { ContactFilter } from './components/Filtering'
import  personsService  from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [Filter, setFilter] = useState('')
  const [lowcaseFilter, setlowcaseFilter] = useState('')

  const handleAddingPerson = (event) => {
    setNewName(event.target.value)
  }

  const handleAddingNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    const filterString = event.target.value
    setlowcaseFilter(filterString.toLowerCase())
    setFilter(filterString)
  }

  useEffect(() => {
    personsService.getAll().then(contacts => {
      setPersons(contacts)
    })
  },[])


  return (
    <div>
      <h2>Phonebook</h2>
        <div>
          filter shown with <input value={Filter}
          onChange={handleFilter}/>
        </div>
      <NewPersonForm newName={newName} handleAddingPerson={handleAddingPerson} newNumber={newNumber} handleAddingNumber={handleAddingNumber} persons={persons} setPersons={setPersons}/>
      <h2>Numbers</h2>
      <ContactFilter Filter={Filter} persons={persons} setPersons={setPersons} lowcaseFilter={lowcaseFilter}/>
    </div>
  )
}

export default App