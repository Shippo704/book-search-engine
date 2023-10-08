// import required packages and modules
const {AuthenticationError} = require('apollo-server-express');
const {User} = require('../models');
const {signToken} = require('../utils/auth');

const resolvers = {
    // resolve queries from typeDefs
    Query: {
        // get user and their saved books
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({_id: context.user._id})
                    .populate('books');
            }
            // throw error if no context.user (not logged in)
            throw new AuthenticationError('Please log in');
        }
    },

    // resolve mutations
    Mutation: {
        // add new user
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
          },

        // login
        login: async (parent, { email, password }) => {
            // find the email registered to a user
            const user = await User.findOne({ email });

            // if email isn't registered, throw an error
            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            // check if password is correct using model method
            const correctPw = await user.isCorrectPassword(password);

            // if password is wrong, throw an error
            if (!correctPw) {
                throw new AuthenticationError('Incorrect password');
            }

            const token = signToken(user);

            return { token, user };
        },

        // save a book to user's book list
        saveBook: async (parent, {bookData}, context) => {
            // check if a user is logged in
            if (context.user) {
                // find user by id and add bookData to books list
                const updateUser = await User.findOneAndUpdate(
                    {_id: context.user.id},
                    {$addToSet: {savedBooks: bookData}},
                    {new: true}
                )
                // populate book list with book data
                .populate('books')
                // return the updated user data
                return updateUser;
            }
            // throw error if not logged in
            throw new AuthenticationError('You must be logged in to use this feature');
        },

        // remove book from booklist
        deleteBook: async (parent, {bookId}, context) => {
            // check if user is logged in
            // must be logged in or they wouldn't have a booklist
            if (context.user) {
                // use findAndUpdate instead of findAndDelete
                // only want to delete from list, not from database
                const updateUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$pull: {savedBooks: bookId}},
                    {new: true}
                );
                // return the new userData
                return updateUser;
            };
            throw new AuthenticationError('You must be logged in to use this feature');
        }
    }
};

// export resolvers
module.exports = resolvers;