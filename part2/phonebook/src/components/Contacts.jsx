import DeleteButton from "./DeleteButton"

export const Contacts = (contactsToShow, persons, setPersons) => {
    return (
        <div>
        {contactsToShow.map(person =>
            <p key={person.name}>
            {person.name} {person.number}
            <DeleteButton persons={persons} setPersons={setPersons} id={person.id}/>
            </p>
            )}
        </div>
    )
}

export default Contacts