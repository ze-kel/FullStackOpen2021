const initialBlogs = [
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
    }
]


const initialUsers = [
    {
        username: "Mike",
        password: "1234",
        name: "Mike Willik"
    },
    {
        username: "Kirill",
        password: "Kirill",
        name: "Kirill Kleymenov"
    },
    {
        username: "Jake",
        password: "123546568",
        name: "Jake Watson"
    }
]

const testuser = {
    username: "Jake",
    password: "123546568",
    name: "Jake Watson"
}

module.exports = { initialBlogs, initialUsers, testuser }