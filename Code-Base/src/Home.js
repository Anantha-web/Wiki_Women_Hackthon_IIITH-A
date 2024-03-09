import React from 'react';
import Map from './Map'; // Import the Map component

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Map App</h1>
      <p>This is a simple app to demonstrate a clickable map using React and Leaflet.</p>
      <Map /> {/* This will render the Map component */}
    </div>
  );
}
