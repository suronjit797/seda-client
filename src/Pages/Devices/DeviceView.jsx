import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import DevicesSidebar from '../../Components/Devices/DevicesSidebar';
import DeviceParameters from './DeviceParameters';

const DeviceView = () => {
    const Params = useParams()
    const deviceId = Params.deviceId
    const [deviceDetails, setDeviceDetails] = useState();
    const [deviceParameters, setDeviceParameters] = useState();
    const [formulas, setFormulas] = useState([]);
    const getDevice = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/device/` + deviceId, { withCredentials: true })
        if (response) {
            setDeviceDetails(response.data)
        }
    }
    const getDeviceParameters = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/device/device-parameters/` + deviceId, { withCredentials: true })
        if (response) {
            setDeviceParameters(response.data.sort((a, b) => a._id > b._id ? 1 : -1))
        }
    }

    const getFormulas = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/formula`, { withCredentials: true })
        if (response) {
            setFormulas(response.data)
        }
    }
    useEffect(() => {
        getDeviceParameters()
        getDevice()
        getFormulas()
    }, []);
    return (
        <div className='installer-view'>
            <div className="container-fluid">
                <div className="row my-5 vh60">
                    <div className="col-md-2">
                        <DevicesSidebar />
                    </div>
                    <div className="col-md-10">
                        <div className="card p-3 mb-3">
                            <h3>Device Information</h3>
                            <div className="row mt-4">
                                <div className="col-md-6">
                                    <h4 className='mb-4'>General Description</h4>
                                    <div className="row mb-2">
                                        <div className="col-3">Device Name</div>
                                        <div className="col-9">: {deviceDetails?.name}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-3">Device Type</div>
                                        <div className="col-9">: {deviceDetails?.deviceType?.name}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-3">Serial No.</div>
                                        <div className="col-9">: {deviceDetails?.serial}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-3">API Key</div>
                                        <div className="col-9">: {deviceDetails?.apiKey}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-3">Site Location</div>
                                        <div className="col-9">: {deviceDetails?.site?.name}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-3">Installer</div>
                                        <div className="col-9">: {deviceDetails?.site?.installer?.name}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="">Assign Formula</div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <DeviceParameters data={deviceParameters} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 d-flex justify-content-end">
                                    <Link to={`/edit-device/` + deviceId} className="btn btn-success me-1">Edit</Link>
                                    <Link to={`/devices`} className="btn btn-secondary">Back</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeviceView;
