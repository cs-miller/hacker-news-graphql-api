// @flow

import {
  connectionDefinitions,
  connectionArgs,
  nodeInterface,
  pageInfoType
} from 'graphql-relay-tools';

const { connectionType: CommentConnection } = connectionDefinitions({
  name: 'Comment'
});

const { connectionType: NodeConnection } = connectionDefinitions({
  name: 'Node'
});

export const schema = `
  ${nodeInterface}

  type User implements Node {
    id: ID!
    hnId: String!
    delay: Int
    created: Int!
    karma: Int!
    about: String
    submitted${connectionArgs()}: NodeConnection
  }

  type Story implements Node {
    id: ID!
    hnId: String!
    by: User!
    descendants: Int
    score: Int
    time: Int
    title: String
    url: String
    text: String
    kids${connectionArgs()}: CommentConnection
    deleted: Boolean
    dead: Boolean
  }

  type Job implements Node {
    id: ID!
    hnId: String!
    by: User!
    score: Int
    text: String
    time: Int
    title: String
    url: String
    deleted: Boolean
    dead: Boolean
  }

  type Poll implements Node {
    id: ID!
    hnId: String!
    by: User!
    descendants: Int
    score: Int
    time: Int
    title: String
    text: String
    kids${connectionArgs()}: CommentConnection
    deleted: Boolean
    dead: Boolean
    parts: [PollOpt]
  }

  type PollOpt implements Node {
    id: ID!
    hnId: String!
    by: User!
    score: Int
    time: Int
    text: String
    parent: Poll
    deleted: Boolean
  }

  type Comment implements Node {
    id: ID!
    hnId: String!
    by: User!
    parent: Node
    text: String
    time: Int
    kids${connectionArgs()}: CommentConnection
    deleted: Boolean
    dead: Boolean
  }

  ${pageInfoType}

  ${CommentConnection}

  ${NodeConnection}
`;
console.log(schema);
