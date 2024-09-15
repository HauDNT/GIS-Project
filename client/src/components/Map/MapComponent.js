import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { toast } from 'react-toastify';
import Marker from './Marker';
import MapToolbar from './MapToolbar';

mapboxgl.accessToken = 'pk.eyJ1IjoidGhvbWFzZGFuZzE4MTIwMDMiLCJhIjoiY20xMXIyMXdlMHVqNjJrb3EyOWd0bmRpbiJ9.OMZfnZwOUP-NHKdLaS9ypg';

const MapComponent = ({ placesData = [] }) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lat, setLat] = useState(9.97032002433383);
    const [lng, setLng] = useState(105.11054875065781);
    const [zoom, setZoom] = useState(14);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [places, setNewPlaces] = useState(placesData);
    const enableAddPlace = useRef(false);

    const addNewMarker = (lngLat) => {
        setNewPlaces(prevPlaces => [
            ...prevPlaces,
            {
                Latitude: lngLat.lat,
                Longitude: lngLat.lng,
            }
        ]);
    };

    const handleMarkerClick = () => {
        alert('Marker clicked');
    };

    const zoomIn = () => {
        setZoom(currentZoom => currentZoom + 1);
        map.current.zoomIn();
    };

    const zoomOut = () => {
        setZoom(currentZoom => currentZoom - 1);
        map.current.zoomOut();
    };

    const resetView = () => {
        setLat(9.97032002433383);
        setLng(105.11054875065781);
        setZoom(14);
        map.current.flyTo({
            center: [lng, lat],
            zoom: 14,
            essential: true,
        });
    }

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/thomasdang1812003/cm11wky8301du01pbdyaresom',
            center: [lng, lat],
            zoom: zoom,
        });

        map.current.on('load', () => setMapLoaded(true))

        map.current.on('click', (event) => {
            if (enableAddPlace.current) {
                console.log(event.lngLat);
                addNewMarker(event.lngLat);
                enableAddPlace.current = false;
                map.current.getCanvas().style.cursor = 'grabbing';
                toast.success('Địa điểm đã được thêm!');
            };
        });

        return () => {
            map.current.off('dblclick'); // Cleanup sự kiện khi component bị unmount
        }
    }, [placesData]);

    return (
        <div className='map-wrapper wrapper'>
            <div ref={mapContainer} className="map-container" />
            {
                mapLoaded && places.map((place, index) => (
                    <Marker
                        key={index}
                        currentMap={map.current}
                        longitude={place.Longitude}
                        latitude={place.Latitude}
                        onClick={handleMarkerClick}
                    />
                ))
            }
            <MapToolbar
                onZoomIn={zoomIn}
                onZoomOut={zoomOut}
                onResetView={resetView}
                addNewPlace={() => {
                    map.current.getCanvas().style.cursor = 'default';
                    toast.info('Nhấp vào bản đồ để thêm địa điểm kho mới');
                    enableAddPlace.current = true;
                }}
            />
        </div>
    );
}

export default MapComponent;