import { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useHistory } from "react-router-dom";
import {
    Container,
    Row,
    Col,
} from 'react-bootstrap';
import axiosInstance from '../../common/AxiosInstance';
import DataTable from "../../components/DataTable.js";

function Staffs() {
    const navigate = useNavigate();
    const [staffs, setStaffs] = useState([]);
    const headerNames = ['Mã nhân viên', 'Họ và tên', 'Email', 'Số điện thoại', 'Giới tính', 'Địa chỉ'];

    const fetchAllStaffs = async () => {
        const result = await axiosInstance.get('/staffs/all');

        if (result) {
            result.data.forEach(staff => {
                staff.Gender = staff.Gender ? 'Nam' : 'Nữ';
            });

            setStaffs(result.data);
        };
    };

    const softDeleteStaff = async (warehouseIds) => {
        try {
            warehouseIds.map(id => {
                // axiosInstance.patch(`/staffs/soft-delete/${id}`);
            });
        } catch (error) {
            toast.error('Đã xảy ra lỗi trong quá trình xoá kho. Vui lòng kiểm tra lại.');
        };
    };

    useEffect(() => {
        try {
            fetchAllStaffs();
        } catch (error) {
            toast.error('Đã xảy ra lỗi trong quá trình lấy dữ liệu nhân viên.');
        }
    }, []);

    return (
        <Container fluid>
            <DataTable
                data={staffs}
                columnHeadersName={headerNames}
                pageSize={staffs.length}
                onDelete={softDeleteStaff}
                // onRestore={() => navigate('restore')}
            />
        </Container>
    )
}

export default Staffs;