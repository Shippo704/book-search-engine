// import required packages and modules
const {AuthenticationError} = require('apollo-server-express');
const {User} = require('../models');
const {signToken} = require('../utils/auth');

const resolvers = {
    // resolve queries from typeDefs
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findById(args.id)
                    .select('-__v -password')
                    .populate(books);
            }
        }
    }
}

// export resolvers
module.exports = resolvers;