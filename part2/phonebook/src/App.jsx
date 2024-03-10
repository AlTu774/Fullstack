import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: "040-1234567"}
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [Filter, setFilter] = useState("")
  const [lowcaseFilter, setlowcaseFilter] = useState("")

  const AddPerson = (event) => {
    event.preventDefault()
    let new_p = true
    const person = { name: newName, number: newNumber }
    persons.forEach(existing_person => {
      if (JSON.stringify(person.name) === JSON.stringify(existing_person.name)) {
        alert(`${newName} is already added to phonebook`)
        new_p = false
        return
      }
    })
    if (new_p) {
    setPersons(persons.concat(person))
    console.log(persons)
    }
  }

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

  const contactsToShow = (Filter==="")
    ? persons
    : persons.filter(person => ((person.name).toLowerCase()).includes(lowcaseFilter))

  return (
    <div>
      <h2>Phonebook</h2>
        <div>
          filter shown with <input value={Filter}
          onChange={handleFilter}/>
        </div>
      <h2>Add new name & number</h2>
      <form onSubmit={AddPerson}>
        <div>
          name: <input value={newName}
          onChange={handleAddingPerson}
          />
        </div>
        <div>
          number: <input value={newNumber}
          onChange={handleAddingNumber}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {contactsToShow.map(person =>
        <p key={person.name}>
          {person.name} {person.number}
          </p>
        )}
    </div>
  )
}

export default App