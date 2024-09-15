import Button from 'react-bootstrap/Button';
import {
    ZoomIn,
    ZoomOut,
    RestartAltOutlined,
    PushPinOutlined
} from '@mui/icons-material';

const MapToolbar = ({ onZoomIn, onZoomOut, onResetView, addNewPlace }) => {
    return (
        <div className="map-toolbar">
            <Button variant="outline-primary" onClick={onZoomIn}>
                <ZoomIn/>
            </Button>
            <Button variant="outline-primary" onClick={onZoomOut} className='mt-10px'>
                <ZoomOut/>
            </Button>
            <Button variant="outline-primary" onClick={onResetView} className='mt-10px'>
                <RestartAltOutlined/>
            </Button>
            <Button variant="outline-primary" onClick={addNewPlace} className='mt-10px'>
                <PushPinOutlined/>
            </Button>
        </div>
    )
}

export default MapToolbar;