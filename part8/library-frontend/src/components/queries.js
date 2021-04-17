import { gql } from '@apollo/client';

export const ALL_BOOKS = gql`
query allBooks($genre: String){
  allBooks(genre: $genre)  {
    title
    author{
      name
    }
    genres
    published
    _id
  }
}
`

export const FAVORITE_GENRE = gql`
query{
  favoriteGenre
}
`



export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
    author{
      name
    }
    genres
    published
    _id
    }
  }
`

export const ALL_GENRES = gql`
query{
  allGenres
}
`

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(
    username: $username,
    password: $password
  ) {
    value
  }
}
`

export const ALL_AUTHORS = gql`
query {
  allAuthors  {
    name
    born
    booksWritten
    _id
  }
}
`

export const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $setBornTo: Int!) {
  editAuthor(
    name: $name,
    setBornTo: $setBornTo
  ) {
    name
    born
  }
}
`


export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $intPublished: Int!, $genres: [String!]) {
  addBook(
    title: $title,
    author: $author,
    published: $intPublished,
    genres: $genres
  ) {
    title
    author{
      name
    }
    published
    genres
  }
}
`