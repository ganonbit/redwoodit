import NewslettersLayout from 'src/layouts/NewslettersLayout'
import NewsletterCell from 'src/components/NewsletterCell'

const NewsletterPage = ({ id }) => {
  return (
    <NewslettersLayout>
      <NewsletterCell id={id} />
    </NewslettersLayout>
  )
}

export default NewsletterPage
