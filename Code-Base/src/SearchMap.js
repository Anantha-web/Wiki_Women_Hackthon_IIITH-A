import React, { useState, useCallback, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


function LocationMarker({ position, setPosition }) {
  const copyToClipboard = useCallback((text) => {
    navigator.clipboard.writeText(text).then(() => {
      console.log(position)
      alert('Coordinates copied to clipboard!');
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  }, []);

  const map = useMapEvents({
    click(e) {
      console.log(e);
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  // Ensure position is defined before accessing its properties
  if (!position) {
    return null;
  }

  return (
    <Marker position={position} eventHandlers={{ click: () => setPosition(position) }}>
      <Popup>
        Coordinates: {position.lat.toFixed(2)}, {position.lng.toFixed(2)}{' '}
        <button onClick={() => copyToClipboard(`${position.lat}, ${position.lng}`)}>
          Copy
        </button>
      </Popup>
    </Marker>
  );
}

function SearchMap() {
  const [position, setPosition] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);
  const initialZoom = 13;
  const searchZoomLevel = 13;

  const southWest = L.latLng(-89.98155760646617, -180),
    northEast = L.latLng(89.99346179538875, 180);
  const bounds = L.latLngBounds(southWest, northEast);

  const searchLocation = useCallback((coords) => {
    const [lat, lng] = coords.split(',').map(Number);
    if (!isNaN(lat) && !isNaN(lng)) {
      const newPosition = L.latLng(lat, lng);
      console.log('New position:', newPosition);
      setPosition(newPosition);
      console.log('Map instance:', mapInstance); // Add this line
      if (mapInstance) {
        mapInstance.flyTo(newPosition, searchZoomLevel);
      }
    } else {
      console.error('Invalid coordinates:', coords);
    }
  }, [mapInstance, searchZoomLevel]);

  useEffect(() => {
    if (position && mapInstance) {
      mapInstance.flyTo(position, searchZoomLevel);
    }
  }, [position, mapInstance, searchZoomLevel]);

  return (
    <div>
      <input
        type="text"
        placeholder="Enter coordinates (lat,lng)"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            searchLocation(e.target.value);
            e.preventDefault();
          }
        }}
      />
      <MapContainer
        center={position || [51.505, -0.09]}
        zoom={initialZoom}
        style={{ height: '80vh', width: '100%' }}
        minZoom={2}
        maxBounds={bounds}
        maxBoundsViscosity={1.0}
        whenCreated={(map) => setMapInstance(map)} // Ensure mapInstance is set immediately
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        />
        <LocationMarker position={position} setPosition={setPosition} />
      </MapContainer>
    </div>
  );
}


export default SearchMap;
