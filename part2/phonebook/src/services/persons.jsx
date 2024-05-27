import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const addContact = (contact) => {
    const request = axios.post(baseUrl, contact)
    return request.then(response => response.data)
}

const deleteContact = (id) => {
    const request = axios.delete(baseUrl + '/' + id)
    return request.then(response => response.data)
}

const updateContact = (id, newContact) => {
    const request = axios.put(baseUrl + '/' + id, newContact)
    return request.then(response => response.data).catch(error => "error")
}

export default {
    getAll,
    addContact,
    deleteContact,
    updateContact
}