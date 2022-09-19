import axios from 'axios';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { Spinner } from 'react-bootstrap';

const Installers = () => {
    const [installers, setInstallers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [SuccessMessage, setSuccessMessage] = useState();
    const getInstaller = async () => {
        setIsLoading(true)
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/role/installer`, { withCredentials: true })
        if (response) {
            setInstallers(response.data.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1))
            setIsLoading(false)
        }
    }
    useEffect(() => {
        getInstaller()
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
            cell: row => <img src={row.logo} width={80} className="m-2" alt={`${row.name}`}></img>,
            selector: row => row.logo,
            width: '120px'
        },
        {
            name: 'Name',
            selector: row => (row.name),
            width: '200px'
        },
        {
            name: 'Email',
            selector: row => (row.email),
            width: '250px'
        },
        {
            name: 'Phone',
            selector: row => (row.phone),
            width: '250px'
        },
        {
            name: 'Date Created',
            selector: row => (moment(row.createdAt).format("MMMM Do YYYY")),
        },
        {
            name: 'Action',
            cell: row => <>
                <Link to={`/installers`} className='btn btn-warning me-1'>View</Link>
                <Link to={`/installers`} className='btn btn-info me-1'>Edit</Link>
                <button className='btn btn-danger' onClick={()=>deleteUser(row._id)}>Delete</button>
            </>,
        },
    ];
    const deleteUser = async(userId)=>{
        setIsLoading(true)
        const response= await axios.delete(`${process.env.REACT_APP_API_URL}/users/`+userId, { withCredentials: true })
        if(response){
            setSuccessMessage("Installed deleted successfully.")
            getInstaller()
            setTimeout(() => {
                setSuccessMessage()
            }, 2000)
        }
    }
    return (
        <div className='installer'>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <h3 className='mt-2'>Manage Installer</h3>
                        <ul className="list-group mb-3">
                            <li className='list-group-item'><Link to='/installers' className='text-dark text-decoration-none'>All Installer</Link></li>
                            <li className='list-group-item'><Link to='/add-installer' className='text-dark text-decoration-none'>Add New Installer</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-10">
                        <div className="card mt-5 p-3 mb-3">
                            <h3>Installers</h3>
                            <div className='d-flex justify-content-center'>
                                {isLoading && <Spinner animation="border" variant="dark" />}
                            </div>
                            {SuccessMessage && <div className="alert alert-success" role="alert">{SuccessMessage} </div>}
                            <DataTable
                                columns={columns}
                                data={installers}
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

export default Installers;
