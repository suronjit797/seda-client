import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import AdminSidebarNav from '../../Components/Admins/AdminSidebarNav';

const SiteLocationView = () => {
    const Params = useParams()
    const siteLocationId = Params.siteLocationId
    const [siteLocationDetails, setSiteLocationDetails] = useState();
    const getSiteLocation = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/site-location/` + siteLocationId, { withCredentials: true })
        if (response) {
            setSiteLocationDetails(response.data)
        }
    }
    useEffect(() => {
        getSiteLocation()
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
                            <h3>Site Location Details</h3>
                            <div className="row mt-4">
                                <div className="col-md-6">
                                    <div className="row mb-2">
                                        <div className="col-4">Name</div>
                                        <div className="col-8">: {siteLocationDetails?.name}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-4">Building Name</div>
                                        <div className="col-8">: {siteLocationDetails?.buildingName}</div>
                                    </div>
                                     <div className="row mb-2">
                                        <div className="col-4">Tariff Electricity (sen/kWh)</div>
                                        <div className="col-8">: {siteLocationDetails?.tariffElectricity?.name}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-4">Building Type</div>
                                        <div className="col-8">: {siteLocationDetails?.buildingType}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-4">Building Address Line 1</div>
                                        <div className="col-8">: {siteLocationDetails?.buildingAddress1}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-4">Building Address Line 2</div>
                                        <div className="col-8">: {siteLocationDetails?.buildingAddress2}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-4">Building Postal Code</div>
                                        <div className="col-8">: {siteLocationDetails?.buildingPostalCode}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-4">Local Authority</div>
                                        <div className="col-8">: {siteLocationDetails?.localAuthority}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-4">Nett Floor Area (sq ft)</div>
                                        <div className="col-8">: {siteLocationDetails?.netFloorArea}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-4">Physical Building Background</div>
                                        <div className="col-8">: {siteLocationDetails?.buildingBackground?.name}</div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row mb-2">
                                        <div className="col-4">Admin</div>
                                        <div className="col-8">: {siteLocationDetails?.admin?.name}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-4">Installer</div>
                                        <div className="col-8">: {siteLocationDetails?.installer?.name}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-4">Building Owner Name</div>
                                        <div className="col-8">: {siteLocationDetails?.buildingOwnerName}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-4">Building Owner Email</div>
                                        <div className="col-8">: {siteLocationDetails?.buildingOwnerEmail}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-4">Contact Person Name</div>
                                        <div className="col-8">: {siteLocationDetails?.contactPersonName}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-4">Contact Person Phone</div>
                                        <div className="col-8">: +6{siteLocationDetails?.contactPersonPhone}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-4">Remark</div>
                                        <div className="col-8">: {siteLocationDetails?.remark}</div>
                                    </div>
                                  
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 d-flex justify-content-end">
                                    <Link to={`/edit-site-location/` + siteLocationId} className="btn btn-success me-1">Edit</Link>
                                    <Link to={`/site-locations`} className="btn btn-secondary">Cancel</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SiteLocationView;
