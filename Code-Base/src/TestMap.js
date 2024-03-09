import React, { useState } from 'react';
import { MapContainer } from 'react-leaflet';

function TestMap() {
  const [mapInstance, setMapInstance] = useState(null);

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: '80vh', width: '100%' }}
      whenCreated={(map) => {
        setMapInstance(map);
        console.log('Map instance set:', map);
      }}
    />
  );
}

export default TestMap;
