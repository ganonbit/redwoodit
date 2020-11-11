export const schema = gql`
  type Subreddit {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    title: String!
    description: String!
    slug: String
    user: User
    userId: String
    newsletter: Newsletter
    newsletterId: Int
  }

  type Query {
    subreddits: [Subreddit!]!
    subreddit(id: Int!): Subreddit
  }

  input CreateSubredditInput {
    title: String!
    description: String!
    slug: String
    userId: String
    newsletterId: Int
  }

  input UpdateSubredditInput {
    title: String
    description: String
    slug: String
    userId: String
    newsletterId: Int
  }

  type Mutation {
    createSubreddit(input: CreateSubredditInput!): Subreddit!
    updateSubreddit(id: Int!, input: UpdateSubredditInput!): Subreddit!
    deleteSubreddit(id: Int!): Subreddit!
  }
`
