import axios from 'axios';
import moment from 'moment';
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { Spinner } from 'react-bootstrap';
import InstallerSidebarNav from '../../Components/Installer/InstallerSidebarNav';
import Swal from "sweetalert2";
import { FiTrash, FiEye, FiEdit } from "react-icons/fi"
import { useSelector } from 'react-redux';
import { ThemeContext } from '../../App.js'

const Installers = () => {
    let { isDark } = useContext(ThemeContext)

    const userDetails = useSelector((state) => state.user.userDetails);
    const [installers, setInstallers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const getInstaller = async () => {
        setIsLoading(true)
        if (userDetails.role === "superAdmin") {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/role/installer`, { withCredentials: true })
            if (response) {
                setInstallers(response.data.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1))
                setIsLoading(false)
            }
        } else {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/me/installer`, { withCredentials: true })
            if (response) {
                setInstallers(response.data.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1))
                setIsLoading(false)
            }
        }
    }
    useEffect(() => {
        document.title = "SEDA - Installers"
        getInstaller()
        // eslint-disable-next-line
    }, []);
    const columns = [
        {
            name: "#",
            cell: (row, index, column, id) => <div>{index + 1}</div>,
            selector: row => (console.log(row)),
            width: "40px"
        },
        {
            name: 'Logo',
            cell: row => row.logo && <img src={row.logo} width={80} height={80} className="my-2" alt={`${row.name}`} />,
            selector: row => row.logo,

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
            cell: row => <div>+6{row.phone}</div>,
            selector: row => (row.phone),

        },
        {
            name: 'Date Created',
            selector: row => (moment(row.createdAt).format("DD/MM/YYYY")),

        },
        {
            name: 'Action',
            cell: row => <div>
                {(() => {
                    switch (userDetails.role) {
                        case 'superAdmin':
                            return (
                                <div className="actions">
                                    <Link to={`/installer/` + row._id} className='btn btn-success me-1'><FiEye title="View Profile" /></Link>
                                    <Link to={`/edit-installer/` + row._id} className='btn btn-info me-1'><FiEdit title="Edit Profile" /></Link>
                                    <button className='btn btn-danger' onClick={() => deleteUser(row._id)}><FiTrash title="Delete" /></button>
                                </div>
                            )
                        case 'admin':
                            return (
                                <div className="actions">
                                    <Link to={`/installer/` + row._id} className='btn btn-success me-1'><FiEye title="View Profile" /></Link>
                                </div>
                            )
                        default:
                            return
                    }
                })
                    ()}

            </div>,
            grow: 2,
            center: 'yes'
        },
    ];
    const deleteUser = async (userId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this installer?",
            //icon: "warning",
            dangerMode: true,
            showCancelButton: true,
            confirmButtonText: 'Confirm'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${process.env.REACT_APP_API_URL}/users/` + userId, { withCredentials: true })
                    .then(res => {
                        getInstaller()
                        Swal.fire({
                            title: "Done!",
                            text: "Installer Successfully Deleted",
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
                        <InstallerSidebarNav />
                    </div>
                    <div className="col-md-10">
                        <div className="card p-3 mb-3">
                            <h3>All Installers</h3>
                            <div className='d-flex justify-content-center'>
                                {isLoading && <Spinner animation="border" variant="dark" />}
                            </div>
                            <DataTable
                                columns={columns}
                                data={installers}
                                pagination
                                striped={!isDark}
                                theme={isDark ? 'dark' : 'light '}
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

export default Installers;
