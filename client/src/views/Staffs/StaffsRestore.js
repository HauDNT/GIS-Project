import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import axiosInstance from '../../common/AxiosInstance.js';
import DataTable from "../../components/DataTable.js";
import { formatDatetime } from "../../utils/FormatDateTime.js";
<<<<<<< HEAD
=======
import Loading from '../../components/Loading.js';
>>>>>>> 1ec3338ddce2e6a5e398b58ea071b815f25afdc8

function RestoreStaffs() {
    const [staffsData, setStaffsData] = useState([]);
    const headerNames = ['Mã nhân viên', 'Họ và tên', 'Email', 'Số điện thoại', 'Giới tính', 'Địa chỉ', 'Thời điểm xoá'];
<<<<<<< HEAD
=======
    const [isLoading, setLoading] = useState(true);
>>>>>>> 1ec3338ddce2e6a5e398b58ea071b815f25afdc8

    const fetchStaffsDeleted = async () => {
        try {
            const result = await axiosInstance.get(`/staffs/deleted`);
<<<<<<< HEAD
            
=======

>>>>>>> 1ec3338ddce2e6a5e398b58ea071b815f25afdc8
            if (result) {
                result.data.forEach(staff => {
                    staff.Gender = staff.Gender ? 'Nam' : 'Nữ';
                    staff.deletedAt = formatDatetime(staff.deletedAt);
                });

                setStaffsData(result.data);
            };
        } catch (error) {
            toast.error('Không thể lấy dữ liệu nhân viên bị xoá!');
        };
    };

    const restoreStaffs = async (staffIds) => {
        try {
            await Promise.all(
                staffIds.map(id => {
                    axiosInstance.patch(`/staffs/restore/${id}`);
                }),
            );

            setStaffsData(prevData => prevData.filter(staff => !staffIds.includes(staff.id)));

            toast.success('Khôi phục thành công');
        } catch (error) {
            console.log(error);
            toast.error('Khôi phục thất bại!');
        };
    };

    useEffect(() => {
        fetchStaffsDeleted();
<<<<<<< HEAD
    }, []);

    return (
        <DataTable
            data={staffsData || []}
            columnHeadersName={headerNames}
            pageSize={staffsData.length}
            onRestore={restoreStaffs}
        />
=======

        const timeoutId = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        isLoading ? (
            <Loading />
        ) : (
            <DataTable
                data={staffsData || []}
                columnHeadersName={headerNames}
                pageSize={staffsData.length}
                onRestore={restoreStaffs}
            />
        )
>>>>>>> 1ec3338ddce2e6a5e398b58ea071b815f25afdc8
    )
}

export default RestoreStaffs;