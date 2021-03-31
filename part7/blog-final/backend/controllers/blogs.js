const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, id: 1, name: 1 }).populate('comments', { comment: 1, id: 1 })
    //const blogs = await Blog.find({}).populate('comments', { comment: 1, id: 1 })
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const user = request.user

    if (!user) {
        response.status(403)
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id,
    })

    const savedEntry = await blog.save()
    user.entries = user.entries.concat(savedEntry._id)
    await user.save()
    await savedEntry.populate('user', { username: 1, id: 1, name: 1 }).execPopulate()
    response.status(201).json(savedEntry)
})

blogsRouter.post('/:id/comments', async (request, response) => {
    const comment = new Comment({
        comment: request.body.comment,
        blog: request.params.id,
    })

    const blog = await Blog.findById(request.params.id)
    const savedComment = await comment.save()
    blog.comments = blog.comments.concat(savedComment._id)
    await blog.save()
    response.status(201).json(savedComment)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    const requestingUser = request.user
    console.log('we deleete')

    const requestedBlog = await Blog.findById(request.params.id)

    if (!requestedBlog.user || requestedBlog.user.toString() == requestingUser._id.toString()) {
        console.log('deletion allowed')
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
        likes: body.likes,
        commnets: body.comments,
    }

    const updatedblog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        .populate('user', { username: 1, id: 1, name: 1 })
        .populate('comments', { comment: 1, id: 1 })

    console.log(updatedblog)

    response.json(updatedblog)
})

module.exports = blogsRouter
