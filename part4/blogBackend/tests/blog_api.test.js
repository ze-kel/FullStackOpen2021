const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test.helper')

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promises = blogObjects.map(blog => blog.save())
    await Promise.all(promises)
})

describe('GETTING ENTRIES', () => {
    test('blog etries are returned as JSON', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test("entry id is without _", async () => {
        const response = await api.get('/api/blogs')
        for (let i = 0; i < helper.initialBlogs.length; i++) {
            expect(response.body[i].id).toBeDefined()
        }
    })


    test('expect correct number of blog entries', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('the first blog title is correct', async () => {
        const response = await api.get('/api/blogs')

        const titles = response.body.map(r => r.title)
        expect(titles).toContain(helper.initialBlogs[0].title)
    })
})


describe('ADDING ENTRIES', () => {
    test('we can add blog entries', async () => {
        const newBlog = {
            title: "cool new entry",
            author: "test suite",
            url: "please",
            likes: 69
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        const titles = response.body.map(r => r.title)

        expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
        expect(titles).toContain(newBlog.title)
    })

    test('blog without title or content is not added', async () => {
        const noTitle = {
            content: "some content",
            url: "someurl",
            likes: 0
        }

        const noAuthor = {
            author: "some author",
            url: "someurl",
            likes: 0
        }

        await api
            .post('/api/blogs')
            .send(noTitle)
            .expect(400)

        await api
            .post('/api/blogs')
            .send(noAuthor)
            .expect(400)

        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('blog without likes property can be added and it automatically set to zero', async () => {
        const newBlog = {
            title: "testinglikes",
            author: "likeable person",
            url: "likeme"
        }

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)

        expect(response.body.likes).toBe(0)
    })
})


describe('DELETING AND MODIFYING', () => {
    test('we can delete blog entries', async () => {
        await api
            .delete(`/api/blogs/${helper.initialBlogs[0]._id}`)
            .expect(204)

        const response = await api.get('/api/blogs')
        const titles = response.body.map(r => r.title)

        expect(response.body).toHaveLength(helper.initialBlogs.length - 1)
        expect(titles).not.toContain(helper.initialBlogs[0].title)
    })

    test('we can update entries', async () => {
        const update = {
            title: "updatedenr",
            author: "jest",
            likes: 1337,
            url: "testurlll"
        }

        const putResponse = await api
            .put(`/api/blogs/${helper.initialBlogs[1]._id}`)
            .send(update)
            .expect(200)

        expect(putResponse.body.title).toBe(update.title)
        expect(putResponse.body.author).toBe(update.author)
        expect(putResponse.body.likes).toBe(update.likes)
        expect(putResponse.body.url).toBe(update.url)

        const getResponse = await api
            .get(`/api/blogs/${helper.initialBlogs[1]._id}`)

        expect(getResponse.body.title).toBe(update.title)
        expect(getResponse.body.author).toBe(update.author)
        expect(getResponse.body.likes).toBe(update.likes)
        expect(getResponse.body.url).toBe(update.url)
    })
})




afterAll(() => {
    mongoose.connection.close()
})
