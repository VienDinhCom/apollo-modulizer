const { gql } = require('apollo-server');
const { createModule } = require('apollo-modulizer');

const typeDef = gql`
  type User {
    id: ID!
    name: String
    posts: [Post]
  }

  input UserInput {
    name: String
  }
`;

const resolvers = {
  User: {
    posts: () => [
      { id: 1, title: 'Apollo Server', content: 'Hello Apollo Server!' },
    ],
  },
};

module.exports = createModule({ typeDef, resolvers });
