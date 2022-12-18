import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import NotificationSidebar from '../../Components/Notifications/NotificationSidebar';

const EditAlarm = () => {
    const Params = useParams()
    const alarmId = Params.alarmId
    const [SuccessMessage, setSuccessMessage] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const userDetails = useSelector((state) => state?.user?.userDetails);
    const [siteLocations, setSiteLocations] = useState([]);
    const [devices, setDevices] = useState([]);
    const [deviceParameters, setDeviceParameters] = useState([]);
    const getSiteLocations = async (userDetails) => {
        if (userDetails.role === "superAdmin") {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/site-location`, { withCredentials: true })
            if (response) {
                setSiteLocations(response.data.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1))
            }
        } else if (userDetails.role === "admin") {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/site-location/admin-sites/` + userDetails._id, { withCredentials: true })
            if (response) {
                setSiteLocations(response.data.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1))
            }
        } else if (userDetails.role === "installer") {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/site-location/installer-sites/` + userDetails._id, { withCredentials: true })
            if (response) {
                setSiteLocations(response.data.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1))
            }
        }
    }
    useEffect(() => {
        getSiteLocations(userDetails)
        // eslint-disable-next-line
    }, [userDetails]);

    const [AlarmData, setAlarmData] = useState({
        name: "",
        type: "",
        site: "",
        device: "",
        parameter: "",
        option: "",
        value: "",
        interval: ""
    });
    const { name, type, site, device, parameter, option, value, interval } = AlarmData
    const onInputChange = e => {
        setAlarmData({ ...AlarmData, [e.target.name]: e.target.value });
    };
    const getDevices = async (locationId) => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/device/site/` + locationId, { withCredentials: true })
        if (response) {
            setDevices(response.data)
        }
    }
    useEffect(() => {
        if (site) {
            getDevices(site)
        }
        // eslint-disable-next-line
    }, [site]);

    const getDeviceParameters = async (deviceId) => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/device/device-parameters/` + deviceId, { withCredentials: true })
        if (response) {
            setDeviceParameters(response.data.sort((a, b) => a._id > b._id ? 1 : -1))
        }
    }

    useEffect(() => {
        if (device) {
            getDeviceParameters(device)
        }
        // eslint-disable-next-line
    }, [device]);

    const getAlarm = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/notification/` + alarmId, { withCredentials: true })
        if (response) {
            const data = response.data
            setAlarmData({
                name: data?.name,
                type: data?.type,
                site: data?.site?._id,
                device: data?.device?._id,
                parameter: data?.parameter,
                option: data?.option,
                value: data?.value,
                interval: data?.interval
            })
        }
    }
    useEffect(() => {
        getAlarm()
        // eslint-disable-next-line
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/notification/`+ alarmId, AlarmData, { withCredentials: true }).catch(function (error) {
            if (error.response) {
                setIsLoading(false)
                console.log(error.response)
            }
        });
        const data = response.data
        if (data) {
            setIsLoading(false)
            setSuccessMessage("Alarm Updated successfully")
            getAlarm()
            setTimeout(() => {
                setSuccessMessage()
            }, 2000)
        }
    }

    return (
        <div className='alarm-page'>
            <div className="container-fluid">
                <div className="row my-5 vh60">
                    <div className="col-md-2">
                        <NotificationSidebar />
                    </div>
                    <div className="col-md-10">
                        <div className="card p-3 mb-3">
                            <h3>Edit Alarm Settings</h3>
                            <div className='d-flex justify-content-center'>
                                {isLoading && <Spinner animation="border" variant="dark" />}
                            </div>
                            {SuccessMessage && <div className="alert alert-success" role="alert">{SuccessMessage} </div>}
                            <form onSubmit={submitHandler}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Alarm Name</label>
                                            <input type="text" name='name' value={name} onChange={onInputChange} className="form-control" id="name" placeholder='Enter Alarm Name' required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="type" className="form-label">Alarm Type</label>
                                            <select name="type" id="type" defaultValue={type} className='form-select' onChange={onInputChange}>
                                                <option> Select alarm type</option>
                                                {type === "message" ? <option value="message" selected>System Warning Message Only</option> : <option value="message">System Warning Message Only</option>}
                                                {type === "email" ? <option value="email" selected>System Warning Message Only</option> : <option value="message">Email Notification Only</option>}
                                                {type === "both" ? <option value="both" selected>Email Notification + System Warning Message</option> : <option value="both">Email Notification + System Warning Message</option>}
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="site" className="form-label">Site Location</label>
                                            <select name="site" id="site" defaultValue={site} className='form-select' onChange={onInputChange}>
                                                <option> Select site location</option>
                                                {siteLocations && siteLocations.length > 0 && siteLocations.map((item, index) => (
                                                    site === item._id ? <option value={item._id} key={index} selected>{item.name}</option> : <option value={item._id} key={index}>{item.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="device" className="form-label">Device</label>
                                            <select name="device" id="device" defaultValue={device} className='form-select' onChange={onInputChange}>
                                                <option> Select device</option>
                                                {devices && devices.length > 0 && devices.map((item, index) => (
                                                    device === item._id ? <option value={item._id} key={index} selected>{item.name}</option> : <option value={item._id} key={index}>{item.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="parameter" className="form-label">Device Parameter</label>
                                            <select name="parameter" id="parameter" defaultValue={parameter} className='form-select' onChange={onInputChange}>
                                                <option> Select device parameter</option>
                                                {deviceParameters && deviceParameters.length > 0 && deviceParameters.map((item, index) => (
                                                    parameter === item._id ? <option value={item._id} key={index} selected>{item._id}</option> : <option value={item._id} key={index}>{item._id}</option>

                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="option" className="form-label">Alarm Notification</label>
                                            <select name="option" id="option" className='form-select' defaultValue={option} onChange={onInputChange}>
                                                <option> Select alarm notification option</option>
                                                {option === "Min" ? <option value="Min" selected> Min</option> : <option value="Min"> Min</option>}
                                                {option === "Max" ? <option value="Max" selected> Max</option> : <option value="Max"> Max</option>}
                                                {option === "Range" ? <option value="Range" selected> Range</option> : <option value="Range"> Range</option>}
                                            </select>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-md-6">
                                                <label htmlFor="value" className="form-label">Set Value</label>
                                                <input type="text" name='value' value={value} className="form-control" id="value" placeholder='Enter minimum value to trigger alarm' onChange={onInputChange} required />

                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="interval" className="form-label">Set Trigger Interval</label>
                                                <select name="interval" id="interval" className='form-select' defaultValue={interval} onChange={onInputChange}>
                                                    <option> Select alarm trigger interval</option>
                                                    {interval === "1" ? <option value="1" selected> 1 min</option> : <option value="1"> 1 min</option>}
                                                    {interval === "15" ? <option value="15" selected> 15 min</option> : <option value="15"> 15 min</option>}
                                                    {interval === "30" ? <option value="30" selected> 30 min</option> : <option value="30" selected> 30 min</option>}
                                                    {interval === "60" ? <option value="60" selected> 1 hour</option>: <option value="60"> 1 hour</option>}
                                                     {interval === "720" ? <option value="720" selected> 12 hours</option>: <option value="720"> 12 hours</option>}
                                                     {interval === "1440" ? <option value="1440" selected> 24 hours</option>: <option value="1440"> 24 hours</option>}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="mb-3 float-end">
                                            <button className='btn btn-success me-2' type='submit'>Update</button>
                                            <Link to="/alarm-summary" className='btn btn-secondary'>Cancel</Link>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditAlarm;
