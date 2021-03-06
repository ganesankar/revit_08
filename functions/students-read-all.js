import faunadb from 'faunadb'

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})

exports.handler = (event, context, callback) => {
  // console.log('Function `student-read-all` invoked')
  return client.query(q.Paginate(q.Match(q.Ref('indexes/all_students'))))
    .then((response) => {
      const studentRefs = response.data
      // console.log('Todo refs', studentRefs)
      // console.log(`${studentRefs.length} students found`)
      // create new query out of student refs. http://bit.ly/2LG3MLg
      const getAllTodoDataQuery = studentRefs.map((ref) => {
        return q.Get(ref)
      })
      // then query the refs
      return client.query(getAllTodoDataQuery).then((ret) => {
        return callback(null, {
          statusCode: 200,
          body: JSON.stringify(ret),
          headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        })
      })
    }).catch((error) => {
      // console.log('error', error)
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(error),
          headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
      })
    })
}
