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

const mostBlogs = (blogs) => {
    const blogCount = {}
    let mostBlogsAuthor = {
        author: null,
        blogs: 0
    }
    blogs.forEach((blog) => {
        if (blogCount[blog.author] == null) {
            blogCount[blog.author] = 1
        }
        else {
            blogCount[blog.author] += 1
        }
        if (blogCount[blog.author] > mostBlogsAuthor.blogs) {
            mostBlogsAuthor.author = blog.author
            mostBlogsAuthor.blogs = blogCount[blog.author]
        }
    })
    
    return mostBlogsAuthor
}

const mostLikes = (blogs) => {
    const allLikes = {}
    let mostL = {
        author: null,
        likes: 0
    }
    blogs.forEach((blog) => {
        if (allLikes[blog.author] == null) {
            allLikes[blog.author] = blog.likes
        }
        else {
            allLikes[blog.author] += blog.likes
        }
        if (allLikes[blog.author] > mostL.likes) {
            mostL.author = blog.author
            mostL.likes = allLikes[blog.author]
        }
    })
    return mostL
}

  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }