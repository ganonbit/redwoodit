import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import SubredditForm from 'src/components/SubredditForm'

export const QUERY = gql`
  query FIND_SUBREDDIT_BY_ID($id: Int!) {
    subreddit: subreddit(id: $id) {
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
const UPDATE_SUBREDDIT_MUTATION = gql`
  mutation UpdateSubredditMutation($id: Int!, $input: UpdateSubredditInput!) {
    updateSubreddit(id: $id, input: $input) {
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

export const Success = ({ subreddit }) => {
  const { addMessage } = useFlash()
  const [updateSubreddit, { loading, error }] = useMutation(
    UPDATE_SUBREDDIT_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.subreddits())
        addMessage('Subreddit updated.', { classes: 'rw-flash-success' })
      },
    }
  )

  const onSave = (input, id) => {
    const castInput = Object.assign(input, {
      newsletterId: parseInt(input.newsletterId),
    })
    updateSubreddit({ variables: { id, input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Subreddit {subreddit.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <SubredditForm
          subreddit={subreddit}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
