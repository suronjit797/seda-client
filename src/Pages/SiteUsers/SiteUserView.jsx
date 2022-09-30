import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import SiteUserSidebar from '../../Components/SiteUsers/SiteUserSidebar';

const SiteUserView = () => {
    const Params = useParams()
    const userId = Params.userId
    const [user, setUser] = useState();

    const getUser = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/` + userId, { withCredentials: true })
        if (response) {
            console.log(response.data)
            setUser(response.data)
        }
    }
    useEffect(() => {
        getUser()
    }, []);

    return (
        <div className='installer'>
            <div className="container-fluid">
                <div className="row my-5">
                    <div className="col-md-2">
                        <SiteUserSidebar />
                    </div>
                    <div className="col-md-10">
                        <div className="card p-3 mb-3">
                            <h3>Site User Profile</h3>
                            <div className="row mt-4">
                                <div className="col-md-6">
                                    <div className="row mb-2">
                                        <div className="col-4">Full Name</div>
                                        <div className="col-8">: {user?.name}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-4">Email Address</div>
                                        <div className="col-8">: {user?.email}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-4">Phone Number</div>
                                        <div className="col-8">: +6{user?.phone}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-4">Fax Number</div>
                                        <div className="col-8">: +6{user?.fax}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-4">Assigned Site </div>
                                        <div className="col-8">: {user?.site?.name}</div>
                                    </div>


                                    <div className="row mb-2">
                                        <div className="col-4">Profile Photo</div>
                                        <div className="col-8">
                                            {user?.avatar &&
                                                <img src={user?.avatar} alt="logo" className='rounded' style={{ height: "150px" }} />
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">

                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 d-flex justify-content-end">
                                    <Link to={`/edit-site-user/` + userId} className="btn btn-success me-1">Edit</Link>
                                    <Link to={`/site-location/`+ user?.site?._id} className='btn btn-warning me-1'>Site Details</Link>
                                    <Link to={`/site-users`} className="btn btn-secondary">Cancel</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SiteUserView;
