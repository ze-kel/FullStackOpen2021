const blogsRouter = require('express').Router()
const { update } = require('../models/blog')
const Blog = require("../models/blog")

blogsRouter.get('/', async (request, response) => {
    console.log("getting all")
    const blogs = await Blog.find({}).populate('user', { username: 1, id: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const user = request.user

    console.log(request.user)

    if (!user) {
        response.status(403)
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })


    const savedEntry = await blog.save()
    user.entries = user.entries.concat(savedEntry._id)
    await user.save()

    response.status(201).json(savedEntry)
})

blogsRouter.get('/:id', async (request, response) => {
    console.log("getting part")
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    const requestingUser = request.user
    console.log("we deleete")

    const requstedBlog = await Blog.findById(request.params.id)

    if (!requstedBlog.user || requstedBlog.user.toString() == requestingUser._id.toString()) {

        console.log("deletion allowed")
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } else {
        response.status(403).end()
    }

})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    const updatedblog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('user', { username: 1, id: 1, name: 1 })

    console.log(updatedblog)



    response.json(updatedblog)
})



module.exports = blogsRouter
