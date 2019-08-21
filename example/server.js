const { ApolloServer } = require('apollo-server');
const { allModules } = require('apollo-modulizer');

const user = require('./modules/user.module');
const post = require('./modules/post.module');
const query = require('./modules/query.module');

const { typeDefs, resolvers } = allModules([user, post, query]);

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
