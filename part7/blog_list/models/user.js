const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    blogs: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
        }
    ],
    comments: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
        }
    ],
    name: String,
    username: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: String
})

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      delete returnedObject.passwordHash
    }
})

module.exports = mongoose.model("User", userSchema)