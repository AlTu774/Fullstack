import axios from "axios"
import personsService from "../services/persons"

export const NewPersonForm = ({newName, handleAddingPerson, newNumber, handleAddingNumber, persons, setPersons}) => {
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
          personsService.add(person)
          setPersons(persons.concat(person))
        }
    }

    return (
        <div>
        <h2>Add new name & number</h2>
        <form onSubmit={(event) => AddPerson(event, newName, newNumber, persons, setPersons)}>
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
      </div>
    )
  }

export default NewPersonForm