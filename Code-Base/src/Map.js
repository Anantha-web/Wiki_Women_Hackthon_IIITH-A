import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function Map({ position, setPosition }) {
  const handleClick = (e) => {
    setPosition(e.latlng);
  };

  // Use CircleMarker for a simple marker or just Marker for a default icon
  const renderMarker = () => {
    if (position) {
      return (
        <CircleMarker 
          center={position} 
          color="red" 
          radius={10}
        >
          <Popup>
            Coordinates: {position.lat.toFixed(2)}, {position.lng.toFixed(2)}
            <br />
            <button onClick={() => navigator.clipboard.writeText(`${position.lat}, ${position.lng}`)}>
              Copy
            </button>
          </Popup>
        </CircleMarker>
      );
    }
    return null;
  };

  return (
    <MapContainer center={position || [51.505, -0.09]} zoom={13} style={{ height: '80vh', width: '100%' }} onClick={handleClick}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
      />
      {renderMarker()}
    </MapContainer>
  );
}

export default Map;
