import moment from 'moment/moment';
import React from 'react';
import DataTable from 'react-data-table-component';
import { FiTrash, FiEye} from "react-icons/fi"
import {RiMailCloseLine, RiMailCheckLine} from "react-icons/ri"
import { Link } from 'react-router-dom';

const RecipientListTable = ({ data }) => {
    const columns = [
        {
            name: "No.",
            cell: (row, index, column, id) => <div>{index + 1}</div>,
            selector: row => (console.log(row)),
            width: "60px",
            center: true
        },
        {
            name: 'User Name',
            cell: (row) => <div className='text-capitalize'>{row.name}</div>,
            selector: row => (row),
            grow:2
        },
        {
            name: 'Email',
            cell: (row) => <div>{row.email}</div>,
            selector: row => (row),
            grow:2
        },
        {
            name: 'User Type',
            cell: (row) => <div className='text-capitalize'>{row.role}</div>,
            selector: row => (row.role),
        },
        {
            name: 'Assign Site',
            cell: (row) => <div className='text-wrap'>{row.site.name}</div>,
            selector: row => (row.site.name),
            grow:2
        },
        {
            name: 'Date Created',
            cell: (row) => <div className='text-wrap'>{moment(row.createdAt).format("DD/MM/YYYY")}</div>,
            selector: row => (row),
        },
        {
            name: 'Status',
            cell: row => <div>{row.isActive ? <span className="badge text-bg-success">Active</span> : <span className="badge text-bg-danger">Deactivated</span>}</div>,
            selector: row => (row.isActive),
            width: '100px',
            center: true

        },
        {
            name: 'Action',
            cell: row => <div>
                <Link className='btn btn-info me-1'><FiEye title="View" /></Link>
                {(() => {
                    switch (row.isActive) {
                        case true:
                            return <button className='btn btn-warning  me-1' onClick={() => activeDeactiveUser(row._id, row.isActive)}><RiMailCloseLine title="Inactive" /></button>;
                        case false:
                            return <button className='btn btn-success  me-1' onClick={() => activeDeactiveUser(row._id, row.isActive)}><RiMailCheckLine title="Active" /></button>;
                        default:
                            return
                    }
                })
                    ()}
                <button className='btn btn-danger'><FiTrash title="Delete" /></button>
            </div>,
            grow: 2,
            center: 'yes'
        },
    ];
    const activeDeactiveUser = async (userId, isActive) => {

    }
    return (
        <div>
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

export default RecipientListTable;
