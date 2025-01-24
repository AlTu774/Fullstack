const bcrypt = require('bcrypt')
const initialUsers = [
    {
        name: "User11",
        username: "first123",
        password: "pass123"
    }
]

const generateHash = async (password) => {
    const passwordHash = await bcrypt.hash(password, 10)
    return (passwordHash)
}



module.exports = { initialUsers, generateHash }