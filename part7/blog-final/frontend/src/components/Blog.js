import React from 'react'
import { connect } from 'react-redux'

import { addLike, deleteBlog } from '../reducers/blogsReducer'

const Blog = (props) => {
    if (!props.user) {
        return null
    }
    const blog = props.ownProps.blog
    return (
        <div>
            {blog.title} {blog.author}
            {blog.url} <p className="likescount">{'Likes: ' + blog.likes}</p>
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
    }
}

const mapDispatchToProps = {
    addLike,
    deleteBlog,
}

const connectedBlog = connect(mapStateToProps, mapDispatchToProps)(Blog)

export default connectedBlog
