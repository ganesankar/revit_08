import faunadb from 'faunadb'

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})

exports.handler = (article, context, callback) => {
  const data = JSON.parse(article.body)
  console.log('data', data)
  console.log('Function `article-delete-batch` invoked', data.ids)
  // construct batch query from IDs
  const deleteAllCompletedTodoQuery = data.ids.map((id) => {
    return q.Delete(q.Ref(`classes/articles/${id}`))
  })
  // Hit fauna with the query to delete the completed items
  return client.query(deleteAllCompletedTodoQuery)
    .then((response) => {
      console.log('success', response)
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(response)
      })
    }).catch((error) => {
      console.log('error', error)
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(error)
      })
    })
}
