import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  const handleSave = async (event) => {
    event.preventDefault()
    createBlog({ title: title, author: author, url: url })
  }

  return (
    <div>
      <form onSubmit={handleSave}>
        <p>Title</p>
        <input
          id="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <p>Author</p>
        <input
          id="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <p>URL</p>
        <input
          id="url"
          value={url}
          onChange={({ target }) => setURL(target.value)}
        />
        <button id="savenewblog" type="submit">
          save
        </button>
      </form>
    </div>
  )
}

export default BlogForm
