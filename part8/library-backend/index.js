require('dotenv').config()


const { ApolloServer, gql, UserInputError, ForbiddenError } = require('apollo-server')

const mongoose = require('mongoose')
const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')

const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

const MONGODB_URI = process.env.MONGODB_URI

const jwt = require('jsonwebtoken')

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'


console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })

const typeDefs = gql`
  type Book {
      title: String!
      published: Int!
      author: Author!
      _id: ID!
      genres: [String]
  }

  type Author{
      name: String!
      _id: String! 
      born: Int
      booksWritten: Int!
  }

  type User {
  username: String!
  favoriteGenre: String!
  id: ID!
  }

  type Token {
  value: String!
    }


  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    allGenres: [String!]
    me: User
    favoriteGenre: String!
  }

  type Subscription {
  bookAdded: Book!
}    


  type Mutation {
      addBook(
          title: String!,
          author: String!
          published: Int!
          genres: [String]
      ): Book
      editAuthor(
         name: String!
         setBornTo: Int!
      ) : Author
      createUser(
         username: String!
         favoriteGenre: String!
      ): User
        login(
            username: String!
            password: String!
        ): Token

  }
`

const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            let filters = {}
            if (args.author) {
                const authorObj = await Author.findOne({ name: args.author })
                filters.author = authorObj._id
                console.log(filters)
            }
            if (args.genre) {
                filters.genres = { $in: [args.genre] }
                console.log(filters)
            }

            const result = await Book.find(filters).populate('author', { name: 1, _id: 1, born: 1, booksWritten: 1 })
            return result
        },
        allAuthors: () => Author.find(),
        allGenres: async () => {
            const allBooks = await Book.find()
            let allGenres = new Set()
            allBooks.forEach(thing => thing.genres.forEach(genre => allGenres.add(genre)))
            return Array.from(allGenres)
        },
        favoriteGenre: (root, args, context) => {
            return context.currentUser.favoriteGenre
        }
    },
    Author: {
        booksWritten: async (root) => {
            const author = await Author.findById(root._id)
            console.log("counting books")
            return author.books.length
        }
    },
    Mutation: {
        addBook: async (root, args, context) => {
            console.log("adding book ", args)

            if (!context.currentUser) {
                throw new ForbiddenError('Only authorized users can add books')
            }
            if (args.title.length < 2) {
                throw new UserInputError('Book title must be 2 characters or longer')
            }

            if (args.author.length < 4) {
                throw new UserInputError('Author name must be 4 characters or longer')
            }


            const newBook = new Book({ ...args })

            let author = await Author.findOne({ name: args.author })

            if (!author) {
                author = new Author({ name: args.author, born: null, })
                await author.save()
            }


            newBook.author = author

            console.log("finished adding book, returning ");
            await newBook.save()
            author.books = author.books.concat(newBook._id)
            await author.save()
            pubsub.publish('BOOK_ADDED', { bookAdded: newBook })

            return newBook
        },
        editAuthor: async (root, args, context) => {
            if (!context.currentUser) {
                throw new ForbiddenError('Only authorized users can edit authors')
            }
            const author = await Author.findOne({ name: args.name })
            author.born = args.setBornTo
            await author.save()
            return author
        },
        createUser: (root, args) => {
            const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

            return user.save()
                .catch(error => {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if (!user || args.password !== 'secred') {
                throw new UserInputError("wrong credentials")
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }

            return { value: jwt.sign(userForToken, JWT_SECRET) }
        },
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
        },
    },

}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(
                auth.substring(7), JWT_SECRET
            )
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
        }
    }
})

server.listen().then(({ url, subscriptionsUrl }) => {
    console.log(`Server ready at ${url}`)
    console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
