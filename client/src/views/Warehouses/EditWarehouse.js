import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { Container as BootstrapContainer, Row, Col } from 'react-bootstrap';
import {
    TextField,
    Button,
    Container,
    Typography,
    Avatar,
    Box,
} from '@mui/material';
import Loading from "../../components/Loading.js";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import axiosInstance from "../../common/AxiosInstance";
import { softDeleteStaffs } from "../Staffs/Staffs.js";
import MiniMapComponent from "../../components/Mapbox/MiniMap/MiniMapComponent.js";
import DataTable from "../../components/DataTable.js";

function EditWarehouse() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const headerStaffsTable = ['Mã nhân viên', 'Họ và tên', 'Email', 'Số điện thoại'];

    const fetchWarehouseDetail = async (id) => {
        try {
            const result = await axiosInstance.get(`/warehouses/details/${id}`);

            if (result) {
                setData(result.data);

                const intervalId = setInterval(() => setLoading(false), 1000);
                return () => clearInterval(intervalId);
            };
        } catch (error) {
            console.log(error);
            toast.error(`Đã xảy ra lỗi khi lấy dữ liệu của kho số ${id}`)
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await axiosInstance.put(`/warehouses/update/${id}`, data);

            if (result.status === 200) {
                toast.success('Cập nhật thông tin thành công');
            };
        } catch (error) {
            toast.error('Cập nhật thông tin thất bại! Vui lòng thử lại sau.')
        };
    };

    const updateAddress = (lngLat) => {
        setData(
            prevData => ({
                ...prevData,
                Latitude: lngLat.lat,
                Longitude: lngLat.lng,
            }),
        );
    };

    useEffect(() => {
        fetchWarehouseDetail(id);
    }, []);

    return (
        isLoading ? (
            <Loading />
        ) : (
            <BootstrapContainer fluid className="form mt-1em">
                <Row>
                    <Container>
                        <Col md={12} sm={12}>
                            <Typography variant="h5">
                                Thông tin kho
                            </Typography>
                        </Col>
                    </Container>
                </Row>
                <Row>
                    <Col md={4} sm={12} className="form-avatar">
                        <Container>
                            <Row>
                                <Col className="avatar-wrapper">
                                    <Box
                                        component="img"
                                        src="https://lsx.vn/wp-content/uploads/2022/06/Mau-don-xin-xay-dung-nha-kho-moi-2022-scaled.jpg"
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="avatar-btn-wrapper">
                                    <Button variant="outlined" color="primary" type="submit">Đổi ảnh</Button>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                    <Col md={8} sm={12} className="form-body">
                        <Container>
                            <Row>
                                <Col md={7} className="mb-1em">
                                    <Row>
                                        <MiniMapComponent
                                            lat={data?.Latitude}
                                            lng={data?.Longitude}
                                            zoom={14}
                                            updateLatLngData={(lngLat) => updateAddress(lngLat)}
                                        />
                                    </Row>
                                </Col>
                                <Col md={5}>
                                    <form onSubmit={(e) => handleSubmit(e)}>
                                        <Row>
                                            <Col>
                                                <TextField
                                                    label="Tên kho"
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="normal"
                                                    value={data?.Name}
                                                    onChange={(event) => setData({ ...data, Name: event.target.value })}
                                                    required
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <TextField
                                                    label="Địa chỉ"
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="normal"
                                                    value={data?.Address}
                                                    onChange={(event) => setData({ ...data, Address: event.target.value })}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    required
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <TextField
                                                    label="Tung độ"
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="normal"
                                                    value={data?.Latitude}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    disabled
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <TextField
                                                    label="Hoành độ"
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="normal"
                                                    value={data?.Longitude}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    disabled
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={12} className="text-end">
                                                <Button variant="contained" color="primary" type="submit">
                                                    Cập nhật
                                                </Button>
                                            </Col>
                                        </Row>
                                    </form>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
                <Row>
                    <Col md={12} sm={12}>
                        <Row>
                            <Col md={12} sm={12}>
                                <Typography className="pt-0-5em pb-0-5em" variant="h5" >
                                    Danh sách nhân viên làm việc tại kho
                                </Typography>
                                <DataTable
                                    data={data?.staffs}
                                    columnHeadersName={headerStaffsTable}
                                    pageSize={data.staffs.length}
                                    action={{
                                        type: 'redirect',
                                        field: 'actions',
                                        name: 'Chi tiết',
                                        icon: <SearchOutlinedIcon />,
                                        callback: () => alert('Nothing'),
                                    }}
                                    onBack={false}
                                    onRestore={() => navigate('/staffs/restore')}
                                    onDelete={(staffIds) => {
                                        softDeleteStaffs(staffIds);

                                        setData(prevData => ({
                                            ...prevData,
                                            staffs: prevData.staffs.filter(staff => !staffIds.includes(staff.id)),
                                        }));
                                    }}
                                    disabledHeader={false}
                                    disabledFooter={true}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </BootstrapContainer>
        )
    );
}

export default EditWarehouse;