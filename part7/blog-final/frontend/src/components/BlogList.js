import React from 'react'
import Blog from './Blog'
import { connect } from 'react-redux'

const BlogList = (props) => {
    return (
        <div>
            {props.blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} currentUser={props.user} />
            ))}
        </div>
    )
}

const mapStateToProps = (state) => {
    const sortedblogs = state.blogs.sort((a, b) => b.likes - a.likes)
    return {
        blogs: sortedblogs,
        user: state.user,
    }
}

const connectedBlogList = connect(mapStateToProps)(BlogList)

export default connectedBlogList
