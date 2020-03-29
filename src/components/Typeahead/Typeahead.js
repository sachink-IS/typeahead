import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import DropDown from "../DropDown/DropDown";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "./Typeahead.css";

/**
 * I have two approaches in mind while designing typeahead
 * 1. calling url after every change in input string
 *    pros: in future we can add pagination for the result when the result set is very huge
 *    cons: it consumes server attention everytime there is a change in input string
 * 
 * 2. calling the api only for the first time and filtering data locally for the rest of the times 
 *    pros: less network activity and server attention
 *    cons: will be difficult to show the data when data is very huge
 * 
 */

function usePrevious(state) {

  const ref = useRef();
  useEffect(() => {
    ref.current = state;
  });
  return ref.current;
}

export default function Typeahead(props) {
  const [aStates, setAStates] = useState([]);
  const [sStateName, setSStateName] = useState("");
  const [hideDropDown, setHideDropDown] = useState(true);
  const [sSelectedState, setSSelectedState] = useState("")
  const prevSearchText = usePrevious(sStateName);

  useEffect(() => {
    if (prevSearchText && prevSearchText.lenth < sStateName.length) {
      filterStatesLocally(sStateName);
    } else {
      getStates();
    }
  }, [sStateName])

  const filterStatesLocally = (value) => {
    // empty the selected state on backspace
    let filteredStates = aStates.filter(function (el) {
      let index = el.name.toLowerCase().indexOf(value.toLowerCase());
      return index > -1;
    })
    setAStates(filteredStates)
  }

  const updateStateName = (e) => {
    let enteredText = e.target.value.trim();
    let charOnlyRegex = /^[A-Za-z]+$/;
    // will not allow any other key to enter other than alphabets and space
    let validateEnteredKey = enteredText.match(charOnlyRegex) || enteredText === "";
    let sValue = (validateEnteredKey) ? enteredText : sStateName;
    setSSelectedState("");
    setSStateName(sValue);
    (sValue) ? setHideDropDown(false) : setHideDropDown(true);
  }

  const getUrl = () => {
    let baseUrl = props.url;
    let params = (sStateName) ? '?value=' + sStateName : '';
    return baseUrl + params;
  }

  const getStates = async () => {
    if(localStorage.getItem('states')){
      console.log("getting data from localstorage : ", JSON.parse(localStorage.getItem('states')));
      setAStates(JSON.parse(localStorage.getItem('states')));   
    }else{
      await axios({
        method: "get",
        url: getUrl()
      }).then((response) => {
        setAStates(response.data);
        localStorage.setItem("states", JSON.stringify(response.data));
      })  
    }
  }

  const selectState = (state) => {
    setSSelectedState(state.name);
    setSStateName(state.name);
    setHideDropDown(true);
  }

  const divStyle = {
    width: props.width || '250px',
    margin: props.margin || '10px'
  }

  const showIcon = (!sStateName && hideDropDown) ? 
  <i className="caret fas fa-angle-down" onClick={() => setHideDropDown(false)}></i> :
  <i className="caret fas fa-times" onClick={() => {
    setHideDropDown(true);
    setSSelectedState("");
    setSStateName("");
  }}></i>

  return (
    <div style={divStyle} className="typeahead-basic">
      <div className="state-search-label">Search for a state</div>
      <div className="inputParent">
        <input name="StateName"
          type="text"
          placeholder="Search State"
          className="input-style"
          value={sStateName}
          onChange={updateStateName}
        />
        {showIcon}
      </div>
      <DropDown
        states={aStates}
        searchText={sStateName}
        selectState={selectState}
        hideDropDown={hideDropDown}
      />
      <div className="SelectedState">
        Selected State : {sSelectedState}
      </div>
    </div>
  )
}
