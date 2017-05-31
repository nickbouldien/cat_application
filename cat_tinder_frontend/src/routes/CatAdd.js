
import React, { Component } from 'react'
import Header from '../components/Header'
import {newCat} from '../actions/actions';
import catStore from '../stores/CatStore'

class CatAdd extends Component{
  constructor(props){
    super(props)
    this.state = {
      cat : {
        color: '',
        breed: '',
        habitat: 'Indoor',
        gender: 'Male',
        personality: '',
        age: ''
      },
      message : ''
    }
  }

  handleError(){
    this.setState({
      message: 'Could not create cat'
    })
  }

  componentWillMount(){
    catStore.on('create cat error', this.handleError.bind(this))
  }

  handleSubmit(e){
    e.preventDefault();
    newCat(this.state)
      //.catch(
  }
  handleChange(e){
    let target = e.target
    this.state.cat[target.name] = target.value
    this.setState(this.state.cat)
  }

  render(){
    return (
      <div >
        <div className="header">
          <Header textLocation="Home" linkLocation="/" text="Add a cat"/>
        </div>
        <div id="imageBox">
          <img src="http://pngimg.com/uploads/cat/cat_PNG1631.png" className="App-logo" alt="logo" />
        </div>
        <div className="row">
          <div className="col-xs-2 col-xs-offset-5">
            <p>{this.state.message}</p>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <label htmlFor="color">Color</label>
              <input
                onChange={this.handleChange.bind(this)}
                value={this.state.cat.color}
                name="color"
                type="text"
                placeholder='Black'
              />

              <label name="breed">Breed</label>
              <input
                type="text"
                name="breed"
                onChange={this.handleChange.bind(this)}
                value={this.state.cat.breed}
                placeholder='Tabby'
              />

              <label htmlFor="gender">Gender</label>
              <select
                value={this.state.cat.gender}
                onChange={this.handleChange.bind(this)}
                name="gender"
                >
                <option value="Male" >Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

              <label htmlFor="habitat">Habitat</label>
              <select
                name="habitat"
                value={this.state.cat.habitat}
                onChange={this.handleChange.bind(this)}
                >
                <option value="Indoor" >Indoor</option>
                <option value="Outdoor" >Outdoor</option>
                <option value="Feral" >Feral</option>
              </select>

              <label htmlFor="personality">Personality</label>
              <input
                type="text"
                name="personality"
                placeholder='Happy'
                value={this.state.cat.personality}
                onChange={this.handleChange.bind(this)}
              />

              <label htmlFor="age">Age</label>
              <input
                type="number"
                name="age"
                placeholder="0"
                min="0"
                onChange={this.handleChange.bind(this)}
                value={this.state.cat.age}
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

export default CatAdd
