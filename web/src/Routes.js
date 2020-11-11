// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route } from '@redwoodjs/router'

const Routes = () => {
  return (
    <Router>
      <Route path="/newsletters/new" page={NewNewsletterPage} name="newNewsletter" />
      <Route path="/newsletters/{id:Int}/edit" page={EditNewsletterPage} name="editNewsletter" />
      <Route path="/newsletters/{id:Int}" page={NewsletterPage} name="newsletter" />
      <Route path="/newsletters" page={NewslettersPage} name="newsletters" />
      <Route path="/subreddits/new" page={NewSubredditPage} name="newSubreddit" />
      <Route path="/subreddits/{id:Int}/edit" page={EditSubredditPage} name="editSubreddit" />
      <Route path="/subreddits/{id:Int}" page={SubredditPage} name="subreddit" />
      <Route path="/subreddits" page={SubredditsPage} name="subreddits" />
      <Route path="/users/new" page={NewUserPage} name="newUser" />
      <Route path="/users/{id}/edit" page={EditUserPage} name="editUser" />
      <Route path="/users/{id}" page={UserPage} name="user" />
      <Route path="/users" page={UsersPage} name="users" />
      <Route path="/" page={HomePage} name="home" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
