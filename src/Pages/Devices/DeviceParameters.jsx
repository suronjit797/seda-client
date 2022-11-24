import React from 'react';
import DataTable from 'react-data-table-component';
import { FiEdit } from "react-icons/fi"
const DeviceParameters = ({data}) => {
    const columns = [
        {
            name: "No.",
            cell: (row, index, column, id) => <div>{index + 1}</div>,
            selector: row => (console.log(row)),
            width: "60px"
        },
        {
            name: 'Name',
            cell:row=><div className='text-capitalize'>{row?._id}</div>,
            selector: row => (row?._id),

        },
        {
            name: 'Count',
            selector: row => (row?.count),
            center: true

        },
        {
            name: 'Action',
            cell: row => <div>
                <button className='btn btn-info me-1'><FiEdit/></button>
            </div>,
            right: 'yes'
        },
    ];
    return (
        <div>
            <h4 className='mb-3'>Available Parameters</h4>
            <DataTable
                columns={columns}
                data={data}
                pagination
                striped
                paginationPerPage={10}
                paginationRowsPerPageOptions={[10, 20, 50]}
            />
        </div>
    );
}

export default DeviceParameters;
