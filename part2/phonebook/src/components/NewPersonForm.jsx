import personsService from "../services/persons"

export const NewPersonForm = ({newName, handleAddingPerson, newNumber, handleAddingNumber, persons, setPersons, handleMessage}) => {
    
  const AddPerson = (event) => {
        event.preventDefault()
        let new_p = true
        const person = { name: newName, number: newNumber }
        let copyPersons = [...persons]
        let action = "Added"
        let color = "green"
        copyPersons.forEach(existing_person => {
            if (JSON.stringify(person.name) === JSON.stringify(existing_person.name)) {
              if (window.confirm(person.name + " is already added to phonebook, replace the old number with a new one?")) {
                const newContact = {
                  "name": person.name,
                  "number": person.number,
                  "id": existing_person.id
                }
                personsService.updateContact(existing_person.id, newContact).then((result) => {
                  existing_person.number = newNumber
                  handleMessage("Updated " + person.name, "green")
                })
                .catch(error => {
                  handleMessage(error.response.data.error, "red")
                  new_p = false
                  return
                })
              }
              setPersons(copyPersons)
              new_p = false
              return
            }
        })
        if (new_p) {
          let message = action + " " + person.name
          personsService.addContact(person).then(newPerson => {
            setPersons(persons.concat(newPerson))

            handleMessage(message, color)
          })
          .catch(error => {
            message = error.response.data.error
            color = "red"

            handleMessage(message, color)
          })
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