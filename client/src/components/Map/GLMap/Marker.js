import { Marker } from 'react-map-gl';

const MarkerComponent = ({children, latitude, longitude, offsetLeft, offsetRight}) => {
    return (
        <Marker
            latitude={latitude}
            longitude={longitude}
            offsetLeft={offsetLeft}
            offsetRight={offsetRight}
        >
        {
            children
        }
        </Marker>
    )
}

export default MarkerComponent;