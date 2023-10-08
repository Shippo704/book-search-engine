// import gql
import {gql} from '@apollo/client';

// export and create add user mutation for gql server
export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, #password: String!) {
        token
        user {
            _id
            username
        }
    }
`;

// export and create login mutation for gql server
export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

// export and create saveBook mutation for gql server
export const SAVE_BOOK = gql`
    mutation saveBook($bookData: BookInput!) {
        saveBook(bookData: $bookData) {
            _id
            username
            email
            savedBooks {
                bookId
                authors
                description
                image
                link
                title
            }
        }
    }
`;

// export and create deleteBook mutation for gql server
export const DELETE_BOOK = gql`
    mutation deleteBook($bookId: ID!) {
        _id
        username
        email
        savedBooks {
            bookId
            authors
            description
            image
            link
            title
        }
    }
`;