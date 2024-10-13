import { useState, useEffect, useContext } from "react";
import {
    Container,
    Row,
    Col,
} from 'react-bootstrap';
import { Autocomplete, TextField, Typography, Box, Divider, Button } from '@mui/material';
import { SERVER_URL } from '../../config/config';
import { WarehousesContext } from '../../context/WarehousesContext';
import axiosInstance from '../../common/AxiosInstance';
import { toast } from 'react-toastify';

// import DynamicDataTable from "../../components/DynamicDataTable";
import DynamicTable from "../../components/DynamicTable";

function AddBillPage() {
    const [states, setStates] = useState({
        staffs: [],
        customers: [],
        riceplants: [],
        staffSelectedId: null,
        customerSelectedId: null,
        warehouseSelectedId: null,
        receiDispatchInfo: {
            id: 0,
            Name: '',
            Amount: 0,
            UnitPrice: 0,
        },
        tableData: [],
    });
    const { listWarehouses, loadWarehousesData } = useContext(WarehousesContext);

    const updateStatesData = (key, value) => {
        setStates(prevData => ({
            ...prevData,
            [key]: value
        }));
    };

    const updateStateNestFieldChildData = (field, callback) => {
        setStates(prevStates => ({
            ...prevStates,
            [field]: {
                ...prevStates[field],
                ...callback(prevStates[field]),
            },
        }));
    };

    const fetchCustomers = async () => {
        try {
            const result = await axiosInstance.get('/customers/all');
            if (result.data.payload) {
                updateStatesData('customers', result.data.payload);
            };
        } catch (error) {
            console.log(error);
            toast.error('Xảy ra lỗi khi lấy dữ liệu khách hàng!');
        };
    };

    const fetchStaffs = async () => {
        try {
            const result = await axiosInstance.get('/staffs/all');
            if (result.data.payload) {
                updateStatesData('staffs', result.data.payload);
            };
        } catch (error) {
            console.log(error);
            toast.error('Xảy ra lỗi khi lấy dữ liệu nhân viên!');
        };
    };

    const fetchRiceplants = async () => {
        try {
            const result = await axiosInstance.get('/riceplants/all');
            if (result.data.payload) {
                updateStatesData('riceplants', result.data.payload);
            };
        } catch (error) {
            console.log(error);
            toast.error('Xảy ra lỗi khi lấy dữ liệu lúa!');
        };
    };

    const resetStates = () => {
        updateStatesData("staffSelectedId", null);
        updateStatesData("customerSelectedId", null);
        updateStatesData("warehouseSelectedId", null);
        updateStatesData("receiDispatchInfo", {
            id: 0,
            Name: '',
            Amount: 0,
            UnitPrice: 0,
        });
    };

    const addBillDataToTableData = (newData) => {
        if (newData.id === 0 || !newData.Name || newData.Amount <= 0 || newData.UnitPrice <= 0) {
            toast.warning('Thông tin nhập - xuất không hợp lệ!');
            return;
        };

        updateStatesData("tableData", [...states.tableData, newData]);
        updateStatesData("receiDispatchInfo", {
            id: 0,
            Name: '',
            Amount: 0,
            UnitPrice: 0,
        });
    };

    useEffect(() => {
        fetchCustomers();
        fetchStaffs();
        fetchRiceplants();

        if (listWarehouses.length == 0) loadWarehousesData();
    }, []);

    return (
        <Container fluid>
            <Row>
                <Col>
                    <Typography gutterBottom variant="h5" component="div" className="heading-page">
                        Thêm hoá đơn mới
                    </Typography>
                </Col>
            </Row>
            <div className="bill-container">
                <Row>
                    <Typography gutterBottom variant="body1" component="div" className="bill-subheading">
                        Thông tin khách hàng
                    </Typography>
                    <Col md={4} sm={12} className="pt-1em">
                        <Autocomplete
                            id="customer-select"
                            options={states.customers}
                            autoHighlight
                            getOptionLabel={(option) => option.Fullname}
                            clearIcon={false}
                            onChange={(e, newValue) => updateStatesData('customerSelectedId', newValue.id)}
                            renderOption={(props, option) => {
                                const { key, ...optionProps } = props;
                                return (
                                    <Box
                                        key={key}
                                        component="li"
                                        sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                                        {...optionProps}
                                    >
                                        {option.Fullname}
                                    </Box>
                                );
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Chọn khách hàng"
                                    slotProps={{
                                        htmlInput: {
                                            ...params.inputProps,
                                            autoComplete: 'new-password',
                                        },
                                    }}
                                />
                            )}
                        />
                    </Col>
                    <Col md={4} sm={12} className="pt-1em">
                        <Autocomplete
                            id="warehouse-select"
                            options={listWarehouses}
                            autoHighlight
                            getOptionLabel={(option) => option.Name}
                            clearIcon={false}
                            onChange={(e, newValue) => { updateStatesData('warehouseSelectedId', newValue.id) }}
                            renderOption={(props, option) => {
                                const { key, ...optionProps } = props;
                                return (
                                    <Box
                                        key={key}
                                        component="li"
                                        sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                                        {...optionProps}
                                    >
                                        <img
                                            loading="lazy"
                                            width="80"
                                            srcSet={`${SERVER_URL}/warehouses/${option.imageUrl}`}
                                            src={`${SERVER_URL}/warehouses/${option.imageUrl}`}
                                            alt=""
                                        />
                                        {option.Name}
                                    </Box>
                                );
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Chọn kho"
                                    slotProps={{
                                        htmlInput: {
                                            ...params.inputProps,
                                            autoComplete: 'new-password',
                                        },
                                    }}
                                />
                            )}
                        />
                    </Col>
                    <Col md={4} sm={12} className="pt-1em">
                        <Autocomplete
                            id="staff-select"
                            options={states.staffs}
                            autoHighlight
                            getOptionLabel={(option) => option.Fullname}
                            clearIcon={false}
                            onChange={(e, newValue) => { updateStatesData('staffSelectedId', newValue.id) }}
                            renderOption={(props, option) => {
                                const { key, ...optionProps } = props;
                                return (
                                    <Box
                                        key={key}
                                        component="li"
                                        sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                                        {...optionProps}
                                    >
                                        <img
                                            loading="lazy"
                                            width="80"
                                            srcSet={`${SERVER_URL}/staffs/${option.imageUrl}`}
                                            src={`${SERVER_URL}/staffs/${option.imageUrl}`}
                                            alt=""
                                        />
                                        {option.Fullname}
                                    </Box>
                                );
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Chọn nhân viên"
                                    slotProps={{
                                        htmlInput: {
                                            ...params.inputProps,
                                            autoComplete: 'new-password',
                                        },
                                    }}
                                />
                            )}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Divider sx={{ mt: 3, mb: 1 }} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Typography gutterBottom variant="body1" component="div" className="bill-subheading">
                            Thông tin nhập - xuất
                        </Typography>
                    </Col>
                </Row>
                <Row>
                    <Col md={3} sm={12} className="pt-1em">
                        <Autocomplete
                            id="rice-select"
                            options={states.riceplants}
                            autoHighlight
                            getOptionLabel={(option) => option.Name}
                            clearIcon={false}
                            onChange={(e, newValue) => {
                                updateStateNestFieldChildData(
                                    "receiDispatchInfo",
                                    () => ({
                                        id: newValue.id,
                                        Name: newValue.Name,
                                    })
                                );
                            }}
                            renderOption={(props, option) => {
                                const { key, ...optionProps } = props;
                                return (
                                    <Box
                                        key={key}
                                        component="li"
                                        ssx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                                        {...optionProps}
                                    >
                                        <img
                                            loading="lazy"
                                            width="80"
                                            // srcSet={`${SERVER_URL}/riceplants/${option.imageUrl}`}
                                            // src={`${SERVER_URL}/riceplants/${option.imageUrl}`}
                                            srcSet={`${option.imageUrl}`}
                                            src={`${option.imageUrl}`}
                                            alt=""
                                        />
                                        {option.Name}
                                    </Box>
                                );
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Chọn loại lúa"
                                    slotProps={{
                                        htmlInput: {
                                            ...params.inputProps,
                                            autoComplete: 'new-password',
                                        },
                                    }}
                                />
                            )}
                        />
                    </Col>
                    <Col md={2} sm={12} className="pt-1em">
                        <TextField
                            label="Số lượng"
                            sx={{ width: '100%' }}
                            type="number"
                            value={states.receiDispatchInfo.Amount}
                            onChange={(e) => updateStateNestFieldChildData(
                                "receiDispatchInfo",
                                () => ({ Amount: e.target.value })
                            )}
                        />
                    </Col>
                    <Col md={2} sm={12} className="pt-1em">
                        <TextField
                            label="Đơn giá"
                            sx={{ width: '100%' }}
                            type="number"
                            value={states.receiDispatchInfo.UnitPrice}
                            onChange={(e) => updateStateNestFieldChildData(
                                "receiDispatchInfo",
                                () => ({ UnitPrice: e.target.value })
                            )}
                        />
                    </Col>
                    <Col md={3} sm={12} className="pt-1em">
                        <TextField
                            label="Thành tiền"
                            sx={{ width: '100%' }}
                            type="number"
                            disabled
                            value={states.receiDispatchInfo.UnitPrice * states.receiDispatchInfo.Amount}
                        />
                    </Col>
                    <Col md={2} sm={12} className="pt-1em">
                        <Button
                            variant="contained"
                            color="success"
                            type="button"
                            sx={{ width: '100%', height: '100%', borderRadius: '100px' }}
                            onClick={() => addBillDataToTableData(states.receiDispatchInfo)}
                        >
                            <Typography gutterBottom variant="body1" component="div" className="bill-subheading" sx={{ textAlign: 'center' }}>
                                Thêm
                            </Typography>
                        </Button>
                    </Col>
                </Row>
                <Row className="mt-1em mb-1-5em">
                    <Col>
                        <DynamicTable
                            headers={['STT', 'Loại lúa', 'Số lượng', 'Đơn giá', 'Thành tiền']}
                            data={states.tableData}
                        />
                    </Col>
                </Row>
                <Row className="mt-1em mb-1-5em flex-row-reverse">
                    <Col md={2} sm={12}>
                        <Button
                            variant="contained"
                            color="info"
                            type="button"
                            sx={{ width: '100%', height: '100%', borderRadius: '100px' }}
                        // onClick={() => addBillDataToTableData(states.receiDispatchInfo)}
                        >
                            Tạo hoá đơn
                        </Button>
                    </Col>
                </Row>
            </div>
        </Container>
    );
}

export default AddBillPage;