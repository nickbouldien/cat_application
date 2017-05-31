import {EventEmitter} from 'events';
import dispatcher from '../dispatchers/dispatcher';

class CatStore extends EventEmitter{
  constructor(){
    super();
      this.cats = [{}]
      this.newCat = {}
  }

  getCats(){
    return this.cats;
  }

  updateCats(cats, initial){
    this.cats = cats
    if(initial){
      this.emit('load')
    } else {
      this.emit('change')
    }

  }

  addCat(cat){
    this.newCat = cat
    this.cats.push(cat)
    this.emit('change')
  }


  handleAction(action){
    switch(action.type){
      case("FETCH_CATS"):{
        this.updateCats(action.cats, action.initial)
        break
      }
      case("NEW_CAT"):{
        this.addCat(action.cat);
        break;
      }
      case("CREATE_CAT_ERROR"):{
        // this.updateUser(action.user)
        // // this.message = "User Logged In"
        // // this.emit('message')
        this.emit('create cat error')
        break
      }
      case("FETCH_CAT_ERROR"):{
        // this.updateUser(action.user)
        // // this.message = "User Logged In"
        // // this.emit('message')
        this.emit('fetch cat error')
        break
      }
      default:{}
    }
  }
}

const catStore = new CatStore();
window.store = catStore;
dispatcher.register(catStore.handleAction.bind(catStore))
export default catStore;
