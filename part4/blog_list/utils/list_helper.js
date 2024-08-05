const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    if (blogs == [] || null) {
        return 0
    }
    const likeSum = blogs.reduce((likes, blog) => {
        return (likes+blog.likes)
    },0)
    return (likeSum)
}

  module.exports = {
    dummy,
    totalLikes
  }