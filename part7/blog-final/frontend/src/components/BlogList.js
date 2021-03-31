import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import Style from './GenericStyles'

const BlogList = (props) => {
    if (!props.user) {
        return null
    }
    return (
        <div>
            <h2 className="text-4xl">Blogs</h2>
            <Togglable buttonLabel="Add Blog">
                <BlogForm />
            </Togglable>
            <div className={Style.ClickableListContaier}>
                {props.blogs.map((blog) => {
                    console.log(blog)
                    return (
                        <Link className={Style.ClickableListItem + ' flex justify-between'} key={blog.id} to={'/blogs/' + blog.id}>
                            <p className="inline-flex">{blog.title}</p> <p className="inline-flex">{blog.likes} likes</p>
                        </Link>
                    )
                })}
            </div>
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
