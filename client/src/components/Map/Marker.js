import { useRef, useEffect } from "react";
import mapboxgl from 'mapbox-gl';

const Marker = ({ currentMap, longitude, latitude, onClick }) => {
    const markerRef = useRef();

    useEffect(() => {
        if (!currentMap) return;

        const marker = new mapboxgl
            .Marker()
            .setLngLat([longitude, latitude])
            .addTo(currentMap);

        markerRef.current = marker;

        marker.getElement().addEventListener('click', onClick);

        // Cleanup khi component bị unmount hoặc khi marker thay đổi
        return () => {
            marker.getElement().removeEventListener('click', onClick);
            marker.remove();  // Xóa marker khỏi map
        }
    }, [currentMap, longitude, latitude]);

    return null;
}

export default Marker;