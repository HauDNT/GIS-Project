import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import Marker from './Marker';

mapboxgl.accessToken = 'pk.eyJ1IjoidGhvbWFzZGFuZzE4MTIwMDMiLCJhIjoiY20xMXIyMXdlMHVqNjJrb3EyOWd0bmRpbiJ9.OMZfnZwOUP-NHKdLaS9ypg';

const MapComponent = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lat, setLat] = useState(9.97032002433383);
    const [lng, setLng] = useState(105.11054875065781);
    const [zoom, setZoom] = useState(9);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [newPlaces, setNewPlaces] = useState([
        {
            latitude: 9.97032002433383,
            longitude: 105.11054875065781,
        }
    ]);

    const handleDblClick = (e) => {
        e.preventDefault();
    };

    const addNewMarker = (lngLat) => {
        setNewPlaces(prevPlaces => [
            ...prevPlaces,
            {
                latitude: lngLat.lat,
                longitude: lngLat.lng,
            }
        ]);
    };

    const handleMarkerClick = () => {
        alert('Marker clicked');
    }

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/thomasdang1812003/cm11ynsa601fd01qucszn06ou',
            center: [lng, lat],
            zoom: zoom,
        });

        map.current.on('load', () => setMapLoaded(true))

        map.current.on('dblclick', (event) => {
            handleDblClick(event);
            addNewMarker(event.lngLat)
        });

        return () => {
            map.current.off('dblclick'); // Cleanup sự kiện khi component bị unmount
        }
    }, []);

    return (
        <div>
            <div ref={mapContainer} className="map-container" />
            {
                mapLoaded && newPlaces.map((place, index) => (
                    <Marker
                        key={index}
                        currentMap={map.current}
                        longitude={place.longitude}
                        latitude={place.latitude}
                        onClick={handleMarkerClick}
                    />
                ))
            }
        </div>
    );
}

export default MapComponent;