// @flow

import {
  nodeDefinitions,
  fromGlobalId,
  toGlobalId,
  globalIdResolver,
  connectionFromPromisedArray,
  connectionFromArray
} from 'graphql-relay-tools';

import * as db from '../firebase';

const resolveConnection = async ({ edges, ...connection }) => {
  const fetchedEdges = await Promise.all(edges.map(async ({ node, ...edge }) => {
    const fetchedNode = await db.getItem(node);
    return { ...edge, node: fetchedNode };
  }));
  return { ...connection, edges: fetchedEdges };
};

const { nodeResolver } = nodeDefinitions((globalId) => {
  const { type, id } = fromGlobalId(globalId);
  switch (type) {
    case 'User':
      return db.getUser(id);
    case 'Item':
      return db.getItem(id);
    default:
      return db.getItem(id);
  }
});

export const Query = {
  node: nodeResolver,
  nodeFromHnId: (root: any, args: any, context: any, info: any) => {
    const typeName = args.isUserId ? 'User' : 'Item';
    const id = toGlobalId(typeName, args.id);
    return nodeResolver(root, { id }, context, info);
  },
  storyFeed: async (root: any, args: any) => {
    const connection = await connectionFromPromisedArray(db.getFeed(args.type), args);
    return resolveConnection(connection);
  }
};

export const Node = {
  __resolveType: (root: any) => {
    if (root.karma) return 'User';
    switch (root.type) {
      case 'story':
        return 'Story';
      case 'poll':
        return 'Poll';
      case 'pollopt':
        return 'PollOpt';
      case 'job':
        return 'Job';
      case 'comment':
        return 'Comment';
      default:
        throw new Error('Cannot determine type');
    }
  }
};

export const User = {
  id: globalIdResolver('User', root => root.id),
  hnId: (root: any) => root.id,
  submitted: (root: any, args: any) =>
    resolveConnection(connectionFromArray(root.submitted || [], args))
};

export const Story = {
  id: globalIdResolver('Item'),
  hnId: (root: any) => root.id,
  by: (root: any) => db.getUser(root.by),
  kids: (root: any, args: any) => resolveConnection(connectionFromArray(root.kids || [], args))
};

export const Job = {
  id: globalIdResolver('Item'),
  hnId: (root: any) => root.id,
  by: (root: any) => db.getUser(root.by)
};

export const Poll = {
  id: globalIdResolver('Item'),
  hnId: (root: any) => root.id,
  by: (root: any) => db.getUser(root.by),
  kids: (root: any, args: any) => resolveConnection(connectionFromArray(root.kids || [], args)),
  parts: (root: any) => root.parts.map(db.getItem)
};

export const PollOpt = {
  id: globalIdResolver('Item'),
  hnId: (root: any) => root.id,
  by: (root: any) => db.getUser(root.by),
  parent: (root: any) => db.getItem(root.parent)
};

export const Comment = {
  id: globalIdResolver('Item'),
  hnId: (root: any) => root.id,
  by: (root: any) => db.getUser(root.by),
  parent: (root: any) => db.getItem(root.parent),
  kids: (root: any, args: any) => resolveConnection(connectionFromArray(root.kids || [], args))
};
