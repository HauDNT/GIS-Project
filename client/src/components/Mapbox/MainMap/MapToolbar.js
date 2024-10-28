import Button from 'react-bootstrap/Button';
import {
    ZoomIn,
    ZoomOut,
    RestartAltOutlined,
    PushPinOutlined,
    ArrowBackIosNew,
    ArrowForwardIos,
    TravelExplore,
<<<<<<< HEAD
} from '@mui/icons-material';
import { useState } from 'react';

const MapToolbar = ({ onZoomIn, onZoomOut, onResetView, findPlace, addNewPlace }) => {
=======
    Search,
} from '@mui/icons-material';
import { useState } from 'react';

const MapToolbar = ({ 
    onZoomIn, 
    onZoomOut, 
    onResetView, 
    findPlace, 
    addNewPlace,
    findWarehouse,
}) => {
>>>>>>> 1ec3338ddce2e6a5e398b58ea071b815f25afdc8
    const [openFull, setOpenFull] = useState(false);

    const handleOpenFull = () => {
        setOpenFull(!openFull);
    };

    return (
        <div className={`map-toolbar ${openFull && 'tool-large'}`}>
<<<<<<< HEAD
            <Button variant="outline-primary" onClick={onZoomIn}>
=======
            <Button variant="outline-primary" onClick={addNewPlace}>
                <PushPinOutlined/>
            </Button>
            <Button variant="outline-primary" onClick={findWarehouse} className='mt-10px'>
                <Search/>
            </Button>
            <Button variant="outline-primary" onClick={findPlace} className='mt-10px'>
                <TravelExplore/>
            </Button>
            <Button variant="outline-primary" onClick={onZoomIn} className='mt-10px'>
>>>>>>> 1ec3338ddce2e6a5e398b58ea071b815f25afdc8
                <ZoomIn/>
            </Button>
            <Button variant="outline-primary" onClick={onZoomOut} className='mt-10px'>
                <ZoomOut/>
            </Button>
            <Button variant="outline-primary" onClick={onResetView} className='mt-10px'>
                <RestartAltOutlined/>
            </Button>
<<<<<<< HEAD
            <Button variant="outline-primary" onClick={addNewPlace} className='mt-10px'>
                <PushPinOutlined/>
            </Button>
            <Button variant="outline-primary" onClick={findPlace} className='mt-10px'>
                <TravelExplore/>
            </Button>
=======
>>>>>>> 1ec3338ddce2e6a5e398b58ea071b815f25afdc8

            {
                openFull ? (
                    <Button variant="outline-primary" onClick={handleOpenFull} className='mt-10px'>
                        <ArrowForwardIos/>
                    </Button>
                ) : (
                    <Button variant="outline-primary" onClick={handleOpenFull} className='mt-10px'>
                        <ArrowBackIosNew/>
                    </Button>
                )
            }
        </div>
    )
}

export default MapToolbar;