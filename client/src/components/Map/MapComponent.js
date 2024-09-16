import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import { toast } from 'react-toastify';
import Marker from './Marker';
import MapToolbar from './MapToolbar';
import VerticalCenterModal from './Modals/AddWarehouseModal';
import FindPlaceModal from './Modals/FindPlaceModal';
import GeocoderMarker from './GeocoderMarkerComponent';
import { FindCoordinates } from './FindCoordinates';


mapboxgl.accessToken = 'pk.eyJ1IjoidGhvbWFzZGFuZzE4MTIwMDMiLCJhIjoiY20xMXIyMXdlMHVqNjJrb3EyOWd0bmRpbiJ9.OMZfnZwOUP-NHKdLaS9ypg';

const MapComponent = ({ placesData }) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const geocoderMarkerRef = useRef();
    const enableAddPlace = useRef(false);
    const [lat, setLat] = useState(9.97032002433383);
    const [lng, setLng] = useState(105.11054875065781);
    const [zoom, setZoom] = useState(14);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [places, setNewPlaces] = useState(placesData);
    const [isEnableModalAddPlace, setEnableModalAddPlace] = useState(false);
    const [isEnableModalFindPlace, setEnableModalFindPlace] = useState(false);

    const addNewMarker = (lngLat) => {
        setNewPlaces(prevPlaces => [
            ...prevPlaces,
            {
                Latitude: lngLat.lat,
                Longitude: lngLat.lng,
            }
        ]);

        setEnableModalAddPlace(true);
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
    };

    const cancelAddMarker = () => {
        const updatedPlaces = places.filter((_, index) => index !== places.length - 1);
        setNewPlaces(updatedPlaces);
        setEnableModalAddPlace(false);
        toast.error('Hủy bỏ thêm kho mới')
    };

    const findPlace = async (address) => {
        const coordinates = await FindCoordinates(mapboxgl.accessToken, address);
        
        if (coordinates) {
            const lat = coordinates[1];
            const lng = coordinates[0];

            // Create marker:
            if (geocoderMarkerRef.current) geocoderMarkerRef.current.remove();

            const geocoderMarker = document.createElement('div');
            ReactDOM.render(<GeocoderMarker/>, geocoderMarker);

            geocoderMarkerRef.current = new mapboxgl.Marker({
                element: geocoderMarker
            })
                .setLngLat([lng, lat])
                .addTo(map.current);

            // Set coordinates into map and go:
            setLat(lat);
            setLng(lng);
            setZoom(14);

            map.current.flyTo({
                center: [lng, lat],
                zoom: 14,
                essential: true,
            });
        } else {
            toast.error('Không tìm thấy địa chỉ này.');
        }
    };

    useEffect(() => {
        if (map.current) return;

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/thomasdang1812003/cm11wky8301du01pbdyaresom',
            center: [lng, lat],
            zoom: zoom,
        });

        map.current.on('load', () => setMapLoaded(true));

        map.current.getCanvas().style.cursor = 'default';

        map.current.on('click', (event) => {
            if (enableAddPlace.current) {
                addNewMarker(event.lngLat);
                enableAddPlace.current = false;
            };
        });

        return () => {
            map.current.off('click'); // Cleanup sự kiện khi component bị unmount
        }
    }, [lat, lng, zoom]);

    useEffect(() => {
        setNewPlaces(placesData);
    }, [placesData]);

    return (
        <>
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
                        if (!enableAddPlace.current) {
                            toast.info('Nhấp vào bản đồ để thêm địa điểm kho mới');
                            enableAddPlace.current = true;
                        }
                        else {
                            enableAddPlace.current = false;
                        }
                    }}
                    findPlace={() => setEnableModalFindPlace(true)}
                />
            </div>
            {
                places.length > 0 ? (
                    <VerticalCenterModal
                        isEnable={isEnableModalAddPlace}
                        latitude={places[places.length - 1].Latitude}
                        longitude={places[places.length - 1].Longitude}
                        afterAddAction={() => setEnableModalAddPlace(false)}
                        cancelAction={cancelAddMarker}
                    />
                ) : null
            }

            <FindPlaceModal 
                isEnable={isEnableModalFindPlace}
                apiKey={mapboxgl.accessToken}
                handleFindPlace={findPlace}
                handleCancelFind={() => setEnableModalFindPlace(false)}
            />
        </>
    );
}

export default MapComponent;