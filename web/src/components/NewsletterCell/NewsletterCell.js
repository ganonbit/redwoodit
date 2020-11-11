import Newsletter from 'src/components/Newsletter'

export const QUERY = gql`
  query FIND_NEWSLETTER_BY_ID($id: Int!) {
    newsletter: newsletter(id: $id) {
      id
      createdAt
      updatedAt
      title
      content
      slug
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Newsletter not found</div>

export const Success = ({ newsletter }) => {
  return <Newsletter newsletter={newsletter} />
}
