import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import UsersSidebar from '../../Components/Users/UsersSidebar';
import axios from 'axios';
import moment from 'moment';
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const getUsers = async () => {
        setIsLoading(true)
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/users`, { withCredentials: true })
        if (response) {
            setUsers(response.data.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1))
            setIsLoading(false)
        }
    }
    useEffect(() => {
        document.title = "SEDA - Users"
        getUsers()
    }, []);

    const columns = [
        {
            name: "No.",
            cell: (row, index, column, id) => <div>{index + 1}</div>,
            selector: row => (console.log(row)),
            width: "60px"
        },
        {
            name: 'User Name',
            selector: row => (row.name),

        },
        {
            name: 'User Type',
            cell: row => <div className='text-capitalize'>{row.role}</div>,
            selector: row => (row.role),

        },
        {
            name: 'Date Created',
            selector: row => (moment(row.createdAt).format("DD/MM/YYYY")),

        },
        {
            name: 'Last Login',
            cell: row => <div>{row?.lastLogin ? moment(row.lastLogin).format("DD/MM/YYYY hh:mm:ss A") : '-'}</div>,
            selector: row => (row.lastLogin),

        },
        {
            name: 'Status',
            cell: row => <div>{row.isActive ? <span class="badge text-bg-success">Active</span> : <span class="badge text-bg-danger">Deactivated</span>}</div>,
            selector: row => (row.isActive),

        },
        {
            name: 'Action',
            cell: row => <div>
                {(() => {
                    switch (row.role) {
                        case 'installer':
                            return <Link to={`/installer/` + row._id} className='btn btn-info me-1'>View</Link>;
                        case 'admin':
                            return <Link to={`/admin/` + row._id} className='btn btn-info me-1'>View</Link>;
                        case 'user':
                            return <Link to={`/user/` + row._id} className='btn btn-info me-1'>View</Link>;
                        case 'public':
                            return <Link to={`/public/` + row._id} className='btn btn-info me-1'>View</Link>;
                    }
                })
                    ()}
                {(() => {
                    switch (row.isActive) {
                        case true:
                            return <button className='btn btn-warning  me-1' onClick={() => activeDeactiveUser(row._id, row.isActive)}>Deactivate</button>;
                        case false:
                            return <button className='btn btn-success  me-1' onClick={() => activeDeactiveUser(row._id, row.isActive)}>Activate</button>;
                    }
                })
                    ()}
                
                <button className='btn btn-danger' onClick={() => deleteUser(row._id)}>Delete</button>
            </div>,
            grow: 2,
            center: 'yes'
        },
    ];
    const activeDeactiveUser = async (userId, isActive) => {
        const data = {
            isActive: !isActive
        }
        Swal.fire({
            title: "Are you sure?",
            text: "You want to change user status?",
            //icon: "warning",
            dangerMode: true,
            showCancelButton: true,
            confirmButtonText: 'Confirm'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.put(`${process.env.REACT_APP_API_URL}/users/` + userId,data, { withCredentials: true })
                    .then(res => {
                        getUsers()
                        Swal.fire({
                            title: "Done!",
                            text: "User Status Successfully Changed",
                            icon: "success",
                            timer: 2000,
                            button: false
                        })

                    });
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {

            }
        })
    }

    const deleteUser = async (userId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this user?",
            //icon: "warning",
            dangerMode: true,
            showCancelButton: true,
            confirmButtonText: 'Confirm'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${process.env.REACT_APP_API_URL}/users/` + userId, { withCredentials: true })
                    .then(res => {
                        getUsers()
                        Swal.fire({
                            title: "Done!",
                            text: "User Deleted Successfully",
                            icon: "success",
                            timer: 2000,
                            button: false
                        })

                    });
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {

            }
        })
    }
    return (
        <div className='installer'>
            <div className="container-fluid">
                <div className="row my-5">
                    <div className="col-md-2">
                        <UsersSidebar />
                    </div>
                    <div className="col-md-10">
                        <div className="card p-3 mb-3">
                            <div className="row">
                                <div className="col-md-6">
                                    <h3>All Users</h3>
                                </div>
                                <div className="col-md-6 d-flex justify-content-end">
                                    <Link to="/" className='btn btn-secondary'>Back</Link>
                                </div>
                            </div>
                            <div className='d-flex justify-content-center'>
                                {isLoading && <Spinner animation="border" variant="dark" />}
                            </div>
                            <DataTable
                                columns={columns}
                                data={users}
                                pagination
                                striped
                                paginationPerPage={10}
                                paginationRowsPerPageOptions={[10, 20, 50]}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Users;
