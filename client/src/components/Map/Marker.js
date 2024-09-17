import { useRef, useEffect } from "react";
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import MarkerPopup from "./MarkerPopup";

const Marker = ({ currentMap, longitude, latitude, onClick }) => {
    const markerRef = useRef();
    const popupMarkerRef = useRef();

    const createPopupMarker = () => {
        alert(`Lng: ${longitude} - Lat: ${latitude}`);
        

        const popupMarker = document.createElement('div');
        ReactDOM.render(<MarkerPopup />, popupMarker);

        const newPopupMarker = new mapboxgl
            .Popup({
                closeOnClick: true,
            })
            .setLngLat([longitude, latitude])
            .setDOMContent(popupMarker)
            .addTo(currentMap);

        popupMarkerRef.current = newPopupMarker;
    };

    useEffect(() => {
        if (!currentMap) return;

        const marker = new mapboxgl
            .Marker()
            .setLngLat([longitude, latitude])
            .addTo(currentMap);

        markerRef.current = marker;

        const handleClick = () => {
            console.log('Marker clicked');
            createPopupMarker();
        };

        marker.getElement().addEventListener('click', handleClick);

        // Cleanup khi component bị unmount hoặc khi marker thay đổi
        return () => {
            marker.getElement().removeEventListener('click', handleClick);
            marker.remove();  // Xóa marker khỏi map
        }
    }, [currentMap, longitude, latitude]);

    return null;
}

export default Marker;