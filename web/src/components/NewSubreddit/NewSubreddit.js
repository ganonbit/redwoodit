import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import SubredditForm from 'src/components/SubredditForm'

import { QUERY } from 'src/components/SubredditsCell'

const CREATE_SUBREDDIT_MUTATION = gql`
  mutation CreateSubredditMutation($input: CreateSubredditInput!) {
    createSubreddit(input: $input) {
      id
    }
  }
`

const NewSubreddit = () => {
  const { addMessage } = useFlash()
  const [createSubreddit, { loading, error }] = useMutation(
    CREATE_SUBREDDIT_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.subreddits())
        addMessage('Subreddit created.', { classes: 'rw-flash-success' })
      },
      // This refetches the query on the list page. Read more about other ways to
      // update the cache over here:
      // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
      refetchQueries: [{ query: QUERY }],
      awaitRefetchQueries: true,
    }
  )

  const onSave = (input) => {
    const castInput = Object.assign(input, {
      newsletterId: parseInt(input.newsletterId),
    })
    createSubreddit({ variables: { input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Subreddit</h2>
      </header>
      <div className="rw-segment-main">
        <SubredditForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewSubreddit
