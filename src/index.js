import { GraphQLServer } from 'graphql-yoga';

import * as Query from './resolvers/Query';
// import * as Mutation from './resolvers/Mutation.js';

const resolvers = { Query };

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
});

// eslint-disable-next-line no-console
server.start(() => console.log('server started on port 4000'));
