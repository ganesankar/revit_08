/* Api methods to call /functions */

const create = (data) => {
  return fetch('/.netlify/functions/todos-create', {
    body: JSON.stringify(data),
    method: 'POST'
  }).then(response => {
    return response.json()
  })
}

const readAll = () => {
  return fetch('/.netlify/functions/todos-read-all').then((response) => {
    return response.json()
  })
}

const update = (todoId, data) => {
  return fetch(`/.netlify/functions/todos-update/${todoId}`, {
    body: JSON.stringify(data),
    method: 'POST'
  }).then(response => {
    return response.json()
  })
}

const deleteTodo = (todoId) => {
  return fetch(`/.netlify/functions/todos-delete/${todoId}`, {
    method: 'POST',
  }).then(response => {
    return response.json()
  })
}

const batchDeleteTodo = (todoIds) => {
  return fetch(`/.netlify/functions/todos-delete-batch`, {
    body: JSON.stringify({
      ids: todoIds
    }),
    method: 'POST'
  }).then(response => {
    return response.json()
  })
}

const createStudent = (data) => {
  return fetch('/.netlify/functions/students-create', {
    body: JSON.stringify(data),
    method: 'POST'
  }).then(response => {
    return response.json()
  })
}

const readAllStudents = () => {
  return fetch('/.netlify/functions/students-read-all').then((response) => {
    return response.json()
  })
}

const updateStudent = (studentId, data) => {
  return fetch(`/.netlify/functions/students-update/${studentId}`, {
    body: JSON.stringify(data),
    method: 'POST'
  }).then(response => {
    return response.json()
  })
}

const deleteStudent = (studentId) => {
  return fetch(`/.netlify/functions/students-delete/${studentId}`, {
    method: 'POST',
  }).then(response => {
    return response.json()
  })
}

const batchDeleteStudents = (studentIds) => {
  return fetch(`/.netlify/functions/students-delete-batch`, {
    body: JSON.stringify({
      ids: studentIds
    }),
    method: 'POST'
  }).then(response => {
    return response.json()
  })
}

export default {
  create: create,
  readAll: readAll,
  update: update,
  delete: deleteTodo,
  batchDelete: batchDeleteTodo,
  createStudent: createStudent,
  readAllStudents: readAllStudents,
  updateStudent: updateStudent,
  deleteStudent: deleteStudent,
  batchDeleteStudents: batchDeleteStudents
}
