import { useState, useEffect } from 'react'
import { NewPersonForm } from './components/NewPersonForm'
import { ContactFilter } from './components/Filtering'
import  personsService  from './services/persons'
import { Notification } from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [message, setMessage] = useState(null)
  const [color, setColor] = useState('green')
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

  const handleMessage = (message, color) => {
    setMessage(message)
    setColor(color)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  useEffect(() => {
    personsService.getAll().then(contacts => {
      setPersons(contacts)
    })
  },[])


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} color={color}/>
        <div>
          filter shown with <input value={Filter}
          onChange={handleFilter}/>
        </div>
      <NewPersonForm newName={newName} handleAddingPerson={handleAddingPerson} newNumber={newNumber} handleAddingNumber={handleAddingNumber} persons={persons} setPersons={setPersons} handleMessage={handleMessage}/>
      <h2>Numbers</h2>
      <ContactFilter Filter={Filter} persons={persons} setPersons={setPersons} lowcaseFilter={lowcaseFilter}/>
    </div>
  )
}

export default App