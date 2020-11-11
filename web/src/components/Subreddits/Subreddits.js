import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/SubredditsCell'

const DELETE_SUBREDDIT_MUTATION = gql`
  mutation DeleteSubredditMutation($id: Int!) {
    deleteSubreddit(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
}

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const SubredditsList = ({ subreddits }) => {
  const { addMessage } = useFlash()
  const [deleteSubreddit] = useMutation(DELETE_SUBREDDIT_MUTATION, {
    onCompleted: () => {
      addMessage('Subreddit deleted.', { classes: 'rw-flash-success' })
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete subreddit ' + id + '?')) {
      deleteSubreddit({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Title</th>
            <th>Description</th>
            <th>Slug</th>
            <th>User id</th>
            <th>Newsletter id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {subreddits.map((subreddit) => (
            <tr key={subreddit.id}>
              <td>{truncate(subreddit.id)}</td>
              <td>{timeTag(subreddit.createdAt)}</td>
              <td>{timeTag(subreddit.updatedAt)}</td>
              <td>{truncate(subreddit.title)}</td>
              <td>{truncate(subreddit.description)}</td>
              <td>{truncate(subreddit.slug)}</td>
              <td>{truncate(subreddit.userId)}</td>
              <td>{truncate(subreddit.newsletterId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.subreddit({ id: subreddit.id })}
                    title={'Show subreddit ' + subreddit.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editSubreddit({ id: subreddit.id })}
                    title={'Edit subreddit ' + subreddit.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    title={'Delete subreddit ' + subreddit.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(subreddit.id)}
                  >
                    Delete
                  </a>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SubredditsList
