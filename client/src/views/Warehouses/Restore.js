import React, { useState, useEffect, useContext } from "react";
import { toast } from 'react-toastify';
import axiosInstance from '../../common/AxiosInstance';
import DataTable from "../../components/DataTable.js";
import { WarehousesContext } from '../../context/WarehousesContext.js';

function WarehousesRestore() {
    const [warehousesDeleted, setWarehousesDeleted] = useState([]);
    const { loadWarehousesData } = useContext(WarehousesContext);
    const headerNames = ['Mã kho', 'Tên kho', 'Địa chỉ', 'Kinh độ', 'Vĩ độ', 'Thời điểm xoá'];

    const fetchWarehousesDeletedData = async () => {
        try {
            const result = await axiosInstance.get('/warehouses/deleted');

            if (result) {
                setWarehousesDeleted(result.data);
            };
        } catch (error) {
            toast.error('Lấy dữ liệu các kho bị xoá thất bại!');
        };
    };

    const forceDeletedWarehouses = async () => {

    };

    const restoreWarehouses = async (warehouseIds) => {
        try {
            // Khôi phục kho
            await Promise.all(
                warehouseIds.map(id => axiosInstance.patch(`/warehouses/restore/${id}`))
            );

            // Cập nhật state để loại bỏ các kho vừa khôi phục
            setWarehousesDeleted(prevData =>
                prevData.filter(item => !warehouseIds.includes(item.id))
            );

            // Tải lại dữ liệu kho
            await loadWarehousesData();
        } catch (error) {
            console.error("Error loading warehouses data: ", error);
            toast.error('Đã xảy ra lỗi trong quá trình khôi phục kho. Vui lòng kiểm tra lại.');
        }
    };

    useEffect(() => {
        fetchWarehousesDeletedData();
    }, []);

    return (
        <DataTable
            data={warehousesDeleted}
            columnHeadersName={headerNames}
            pageSize={warehousesDeleted.length}
            onDelete={forceDeletedWarehouses}
            onRestore={restoreWarehouses}
        />
    );
}

export default WarehousesRestore;