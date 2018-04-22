// @flow

import {
  nodeDefinitions,
  fromGlobalId,
  toGlobalId,
  globalIdResolver,
  connectionFromPromisedArray
} from 'graphql-relay-tools';

import * as db from '../firebase';

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
  nodeFromHnId: (root, args, context, info) => {
    const typeName = args.isUserId ? 'User' : 'Item';
    const id = toGlobalId(typeName, args.id);
    return nodeResolver(root, { id }, context, info);
  },
  storyFeed: (root, args, context) => {
    context.type = args.type;
    return Feed.stories(root, args, context);
  }
};

export const Feed = {
  stories: (root, args, context) =>
    connectionFromPromisedArray(db.getFeed(context.type).then(ids => ids.map(db.getItem)), args)
};

export const Node = {
  __resolveType: (root) => {
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
  hnId: root => root.id,
  submitted: (root, args) =>
    connectionFromPromisedArray(Promise.all(root.submitted.map(db.getItem)), args)
};

export const Story = {
  id: globalIdResolver('Item'),
  hnId: root => root.id,
  by: root => db.getUser(root.by),
  kids: (root, args) => connectionFromPromisedArray(Promise.all(root.kids.map(db.getItem)), args)
};

export const Job = {
  id: globalIdResolver('Item'),
  hnId: root => root.id,
  by: root => db.getUser(root.by)
};

export const Poll = {
  id: globalIdResolver('Item'),
  hnId: root => root.id,
  by: root => db.getUser(root.by),
  kids: (root, args) => connectionFromPromisedArray(Promise.all(root.kids.map(db.getItem)), args),
  parts: root => root.parts.map(db.getItem)
};

export const PollOpt = {
  id: globalIdResolver('Item'),
  hnId: root => root.id,
  by: root => db.getUser(root.by),
  parent: root => db.getItem(root.parent)
};

export const Comment = {
  id: globalIdResolver('Item'),
  hnId: root => root.id,
  by: root => db.getUser(root.by),
  parent: root => db.getItem(root.parent),
  kids: (root, args) => connectionFromPromisedArray(Promise.all(root.kids.map(db.getItem)), args)
};
