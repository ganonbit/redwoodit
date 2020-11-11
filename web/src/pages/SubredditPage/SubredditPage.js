import SubredditsLayout from 'src/layouts/SubredditsLayout'
import SubredditCell from 'src/components/SubredditCell'

const SubredditPage = ({ id }) => {
  return (
    <SubredditsLayout>
      <SubredditCell id={id} />
    </SubredditsLayout>
  )
}

export default SubredditPage
