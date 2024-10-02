import { useEffect, useState } from 'react';
import { DataGrid, GridNoRowsOverlay } from '@mui/x-data-grid';
import { Grid, Paper, Button } from '@mui/material';

const DataTable = ({
    data,
    columnHeadersName = [],
    pageSize,
    onDelete,
    onRestore,
}) => {
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
        <Paper sx={{ height: 400, width: '100%' }}>
            <Grid container sx={{ mb: 2, mt: 1, p: 1 }}>
                <Grid item xs={6} justifyContent="flex-start" >
                    <Button
                        variant="outlined"
                        color="inherit"
                        onClick={() => window.history.back()}
                    >
                        Quay lại
                    </Button>
                </Grid>
                <Grid item xs={6} justifyContent="flex-end" className='d-flex'>
                    <Button
                        variant="outlined"
                        color="info"
                        sx={{ mr: 2 }}
                        onClick={() => onRestore(selectedRows)}
                    >
                        Khôi phục
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => onDelete(selectedRows)}
                        disabled={selectedRows.length === 0}
                    >
                        Xóa ({selectedRows.length})
                    </Button>
                </Grid>
            </Grid>
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
    );
}

export default DataTable;