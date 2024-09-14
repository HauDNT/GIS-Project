import { useState } from 'react';
import ReactMapGl, { Marker, NavigationControl  } from 'react-map-gl';
import { easeCubic } from 'd3-ease';
import RoomIcon from '@mui/icons-material/Room';
import "mapbox-gl/dist/mapbox-gl.css";
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
        transitionDuration: 500,
        transitionEasing: easeCubic,
    });

    const handleViewportChange = (newViewport) => {
        setViewPort({
            ...newViewport,
            transitionDuration: 500,
            transitionEasing: easeCubic,
        });
    };

    const handleDbClick = (e) => {
        e.preventDefault();

        const { lng, lat } = e.lngLat;  // Lấy lng và lat
        setNewPlace(prevPlaces => [
            ...prevPlaces,
            {
                latitude: lat,
                longitude: lng,
            }
        ]);
    };

    return (
        <div style={{ width: "100vw", height: "100vh" }}>
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
            >
                {
                    newPlace.length > 0 && newPlace.map(place => (
                        <>
                            <Marker
                                latitude={place.latitude}   // Sử dụng latitude
                                longitude={place.longitude}  // Sử dụng longitude
                                offsetLeft={-3.5 * viewPort.zoom}
                                offsetTop={-7 * viewPort.zoom}
                            >
                                <RoomIcon
                                    style={{
                                        fontSize: 30,
                                        color: 'tomato',
                                        cursor: 'pointer'
                                    }}
                                />
                            </Marker>
                        </>
                    ))
                }

                <NavigationControl position='top-left'/>
            </ReactMapGl>
        </div>
    )
}

export default MapComponent;