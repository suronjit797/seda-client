import axios from 'axios';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import SiteUserSidebar from '../../Components/SiteUsers/SiteUserSidebar';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import Swal from "sweetalert2";
import { FiTrash, FiEye, FiEdit, FiHome } from "react-icons/fi"

const SiteUsers = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const getUsers = async () => {
        setIsLoading(true)
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/role/user`, { withCredentials: true })
        if (response) {
            setUsers(response.data.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1))
            setIsLoading(false)
        }
    }
    useEffect(() => {
        document.title="SEDA - All Site Users"
        getUsers()
    }, []);
    const columns = [
        {
            name: "#",
            cell: (row, index, column, id) => <div>{index + 1}</div>,
            selector: row => (console.log(row)),
            width: "40px"
        },
        {
            name: 'Name',
            selector: row => (row.name),
            
        },
        {
            name: 'Email',
            selector: row => (row.email),
           
        },
        {
            name: 'Phone',
            cell: row=><div>+6{row.phone}</div>,
            selector: row => (row.phone),
           
        },
        {
            name: 'Assigned Site',
            cell: row=><div>{row?.site?.name}</div>,
            selector: row => (row.site),
           
        },
        {
            name: 'Date Created',
            selector: row => (moment(row.createdAt).format("DD/MM/YYYY")),
            
        },
        {
            name: 'Action',
            cell: row => <div>
                <Link to={`/site-user/`+ row._id} className='btn btn-success me-1'><FiEye /></Link>
                <Link to={`/site-location/`+ row?.site?._id} className='btn btn-warning me-1'><FiHome/></Link>
                <Link to={`/edit-site-user/`+ row._id} className='btn btn-info me-1'><FiEdit/></Link>
                <button className='btn btn-danger' onClick={()=>deleteUser(row._id)}><FiTrash /></button>
            </div>,
            grow:2,
            center:'yes'
        },
    ];
    const deleteUser = async(userId)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this site user?",
            //icon: "warning",
            dangerMode: true,
            showCancelButton: true,
            confirmButtonText: 'Confirm'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${process.env.REACT_APP_API_URL}/users/`+userId, { withCredentials: true })
                        .then(res => {
                            getUsers()
                            Swal.fire({
                                title: "Done!",
                                text: "Site User Successfully Deleted",
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
                <div className="row my-5 vh60">
                    <div className="col-md-2">
                        <SiteUserSidebar/>
                    </div>
                    <div className="col-md-10">
                        <div className="card p-3 mb-3">
                            <h3>All Site Users</h3>
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

export default SiteUsers;