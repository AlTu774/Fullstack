import { Contacts } from "./Contacts"

export const ContactFilter = ({Filter, persons, setPersons, lowcaseFilter}) => {
    const contactsToShow = (Filter==="")
        ? persons
        : persons.filter(person => ((person.name).toLowerCase()).includes(lowcaseFilter))
    
    const filteredContacts = Contacts(contactsToShow, persons, setPersons)
    
    return (filteredContacts)
}

export default ContactFilter