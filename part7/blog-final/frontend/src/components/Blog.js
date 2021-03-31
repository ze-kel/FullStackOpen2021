import React from 'react'
import { connect } from 'react-redux'
import { addLike, deleteBlog } from '../reducers/blogsReducer'
import { useRouteMatch, Link } from 'react-router-dom'

const Blog = (props) => {
    if (!props.user || props.blogs.length < 1) {
        return null
    }
    const match = useRouteMatch('/blogs/:id')
    const blog = props.blogs.find((blog) => blog.id === match.params.id)

    return (
        <div>
            {blog.title} {blog.author}
            {blog.url} <p className="likescount">{'Likes: ' + blog.likes}</p>
            <Link to={'/users/' + blog.user.id}>
                <p>Added by {blog.user.name}</p>{' '}
            </Link>
            <button className="likebutton" onClick={() => props.addLike(blog)}>
                Like
            </button>
            {blog.user.username === props.user.username ? (
                <button onClick={() => props.deleteBlog(blog.id)} className="deletebutton">
                    Delete
                </button>
            ) : (
                ''
            )}
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user,
        ownProps: ownProps,
        blogs: state.blogs,
    }
}

const mapDispatchToProps = {
    addLike,
    deleteBlog,
}

const connectedBlog = connect(mapStateToProps, mapDispatchToProps)(Blog)

export default connectedBlog
