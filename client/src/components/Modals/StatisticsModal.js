import { useState, useEffect } from "react";
import { Row, Col } from 'react-bootstrap';
import {
    Typography,
    Backdrop,
    Box,
    Modal,
    Fade,
    Divider,
    Button,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import axiosInstance from '../../common/AxiosInstance.js';
import { toast } from 'react-toastify';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '95%',
    height: '95%',
    p: 4,
    border: '.5px solid #ccc',
    borderRadius: '10px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    transform: 'translate(-50%, -50%)',
    overflow: 'hidden',
};

const StatisticsModal = ({
    data,
    isEnable,
    handleClose,
}) => {
    const [states, setStates] = useState({
        show: isEnable,
        startDate: dayjs(new Date()),
        endDate: dayjs(new Date()),
        receiveBillsByRangeDays: [],
        dispatchBillsByRangeDays: [],
    });

    const updateStatesData = (key, value) => {
        setStates(prevData => ({
            ...prevData,
            [key]: value
        }));
    };

    useEffect(() => updateStatesData('show', isEnable), [isEnable]);

    const handleFetchingReceiveBillsByRangeDays = async () => {
        const timeStart = `${states.startDate.format('YYYY-MM-DD')} 0:00:00`;
        const timeEnd = `${states.endDate.format('YYYY-MM-DD')} 23:59:59`;

        try {
            const result = await axiosInstance.get(
                `/receiving-slips/amount-by-range-days-id?id=${data.id}&timeStart=${timeStart}&timeEnd=${timeEnd}`
            );

            if (result.data.payload) {
                updateStatesData('receiveBillsByRangeDays', result.data.payload);
            };
        } catch (error) {
            console.log(error);
            toast.error('Đã xảy ra lỗi khi tải số lượng đơn nhập theo ngày');
        };
    };

    const handleFetchingDispatchBillsByRangeDays = async () => {
        const timeStart = `${states.startDate.format('YYYY-MM-DD')} 0:00:00`;
        const timeEnd = `${states.endDate.format('YYYY-MM-DD')} 23:59:59`;

        try {
            const result = await axiosInstance.get(
                `/dispatch-slips/amount-by-range-days-id?id=${data.id}&timeStart=${timeStart}&timeEnd=${timeEnd}`
            );

            if (result.data.payload) {
                updateStatesData('dispatchBillsByRangeDays', result.data.payload);
            };
        } catch (error) {
            console.log(error);
            toast.error('Đã xảy ra lỗi khi tải số lượng đơn xuất theo ngày');
        };
    };


    const handleFetchingData = async () => {
        await handleFetchingReceiveBillsByRangeDays();
        await handleFetchingDispatchBillsByRangeDays();
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={states.show}
            onClose={() => handleClose()}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={states.show}>
                <Box sx={style}>
                    <Row>
                        <Col md={12} sm={12} className="d-flex justify-content-between align-items-center">
                            <Typography id="transition-modal-title" variant="h5" component="h1">
                                Bảng thống kê - {data.Name}
                            </Typography>
                            <CancelIcon
                                style={{ color: 'red', fontSize: '35px', textAlign: 'center', cursor: 'pointer' }}
                                onClick={handleClose}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Divider className="mt-1em mb-1em" />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3} sm={12} className="statistics-modal--left">
                            <Row className="statistics-modal--control-panel">
                                <Typography className="mb-1em" variant="h6" component="h2">
                                    Bảng điều khiển
                                </Typography>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Col md={12} sm={12}>
                                        <DatePicker
                                            label="Từ ngày (MM/DD/YYYY)"
                                            value={states.startDate}
                                            onChange={(newValue) => updateStatesData('startDate', newValue)}
                                            className="w-100 mb-1em"
                                        />
                                    </Col>
                                    <Col md={12} sm={12}>
                                        <DatePicker
                                            label="Đến ngày (MM/DD/YYYY)"
                                            value={states.endDate}
                                            onChange={(newValue) => updateStatesData('endDate', newValue)}
                                            className="w-100 mb-1em"
                                        />
                                    </Col>
                                    <Col md={12} sm={12}>
                                        <Button 
                                            variant="contained" 
                                            color="primary" 
                                            type="button" 
                                            className="w-100"
                                            onClick={handleFetchingData}
                                        >
                                            Thực hiện
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Divider className="mt-1em mb-1em" />
                                    </Col>
                                </LocalizationProvider>
                            </Row>
                        </Col>
                        <Col md={9} sm={12} className="statistics-modal--right">
                            {'receiveBillsByRangeDays: ' + states.receiveBillsByRangeDays.length}
                            <br/>
                            {'dispatchBillsByRangeDays: ' + states.dispatchBillsByRangeDays.length}
                        </Col>
                    </Row>
                </Box>
            </Fade>
        </Modal>
    );
}

export default StatisticsModal;