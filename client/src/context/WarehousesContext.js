import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../common/AxiosInstance";

const WarehousesContext = createContext();

const WarehousesProvider = ({ children }) => {
    const [listWarehouses, setListWarehouses] = useState([]);

    const loadWarehousesData = async () => {
        try {
            const result = await axiosInstance.get('/warehouses/all');
            if (result) {
                setListWarehouses(result.data);
            }
        } catch (error) {
            toast.error("Không thể tải dữ liệu kho.");
        }
    };

    const updateListWarehouses = (newWarehouse) => {
        setListWarehouses(prevData => ([...prevData, newWarehouse]));
    };

    const deleteWarehouse = (warehouseDeletedId) => {
        setListWarehouses(prevData => prevData.filter(warehouse => warehouse.id !== warehouseDeletedId))
    };

    useEffect(() => {
        loadWarehousesData();
    }, []);

    return (
        <WarehousesContext.Provider
            value={{ listWarehouses, updateListWarehouses, deleteWarehouse }}
        >
            { children }
        </WarehousesContext.Provider>
    )
}

export { WarehousesProvider, WarehousesContext };