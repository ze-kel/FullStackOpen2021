import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addLike, deleteBlog, addComment } from '../reducers/blogsReducer'
import { useRouteMatch, Link, useHistory } from 'react-router-dom'
import { setNotification } from '../reducers/notificationReducer'
import Style from './GenericStyles'

const Blog = (props) => {
    if (!props.user || props.blogs.length < 1) {
        return null
    }
    const match = useRouteMatch('/blogs/:id')
    const history = useHistory()
    const blog = props.blogs.find((blog) => blog.id === match.params.id)

    if (!blog) {
        history.push('/blogs')
        props.setNotification('Blog you tried to access was not found')
        return null
    }

    const handleDelete = async () => {
        const tempName = blog.title
        await props.deleteBlog(blog.id)
        history.push('/blogs')
        props.setNotification(`Blog "${tempName}" was deleted`)
    }

    const [newComment, setNewComment] = useState()

    const submitComment = () => {
        props.addComment(blog, newComment)
        setNewComment('')
    }

    const handleCommentInputChange = (event) => {
        setNewComment(event.target.value)
    }

    return (
        <div>
            <p className="text-4xl font-bold">{blog.title}</p>
            <p className="text-l mt-1">
                by <span className="font-semibold">{blog.author}</span>
            </p>
            <a href={blog.url} className="italic">
                {blog.url}
            </a>
            <Link to={'/users/' + blog.user.id}>
                <p className="mt-1">Added by {blog.user.name}</p>{' '}
            </Link>
            <p className="text-xl mt-2 likescount">{'Likes: ' + blog.likes}</p>
            <button className={Style.Button + ' mt-2'} onClick={() => props.addLike(blog)}>
                Like
            </button>
            {blog.user.username === props.user.username ? (
                <button className={Style.Button} onClick={() => handleDelete()}>
                    Delete
                </button>
            ) : (
                ''
            )}
            <h4 className="text-3xl mt-4 mb-2">Comments</h4>
            <input className={Style.Form + ' mt-2'} value={newComment} onChange={handleCommentInputChange}></input>
            <button className={Style.Button + ' '} onClick={() => submitComment()}>
                Add comment
            </button>
            <div className={Style.ClickableListContaier + ' mt-3'}>
                {blog.comments.map((comment) => (
                    <p className="py-2 px-1" key={comment.id}>
                        {comment.comment}
                    </p>
                ))}
            </div>
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
    addComment,
    setNotification,
}

const connectedBlog = connect(mapStateToProps, mapDispatchToProps)(Blog)

export default connectedBlog
