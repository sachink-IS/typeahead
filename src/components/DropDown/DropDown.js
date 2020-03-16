import React, { Component } from 'react';
import "./DropDown.css";

export default class DropDown extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let dCitiesDom = [];
    let props = this.props;

    if(!props.hideDropDown){
      props.cities.forEach((city, index) => {
        /**
         * Approach 2 : uncommenting the following lines of code, 
         *              using local sorting of data based on the search string
         */
        // let index = city.name.toLowerCase().indexOf(props.searchText.toLowerCase());
        // if (index > -1) {
          let dom = <div className="cityDom" key={index} onClick={this.props.selectCity.bind(this, city)}>{city.name}</div>
          dCitiesDom.push(dom)
        // }
      })          
    }

    return (
      <div className="dropdownOutline">
        {dCitiesDom}
      </div>
    )
  }
}
