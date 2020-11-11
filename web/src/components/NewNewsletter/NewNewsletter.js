import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import NewsletterForm from 'src/components/NewsletterForm'

import { QUERY } from 'src/components/NewslettersCell'

const CREATE_NEWSLETTER_MUTATION = gql`
  mutation CreateNewsletterMutation($input: CreateNewsletterInput!) {
    createNewsletter(input: $input) {
      id
    }
  }
`

const NewNewsletter = () => {
  const { addMessage } = useFlash()
  const [createNewsletter, { loading, error }] = useMutation(
    CREATE_NEWSLETTER_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.newsletters())
        addMessage('Newsletter created.', { classes: 'rw-flash-success' })
      },
      // This refetches the query on the list page. Read more about other ways to
      // update the cache over here:
      // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
      refetchQueries: [{ query: QUERY }],
      awaitRefetchQueries: true,
    }
  )

  const onSave = (input) => {
    createNewsletter({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Newsletter</h2>
      </header>
      <div className="rw-segment-main">
        <NewsletterForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewNewsletter
