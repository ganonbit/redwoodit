import { Link, routes } from '@redwoodjs/router'

import Newsletters from 'src/components/Newsletters'

export const QUERY = gql`
  query NEWSLETTERS {
    newsletters {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No newsletters yet. '}
      <Link to={routes.newNewsletter()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ newsletters }) => {
  return <Newsletters newsletters={newsletters} />
}
