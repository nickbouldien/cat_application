import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import {loginUser} from '../actions/actions';
import userStore from '../stores/UserStore';

class LoginUser extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: {
        email: "",
        password: ""
      },
      message: ''
    }
  }

  handleLogin(){
    this.props.history.push("/")
  }

  handleError(){
    this.setState({
      message: 'Login failed'
    })
  }

  componentWillMount(){
    userStore.on('login', this.handleLogin.bind(this))
    userStore.on('login error', (this.handleError.bind(this)))
  }

  handleChange(e){
    let target = e.target
    let user = this.state.user
    user[target.name] = target.value
    this.setState({
      user: user
    })
  }

  handleSubmit(e){
    e.preventDefault()
    loginUser(this.state)
  }

  render(){
    return(
      <div>
        <h2>Login</h2>
        <p>{this.state.message}</p>
        <form onSubmit={this.handleSubmit.bind(this)}>
        <div className='formGroup'>
          <label htmlFor='email'>Email</label>
          <input type='text' name='email' id='email' value={this.state.user.email} onChange={this.handleChange.bind(this)}></input>
        </div>
        <div className='formGroup'>
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' id='password' value={this.state.user.password} onChange={this.handleChange.bind(this)}></input>
        </div>
        <div className='formGroup'>
          <input type='submit' value='Save' className='btn btn-primary'></input>
        </div>

        </form>
      </div>
    )
  }
}

export default LoginUser;
