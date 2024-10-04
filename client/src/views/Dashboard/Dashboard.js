import { useState, useEffect, useContext } from 'react';
import axiosInstance from '../../common/AxiosInstance';
import { WarehousesContext } from '../../context/WarehousesContext.js';
import { Container, Row, Col } from 'react-bootstrap';
import MapComponent from "../../components/Map/MapComponent";
import CardComponent from '../../components/CardComponent';
import Loading from '../../components/Loading.js';

function Dashboard() {
    const { listWarehouses, loadWarehousesData, addToListWarehouses } = useContext(WarehousesContext);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        loadWarehousesData();
        setInterval(() => setLoading(false), 1000);
    }, []);

    const getNewestWarehouseJustAdded = async () => {
        const result = (await axiosInstance.get('/warehouses/newest'));
        if (result && result.data) {
            addToListWarehouses(result.data);
        };
    };

    return (
        <Container fluid>
            {
                isLoading ? (
                    <Loading />
                ) : (
                    <>
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
                        <Row>
                            <Col sm={12} xs={12}>
                                <MapComponent
                                    placesData={listWarehouses ? listWarehouses : []}
                                    reloadData={() => getNewestWarehouseJustAdded()}
                                />
                            </Col>
                        </Row>
                    </>
                )
            }
        </Container>
    );
}

export default Dashboard;