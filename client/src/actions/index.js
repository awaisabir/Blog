import axios from 'axios';

export const register = (username, password, email, firstName, lastName) => {
  return {
    type: 'REGISTRATION',
    payload: axios.post('http://localhost:4200/api/auth/register', {username, password, email, firstName, lastName})
  };
}

export const login = (username, password) => {
  return {
    type: 'AUTHENTICATION',
    payload: axios.post('http://localhost:4200/api/auth/login', {username, password})
  };
}

export const tokenValidity = token => {
  return {
    type: 'TOKEN_VALIDITY',
    payload: axios.get('http://localhost:4200/api/auth/authorize', {headers: {Authorization: token}})
  };
}

export const logout = () => {
  return {
    type: 'LOGOUT',
    payload: {
      loggedIn: false,
    }
  };
}

export const getPosts = (page, order) => {
  return {
    type: 'FETCH_POSTS',
    payload: axios.get(`http://localhost:4200/api/posts?page=${page}&order=${order}`)
  };
}

export const getPostsByHeading = (heading, order) => (
  {
    type: 'FETCH_POSTS',
    payload: axios.get(`http://localhost:4200/api/posts?heading=${heading}&order=${order}`)
  }
);