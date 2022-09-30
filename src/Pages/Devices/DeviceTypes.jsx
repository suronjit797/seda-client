import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DevicesSidebar from '../../Components/Devices/DevicesSidebar';
import DeviceTypeTable from './DeviceTypeTable';

const DeviceTypes = () => {
    const [SuccessMessage, setSuccessMessage] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [deviceTypes, setDeviceTypes] = useState([]);
    const [deviceTypeData, setDeviceTypeData] = useState({
        name: "",
        description:""
    });
    const { name, description } = deviceTypeData;
    const onInputChange = e => {
        setDeviceTypeData({ ...deviceTypeData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/device-type`, deviceTypeData, { withCredentials: true })
        if (response) {
            setIsLoading(false)
            setDeviceTypeData({name: "", description:""})
            getDeviceTypes()
            setSuccessMessage("Device Type Created")
            setTimeout(() => {
                setSuccessMessage()
            }, 2000)
        }
    }
    const getDeviceTypes=async()=>{
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/device-type`, { withCredentials: true })
        if (response) {
            setDeviceTypes(response.data)
        }
    }
    useEffect(() => {
        getDeviceTypes()
    }, []);
    return (
        <div className='settings'>
            <div className="container-fluid">
                <div className="row my-5">
                    <div className="col-md-2">
                        <DevicesSidebar />
                    </div>
                    <div className="col-md-10">
                        <div className="card p-3 mb-3">
                            <h3>Manage Device Types</h3>

                            <div className="row mt-4">
                                <div className="col-md-6">
                                    <h4>Add Device Type</h4>
                                    <div className='d-flex justify-content-center'>
                                        {isLoading && <Spinner animation="border" variant="dark" />}
                                    </div>
                                    {SuccessMessage && <div className="alert alert-success" role="alert">{SuccessMessage} </div>}

                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label for="name" class="form-label">Device Type Name</label>
                                            <input type="text" name='name' value={name} onChange={onInputChange} class="form-control" id="name" placeholder='Enter a device type name' required />
                                        </div>
                                        <div className="mb-3">
                                            <label for="description" class="form-label">Device Type Description</label>
                                            <input type="text" name='description' value={description} onChange={onInputChange} class="form-control" id="description" placeholder='Enter device type description' />
                                        </div>
                                        <div className='float-end'>
                                            <button type="submit" class="btn btn-success me-2">Create Device Type</button>
                                            <Link to="/devices" className='btn btn-secondary'>Cancel</Link>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-md-6">
                                    <DeviceTypeTable data={deviceTypes} getDeviceTypes={getDeviceTypes} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeviceTypes;
