import { useState, useEffect } from "react";
import { useNavigate, useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import { Container } from 'react-bootstrap';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import axiosInstance from '../../common/AxiosInstance.js';
import DataTable from "../../components/DataTable.js";
import AddCustomerModal from "./AddCustomerModal.js";
import Loading from '../../components/Loading.js';

function Customers() {
    const [customers, setCustomers] = useState([]);
    const [enableAddModal, setEnableAddModal] = useState(false);
    const headerNames = ['Mã khách hàng', 'Họ và tên', 'Email', 'Số điện thoại', 'Giới tính', 'Địa chỉ'];
    const [isLoading, setLoading] = useState(true);

    const fetchCustomers = async () => {
        const result = await axiosInstance.get('/customers/all');

        if (result.data) {
            result.data.payload.forEach(customer => {
                customer.Gender = customer.Gender ? 'Nam' : 'Nữ';
            });
            
            setCustomers(result.data.payload);
        };
    };

    useEffect(() => {
        try {
            fetchCustomers();

            const intervalId = setInterval(() => setLoading(false), 1000);
            return () => clearInterval(intervalId);
        } catch (error) {
            console.log(error);
            toast.error('Xảy ra lỗi trong quá trình tải dữ liệu khách hàng!');
        };
    }, []);

    return (
        <Container>
            {
                isLoading ? (
                    <Loading />
                ) : (
                    <>
                        <DataTable
                            data={customers || []}
                            columnHeadersName={headerNames}
                            pageSize={customers.length}
                            onCreate={() => setEnableAddModal(true)}
                            onDelete={() => { }}
                            onRestore={() => { }}
                            action={{
                                type: 'redirect',
                                field: 'actions',
                                name: 'Xem chi tiết',
                                icon: <BorderColorIcon />,
                                callback: (itemValue) => console.log(`/staffs/${itemValue}`)
                            }}
                            autoHeight={false}
                        />
                        <AddCustomerModal
                            isEnable={enableAddModal}
                            handleClose={() => setEnableAddModal(false)}
                            afterAdd={(newCustomer) => setCustomers((prevCustomers) => [...prevCustomers, newCustomer])}
                        />
                    </>
                )
            }
        </Container>
    )
}

export default Customers;