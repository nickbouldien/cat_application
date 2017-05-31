
import React, { Component } from 'react'
import Header from '../components/Header'
import {newUser} from '../actions/actions';
import userStore from '../stores/UserStore';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'

class UserAdd extends Component{
  constructor(props){
    super(props)
    this.state = {
      user : {
        firstname: '',
        lastname: '',
        city: '',
        state: '',
        email: '',
        password: ''
      },
      message : '',
      redirect: false
    }
  }

  componentWillMount(){
    userStore.on('user_created', ()=> {
      this.setState({
        redirect: true
      })
    })
    userStore.on('create user error', ()=> {
      this.setState({
        message: 'Failed to register new user'
      })
    })
  }

  handleSubmit(e){
    e.preventDefault();
    newUser(this.state)
  }

  handleChange(e){
    let target = e.target
    this.state.user[target.name] = target.value
    this.setState(this.state.user)
  }

  render(){
    if (this.state.redirect){
      // console.log("in redirect")
      this.props.history.push("/user-created")
      //<Redirect push to="/user-created" />
    }
    return (
      <div>
        <div className="header">
          <Header textLocation="Home" linkLocation="/" text="Sign up!"/>
        </div>

        <div id="imageBox">
          <img src="http://pngimg.com/uploads/cat/cat_PNG1631.png" className="App-logo" alt="logo" />
        </div>

        <div className="row">
          <div className="col-xs-2 col-xs-offset-5">
            <p>{this.state.message}</p>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <label htmlFor="firstname">First name</label>
              <input
                onChange={this.handleChange.bind(this)}
                value={this.state.user.firstname}
                name="firstname"
                type="text"
                placeholder='Jim'
              />

              <label name="lastname">Last name</label>
              <input
                type="text"
                name="lastname"
                onChange={this.handleChange.bind(this)}
                value={this.state.user.lastname}
                placeholder='Jones'
              />

              <label htmlFor="city">City</label>
              <input
                type="text"
                placeholder="San Diego"
                value={this.state.user.city}
                onChange={this.handleChange.bind(this)}
                name="city"
              />

              <label htmlFor="state">State</label>
              <input
                type="text"
                placeholder="California"
                value={this.state.user.state}
                onChange={this.handleChange.bind(this)}
                name="state"
              />

              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                placeholder='Jim@Jones.com'
                value={this.state.user.email}
                onChange={this.handleChange.bind(this)}
              />

              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="asdf"
                onChange={this.handleChange.bind(this)}
                value={this.state.user.password}
              />
              <br />
              <br />
              <input className="btn btn-default" type="submit" value="Submit" />
            </form>

          </div>

        </div>

      </div>
    )
  }
}

export default UserAdd
