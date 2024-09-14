/*
    * https://cloud.maptiler.com/account/keys/
    * https://docs.maptiler.com/react/maplibre-gl-js/how-to-use-maplibre-gl-js/
*/

import React, { useRef, useEffect } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import '../../styles/map.scss';

const MapComponent = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const lng = 105.14434709756426;
    const lat = 9.914565453807697;
    const zoom = 14;
    const API_KEY = 'U1lmMrNJDyClexTW95Ld';

    useEffect(() => {
        if (map.current) return;

        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
            center: [lng, lat],
            zoom: zoom
        });

        map.current.addControl(new maplibregl.NavigationControl(), 'top-right');
        new maplibregl.Marker({ color: "#FF0000" })
            .setLngLat([lng, lat])
            .addTo(map.current);
    }, [API_KEY, lng, lat, zoom]);

    return (
        <div className="map-wrap">
            <div ref={mapContainer} className="map" />
        </div>
    );
}

export default MapComponent;