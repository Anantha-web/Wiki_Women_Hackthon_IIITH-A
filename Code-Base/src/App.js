import React from 'react';
import SearchMap from './SearchMap';
import './App.css'; // Make sure you have some basic styles
import TestMap from './TestMap';
import '../node_modules/leaflet/dist/leaflet.css';


function App() {
  return (
    <div className="App">
      <SearchMap />
      {/* <TestMap/> */}
    </div>
  );
}

export default App;
