import { db } from 'src/lib/db'
import { foreignKeyReplacement } from 'src/lib/tempForeignKeyReplacement'

export const subreddits = () => {
  return db.subreddit.findMany()
}

export const subreddit = ({ id }) => {
  return db.subreddit.findOne({
    where: { id },
  })
}

export const getSubreddit = ({ input }) => {
  return db.subreddit.create({
    data: foreignKeyReplacement(input),
  })
}

export const createSubreddit = ({ input }) => {
  return db.subreddit.create({
    data: foreignKeyReplacement(input),
  })
}

export const updateSubreddit = ({ id, input }) => {
  return db.subreddit.update({
    data: foreignKeyReplacement(input),
    where: { id },
  })
}

export const deleteSubreddit = ({ id }) => {
  return db.subreddit.delete({
    where: { id },
  })
}

export const Subreddit = {
  user: (_obj, { root }) =>
    db.subreddit.findOne({ where: { id: root.id } }).user(),
  newsletter: (_obj, { root }) =>
    db.subreddit.findOne({ where: { id: root.id } }).newsletter(),
}
