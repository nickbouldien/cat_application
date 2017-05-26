
import React, { Component } from 'react'

class CatListing extends Component{

  render(){
    let info = this.props.catInfo;
    return (
      <div className="inlineDiv">
        <ul>
          <li>{info.color}</li>
          <li>{info.habitat}</li>
          <li>{info.gender}</li>
          <li>{info.age}</li>
        </ul>
      </div>
    )
  }
}

export default CatListing
