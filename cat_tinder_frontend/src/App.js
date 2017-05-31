import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import CatAdd from './routes/CatAdd';
import UserAdd from './routes/UserAdd';
import CatProfile from './routes/CatProfile';
import LoginUser from './routes/LoginUser';
import CatIndex from './routes/CatIndex';
import UserCreated from './routes/UserCreated';
import './App.css';
import {fetchCats} from './actions/actions';


class App extends Component {
  constructor(props){
    super(props)
    fetchCats(true)
  }
  render() {
    return (
      <Router>
        <div className="container">
          <Route exact path="/" component={CatIndex} />
          <Route path='/cat-add' component={CatAdd} />
          <Route path='/user-add' component={UserAdd} />
          <Route path='/user-created' component={UserCreated} />
          <Route path='/user-login' component={LoginUser} />
        </div>
      </Router>
    );
  }
}

export default App;


{/* <Route path='/profile' component={CatProfile}  /> */}
