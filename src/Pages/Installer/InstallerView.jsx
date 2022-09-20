import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import InstallerSidebarNav from '../../Components/Installer/InstallerSidebarNav';

const InstallerView = () => {
    const Params = useParams()
    const installerId = Params.installerId
    const [installerDetails, setInstallerDetails] = useState();
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
                                        <div className="col-3">Name</div>
                                        <div className="col-9">: John doe</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-3">Email</div>
                                        <div className="col-9">: example@gmail.com</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-3">Phone</div>
                                        <div className="col-9">: 018238082138</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-3">Company Name</div>
                                        <div className="col-9">: ABC Company</div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row mb-2">
                                        <div className="col-3">Building Name</div>
                                        <div className="col-9">: 1G</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-3">Logo</div>
                                        <div className="col-9">
                                            <img src="/images/logo.png" alt="logo" style={{height: "150px"}}/>
                                        </div>
                                    </div>
                                   
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 d-flex justify-content-end">
                                    <button className='btn btn-success me-1'>Edit</button>
                                    <button className='btn btn-secondary'>Cancel</button>
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
