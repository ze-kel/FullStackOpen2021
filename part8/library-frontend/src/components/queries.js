import { gql, useMutation } from '@apollo/client';

export const ALL_BOOKS = gql`
query {
  allBooks  {
    title
    author
    genres
    published
  }
}
`

export const ALL_AUTHORS = gql`
query {
  allAuthors  {
    name
    born
    id
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
    author
    published
    genres
  }
}
`