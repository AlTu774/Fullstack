const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'

    },
    url: String,
    comments: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
        }
    ],
    likes: Number
  })
  
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

  module.exports = mongoose.model('Blog', blogSchema)