import NewslettersLayout from 'src/layouts/NewslettersLayout'
import EditNewsletterCell from 'src/components/EditNewsletterCell'

const EditNewsletterPage = ({ id }) => {
  return (
    <NewslettersLayout>
      <EditNewsletterCell id={id} />
    </NewslettersLayout>
  )
}

export default EditNewsletterPage
