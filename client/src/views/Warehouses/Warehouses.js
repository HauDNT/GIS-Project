import { useState, useEffect, useContext } from 'react';
import axiosInstance from '../../common/AxiosInstance';
import { WarehousesContext } from '../../context/WarehousesContext.js';
import DataTable from "../../components/DataTable.js";
import { toast } from 'react-toastify';

function Warehouses() {
    const { listWarehouses, deleteWarehouse } = useContext(WarehousesContext);
    const headerNames = ['Mã kho', 'Tên kho', 'Địa chỉ', 'Kinh độ', 'Vĩ độ'];

    const deleteWarehouses = async (warehouseDeletedIds) => {
        const status = true;

        try {
            warehouseDeletedIds.map(id => {
                axiosInstance.patch(`/warehouses/soft-delete/${id}`);
                deleteWarehouse(id);
            });
        } catch (error) {
            status = false;
        }

        if (!status) toast.error('Đã xảy ra lỗi trong quá trình xoá kho. Vui lòng kiểm tra lại.');
    };

    return (
        listWarehouses.length > 0 &&
        <DataTable
            data={listWarehouses}
            columnHeadersName={headerNames}
            pageSize={listWarehouses.length}
            onDelete={deleteWarehouses}
        />
    )
}

export default Warehouses;