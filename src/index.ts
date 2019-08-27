import merge from 'lodash/merge';
import reduce from 'lodash/reduce';
import forIn from 'lodash/forIn';
import isFunction from 'lodash/isFunction';
import { DocumentNode } from 'graphql';

export interface ApolloModule {
  typeDef: DocumentNode;
  resolvers: Object;
}

function validateResolvers(resolvers: Object) {
  forIn(resolvers, function(typeObj, typeKey) {
    forIn(typeObj, function(resolverFunc, resolverKey) {
      if (!isFunction(resolverFunc)) {
        const message = `${typeKey}.${resolverKey} resolver must be a function.`;
        throw new Error(message);
      }
    });
  });
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
  const resolvers = reduce(
    modules,
    (all: Object, { resolvers }: ApolloModule) => {
      return merge(all, resolvers);
    },
    {}
  );

  validateResolvers(resolvers);

  return resolvers;
}

export function mergeModules(modules: ApolloModule[]) {
  return {
    typeDefs: getTypeDefs(modules),
    resolvers: getResolvers(modules),
  };
}

export const allModules = mergeModules;
