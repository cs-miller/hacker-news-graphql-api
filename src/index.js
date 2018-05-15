// @flow
import { GraphQLServer } from 'graphql-yoga';
import { ApolloEngine } from 'apollo-engine';

import { schema } from './schema';
import * as resolvers from './resolvers';

const graphQLServer = new GraphQLServer({
  typeDefs: schema,
  resolvers
});

const port = 4000;

process.env.APOLLO_ENGINE_KEY = 'service:cs-miller-8586:vVBPtJ9McDvfn_weEok7zQ';

if (process.env.APOLLO_ENGINE_KEY) {
  const engine = new ApolloEngine({
    apiKey: process.env.APOLLO_ENGINE_KEY
  });

  const httpServer = graphQLServer.createHttpServer({
    tracing: true,
    cacheControl: true
  });

  engine.listen(
    {
      port,
      httpServer,
      graphqlPaths: ['/']
    },
    () => console.log(`Server with Apollo Engine is running on http://localhost:${port}`)
  );
} else {
  graphQLServer.start(
    {
      port
    },
    () => console.log(`Server is running on http://localhost:${port}`)
  );
}
