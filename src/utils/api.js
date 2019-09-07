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
const readStudent  = (todoId) => {
  return fetch(`/.netlify/functions/students-read/${todoId}`).then((response) => {
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


const createStaff = (data) => {
  return fetch('/.netlify/functions/staffs-create', {
    body: JSON.stringify(data),
    method: 'POST'
  }).then(response => {
    return response.json()
  })
}

const readAllStaffs = () => {
  return fetch('/.netlify/functions/staffs-read-all').then((response) => {
    return response.json()
  })
}
const readStaff  = (todoId) => {
  return fetch(`/.netlify/functions/staffs-read/${todoId}`).then((response) => {
    return response.json()
  })
}

const updateStaff = (staffId, data) => {
  return fetch(`/.netlify/functions/staffs-update/${staffId}`, {
    body: JSON.stringify(data),
    method: 'POST'
  }).then(response => {
    return response.json()
  })
}

const deleteStaff = (staffId) => {
  return fetch(`/.netlify/functions/staffs-delete/${staffId}`, {
    method: 'POST',
  }).then(response => {
    return response.json()
  })
}

const batchDeleteStaffs = (staffIds) => {
  return fetch(`/.netlify/functions/staffs-delete-batch`, {
    body: JSON.stringify({
      ids: staffIds
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
  readStudent:readStudent,
  updateStudent: updateStudent,
  deleteStudent: deleteStudent,
  batchDeleteStudents: batchDeleteStudents,  
  createStaff: createStaff,
  readAllStaffs: readAllStaffs,
  readStaff:readStaff,
  updateStaff: updateStaff,
  deleteStaff: deleteStaff,
  batchDeleteStaffs: batchDeleteStaffs
}
