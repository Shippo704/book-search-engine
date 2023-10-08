// import required packages and modules
import React, { useState, useEffect } from 'react';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

// import the queries and mutations for gql and apollo
import {useQuery, useMutation} from '@apollo/client';
import {QUERY_ME} from '../utils/queries';
import {DELETE_BOOK} from '..utils/mutations';

// import authentication
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {
  // define the queries/mutations needed to delete a book
  const {loading, data} = useQuery(QUERY_ME);
  const [deleteBook, {error}] = useMutation(DELETE_BOOK);

  // set userData to current user's User data or null if logged out
  const userData = data?.me || {};

  // delete book function
  const handleDeleteBook = async (bookId) => {
    // check if logged in or not
    const token = Auth.loggenIn() ? Auth.getToken() : null;

    if (!token){
      return false;
    }

    try {
      // find and remove book from list
      const {data} = await deleteBook({
        variables: {bookId}
      });

      // remove bookId from local storage
      removeBookId(bookId);
    }
    // catch all errors
    catch (error) {
      console.log(error);
    }
  };

  // if loading
  if (loading) {
    return <div>Loading...</div>
  }

  // return the webpage after removing book and loading
  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks.map((book) => {
            return (
              <Col md="4">
                <Card key={book.bookId} border='dark'>
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
