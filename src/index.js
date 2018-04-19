// @flow
import { GraphQLServer } from 'graphql-yoga';
import * as db from './firebase';

import { schema } from './schema';
import * as Query from './resolvers/Query';

const resolvers = { Query };

const server = new GraphQLServer({
  typeDefs: schema,
  resolvers,
  context: req => ({
    ...req,
    db
  })
});

// // eslint-disable-next-line no-console
server.start(() => console.log('server started on port 4000'));
