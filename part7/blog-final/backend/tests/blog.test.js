const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }
]

const listWithMultipleBlogs = [
    {
        _id: '5a444aa71b54a676234d17f8',
        title: 'Lorem',
        author: 'Jake',
        url: 'someurl',
        likes: 28,
        __v: 0
    },
    {
        _id: '5a333aa71b54a676234d17f8',
        title: 'Mum',
        author: 'Pyotr',
        url: 'someurl',
        likes: 50,
        __v: 0
    },
    {
        _id: '5a222aa71b54a676234d17f8',
        title: 'Stuff',
        author: 'Vasya',
        url: 'someurl',
        likes: 10,
        __v: 0
    },
    {
        _id: '5a111aa71b54a676234d17f8',
        title: 'Hello',
        author: 'Jake',
        url: 'someurl',
        likes: 25,
        __v: 0
    },
    {
        _id: '5a422aa71b65a676234d17f8',
        title: 'Bruh',
        author: 'Jake',
        url: 'someurl',
        likes: 4,
        __v: 0
    },
    {
        _id: '5a422aa43b54a676234d17f8',
        title: 'Sup',
        author: 'Pyotr',
        url: 'someurl',
        likes: 20,
        __v: 0
    },
    {
        _id: '5a422aa71b14a676234d17f8',
        title: 'HIII',
        author: 'Ann',
        url: 'someurl',
        likes: 12,
        __v: 0
    }
]

test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)

    expect(result).toBe(5)
})

test('expecting favoriteBlog to return most likes one', () => {
    const result = listHelper.favoriteBlog(listWithMultipleBlogs)
    expect(result._id).toBe("5a333aa71b54a676234d17f8")
})


test('Expecting mostBlogs to return jake who has maximum of entries(3)', () => {
    const result = listHelper.mostBlogs(listWithMultipleBlogs)
    expect(result).toStrictEqual({ author: "Jake", entries: 3 })
})

test('Expecting mostLikes to Pyotrs blog with 70 likes', () => {
    const result = listHelper.mostLikes(listWithMultipleBlogs)
    expect(result).toStrictEqual({ author: "Pyotr", likes: 70 })
})