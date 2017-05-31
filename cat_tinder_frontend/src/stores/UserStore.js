import {EventEmitter} from 'events';
import dispatcher from '../dispatchers/dispatcher';

class UserStore extends EventEmitter{
  constructor(){
    super();
    this.users = [{}]
    this.newUser = {}
  }

  getNewUser(){
    return this.newUser;
  }

  updateUsers(users, initial){
    this.users = users
    if(initial){
      this.emit('load')
    } else {
      this.emit('change')
    }
  }

  addUser(user){
    this.newUser = user
    console.log("new user set")
    this.users.push(user)
    this.emit('user_created')
  }

  handleAction(action){
    switch(action.type){
      case("LOGIN_USER"):{
        // this.updateUser(action.user)
        // // this.message = "User Logged In"
        // // this.emit('message')
        this.emit('login')
        break
      }
      case("LOGIN_ERROR"):{
        // this.updateUser(action.user)
        // // this.message = "User Logged In"
        // // this.emit('message')
        this.emit('login error')
        break
      }
      case("CREATE_USER_ERROR"):{
        // this.updateUser(action.user)
        // // this.message = "User Logged In"
        // // this.emit('message')
        this.emit('create user error')
        break
      }
      case("NEW_USER"):{
        this.addUser(action.user);
        break;
      }
      default:{}
    }
  }
}

const userStore = new UserStore();
window.store = userStore;
dispatcher.register(userStore.handleAction.bind(userStore))
export default userStore;
