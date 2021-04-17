
import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client';

import { ALL_AUTHORS, EDIT_AUTHOR } from './queries'

const Authors = (props) => {

  const [name, setAuthor] = useState('')
  const [born, setBorn] = useState(1)
  const authors = useQuery(ALL_AUTHORS)

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  if (!props.show) {
    return null
  }

  if (authors.loading) {
    return <div>Loading</div>
  }

  const changeSelected = (event) => {
    setAuthor(event.target.value)
  }

  const saveEdited = () => {
    editAuthor({ variables: { name, setBornTo: parseInt(born) } })
  }



  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.booksWritten}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
      <select value={name} onChange={changeSelected}>
        {authors.data.allAuthors.map(a =>
          <option key={a.name} value={a.name}>{a.name}</option>
        )}
      </select>
      <input type="number" value={born} onChange={(event) => setBorn(event.target.value)}></input>
      <button onClick={saveEdited}>SAVE</button>
    </div>

  )

}

export default Authors
