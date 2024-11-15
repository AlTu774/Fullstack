const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

const blogs = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
      },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
  ]

describe('totalLikes', () => {
      test('when list has only one blog, equals the likes of that', () => {
        const listWithOneBlog = [blogs[0]]
        const result = listHelper.totalLikes(listWithOneBlog)
        assert.strictEqual(result, 5)
      })

      test('when list has multiple blogs, return the sum of their likes', () => {
        blogsWithLikes = blogs.slice(0,4)
        const result = listHelper.totalLikes(blogsWithLikes)
        assert.strictEqual(result, 34)
      })

      test('when list has blogs that have no likes, return 0', () => {
        blogsWithNoLikes = [blogs[4], blogs[4]]
        const result = listHelper.totalLikes(blogsWithNoLikes)
        assert.strictEqual(result, 0)
      })

      test('when list is empty, return 0', () => {
        const result = listHelper.totalLikes([])
        assert.strictEqual(result, 0)
      })
})

describe('favoriteBlog', () => {
    
    test('when list has only one blog, return the only blog', () => {
        oneBlog = [blogs[0]]
        result = listHelper.favoriteBlog(oneBlog)
        assert.deepEqual(result, oneBlog[0])
    })

    test('when list has many blogs, it returns the one with the most likes', () => {
        result = listHelper.favoriteBlog(blogs)
        assert.deepEqual(result, blogs[2])
    })

    test('when list has two blogs with most likes, it returns the first one',() => {
        listWithTwoFavorites = [
            {
                _id: "5a422a851b54a676234d17f7",
                title: "React patterns",
                author: "Michael Chan",
                url: "https://reactpatterns.com/",
                likes: 7,
                __v: 0
              },
            {
              _id: "5a422b3a1b54a676234d17f9",
              title: "Canonical string reduction",
              author: "Edsger W. Dijkstra",
              url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
              likes: 12,
              __v: 0
            },
            {
              _id: "5a422b891b54a676234d17fa",
              title: "First class tests",
              author: "Robert C. Martin",
              url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
              likes: 12,
              __v: 0
            }
        ]
        result = listHelper.favoriteBlog(listWithTwoFavorites)
        assert.deepEqual(result, listWithTwoFavorites[1])
    })

    test('when list is empty, it returns an empty object', () => {
        result = listHelper.favoriteBlog([])
        assert.deepEqual(result, {})
    }) 
})

describe('mostBlogs', () => {
  test('it returns the correct author',() => {
    const result = listHelper.mostBlogs(blogs)
    assert.deepEqual(result.author,"Robert C. Martin")
  })

  test('it returns the correct amount of blogs',() => {
    const result = listHelper.mostBlogs(blogs)
    assert.deepEqual(result.blogs, 3)
  })

  test('when there are 2 authors with the same amount of blogs, it returns either one',() => {
    const twoMost = blogs.slice(1,5)
    const result = listHelper.mostBlogs(twoMost)
    assert(["Edsger W. Dijkstra","Robert C. Martin"].includes(result.author))
    assert.equal(result.blogs,2)
  })
  
  test('when list is empty, it returns default object', () => {
    const result = listHelper.mostBlogs([])
    assert.deepEqual(result, {author:null, blogs:0})
  })
})