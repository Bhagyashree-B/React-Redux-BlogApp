export const SET_TASKS = 'SET_TASKS';
export const ADD_TASK = 'ADD_TASK';
export const TASK_FETCHED = 'TASK_FETCHED';
export const TASK_UPDATED = 'TASK_UPDATED';
export const TASK_DELETED = 'TASK_DELETED';

export const LOGIN = 'LOGIN';


function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export const LOGGEDIN = 'LOGGEDIN';
export function loggedIn(user, token) {
   user.token = token
   user.isAuthenticated = true
   return {
      type: LOGGEDIN,
      user
   }
}

export function authenticate(data) {
  return dispatch => {
    return fetch('/api/login', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
    .then(data => dispatch(loggedIn(data.user, data.token)));
  }
}

export const LOGOUT = 'LOGOUT';
export function logout() {
   return {
      type: LOGOUT
   }
}

export function logoutUser(data) {
  return dispatch => {
    dispatch(logout())
  }
}

export function settasks(tasks) {
  return {
    type: SET_TASKS,
    tasks
  }
}

export function addtask(task) {
  return {
    type: ADD_TASK,
    task
  }
}

export function taskFetched(task) {
  return {
    type: TASK_FETCHED,
    task
  }
}

export function taskUpdated(task) {
  return {
    type: TASK_UPDATED,
    task
  }
}

export function taskDeleted(taskId) {
  return {
    type: TASK_DELETED,
    taskId
  }
}

export function savetask(data) {
  return (dispatch, getState) => {
    const { user } = getState();
    return fetch('/api/tasks', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "x-access-token": user.token
      }
    }).then(handleResponse)
    .then(data => dispatch(addtask(data.task)));
  };
}

export function updatetask(data) {
  return dispatch => {
    return fetch(`/api/tasks/${data._id}`, {
      method: 'put',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
    .then(data => dispatch(taskUpdated(data.task)));
  }
}

export function deletetask(id) {
  return dispatch => {
    return fetch(`/api/tasks/${id}`, {
      method: 'delete',
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
    .then(data => dispatch(taskDeleted(id)));
  }
}

export function fetchtasks() {
  return (dispatch, getState) => {
    const { user } = getState();
    fetch('/api/tasks', {
      headers: {
        "x-access-token": user.token
      }
    }).then(res => res.json())
      .then(data => dispatch(settasks(data.tasks)));
    
  };
}

export function fetchtask(id) {
  return dispatch => {
    fetch(`/api/tasks/${id}`)
      .then(res => res.json())
      .then(data => dispatch(taskFetched(data.task)));
  }
}
