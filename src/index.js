// @flow
import { ApolloServer } from 'apollo-server';

import { schema } from './schema';
import * as resolvers from './resolvers';

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  tracing: true,
  cacheControl: {
    defaultMaxAge: 300
  }
});

server.listen({ engineProxy: true }).then(({ url }) => console.log(`server ready at ${url}`));
