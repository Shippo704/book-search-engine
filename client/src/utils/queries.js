// import gql
import {gql} from '@apollo/client';

// create and export query to be read by gql server
export const QUERY_ME = gql`
    {
        me {
            _id
            username
            email
            password
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