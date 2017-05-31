import dispatcher from '../dispatchers/dispatcher'

export function loginUser(attributes){
  // set up the headers and request
  const params = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(attributes)
  }
  // send state to the backend server
  fetch("http://localhost:4000/login_user", params).then(function(response){
    // if post is successful update the message to be successful
    // and update the state to equal what we get back from the server
    if(response.ok){
      response.json()
        .then(function(body){
          // send the cat to the store
          dispatcher.dispatch({
            type: 'LOGIN_USER',
            user: body.user
          })
        })
      }
      else {
        dispatcher.dispatch({
          type: 'LOGIN_ERROR',
          message: 'login failed'
        })
      }
    })
    .catch((error)=>{
      dispatcher.dispatch({
        type: 'LOGIN_ERROR',
        message: 'login failed'
      })
    })
}

export function fetchCats(initial=false){
  let success;
  const params = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
      }
  fetch('http://localhost:4000/cats', params)
    .then((response)=>{
      success = response.ok
      return response.json()
    })
    .then((body)=>{
      if (success){
        let cats = body.cats
        dispatcher.dispatch({
          type: "FETCH_CATS",
          cats: cats,
          initial: initial
        })
      }
      else {
        dispatcher.dispatch({
          type: 'FETCH_CAT_ERROR',
          message: 'cats failed to load'
        })
      }
    })
    .catch((error)=>{
      dispatcher.dispatch({
        type: 'FETCH_CAT_ERROR',
        message: 'login failed'
      })
    })
}

export function newCat(catInfo){
  let success;
  const params = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(catInfo)
      }
  fetch('http://localhost:4000/create-cat', params)
    .then((response)=>{
      success = response.ok
      return response.json()
    })
    .then((body)=>{
      if (success){
        dispatcher.dispatch({
          type: "NEW_CAT",
          cat: body.cat
        })
        console.log("success!", body.cat)
      }
      else {
        dispatcher.dispatch({
          type: 'CREATE_CAT_ERROR',
          message: 'login failed'
        })
      }
    })
    .catch((error)=>{
      dispatcher.dispatch({
        type: 'CREATE_CAT_ERROR',
        message: 'login failed'
      })
    })
}


export function newUser(userInfo){
  let success;
  const params = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userInfo)
      }
  fetch('http://localhost:4000/create-user', params)
    .then((response)=>{
      success = response.ok
      return response.json()
    })
    .then((body)=>{
      if (success){
        dispatcher.dispatch({
          type: "NEW_USER",
          user: body.user
        })
      }
      else {
        dispatcher.dispatch({
          type: 'CREATE_USER_ERROR'
        })
      }
    })
    .catch((error)=>{
      dispatcher.dispatch({
        type: 'CREATE_USER_ERROR'
      })
    })
}
