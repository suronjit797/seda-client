import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import AdminSidebarNav from '../../Components/Admins/AdminSidebarNav';

const AdminView = () => {
    const Params = useParams()
    const adminId = Params.adminId
    const [adminDetails, setAdminDetails] = useState();

    const getAdmin = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/` + adminId, { withCredentials: true })
        if (response) {
            console.log(response.data)
            setAdminDetails(response.data)
        }
    }
    useEffect(() => {
        getAdmin()
    }, []);
    return (
        <div className='installer-view'>
            <div className="container-fluid">
                <div className="row my-5">
                    <div className="col-md-2">
                        <AdminSidebarNav />
                    </div>
                    <div className="col-md-10">
                        <div className="card p-3 mb-3">
                            <h3>Admin Profile</h3>
                            <div className="row mt-4">
                                <div className="col-md-6">
                                    <div className="row mb-2">
                                        <div className="col-4">Full Name</div>
                                        <div className="col-8">: {adminDetails?.name}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-4">Email Address</div>
                                        <div className="col-8">: {adminDetails?.email}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-4">Phone Number</div>
                                        <div className="col-8">: +6{adminDetails?.phone}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-4">Fax Number</div>
                                        <div className="col-8">: +6{adminDetails?.fax}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-4">Company Name</div>
                                        <div className="col-8">: {adminDetails?.companyName}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-4">Company Address</div>
                                        <div className="col-8">: {adminDetails?.companyAddress}</div>
                                    </div>
                                  
                                 
                                    <div className="row mb-2">
                                        <div className="col-4">Profile Photo</div>
                                        <div className="col-8">
                                            {adminDetails?.avatar &&
                                                <img src={adminDetails?.avatar} alt="logo" className='rounded' style={{ height: "150px" }} />
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 d-flex justify-content-end">
                                    <Link to={`/edit-admin/` + adminId} className="btn btn-success me-1">Edit</Link>
                                    <Link to={`/admins`} className="btn btn-secondary">Cancel</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminView;
