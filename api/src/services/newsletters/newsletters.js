import { db } from 'src/lib/db'
import { foreignKeyReplacement } from 'src/lib/tempForeignKeyReplacement'

export const newsletters = () => {
  return db.newsletter.findMany()
}

export const newsletter = ({ id }) => {
  return db.newsletter.findOne({
    where: { id },
  })
}

export const createNewsletter = ({ input }) => {
  return db.newsletter.create({
    data: foreignKeyReplacement(input),
  })
}

export const updateNewsletter = ({ id, input }) => {
  return db.newsletter.update({
    data: foreignKeyReplacement(input),
    where: { id },
  })
}

export const deleteNewsletter = ({ id }) => {
  return db.newsletter.delete({
    where: { id },
  })
}

export const Newsletter = {
  user: (_obj, { root }) =>
    db.newsletter.findOne({ where: { id: root.id } }).user(),
  subreddits: (_obj, { root }) =>
    db.newsletter.findOne({ where: { id: root.id } }).subreddits(),
}
