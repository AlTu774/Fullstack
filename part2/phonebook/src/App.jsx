import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const AddPerson = (event) => {
    event.preventDefault()
    let new_p = true
    const person = { name: newName }
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={AddPerson}>
        <div>
          name: <input value={newName}
          onChange={handleAddingPerson}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person =>
        <p key={person.name}>
          {person.name}
          </p>
        )}
    </div>
  )
}

export default App