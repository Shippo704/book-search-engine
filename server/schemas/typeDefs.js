// import graphql
const {gql} = require('apollo-server-express');

const typeDefs = gql `

    type Book {
        bookId: ID!
        authors: [String]
        description: String
        image: String
        link: String
        title: String!
    }


    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        savedBooks: [Book]
    }

    type Auth {
        token: ID!
        user: User
    }

    input BookInput {
        bookId: String!
        authors: [String]
        description: String
        image: String
        link: String
        title: String!
    }

    type Query {
        me: User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        saveBook: (bookData: BookInput!): User
        removeBook(bookId: ID!): User
    }


`