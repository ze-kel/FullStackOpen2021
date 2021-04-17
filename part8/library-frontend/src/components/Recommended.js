import React, { useState, useEffect } from 'react'

import { useQuery } from '@apollo/client';
import { ALL_BOOKS, FAVORITE_GENRE } from './queries'


const Recommended = (props) => {

    const favGenre = useQuery(FAVORITE_GENRE)

    let g = ''

    if (!favGenre.loading) {
        g = favGenre.data.favoriteGenre
    }

    const getBooks = useQuery(ALL_BOOKS, { variables: { genre: g } })

    if (!props.show) {
        return null
    }

    if (favGenre.loading || getBooks.loading) {
        return <div>Loading</div>
    }

    let books = []

    if (!props.show) {
        return null
    }

    const BookTable = () => {
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
                    {getBooks.data.allBooks.map(a =>
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
            <h2>Books in your favorite genre: {g} </h2>
            {BookTable()}
        </div>
    )
}

export default Recommended
//