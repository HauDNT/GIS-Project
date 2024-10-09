import {
    Button,
    Container,
    Box,
} from '@mui/material';
import { Row, Col } from 'react-bootstrap';

const ImageWrapper = ({ type, imgName, enableSubmit = true }) => {
    const handleFileChange = (event) => {
        const files = event.target.files; // Lấy danh sách tệp chọn
        console.log(files);
    };

    return (
        <Container className='pt-1em px-0'>
            <Col className="avatar-wrapper scale-img-4-3">
                <img
                    src={`http://localhost:4000/${type}/${imgName}`}
                />
            </Col>
            {
                enableSubmit &&

                <Col className="avatar-btn-wrapper mt-1em">
                    <input
                        type="file"
                        id="fileInputPicker"
                        onChange={handleFileChange}
                        accept=".jpg, .jpeg, .png"
                        style={{ display: 'none' }}
                    />
                    <label htmlFor="fileInputPicker">
                        <Button
                            variant="outlined"
                            color="primary"
                            component="span"
                        >Đổi ảnh</Button>
                    </label>
                </Col>
            }
        </Container>
    )
}

export default ImageWrapper;