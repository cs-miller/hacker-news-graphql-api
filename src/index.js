// @flow
import { GraphQLServer } from 'graphql-yoga';

import { schema } from './schema';
import * as resolvers from './resolvers';

const server = new GraphQLServer({
  typeDefs: schema,
  resolvers
});

// // eslint-disable-next-line no-console
server.start(() => console.log('server started on port 4000'));
