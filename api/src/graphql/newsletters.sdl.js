export const schema = gql`
  type Newsletter {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    title: String!
    content: String!
    slug: String
    user: User
    userId: String
    subreddits: [Subreddit]!
  }

  type Query {
    newsletters: [Newsletter!]!
    newsletter(id: Int!): Newsletter
  }

  input CreateNewsletterInput {
    title: String!
    content: String!
    slug: String
    userId: String
  }

  input UpdateNewsletterInput {
    title: String
    content: String
    slug: String
    userId: String
  }

  type Mutation {
    createNewsletter(input: CreateNewsletterInput!): Newsletter!
    updateNewsletter(id: Int!, input: UpdateNewsletterInput!): Newsletter!
    deleteNewsletter(id: Int!): Newsletter!
  }
`
