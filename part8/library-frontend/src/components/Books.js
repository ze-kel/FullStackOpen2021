import React, { useState, useEffect } from 'react'

import { useQuery, useLazyQuery, useSubscription, useApolloClient } from '@apollo/client';
import { ALL_BOOKS, ALL_GENRES, BOOK_ADDED } from './queries'


const Books = (props) => {

  const genres = useQuery(ALL_GENRES)

  const client = useApolloClient()

  const [filter, setFilter] = useState('')

  const [getBooks, { called, loading, data }] = useLazyQuery(ALL_BOOKS, { variables: { genre: filter } })

  let books = []

  useEffect(() => {
    console.log("refresh now")
    getBooks()
  }, [filter])

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(p => p._id).includes(object._id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS, variables: { genre: '' } })

    if (!includedIn(dataInStore.allBooks, addedBook)) {
      console.log("writing new book ")
      client.writeQuery({
        query: ALL_BOOKS,
        variables: { genre: '' },
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const newBook = subscriptionData.data.bookAdded
      console.log("SUBSCR: book added", newBook)
      updateCacheWith(newBook)
    }
  })

  if (!props.show) {
    return null
  }

  const BookTable = () => {
    if (!called || loading) {
      return <div>Loading</div>
    }

    return (
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {data.allBooks.map(a =>
            <tr key={a._id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>

    )
  }


  return (
    <div>
      <h2>books</h2>
      {filter}
      {BookTable()}
      <button onClick={() => setFilter('')}>ALL</button>
      {genres.data.allGenres.map(g => <button key={g} onClick={() => setFilter(g)} >{g}</button>)}
    </div>
  )
}

export default Books
//