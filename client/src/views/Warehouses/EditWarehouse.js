import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import { Container as BootstrapContainer, Row, Col } from 'react-bootstrap';
import {
    TextField,
    Button,
    Container,
    Typography,
    Avatar,
} from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import axiosInstance from "../../common/AxiosInstance";
import DataTable from "../../components/DataTable.js";

function EditWarehouse() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const headerStaffsTable = ['Mã nhân viên', 'Họ và tên', 'Email', 'Số điện thoại'];

    const fetchWarehouseDetail = async (id) => {
        try {
            const result = await axiosInstance.get(`/warehouses/details/${id}`);

            if (result) {
                setData(result.data);
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

    useEffect(() => {
        fetchWarehouseDetail(id);
    }, []);

    return (
        <BootstrapContainer fluid className="form mt-1em">
            <Row>
                <Col md={4} sm={12} className="form-avatar">
                    <Container>
                        <Row>
                            <Col className="avatar-wrapper">
                                <Avatar
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
                            <Col md={12}>
                                <Typography variant="h5" gutterBottom>
                                    Thông tin kho
                                </Typography>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12} sm={12}>
                                <form onSubmit={(e) => handleSubmit(e)}>
                                    <Row>
                                        <Col md={5} sm={12}>
                                            <TextField
                                                label="Tên kho"
                                                variant="outlined"
                                                fullWidth
                                                margin="normal"
                                                value={data?.Name}
                                                onChange={(event) => setData({...data, Name: event.target.value})}
                                                required
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Col>
                                        <Col md={7} sm={12}>
                                            <TextField
                                                label="Địa chỉ"
                                                variant="outlined"
                                                fullWidth
                                                margin="normal"
                                                value={data?.Address}
                                                onChange={(event) => setData({...data, Address: event.target.value})}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                required
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={5} sm={12}>
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
                                        <Col md={7} sm={12}>
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
                                                Gửi
                                            </Button>
                                        </Col>
                                    </Row>
                                </form>
                            </Col>
                            <Col md={12} sm={12}>
                                <Row>
                                    <Col md={12} sm={12}>
                                        <Typography className="pt-0-5em pb-0-5em" variant="h5" gutterBottom>
                                            Danh sách nhân viên làm việc tại kho
                                        </Typography>
                                        {
                                            data?.staffs?.length > 0 &&
                                            <DataTable
                                                data={data.staffs}
                                                columnHeadersName={headerStaffsTable}
                                                pageSize={data.staffs.length}
                                                action={{
                                                    type: 'redirect',
                                                    field: 'actions',
                                                    name: 'Chi tiết',
                                                    icon: <SearchOutlinedIcon />,
                                                }}
                                                onBack={false}
                                                disabledHeader={false}
                                                disabledFooter={true}
                                            />
                                        }
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </BootstrapContainer>
    );
}

export default EditWarehouse;