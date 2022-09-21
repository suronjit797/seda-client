import axios from 'axios';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { Spinner } from 'react-bootstrap';
import InstallerSidebarNav from '../../Components/Installer/InstallerSidebarNav';

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
            cell: row => <img src={row.logo} width={80} className="my-2" alt={`${row.name}`}></img>,
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
            selector: row => (row.phone),
           
        },
        {
            name: 'Date Created',
            selector: row => (moment(row.createdAt).format("MMMM Do YYYY")),
            
        },
        {
            name: 'Action',
            cell: row => <div>
                <Link to={`/installer/`+ row._id} className='btn btn-warning me-1'>View</Link>
                <Link to={`/edit-installer/`+ row._id} className='btn btn-info me-1'>Edit</Link>
                <button className='btn btn-danger' onClick={()=>deleteUser(row._id)}>Delete</button>
            </div>,
            grow:2,
            center:'yes'
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
                <div className="row my-5">
                    <div className="col-md-2">
                        <InstallerSidebarNav/>
                    </div>
                    <div className="col-md-10">
                        <div className="card p-3 mb-3">
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
