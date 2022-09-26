import axios from 'axios';
import moment from 'moment';
import React, {useState, useEffect} from 'react';
import { Spinner } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import AdminSidebarNav from '../../Components/Admins/AdminSidebarNav';

const Admins = () => {
    const [admins, setAdmins] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [SuccessMessage, setSuccessMessage] = useState();
    const getAdmins = async () => {
        setIsLoading(true)
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/role/admin`, { withCredentials: true })
        if (response) {
            setAdmins(response.data.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1))
            setIsLoading(false)
        }
    }
    useEffect(() => {
        getAdmins()
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
            cell:(row)=><div><img src={row.avatar} width={40} height={40} className="my-2 rounded-circle" alt={`${row.name}`}/>  {row.name}</div>,
            selector: row => (row),
            
        },
        {
            name: 'Company',
            selector: row => (row.companyName),
            
        },
        {
            name: 'Email',
            selector: row => (row.email),
            width:"230px"
           
        },
        {
            name: 'Phone',
            cell: row => <>+6{row.phone}</>,
            selector: row => (row.phone),
           
        },
        {
            name: 'Date Created',
            selector: row => (moment(row.createdAt).format("DD/MM/YYYY")),
            
        },
        {
            name: 'Action',
            cell: row => <div>
                <Link to={`/admin/`+ row._id} className='btn btn-success me-1'>View</Link>
                <Link to={`/edit-admin/`+ row._id} className='btn btn-info me-1'>Edit</Link>
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
            getAdmins()
            setTimeout(() => {
                setSuccessMessage()
            }, 2000)
        }
    }

    return (
        <div className='site-admins'>
            <div className="container-fluid">
                <div className="row my-5">
                    <div className="col-md-2">
                        <AdminSidebarNav />
                    </div>
                    <div className="col-md-10">
                        <div className="card p-3 mb-3">
                            <h3>Admins</h3>
                            <div className='d-flex justify-content-center'>
                                {isLoading && <Spinner animation="border" variant="dark" />}
                            </div>
                            {SuccessMessage && <div className="alert alert-success" role="alert">{SuccessMessage} </div>}
                            <DataTable
                                columns={columns}
                                data={admins}
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

export default Admins;
