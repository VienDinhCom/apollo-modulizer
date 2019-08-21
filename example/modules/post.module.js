const { gql } = require('apollo-server');
const { createModule } = require('apollo-modulizer');

const typeDef = gql`
  type Post {
    id: ID!
    title: String
    content: String
    author: User
  }

  input PostInput {
    title: String
    content: String
    author: ID
  }
`;

const resolvers = {
  Post: {
    author: () => ({ id: 1, name: 'Vien' }),
  },
};

module.exports = createModule({ typeDef, resolvers });
