import { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useHistory } from "react-router-dom";
import {
    Container,
    Row,
    Col,
} from 'react-bootstrap';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import axiosInstance from '../../common/AxiosInstance';
import { WarehousesContext } from '../../context/WarehousesContext.js';
import DataTable from "../../components/DataTable.js";

function Warehouses() {
    const navigate = useNavigate();
    const { listWarehouses, loadWarehousesData, deleteWarehouse } = useContext(WarehousesContext);
    const headerNames = ['Mã kho', 'Tên kho', 'Địa chỉ', 'Kinh độ', 'Vĩ độ'];

    const softDeleteWarehouses = async (warehouseIds) => {
        try {
            warehouseIds.map(id => {
                axiosInstance.patch(`/warehouses/soft-delete/${id}`);
                deleteWarehouse(id);
            });

            toast.success('Xoá kho thành công');
        } catch (error) {
            toast.error('Đã xảy ra lỗi trong quá trình xoá kho. Vui lòng kiểm tra lại.');
        };
    };

    useEffect(() => {
        if (listWarehouses.length === 0) {
            loadWarehousesData();
        };
    }, []);

    return (
        <Container fluid>
            <DataTable
                data={listWarehouses}
                columnHeadersName={headerNames}
                pageSize={listWarehouses.length}
                onDelete={softDeleteWarehouses}
                onRestore={() => navigate('restore')}
                action={{
                    type: 'redirect',
                    field: 'actions',
                    name: 'Xem chi tiết',
                    icon: <BorderColorIcon/>,
                    callback: (itemValue) => navigate(`/warehouses/${itemValue}`)
                }}
                autoHeight={false}
            />
        </Container>
    )
}

export default Warehouses;