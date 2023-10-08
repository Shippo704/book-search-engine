// import graphql
const {gql} = require('apollo-server-express');

const typeDefs = gql `
    // models
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

    


`