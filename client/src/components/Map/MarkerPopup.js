import {
    Container,
    Col,
    Row,
    Button,
    DropdownDivider
} from 'react-bootstrap';
import { Timer, Close } from '@mui/icons-material';

const MarkerPopup = ({ data, onClose }) => {
    return (
        <Container className='p-0'>
            <Row className='popup-header'>
                <Col md={9}>
                    <h6>{data.Name}</h6>
                </Col>
                <Col md={3}>
                    <Button onClick={onClose} className='popup-close-btn'>
                        <Close />
                    </Button>
                </Col>
            </Row>
            <DropdownDivider className='p-0' />
            <Row className='popup-content'>
                <Col md={12}>
                    <p>Địa chỉ: {data.Address}</p>
                </Col>
                <Col md={12}>
                    <p>Kinh độ: {data.Latitude}</p>
                </Col>
                <Col md={12}>
                    <p>Vĩ độ: {data.Longitude}</p>
                </Col>
            </Row>

        </Container>
    );
};

export default MarkerPopup;