import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import NewsletterForm from 'src/components/NewsletterForm'

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
const UPDATE_NEWSLETTER_MUTATION = gql`
  mutation UpdateNewsletterMutation($id: Int!, $input: UpdateNewsletterInput!) {
    updateNewsletter(id: $id, input: $input) {
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

export const Success = ({ newsletter }) => {
  const { addMessage } = useFlash()
  const [updateNewsletter, { loading, error }] = useMutation(
    UPDATE_NEWSLETTER_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.newsletters())
        addMessage('Newsletter updated.', { classes: 'rw-flash-success' })
      },
    }
  )

  const onSave = (input, id) => {
    updateNewsletter({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Newsletter {newsletter.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <NewsletterForm
          newsletter={newsletter}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
