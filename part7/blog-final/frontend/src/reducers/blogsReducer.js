/* eslint-disable indent */
import blogService from '../services/blogs'

export const addLike = (blog) => {
    return async (dispatch) => {
        blog.likes += 1
        const updatedBlog = await blogService.update(blog.id, blog)
        dispatch({
            type: 'UPDATE_BLOG',
            updatedBlog: updatedBlog,
        })
    }
}

export const addComment = (blog, comment) => {
    return async (dispatch) => {
        const newComment = await blogService.addComment(blog.id, comment)
        const updatedBlog = blog.comments.push(newComment)
        dispatch({
            type: 'UPDATE_BLOG',
            updatedBlog: updatedBlog,
        })
    }
}

export const addBlog = (blog) => {
    return async (dispatch) => {
        const newBlog = await blogService.create(blog)
        console.log('CREATING NEW BLOG', newBlog)
        dispatch({
            type: 'ADD_BLOG',
            blog: newBlog,
        })
    }
}

export const deleteBlog = (id) => {
    return async (dispatch) => {
        await blogService.remove(id)
        dispatch({
            type: 'REMOVE_BLOG',
            id: id,
        })
    }
}

export const initBlogs = () => {
    return async (dispatch) => {
        const initBlogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            content: initBlogs,
        })
    }
}

const blogsReducer = (state = [], action) => {
    switch (action.type) {
        case 'UPDATE_BLOG':
            return state.map((blog) => (blog.id === action.updatedBlog.id ? action.updatedBlog : blog))
        case 'ADD_BLOG':
            return [...state, action.blog]
        case 'INIT_BLOGS':
            return action.content
        case 'REMOVE_BLOG':
            return state.filter((blog) => blog.id !== action.id)
        default:
            return state
    }
}

export default blogsReducer
