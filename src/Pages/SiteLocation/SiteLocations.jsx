import axios from 'axios';
import moment from 'moment';
import React, { useState, useEffect, useContext } from 'react';
import { Spinner } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import AdminSidebarNav from '../../Components/Admins/AdminSidebarNav';
import Swal from "sweetalert2";
import { useSelector } from 'react-redux';
import { FiTrash, FiEye, FiEdit, FiPaperclip } from "react-icons/fi"
import { ThemeContext } from '../../App.js'

const SiteLocations = () => {
    let { isDark } = useContext(ThemeContext)

    const [siteLocations, setSiteLocations] = useState([]);
    const userDetails = useSelector((state) => state.user.userDetails);
    const [isLoading, setIsLoading] = useState(false);

    const getSiteLocations = async (userDetails) => {
        setIsLoading(true)
        if (userDetails.role === "superAdmin") {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/site-location`, { withCredentials: true })
            if (response) {
                setIsLoading(false)
                setSiteLocations(response.data.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1))
            }
        }
        if (userDetails.role === "admin") {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/site-location/admin-sites/` + userDetails._id, { withCredentials: true })
            if (response) {
                setIsLoading(false)
                setSiteLocations(response.data.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1))
            }
        }
        if (userDetails.role === "installer") {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/site-location/installer-sites/` + userDetails._id, { withCredentials: true })
            if (response) {
                setIsLoading(false)
                setSiteLocations(response.data.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1))
            }
        }

    }
    useEffect(() => {
        document.title = "SEDA - All Site Locations"
        getSiteLocations(userDetails)
    }, [userDetails]);
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
            width: "140px"

        },
        {
            name: 'Installer',
            cell: row => <>{row?.installer?.name}</>,
            selector: row => (row.installer),

        },
        {
            name: 'Date Created',
            selector: row => (moment(row.createdAt).format("DD/MM/YYYY")),
            width: "125px"
        },
        {
            name: 'Action',
            cell: row => <div>
                {(() => {
                    switch (userDetails.role) {
                        case 'superAdmin':
                            return (
                                <div className="actions">
                                    <Link to={`/site-location/` + row._id} className='btn btn-success me-1'><FiEye title="View" /></Link>
                                    <Link to={`/edit-site-location/` + row._id} className='btn btn-info me-1'><FiEdit title="Edit" /></Link>
                                    <Link to={`/site-document/` + row._id} className='btn btn-warning me-1'><FiPaperclip title="Documents" /></Link>
                                    <button className='btn btn-danger' onClick={() => deleteSiteLocation(row._id)}><FiTrash title="Delete" /></button>
                                </div>
                            )
                        case 'installer':
                            return (
                                <div className="actions">
                                    <Link to={`/site-location/` + row._id} className='btn btn-success me-1'><FiEye title="View" /></Link>
                                </div>
                            )
                        case 'admin':
                            return (
                                <div className="actions">
                                    <Link to={`/site-location/` + row._id} className='btn btn-success me-1'><FiEye title="View" /></Link>
                                    <Link to={`/edit-site-location/` + row._id} className='btn btn-info me-1'><FiEdit title="Edit" /></Link>
                                    <Link to={`/site-document/` + row._id} className='btn btn-warning me-1'><FiPaperclip title="Documents" /></Link>
                                    <button className='btn btn-danger' onClick={() => deleteSiteLocation(row._id)}><FiTrash title="Delete" /></button>
                                </div>
                            )
                        case 'user':
                            return (
                                <div className="actions">

                                </div>
                            )
                        case 'public':
                            return (
                                <div className="actions">

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
                        getSiteLocations(userDetails)
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
                <div className="row my-5 vh60">
                    <div className="col-md-2">
                        <AdminSidebarNav />
                    </div>
                    <div className="col-md-10">
                        <div className="card p-3 mb-3">
                            <h3>All Site Locations</h3>
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

export default SiteLocations;
