import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Grid, Paper, Button, Box } from '@mui/material';

const DataTable = ({
    data,
    pageSize,
    columnHeadersName = [],
    autoHeight = true,
    action,   // { type: redirect | update | delete, icon, callback }
    disabledHeader = false,
    disabledFooter = false,
    onBack = !disabledHeader,
    onDelete = !disabledHeader,
    onRestore = !disabledHeader,
}) => {
    const [tableData, setTableData] = useState(data);
    const [selectedRows, setSelectedRows] = useState([]);

    const columns = Object.keys(tableData[0] || {}).map((col, index) => ({
        field: col,
        headerName: columnHeadersName[index] || col.charAt(0).toUpperCase() + col.slice(1),
        flex: 1,
    }));

    if (action) {
        columns.push({
            field: action.field,
            headerName: action.name,
            renderCell: (params) => (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%'
                    }}
                >
                    <Button
                        variant="contained"
                        color={action.type === 'delete' ? 'error' : 'primary'}
                        onClick={(event) => {
                            event.stopPropagation();
                            action.callback(params.row.id);
                        }}
                    >
                        {action.icon}
                    </Button>
                </Box>
            )
        });
    };

    const rows = tableData.map((item) => ({ id: item.id, ...item }));

    useEffect(() => {
        setTableData(data);
    }, [data.length]);

    return (
        <Paper sx={[{ width: '100%' }, !autoHeight && { height: 400 }]}>
            {
                !disabledHeader &&
                <Grid container sx={{ mb: 2, mt: 1, p: 1 }}>
                    {
                        onBack &&
                        <Grid item xs={6} justifyContent="flex-start" >
                            <Button
                                variant="outlined"
                                color="inherit"
                                onClick={() => window.history.back()}
                            >
                                Quay lại
                            </Button>
                        </Grid>
                    }
                    <Grid item xs={ onBack ? 6 : 12 } justifyContent="flex-end" className='d-flex'>
                        {
                            onRestore &&
                            <Button
                                variant="outlined"
                                color="info"
                                sx={{ mr: 2 }}
                                onClick={() => onRestore(selectedRows)}
                            >
                                Khôi phục
                            </Button>
                        }
                        {
                            onDelete && 
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => onDelete(selectedRows)}
                                disabled={selectedRows.length === 0}
                            >
                                Xóa ({selectedRows.length})
                            </Button>
                        }
                    </Grid>
                </Grid>
            }
            <DataGrid
                rows={rows}
                columns={columns}
                pagination
                paginationMode='client'
                onPageChange={() => alert('Change page')}
                autoPageSize={true}
                autoHeight={autoHeight}
                pageSize={pageSize}
                checkboxSelection
                onRowSelectionModelChange={(newSelection) => {
                    setSelectedRows(newSelection)
                }}
                hideFooter={disabledFooter}
                rowSelectionModel={selectedRows}
                sx={{ border: 0 }}
                className='mb-1-5-em'
            />
        </Paper>
    );
}

export default DataTable;