// @flow
import { GraphQLServer } from 'graphql-yoga';
import { db } from './firebase';

import * as Query from './resolvers/Query';

const resolvers = { Query };

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db
  })
});

// eslint-disable-next-line no-console
server.start(() => console.log('server started on port 4000'));
