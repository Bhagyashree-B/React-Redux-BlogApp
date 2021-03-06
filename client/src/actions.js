import glQuery from './service/HttpGraphQl'

export const SET_TASKS = 'SET_TASKS';
export const ADD_TASK = 'ADD_TASK';
export const TASK_FETCHED = 'TASK_FETCHED';
export const TASK_UPDATED = 'TASK_UPDATED';
export const TASK_DELETED = 'TASK_DELETED';

export const LOGIN = 'LOGIN';
require('es6-promise').polyfill();
require('isomorphic-fetch');

let userState = {};

/**
 handles response coming from server
**/
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
   userState = user ;
   user.token = token
   user.isAuthenticated = true
   return {
      type: LOGGEDIN,
      user
   }
}

export const LOGINFAIL = 'LOGINFAIL';
export function loginFailed(data) {
   let user = {};
   user.authError = data
   user.isAuthenticated = false
   return {
      type: LOGINFAIL,
      user
   }
}

export function authenticate(data) {
  return dispatch => {
    return fetch('http://localhost:8080/api/login', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
    .then(data => {
      if(data.success === false ){
        dispatch(loginFailed(data))
        return data
      } else
        return dispatch(loggedIn(data.user, data.token))
  });
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
    const payload = 'mutation { addTask( title: "' + data.title
                  + '", status: "' + data.status
                  + '", category: "' + data.category
                  +'", startDate: "' + data.startDate.toISOString()
                  +'", dueDate: "' + data.dueDate.toISOString()
                  +'", taskContent: "' + data.taskContent
                  +'", userId: "' + user._id
                  +'", ) { id, status, category, title, startDate, dueDate, taskContent } }'

    return glQuery(payload, user).then(data => hasGraphQlError(data) ? dispatch(logout()) : dispatch(addtask(data.addTask)) );
  }
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
  let payload = 'mutation { deleteTask( id: "'+ id +'" ) { id } }'
  return (dispatch, getState) => {
    const { user } = getState();
    glQuery(payload, user.token ? user : userState).then(data => hasGraphQlError(data) ? dispatch(logout()) : dispatch(taskDeleted(data.deleteTask.id)) );
  }
}

export function fetchtasks() {
  return (dispatch, getState) => {
    const { user } = getState();
    let payload = '{ tasks( userId : "'+ user._id +'") { id, userId, status, title, category, startDate , dueDate , taskContent}}'
    return glQuery(payload, user).then(data => hasGraphQlError(data) ? dispatch(logout()) : dispatch(settasks(data.tasks)));
  }
}

export function fetchtask(id) {
  return dispatch => {
    fetch(`/api/tasks/${id}`)
      .then(res => res.json())
      .then(data => hasGraphQlError(data) ? dispatch(logout()) : dispatch(taskFetched(data.task)));
  }
}


export const SET_CHART_DATA = 'SET_CHART_DATA';

export function setChartData(chartData) {
  return {
    type: SET_CHART_DATA,
    chartData
  }
}

export function fetchChartData() {
  return (dispatch, getState) => {
    const { user } = getState();
    let payload = '{ chartByCategory( userId : "'+ user._id +'", statusValue : "inprogress" ) { dataBycategory { total, data {status, count} } , allData { count, userName} } }'
    return glQuery(payload, user).then(data => hasGraphQlError(data) ? dispatch(logout()) : dispatch(setChartData(data.chartByCategory)) );
  }
}

function hasGraphQlError(response) {
  if(response.hasOwnProperty('success') && response.success === false){
    window.localStorage.removeItem("user")
    return true
  } else
    return false
}
