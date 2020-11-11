import { Link, routes } from '@redwoodjs/router'

import Subreddits from 'src/components/Subreddits'

export const QUERY = gql`
  query SUBREDDITS {
    subreddits {
      id
      createdAt
      updatedAt
      title
      description
      slug
      userId
      newsletterId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No subreddits yet. '}
      <Link to={routes.newSubreddit()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ subreddits }) => {
  return <Subreddits subreddits={subreddits} />
}
