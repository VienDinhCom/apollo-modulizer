const { gql } = require('apollo-server');
const { createModule } = require('apollo-modulizer');

const typeDef = gql`
  type Query {
    user(id: ID!): User
    users: [User]
    post(id: ID!): Post
    posts: [Post]
  }
`;

const resolvers = {
  Query: {
    user: id => ({ id, name: 'Vien' }),
    users: () => [{ id: 1, name: 'Vien' }, { id: 2, name: 'Dinh' }],
    post: id => ({ id: id, title: 'Apollo', content: 'Hello Apollo!' }),
    posts: () => [
      { id: 1, title: 'Apollo Server', content: 'Hello Apollo Server!' },
      { id: 2, title: 'Apollo Modules', content: 'Hello Apollo Modules!' },
    ],
  },
};

module.exports = createModule({ typeDef, resolvers });
