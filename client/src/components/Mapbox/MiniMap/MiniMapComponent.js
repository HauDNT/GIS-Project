import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { MapboxAPIKey } from '../../../common/MapboxApiKey';

mapboxgl.accessToken = MapboxAPIKey;

function MiniMapComponent({ lat, lng, zoom }) {
    const [mapLoaded, setMapLoaded] = useState(false);
    const mapContainer = useRef(null);
    const map = useRef(null);

    useEffect(() => {
        if (map.current) return;

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/thomasdang1812003/cm11wky8301du01pbdyaresom',
            center: [lng, lat],
            zoom: zoom,
        });

        map.current.on('load', () => {
            setMapLoaded(true)
        });
    }, [lat, lng, zoom]);

    return (
        <div className='mini-map-wrapper'>
            <div ref={mapContainer} className="map-container" />
        </div>
    );
}

export default MiniMapComponent;