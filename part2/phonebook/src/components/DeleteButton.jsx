import personsService from "../services/persons";

const DeleteButton = ({persons, setPersons, id}) => {
    const handleOnClick = () => {
        const personToDelete = persons.find(person => person.id === id)
        if (window.confirm('Delete ' + personToDelete.name + '?')) {
        personsService.deleteContact(id)
        .then(() => setPersons(originalPersons => originalPersons.filter(person => person.id !== id)))
        }
    }

    return (
        <>
        <button onClick={()=>handleOnClick()}>delete</button>
        </>
    )    
    
}

export default DeleteButton