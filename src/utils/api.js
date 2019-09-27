/* Api methods to call /functions */

const create = data => {
  return fetch("/.netlify/functions/todos-create", {
    body: JSON.stringify(data),
    method: "POST"
  }).then(response => {
    return response.json();
  });
};

const readAll = () => {
  return fetch("/.netlify/functions/todos-read-all").then(response => {
    return response.json();
  });
};

const update = (todoId, data) => {
  return fetch(`/.netlify/functions/todos-update/${todoId}`, {
    body: JSON.stringify(data),
    method: "POST"
  }).then(response => {
    return response.json();
  });
};

const deleteTodo = todoId => {
  return fetch(`/.netlify/functions/todos-delete/${todoId}`, {
    method: "POST"
  }).then(response => {
    return response.json();
  });
};

const batchDeleteTodo = todoIds => {
  return fetch(`/.netlify/functions/todos-delete-batch`, {
    body: JSON.stringify({
      ids: todoIds
    }),
    method: "POST"
  }).then(response => {
    return response.json();
  });
};

const createStudent = data => {
  return fetch("/.netlify/functions/students-create", {
    body: JSON.stringify(data),
    method: "POST"
  }).then(response => {
    return response.json();
  });
};

const readAllStudents = () => {
  return fetch("/.netlify/functions/students-read-all").then(response => {
    return response.json();
  });
};
const readStudent = todoId => {
  return fetch(`/.netlify/functions/students-read/${todoId}`).then(response => {
    return response.json();
  });
};

const updateStudent = (studentId, data) => {
  return fetch(`/.netlify/functions/students-update/${studentId}`, {
    body: JSON.stringify(data),
    method: "POST"
  }).then(response => {
    return response.json();
  });
};

const deleteStudent = studentId => {
  return fetch(`/.netlify/functions/students-delete/${studentId}`, {
    method: "POST"
  }).then(response => {
    return response.json();
  });
};

const batchDeleteStudents = studentIds => {
  return fetch(`/.netlify/functions/students-delete-batch`, {
    body: JSON.stringify({
      ids: studentIds
    }),
    method: "POST"
  }).then(response => {
    return response.json();
  });
};

const createStaff = data => {
  return fetch("/.netlify/functions/staffs-create", {
    body: JSON.stringify(data),
    method: "POST"
  }).then(response => {
    return response.json();
  });
};

const readAllStaffs = () => {
  return fetch("/.netlify/functions/staffs-read-all").then(response => {
    return response.json();
  });
};
const readStaff = todoId => {
  return fetch(`/.netlify/functions/staffs-read/${todoId}`).then(response => {
    return response.json();
  });
};

const updateStaff = (staffId, data) => {
  return fetch(`/.netlify/functions/staffs-update/${staffId}`, {
    body: JSON.stringify(data),
    method: "POST"
  }).then(response => {
    return response.json();
  });
};

const deleteStaff = staffId => {
  return fetch(`/.netlify/functions/staffs-delete/${staffId}`, {
    method: "POST"
  }).then(response => {
    return response.json();
  });
};

const batchDeleteStaffs = staffIds => {
  return fetch(`/.netlify/functions/staffs-delete-batch`, {
    body: JSON.stringify({
      ids: staffIds
    }),
    method: "POST"
  }).then(response => {
    return response.json();
  });
};

const createArticle = data => {
  return fetch("/.netlify/functions/articles-create", {
    body: JSON.stringify(data),
    method: "POST"
  }).then(response => {
    return response.json();
  });
};

const readAllArticles = () => {
  return fetch("/.netlify/functions/articles-read-all").then(response => {
    return response.json();
  });
};
const readArticle = todoId => {
  return fetch(`/.netlify/functions/articles-read/${todoId}`).then(response => {
    return response.json();
  });
};

const updateArticle = (articleId, data) => {
  return fetch(`/.netlify/functions/articles-update/${articleId}`, {
    body: JSON.stringify(data),
    method: "POST"
  }).then(response => {
    return response.json();
  });
};

const deleteArticle = articleId => {
  return fetch(`/.netlify/functions/articles-delete/${articleId}`, {
    method: "POST"
  }).then(response => {
    return response.json();
  });
};

const batchDeleteArticles = articleIds => {
  return fetch(`/.netlify/functions/articles-delete-batch`, {
    body: JSON.stringify({
      ids: articleIds
    }),
    method: "POST"
  }).then(response => {
    return response.json();
  });
};

const createSession = data => {
  return fetch("/.netlify/functions/session-create", {
    body: JSON.stringify(data),
    method: "POST"
  }).then(response => {
    return response.json();
  });
};

const readAllSessions = () => {
  return fetch("/.netlify/functions/session-read-all").then(response => {
    return response.json();
  });
};
const readSession = todoId => {
  return fetch(`/.netlify/functions/session-read/${todoId}`).then(response => {
    return response.json();
  });
};

const updateSession = (sessionId, data) => {
  return fetch(`/.netlify/functions/session-update/${sessionId}`, {
    body: JSON.stringify(data),
    method: "POST"
  }).then(response => {
    return response.json();
  });
};

const deleteSession = sessionId => {
  return fetch(`/.netlify/functions/session-delete/${sessionId}`, {
    method: "POST"
  }).then(response => {
    return response.json();
  });
};

const batchDeleteSessions = sessionIds => {
  return fetch(`/.netlify/functions/sessions-delete-batch`, {
    body: JSON.stringify({
      ids: sessionIds
    }),
    method: "POST"
  }).then(response => {
    return response.json();
  });
};
export default {
  create: create,
  readAll: readAll,
  update: update,
  delete: deleteTodo,
  batchDelete: batchDeleteTodo,
  createStudent: createStudent,
  readAllStudents: readAllStudents,
  readStudent: readStudent,
  updateStudent: updateStudent,
  deleteStudent: deleteStudent,
  batchDeleteStudents: batchDeleteStudents,
  createStaff: createStaff,
  readAllStaffs: readAllStaffs,
  readStaff: readStaff,
  updateStaff: updateStaff,
  deleteStaff: deleteStaff,
  batchDeleteStaffs: batchDeleteStaffs,
  createArticle: createArticle,
  readAllArticles: readAllArticles,
  readArticle: readArticle,
  updateArticle: updateArticle,
  deleteArticle: deleteArticle,
  batchDeleteArticles: batchDeleteArticles,
  createSession: createSession,
  readAllSessions: readAllSessions,
  readSession: readSession,
  updateSession: updateSession,
  deleteSession: deleteSession,
  batchDeleteSessions: batchDeleteSessions
};
