const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  text: String,
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
    }
})

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Comment', commentSchema)