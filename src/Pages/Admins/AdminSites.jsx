import axios from 'axios';
import moment from 'moment';
import React, { useState, useEffect, useContext } from 'react';
import { Spinner } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { Link, useParams } from 'react-router-dom';
import AdminSidebarNav from '../../Components/Admins/AdminSidebarNav';
import Swal from "sweetalert2";
import { FiTrash, FiEye, FiEdit, FiPaperclip } from "react-icons/fi"
import { ThemeContext } from '../../App.js'

const AdminSites = () => {
    let { isDark } = useContext(ThemeContext)

    const Params = useParams()
    const adminId = Params.adminId
    const [siteLocations, setSiteLocations] = useState([]);
    const [adminDetails, setAdminDetails] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const getSiteLocations = async () => {
        setIsLoading(true)
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/site-location/admin-sites/` + adminId, { withCredentials: true })
        if (response) {
            setSiteLocations(response.data.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1))
            setIsLoading(false)
        }
    }

    const getAdmin = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/` + adminId, { withCredentials: true })
        if (response) {
            console.log(response.data)
            setAdminDetails(response.data)
        }
    }

    useEffect(() => {
        document.title = "SEDA - All Site Locations"
        getAdmin()
        getSiteLocations()
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

        },
        {
            name: 'Installer',
            cell: row => <>{row?.installer?.name}</>,
            selector: row => (row.installer),
        },
        {
            name: 'Date Created',
            selector: row => (moment(row.createdAt).format("DD/MM/YYYY")),
        },
        {
            name: 'Action',
            cell: row => <div>
                <Link to={`/site-location/` + row._id} className='btn btn-success me-1'><FiEye title="View" /></Link>
                <Link to={`/edit-site-location/` + row._id} className='btn btn-info me-1'><FiEdit title="Edit" /></Link>
                <Link to={`/site-document/` + row._id} className='btn btn-warning me-1'><FiPaperclip title="Documents" /></Link>
                <button className='btn btn-danger' onClick={() => deleteSiteLocation(row._id)}><FiTrash title="Delete" /></button>
            </div>,
            grow: 2,
            center: 'yes'
        },
    ];
    const deleteSiteLocation = async (siteLocationId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this site location?",
            //icon: "warning",
            dangerMode: true,
            showCancelButton: true,
            confirmButtonText: 'Confirm'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${process.env.REACT_APP_API_URL}/site-location/` + siteLocationId, { withCredentials: true })
                    .then(res => {
                        getSiteLocations()
                        Swal.fire({
                            title: "Done!",
                            text: "Site location Successfully Deleted",
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
        <div className='site-Locations'>
            <div className="container-fluid">
                <div className="row my-5">
                    <div className="col-md-2">
                        <AdminSidebarNav />
                    </div>
                    <div className="col-md-10">
                        <div className="card p-3 mb-3">
                            <h3>Site Locations of {adminDetails?.name}</h3>
                            <div className='d-flex justify-content-center'>
                                {isLoading && <Spinner animation="border" variant="dark" />}
                            </div>
                            <DataTable
                                columns={columns}
                                data={siteLocations}
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

export default AdminSites;
