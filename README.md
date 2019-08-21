# apollo-modulizer

Modularizing your GraphQL schema code

```
yarn add apollo-modulizer
```

```
npm install --save apollo-modulizer
```

## Usage

You can get the full example here: https://github.com/Maxvien/apollo-modulizer/tree/master/example

### Create A Module

```
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
```

### Merge All Modules

```
const { allModules } = require('apollo-modulizer');

const User = require('./user.module');
const Post = require('./post.module');
const Query = require('./query.module');

module.exports = { typeDefs, resolvers } = allModules([User, Post, Query]);
```

### Launch With Apollo Server

```
const { ApolloServer } = require('apollo-server');
const { typeDefs, resolvers } = require('./modules');

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
```
