import { Contacts } from "./Contacts"

export const ContactFilter = ({Filter, persons, lowcaseFilter}) => {
    const contactsToShow = (Filter==="")
        ? persons
        : persons.filter(person => ((person.name).toLowerCase()).includes(lowcaseFilter))
    
    const filteredContacts = Contacts(contactsToShow)
    
    return (filteredContacts)
}

export default ContactFilter