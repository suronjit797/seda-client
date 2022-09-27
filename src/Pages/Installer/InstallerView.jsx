import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import InstallerSidebarNav from '../../Components/Installer/InstallerSidebarNav';

const InstallerView = () => {
    const Params = useParams()
    const installerId = Params.installerId
    const [installerDetails, setInstallerDetails] = useState();

    const getInstaller = async()=>{
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/`+installerId, { withCredentials: true })
        if(response){
            setInstallerDetails(response.data[0])
        }
    }
    useEffect(() => {
        getInstaller()
    }, []);

    return (
        <div className='installer-view'>
            <div className="container-fluid">
                <div className="row my-5">
                    <div className="col-md-2">
                        <InstallerSidebarNav />
                    </div>
                    <div className="col-md-10">
                        <div className="card p-3 mb-3">
                            <h3>Installer Profile</h3>
                            <div className="row mt-4">
                                <div className="col-md-6">
                                    <div className="row mb-2">
                                        <div className="col-3">Full Name</div>
                                        <div className="col-9">: {installerDetails?.name}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-3">Email Address</div>
                                        <div className="col-9">: {installerDetails?.email}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-3">Phone Number</div>
                                        <div className="col-9">: +6{installerDetails?.phone}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-3">Fax Number</div>
                                        <div className="col-9">: +6{installerDetails?.fax}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-3">Company Name</div>
                                        <div className="col-9">: {installerDetails?.companyName}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-3">Company Address</div>
                                        <div className="col-9">: {installerDetails?.companyAddress}</div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row mb-2">
                                        <div className="col-3">Logo</div>
                                        <div className="col-9">
                                        {installerDetails?.logo && 
                                         <img src={installerDetails?.logo} alt="logo" style={{height: "150px"}}/>
                                        }
                                        </div>
                                    </div>
                                   
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 d-flex justify-content-end">
                                    <Link to={`/edit-installer/`+ installerId} className="btn btn-success me-1">Edit</Link>
                                    <Link to={`/installers`} className="btn btn-secondary">Cancel</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InstallerView;
