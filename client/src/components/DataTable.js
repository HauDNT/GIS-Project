import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const DataTable = ({ data, columnHeadersName = [], pageSize, onDelete }) => {
    const [tableData, setTableData] = useState(data);
    const [selectedRows, setSelectedRows] = useState([]);

    const columns = Object.keys(tableData[0] || {}).map((col, index) => ({
        field: col,
        headerName: columnHeadersName[index] || col.charAt(0).toUpperCase() + col.slice(1),
        flex: 1,
    }));
    const rows = tableData.map((item) => ({ id: item.id, ...item }));

    useEffect(() => {
        setTableData(data);
    }, [data]);

    return (
        // <>
        <Paper sx={{ height: 400, width: '100%' }}>
            <Button
                variant="contained"
                color="error"
                onClick={() => onDelete(selectedRows)}
                disabled={selectedRows.length === 0}
                sx={{ mb: 2 }}
            >
                Xóa ({selectedRows.length})
            </Button>
            <DataGrid
                rows={rows}
                columns={columns}
                pagination
                paginationMode='client'
                onPageChange={() => alert('Change page')}
                autoPageSize={true}
                pageSize={pageSize}
                checkboxSelection
                onRowSelectionModelChange={(newSelection) => {
                    setSelectedRows(newSelection)
                }}
                rowSelectionModel={selectedRows}
                sx={{ border: 0 }}
            />
        </Paper>
        /* <div>
            {
                selectedRows.length > 0 && (
                    selectedRows.map(item => (
                        <div>
                            {item}
                        </div>
                    ))
                )
            }
        </div>
    </> */
    );
}

export default DataTable;