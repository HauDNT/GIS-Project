import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axiosInstance from "../../common/AxiosInstance";
import { toast } from "react-toastify";

function EditWarehouse() {
    const { id } = useParams();
    const [data, setData] = useState(null);

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

    useEffect(() => {
        fetchWarehouseDetail(id);
    }, []);

    return (
        <div>
            Edit warehouse {id}
        </div>
    );
}

export default EditWarehouse;