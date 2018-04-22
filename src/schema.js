// @flow

import {
  connectionDefinitions,
  connectionArgs,
  nodeInterface,
  nodeField,
  pageInfoType
} from 'graphql-relay-tools';

const { connectionType: CommentConnection } = connectionDefinitions({
  name: 'Comment'
});

const { connectionType: StoryConnection } = connectionDefinitions({
  name: 'Story'
});

const { connectionType: NodeConnection } = connectionDefinitions({
  name: 'Node'
});

export const schema = /* GraphQL */ `
  ${nodeInterface}

  type Query {
    ${nodeField},
    nodeFromHnId(id: ID!, isUserId: Boolean): Node
    storyFeed(type: FeedType): Feed
  }

  enum FeedType {
    TOP
    NEW
    BEST
    ASK
    SHOW
    JOB
  }

  type Feed {
    stories${connectionArgs()}: StoryConnection
  }

  type User implements Node {
    # The globally unique relay id
    id: ID!
    # The user's unique username, case sensative
    hnId: String!
    # Delay in minutes between a comment's creation and its visibility to other users
    delay: Int
    # Creation date of the user, in Unix Time
    created: Int!
    # The uer's karma
    karma: Int!
    # The user's optional self-description (HTML)
    about: String
    # Connection of the user's stories, polls, and comments
    submitted${connectionArgs()}: NodeConnection
  }

  type Story implements Node {
    # The globally unique relay id
    id: ID!
    # The item's unique id
    hnId: String!
    # The user who created the item
    by: User!
    # The total comment count
    descendants: Int
    # The story's score
    score: Int
    # Creation date of the story, in Unix Time
    time: Int
    # The title
    title: String
    # The url of the story
    url: String
    # The story text (HTML)
    text: String
    # Connection of the story's comments
    kids${connectionArgs()}: CommentConnection
    # True if the story is deleted
    deleted: Boolean
    # True if the story is dead
    dead: Boolean
  }

  type Job implements Node {
    # The globally unique relay id
    id: ID!
    # The item's unique id
    hnId: String!
    # The user who created the item
    by: User!
    # The item's score
    score: Int
    # The job's text
    text: String
    # Creation date of the job, in Unix Time
    time: Int
    # The job's title
    title: String
    # The job's url
    url: String
    # True if the job is deleted
    deleted: Boolean
    # True if the job is dead
    dead: Boolean
  }

  type Poll implements Node {
    # The globally unique relay id
    id: ID!
    # The item's unique id
    hnId: String!
    # The user who created the item
    by: User!
    # The total comment count
    descendants: Int
    # The item's score
    score: Int
    # Creation date of the poll, in Unix Time
    time: Int
    # The poll's title
    title: String
    # The poll's text
    text: String
    # Connection of the poll's comments
    kids${connectionArgs()}: CommentConnection
    # True if the item is deleted
    deleted: Boolean
    # True if the item is dead
    dead: Boolean
    # List of the poll's parts
    parts: [PollOpt]
  }

  type PollOpt implements Node {
    # The globally unique relay id
    id: ID!
    # The item's unique id
    hnId: String!
    # The user who created the item
    by: User!
    # The item's score
    score: Int
    # Creation date of the poll option, in Unix Time
    time: Int
    # The pollopt's text
    text: String
    # The parent poll
    parent: Poll
    # True if the item is deleted
    deleted: Boolean
  }

  type Comment implements Node {
    # The globally unique relay id
    id: ID!
    # The item's unique id
    hnId: String!
    # The user who posted the comment
    by: User!
    # The parent comment or story
    parent: Node
    # The comment's text
    text: String
    # Creation date of the comment, in Unix Time
    time: Int
    # Connection of child comments
    kids${connectionArgs()}: CommentConnection
    # True if the comment is deleted
    deleted: Boolean
    # True if the comment is dead
    dead: Boolean
  }
  ${pageInfoType}
  ${CommentConnection}
  ${NodeConnection}
  ${StoryConnection}
`;
