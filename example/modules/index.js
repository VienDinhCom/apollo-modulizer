const { mergeModules } = require('apollo-modulizer');

const User = require('./user.module');
const Post = require('./post.module');
const Query = require('./query.module');

module.exports = { typeDefs, resolvers } = mergeModules([Query, User, Post]);
