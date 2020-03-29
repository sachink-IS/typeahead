import React, { Component } from 'react';
import "./DropDown.css";

export default class DropDown extends Component {
  render() {
    let dStatesDom = [];
    let props = this.props;

    if(!props.hideDropDown){
      props.states.forEach((state, index) => {
        /**
         * Approach 2 : uncommenting the following lines of code, 
         *              using local sorting of data based on the search string
         */
        let strIndex = state.name.toLowerCase().indexOf(props.searchText.toLowerCase());
        if (strIndex > -1) {
          let dom = <div className="stateDom" key={index} onClick={this.props.selectState.bind(this, state)}>{state.name}</div>
          dStatesDom.push(dom)
        }
      })          
    }

    return (
      <div className="dropdownOutline">
        {dStatesDom}
      </div>
    )
  }
}
