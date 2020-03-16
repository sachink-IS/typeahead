import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import DropDown from "../DropDown/DropDown";
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
  const [aCities, setACities] = useState([]);
  const [sCityName, setSCityName] = useState("");
  const [hideDropDown, setHideDropDown] = useState(true);
  const prevSearchText = usePrevious(sCityName);

  useEffect(() => {
    if (prevSearchText && prevSearchText.length < sCityName.length) {
      filterStatesLocally(sCityName);
    } else {
      getCities();
    }
  }, [sCityName])

  const filterStatesLocally = (value) => {
    let filteredStates = aCities.filter(function (el) {
      let index = el.name.toLowerCase().indexOf(value.toLowerCase());
      return index > -1;
    })
    setACities(filteredStates)
  }

  const updateCityName = (e) => {
    let sValue = e.target.value;
    setSCityName(sValue);
    (sValue) ? setHideDropDown(false) : setHideDropDown(true);
  }

  const getUrl = () => {
    let baseUrl = props.url;
    let params = (sCityName) ? '?value=' + sCityName : '';
    return baseUrl + params;
  }

  const getCities = async () => {
    await axios({
      method: "get",
      url: getUrl()
    }).then((response) => {
      setACities(response.data);
    })
  }

  const selectCity = (city) => {
    setSCityName(city.name);
    setHideDropDown(true);
  }

  const divStyle = {
    width: props.width,
    margin: props.margin
  }

  return (
    <div style={divStyle} className="typeahead-basic">
      <div className="state-search-label">Search for a state</div>
      <input name="CityName"
        type="text"
        placeholder="Search city"
        className="input-style"
        value={sCityName}
        onChange={updateCityName}
      />
      <DropDown
        cities={aCities}
        searchText={sCityName}
        selectCity={selectCity}
        hideDropDown={hideDropDown}
      />
    </div>
  )
}
