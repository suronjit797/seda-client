import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DevicesSidebar from '../../Components/Devices/DevicesSidebar';

const EditDevice = () => {
    const Params = useParams()
    const deviceId = Params.deviceId

    const [isLoading, setIsLoading] = useState(false);
    const [SuccessMessage, setSuccessMessage] = useState();
    const navigate = useNavigate()
    const [deviceData, setDeviceData] = useState({
        name: "",
        deviceType: "",
        serial: "",
        apiKey: "",
        site: ""
    });
    const { name, deviceType, serial, apiKey, site } = deviceData

    const onInputChange = e => {
        setDeviceData({ ...deviceData, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/device/` + deviceId, deviceData, { withCredentials: true }).catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                if (error.response.status === 400 || 500) {
                    console.log(error)
                }
                console.log(error.response.headers);
            }
        });
        const data = response.data
        if (data) {
            setIsLoading(false)
            setSuccessMessage("Device Updated Successfully")
            setTimeout(() => {
                setSuccessMessage()
                navigate('/devices')
            }, 2000)
        }
    }
    //htmlFor site location dropdown
    const [siteLocations, setSiteLocations] = useState([]);
    const getSiteLocations = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/site-location`, { withCredentials: true })
        if (response) {
            setSiteLocations(response.data.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1))
        }
    }
    //htmlFor device type dropdown
    const [deviceTypes, setDeviceTypes] = useState([]);
    const getDeviceTypes = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/device-type`, { withCredentials: true })
        if (response) {
            setDeviceTypes(response.data.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1))
        }
    }
    useEffect(() => {
        getDevice()
        getDeviceTypes()
        getSiteLocations()
        // eslint-disable-next-line
    }, []);


    const getDevice = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/device/` + deviceId, { withCredentials: true })
        if (response) {
            const data = response.data
            setDeviceData({
                name: data?.name,
                deviceType: data?.deviceType?._id,
                serial: data?.serial,
                apiKey: data?.apiKey,
                site: data?.site?._id
            })
        }
    }

    return (
        <div className='devices'>
            <div className="container-fluid">
                <div className="row my-5">
                    <div className="col-md-2">
                        <DevicesSidebar />
                    </div>
                    <div className="col-md-10">
                        <div className="card p-3 mb-3">
                            <div className="row">
                                <div className="col-md-6"><h3 className='mb-4'>Update Device Information</h3></div>
                            </div>
                            <div className='d-flex justify-content-center'>
                                {isLoading && <Spinner animation="border" variant="dark" />}
                            </div>
                            {SuccessMessage && <div className="alert alert-success" role="alert">{SuccessMessage} </div>}
                            <form onSubmit={submitHandler}>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="site" className="form-label">Site Location</label>
                                        <select className="form-select" id='site' name='site' value={site} onChange={onInputChange} aria-label="Select a site location">
                                            {siteLocations && siteLocations.length > 0 && siteLocations.map((item, index) => (
                                                 site === item._id ? <option value={item._id} key={index} selected>{item.name}</option> : <option value={item._id} key={index}>{item.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="name" className="form-label">Device Name</label>
                                        <input type="text" name='name' value={name} onChange={onInputChange} className="form-control" id="name" placeholder='Enter full name' required />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="deviceType" className="form-label">Device Type</label>
                                        <select className="form-select" id='deviceType' name='deviceType' value={deviceType} onChange={onInputChange} aria-label="Select a device type">
                                            {deviceTypes && deviceTypes.length > 0 && deviceTypes.map((item, index) => (
                                                deviceType === item._id ? <option value={item._id} key={index} selected>{item.name}</option> : <option value={item._id} key={index}>{item.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="serial" className="form-label">Serial No</label>
                                        <input type="text" name='serial' value={serial} onChange={onInputChange} className="form-control" id="serial" placeholder='Enter device serial' />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="apiKey" className="form-label">Device API Key </label>
                                        <input type="text" name='apiKey' value={apiKey} onChange={onInputChange} className="form-control" id="apiKey" placeholder='Enter device API key' required />
                                        <div id="emailHelp" className="form-text">API Key is mandatory to get device data from the gateway</div>
                                    </div>
                                </div>
                                <div className='float-end'>
                                    <button type="submit" className="btn btn-success me-2">Update</button>
                                    <Link to="/devices" className="btn btn-secondary">Cancel</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditDevice;
