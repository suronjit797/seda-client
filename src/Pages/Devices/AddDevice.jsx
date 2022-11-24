import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import DevicesSidebar from '../../Components/Devices/DevicesSidebar';
import axios from 'axios';

const AddDevice = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [SuccessMessage, setSuccessMessage] = useState();
    const [ErrorMessage, setErrorMessage] = useState();
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
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/device`, deviceData, { withCredentials: true }).catch(function (error) {
            if (error.response) {
                setIsLoading(false)
                setErrorMessage(error.response.data)
                setTimeout(() => {
                    setErrorMessage()
                }, 2000)
            }
        });
        const data = response.data
        if (data) {
            setIsLoading(false)
            setSuccessMessage("New device created successfully")
            setTimeout(() => {
                setSuccessMessage()
                navigate('/devices')
            }, 2000)
        }
    }
    //for site location dropdown
    const [siteLocations, setSiteLocations] = useState([]);
    const getSiteLocations = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/site-location`, { withCredentials: true })
        if (response) {
            setSiteLocations(response.data.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1))
        }
    }
    useEffect(() => {
        getSiteLocations()
        // eslint-disable-next-line
    }, []);
    useEffect(() => {
        setDeviceData({ ...deviceData, site: siteLocations[0]?._id })
        // eslint-disable-next-line
    }, [siteLocations]);
    //for device type dropdown
    const [deviceTypes, setDeviceTypes] = useState([]);
    const getDeviceTypes = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/device-type`, { withCredentials: true })
        if (response) {
            setDeviceTypes(response.data.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1))
        }
    }
    useEffect(() => {
        getDeviceTypes()
        // eslint-disable-next-line
    }, []);
    useEffect(() => {
        setDeviceData({ ...deviceData, deviceType: deviceTypes[0]?._id })
        // eslint-disable-next-line
    }, [deviceTypes]);
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
                                <div className="col-md-6"><h3 className='mb-4'>Add New Device</h3></div>
                            </div>
                            <div className='d-flex justify-content-center'>
                                {isLoading && <Spinner animation="border" variant="dark" />}
                            </div>
                            {SuccessMessage && <div className="alert alert-success" role="alert">{SuccessMessage} </div>}
                            {ErrorMessage && <div className="alert alert-danger" role="alert">{ErrorMessage} </div>}
                            <form onSubmit={submitHandler}>
                                <div class="row mb-3">
                                    <div className="col-md-6">
                                        <label for="site" class="form-label">Site Location</label>
                                        <select class="form-select" id='site' name='site' value={site} onChange={onInputChange} aria-label="Select a site location">
                                            {siteLocations && siteLocations.length > 0 && siteLocations.map((item, index) => (
                                                <option value={item._id} key={index}>{item.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div className="col-md-6">
                                        <label for="name" class="form-label">Device Name</label>
                                        <input type="text" name='name' value={name} onChange={onInputChange} class="form-control" id="name" placeholder='Enter full name' required />
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div className="col-md-6">
                                        <label for="deviceType" class="form-label">Device Type</label>
                                        <select class="form-select" id='deviceType' name='deviceType' value={deviceType} onChange={onInputChange} aria-label="Select a device type">
                                            {deviceTypes && deviceTypes.length > 0 && deviceTypes.map((item, index) => (
                                                <option value={item._id} key={index}>{item.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div className="col-md-6">
                                        <label for="serial" class="form-label">Serial No</label>
                                        <input type="text" name='serial' value={serial} onChange={onInputChange} class="form-control" id="serial" placeholder='Enter device serial' />
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div className="col-md-6">
                                        <label for="apiKey" class="form-label">Device API Key </label>
                                        <input type="text" name='apiKey' value={apiKey} onChange={onInputChange} class="form-control" id="apiKey" placeholder='Enter device API key' required />
                                        <div id="emailHelp" class="form-text">API Key is mandatory to get device data from the gateway</div>
                                    </div>
                                </div>
                                <div className='float-end'>
                                    <button type="submit" class="btn btn-success me-2">Create Device</button>
                                    <Link to="/devices" class="btn btn-secondary">Cancel</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddDevice;
