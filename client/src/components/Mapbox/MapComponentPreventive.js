import { useState } from 'react';
import ReactMapGl, { Marker, NavigationControl } from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import MarkerComponent from './Marker';
import RoomIcon from '@mui/icons-material/Room';
import "../../styles/map.scss";

const MapComponent = () => {
    const [newPlace, setNewPlace] = useState([
        {
            latitude: 9.97032002433383,
            longitude: 105.11054875065781,
        }
    ]);

    const [viewPort, setViewPort] = useState({
        latitude: 9.97032002433383,
        longitude: 105.11054875065781,
        zoom: 14,
        width: "100vw",
        height: "100vh",
    });

    const handleViewportChange = (newViewport) => {
        setViewPort({
            ...newViewport,
        });
    };

    const handleDbClick = (e) => {
        e.preventDefault();

        const { lng, lat } = e.lngLat;
        setNewPlace(prevPlaces => [
            ...prevPlaces,
            {
                latitude: lat,
                longitude: lng,
            }
        ]);
    };

    return (
        <div className='map-container'>
            <ReactMapGl
                {...viewPort}
                mapboxAccessToken='pk.eyJ1IjoidGhvbWFzZGFuZzE4MTIwMDMiLCJhIjoiY20xMXIyMXdlMHVqNjJrb3EyOWd0bmRpbiJ9.OMZfnZwOUP-NHKdLaS9ypg'
                width="100%"
                height="100%"
                transitionDuration="200"
                mapStyle="mapbox://styles/thomasdang1812003/cm11ynsa601fd01qucszn06ou"
                onDblClick={handleDbClick}
                onZoom={(newViewPort) => handleViewportChange(newViewPort)}
                onDrag={(newViewPort) => handleViewportChange(newViewPort)}
                cursor='default'
                
            >
                {
                    newPlace.length > 0 && newPlace.map(place => (
                        <MarkerComponent
                            latitude={place.latitude}
                            longitude={place.longitude}
                            offsetLeft={0 * viewPort.zoom}
                            offsetRight={0 * viewPort.zoom}
                        >
                            <RoomIcon className='marker-icon' />
                        </MarkerComponent>
                    ))
                }

                <NavigationControl position='top-right' />
            </ReactMapGl>
        </div>
    )
}

export default MapComponent;