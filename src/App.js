import React from 'react';
import Typeahead from "./components/Typeahead/Typeahead"
import './App.css';

function App() {  
  return (
    <div className="App">
      <Typeahead
        className="TypeaheadComponent"
        width = "200px"
        margin = "10px"
        url = 'https://states.sachinkis.repl.co/'
      />
    </div>
  );
}

export default App;
