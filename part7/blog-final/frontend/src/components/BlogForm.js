import React, { useState } from 'react'

import { addBlog } from '../reducers/blogsReducer'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

import Style from './GenericStyles'

const BlogForm = (props) => {
    if (!props.user) {
        return null
    }

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setURL] = useState('')

    const handleSave = async (event) => {
        event.preventDefault()
        await props.addBlog({ title: title, author: author, url: url })
        props.setNotification(`Blog "${title}" was added`)
        setTitle('')
        setAuthor('')
        setURL('')
    }
    return (
        <div className="my-2">
            <form onSubmit={handleSave}>
                <p>Title</p>
                <input className={Style.Form} id="title" value={title} onChange={({ target }) => setTitle(target.value)} />
                <p>Author</p>
                <input className={Style.Form} id="author" value={author} onChange={({ target }) => setAuthor(target.value)} />
                <p>URL</p>
                <input className={Style.Form} id="url" value={url} onChange={({ target }) => setURL(target.value)} />
                <button className={Style.Button + ' block my-3'} id="savenewblog" type="submit">
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
    setNotification,
}

const connectedBlogForm = connect(mapStateToProps, mapDispatchToProps)(BlogForm)

export default connectedBlogForm
