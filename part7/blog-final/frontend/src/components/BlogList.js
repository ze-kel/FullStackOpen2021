import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = (props) => {
    return (
        <div>
            <h2>Blogs</h2>
            {props.blogs.map((blog) => {
                console.log(blog)
                return (
                    <Link key={blog.id} to={'/blogs/' + blog.id}>
                        <p>{blog.title}</p>
                    </Link>
                )
            })}
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
