import SubredditsLayout from 'src/layouts/SubredditsLayout'
import EditSubredditCell from 'src/components/EditSubredditCell'

const EditSubredditPage = ({ id }) => {
  return (
    <SubredditsLayout>
      <EditSubredditCell id={id} />
    </SubredditsLayout>
  )
}

export default EditSubredditPage
