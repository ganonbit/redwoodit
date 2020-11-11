import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/NewslettersCell'

const DELETE_NEWSLETTER_MUTATION = gql`
  mutation DeleteNewsletterMutation($id: Int!) {
    deleteNewsletter(id: $id) {
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

const NewslettersList = ({ newsletters }) => {
  const { addMessage } = useFlash()
  const [deleteNewsletter] = useMutation(DELETE_NEWSLETTER_MUTATION, {
    onCompleted: () => {
      addMessage('Newsletter deleted.', { classes: 'rw-flash-success' })
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete newsletter ' + id + '?')) {
      deleteNewsletter({ variables: { id } })
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
            <th>Content</th>
            <th>Slug</th>
            <th>User id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {newsletters.map((newsletter) => (
            <tr key={newsletter.id}>
              <td>{truncate(newsletter.id)}</td>
              <td>{timeTag(newsletter.createdAt)}</td>
              <td>{timeTag(newsletter.updatedAt)}</td>
              <td>{truncate(newsletter.title)}</td>
              <td>{truncate(newsletter.content)}</td>
              <td>{truncate(newsletter.slug)}</td>
              <td>{truncate(newsletter.userId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.newsletter({ id: newsletter.id })}
                    title={'Show newsletter ' + newsletter.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editNewsletter({ id: newsletter.id })}
                    title={'Edit newsletter ' + newsletter.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    title={'Delete newsletter ' + newsletter.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(newsletter.id)}
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

export default NewslettersList
