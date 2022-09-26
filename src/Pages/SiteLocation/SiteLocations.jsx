import axios from 'axios';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import AdminSidebarNav from '../../Components/Admins/AdminSidebarNav';

const SiteLocations = () => {
    const [siteLocations, setSiteLocations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [SuccessMessage, setSuccessMessage] = useState();
    const getSiteLocations = async () => {
        setIsLoading(true)
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/site-location`, { withCredentials: true })
        if (response) {
            setSiteLocations(response.data.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1))
            setIsLoading(false)
        }
    }
    useEffect(() => {
        getSiteLocations()
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
            name: 'Building Name',
            selector: row => (row.buildingName),
            
        },
        {
            name: 'Contact Person',
            selector: row => (row.contactPersonName),
           
        },
        {
            name: 'Phone',
            cell: row => <>+6{row.contactPersonPhone}</>,
            selector: row => (row.contactPersonPhone),
            width:"130px"
           
        },
        {
            name: 'Installer',
            cell: row => <>{row?.installer?.name}</>,
            selector: row => (row.installer),
           
        },
        {
            name: 'Date Created',
            selector: row => (moment(row.createdAt).format("DD/MM/YYYY")),
            width:"120px"
        },
        {
            name: 'Action',
            cell: row => <div>
                <Link to={`/site-location/`+ row._id} className='btn btn-success me-1'>View</Link>
                <Link to={`/edit-site-location/`+ row._id} className='btn btn-info me-1'>Edit</Link>
                <button className='btn btn-warning me-1'>Documents</button>
                <button className='btn btn-danger' onClick={()=>deleteSiteLocation(row._id)}>Delete</button>
            </div>,
            grow:2,
            center:'yes'
        },
    ];
    const deleteSiteLocation =async(siteLocationId)=>{
        setIsLoading(true)
        const response= await axios.delete(`${process.env.REACT_APP_API_URL}/site-location/`+siteLocationId, { withCredentials: true })
        if(response){
            setSuccessMessage("Site location has been deleted successfully.")
            getSiteLocations()
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
                            <h3>Site Locations</h3>
                            <div className='d-flex justify-content-center'>
                                {isLoading && <Spinner animation="border" variant="dark" />}
                            </div>
                            {SuccessMessage && <div className="alert alert-success" role="alert">{SuccessMessage} </div>}
                            <DataTable
                                columns={columns}
                                data={siteLocations}
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

export default SiteLocations;
