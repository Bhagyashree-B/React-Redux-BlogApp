export const SET_POSTS = 'SET_POSTS';
export const ADD_POST = 'ADD_POST';
export const POST_FETCHED = 'POST_FETCHED';
export const POST_UPDATED = 'POST_UPDATED';
export const POST_DELETED = 'POST_DELETED';

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export function setposts(posts) {
  return {
    type: SET_POSTS,
    posts
  }
}

export function addpost(post) {
  return {
    type: ADD_POST,
    post
  }
}

export function postFetched(post) {
  return {
    type: POST_FETCHED,
    post
  }
}

export function postUpdated(post) {
  return {
    type: POST_UPDATED,
    post
  }
}

export function postDeleted(postId) {
  return {
    type: POST_DELETED,
    postId
  }
}

export function savepost(data) {
  return dispatch => {
    return fetch('/api/posts', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
    .then(data => dispatch(addpost(data.post)));
  }
}

export function updatepost(data) {
  return dispatch => {
    return fetch(`/api/posts/${data._id}`, {
      method: 'put',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
    .then(data => dispatch(postUpdated(data.post)));
  }
}

export function deletepost(id) {
  return dispatch => {
    return fetch(`/api/posts/${id}`, {
      method: 'delete',
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
    .then(data => dispatch(postDeleted(id)));
  }
}

export function fetchposts() {
  return dispatch => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => dispatch(setposts(data.posts)));
  }
}

export function fetchpost(id) {
  return dispatch => {
    fetch(`/api/posts/${id}`)
      .then(res => res.json())
      .then(data => dispatch(postFetched(data.post)));
  }
}
