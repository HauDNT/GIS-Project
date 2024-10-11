import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { Container } from 'react-bootstrap';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import axiosInstance from '../../common/AxiosInstance';
import DataTable from "../../components/DataTable.js";
import AddStaffModal from './AddStaffModal.js';
import Loading from '../../components/Loading.js';

const softDeleteStaffs = async (staffIds) => {
    try {
        await Promise.all(
            staffIds.map(id => {
                axiosInstance.patch(`/staffs/soft-delete/${id}`);
            }),
        );

        toast.success('Xoá nhân viên thành công');
    } catch (error) {
        toast.error('Đã xảy ra lỗi trong quá trình xoá nhân viên. Vui lòng kiểm tra lại.');
    };
};

function Staffs() {
    const navigate = useNavigate();
    const [staffs, setStaffs] = useState([]);
    const [enableAddModal, setEnableAddModal] = useState(false);
    const headerNames = ['Mã nhân viên', 'Họ và tên', 'Email', 'Số điện thoại', 'Giới tính', 'Địa chỉ'];
    const [isLoading, setLoading] = useState(true);

    const fetchAllStaffs = async () => {
        const result = await axiosInstance.get('/staffs/all');

        if (result.data) {
            setStaffs(result.data);
        };
    };

    useEffect(() => {
        try {
            fetchAllStaffs();

            const intervalId = setInterval(() => setLoading(false), 1000);
            return () => clearInterval(intervalId);
        } catch (error) {
            toast.error('Đã xảy ra lỗi trong quá trình lấy dữ liệu nhân viên.');
        }
    }, []);

    return (
        <Container fluid>
            {
                isLoading ? (
                    <Loading />
                ) : (
                    <>
                        <DataTable
                            data={staffs || []}
                            columnHeadersName={headerNames}
                            pageSize={staffs.length}
                            onCreate={() => {
                                setEnableAddModal(true);
                            }}
                            onDelete={(staffIds) => {
                                softDeleteStaffs(staffIds);
                                setStaffs(prevData => prevData.filter(staff => !staffIds.includes(staff.id)));
                            }}
                            onRestore={() => navigate('/staffs/restore')}
                            action={{
                                type: 'redirect',
                                field: 'actions',
                                name: 'Xem chi tiết',
                                icon: <BorderColorIcon />,
                                callback: (itemValue) => navigate(`/staffs/${itemValue}`)
                            }}
                            autoHeight={false}
                        />
                        <AddStaffModal
                            isEnable={enableAddModal}
                            handleClose={() => setEnableAddModal(false)}
                        />
                    </>
                )
            }
        </Container>
    )
};

export { softDeleteStaffs };
export default Staffs;