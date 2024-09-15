import { useState, useEffect } from 'react';
import axiosInstance from '../../common/AxiosInstance';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MapComponent from "../../components/Map/MapComponent";
import CardComponent from '../../components/CardComponent';

function Dashboard() {
    const [warehouses, setWarehouse] = useState([]);

    const fetchWarehousesData = async () => {
        const result = (await axiosInstance.get('/warehouses/all'));
        if (result && result.data) {
            setWarehouse(result.data);
        };
    };

    useEffect(() => {
        fetchWarehousesData()
    }, []);

    return (
        <Container fluid>
            <Row>
                <Col sm={5} xs={12}>
                    <Row>
                        <Col className='pt-1-5em'>
                            <CardComponent />
                        </Col>
                        <Col className='pt-1-5em'>
                            <CardComponent />
                        </Col>
                    </Row>
                    <Row>
                        <Col className='pt-1-5em'>
                            <CardComponent />
                        </Col>
                        <Col className='pt-1-5em'>
                            <CardComponent />
                        </Col>
                    </Row>
                </Col>
                <Col sm={7} xs={12}>
                    <div className="wrapper mt-1-5em">
                        <img
                            src="https://www.chartjs.org/docs/latest/assets/img/usage-2.9f9eb8e8.png"
                            alt=""
                            style={{ width: "100%", height: "100%" }}
                        />
                    </div>
                </Col>
            </Row>
            {
                warehouses && (
                    <Row>
                        <Col sm={12} xs={12}>
                            <MapComponent placesData={warehouses}/>
                        </Col>
                    </Row>
                )
            }
        </Container>
    )
}

export default Dashboard;