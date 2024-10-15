import { useState, useEffect, useRef } from "react";
import { toast } from 'react-toastify';
import axiosInstance from '../../common/AxiosInstance';
import BillCard from "../../components/Cards/BillCard";

function ListBills() {
    const [billType, setBillType] = useState(1);
    const [bills, setBills] = useState([]);
    // Lazy load:
    const [lazyLoad, setLazyLoad] = useState(true);
    const [page, setPage] = useState(1);
    const loader = useRef(null);

    const fetchBillsData = async (type) => {
        try {
            setLazyLoad(true);

            switch (type) {
                case 1:
                    const result = await axiosInstance.get(`/receiving-slips?page=${page}`);
                    if (result.data.payload) {
                        setBills((prevData) => [...prevData, ...result.data.payload]);
                    };
                    break;
                case 2:
                    toast.info('Chưa có loại đơn này!')
                    break;
                default:
                    toast.error('Loại hoá đơn không tồn tại!');
                    break;
            };
        } catch (error) {
            console.log(error);
            toast.error('Đã xảy ra lỗi khi tải hoá đơn!');
        };
    };

    return (
        <>
            List bills { bills.length || 0 }
        </>
    )
}

export default ListBills;