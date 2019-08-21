import merge from 'lodash/merge';
import reduce from 'lodash/reduce';
import { DocumentNode } from 'graphql';

export interface ApolloModule {
  typeDef: DocumentNode;
  resolvers: Object;
}

export function createModule({ typeDef, resolvers }: ApolloModule) {
  return {
    typeDef,
    resolvers,
  };
}

export function getTypeDefs(modules: ApolloModule[]) {
  return modules.map(({ typeDef }) => typeDef);
}

export function getResolvers(modules: ApolloModule[]) {
  return reduce(
    modules,
    (all: Object, { resolvers }: ApolloModule) => {
      return merge(all, resolvers);
    },
    {}
  );
}

export function allModules(modules: ApolloModule[]) {
  return {
    typeDefs: getTypeDefs(modules),
    resolvers: getResolvers(modules),
  };
}
