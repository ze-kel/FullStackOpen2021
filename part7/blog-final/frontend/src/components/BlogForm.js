import React, { useState } from 'react'

import { addBlog } from '../reducers/blogsReducer'
import { connect } from 'react-redux'

const BlogForm = (props) => {
    if (!props.user) {
        return null
    }

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setURL] = useState('')

    const handleSave = async (event) => {
        event.preventDefault()
        props.addBlog({ title: title, author: author, url: url })
        setTitle('')
        setAuthor('')
        setURL('')
    }
    return (
        <div>
            <form onSubmit={handleSave}>
                <p>Title</p>
                <input id="title" value={title} onChange={({ target }) => setTitle(target.value)} />
                <p>Author</p>
                <input id="author" value={author} onChange={({ target }) => setAuthor(target.value)} />
                <p>URL</p>
                <input id="url" value={url} onChange={({ target }) => setURL(target.value)} />
                <button id="savenewblog" type="submit">
                    SAVE
                </button>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = {
    addBlog,
}

const connectedBlogForm = connect(mapStateToProps, mapDispatchToProps)(BlogForm)

export default connectedBlogForm
