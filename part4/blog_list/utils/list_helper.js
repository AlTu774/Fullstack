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

const favoriteBlog = (blogs) => {
    let maxLikes = -1
    let favorite = {}
    blogs.forEach((blog) => {
        if (blog.likes > maxLikes) {
            favorite = blog
            maxLikes = blog.likes
        }
    })
    return favorite
}

  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }