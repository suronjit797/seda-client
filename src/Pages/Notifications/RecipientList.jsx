import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import NotificationSidebar from '../../Components/Notifications/NotificationSidebar';
import RecipientListTable from './RecipientListTable';

const RecipientList = () => {
    const userDetails = useSelector((state) => state?.user?.userDetails);
    const [isLoading, setIsLoading] = useState(false);
    const [SuccessMessage, setSuccessMessage] = useState();
    const [siteLocations, setSiteLocations] = useState([]);
    const [assignedAlarm, setAssignedAlarm] = useState([]);
    const [users, setUsers] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [AssignAlarmEx, setAssignAlarmEx] = useState({
        name: "",
        email: "",
        role: "external",
        user:"",
        site: "",
        alarm: "",
        isActive: true
    });
    const { name, email, site, role, alarm } = AssignAlarmEx

    const onInputChange = e => {
        setAssignAlarmEx({ ...AssignAlarmEx, [e.target.name]: e.target.value });
    };

    const handleUserChange = e => {
        let user = users.filter((item) => item._id === e.target.value)
        setAssignAlarmEx({ ...AssignAlarmEx,user: e.target.value,  name: user[0]?.name, email: user[0]?.email });
    }

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
        } else if (userDetails.role === "user") {
            let site = [];
            site.push(userDetails.site)
            setSiteLocations(site)
        } else if (userDetails.role === "public") {
            let site = [];
            site.push(userDetails.site)
            setSiteLocations(site)
        }
    }
    const getNotifications = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/notification/site/${site}`, { withCredentials: true })
        if (response) {
            setNotifications(response.data.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1))
        }
    }
    useEffect(() => {
        if (site) {
            getNotifications()
        }
        // eslint-disable-next-line
    }, [site]);

    const getUsers = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/siteUser/${site}/${role}`, { withCredentials: true })
        if (response) {
            setUsers(response.data)
        }
    }
    useEffect(() => {
        if (role === "external") {
           
        }else{
            getUsers()
        }
        // eslint-disable-next-line
    }, [site, role]);

    const getAssignedAlarm = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/notification/assign`, { withCredentials: true })
        if (response) {
            setAssignedAlarm(response.data)
        }
    }
    useEffect(() => {
        document.title = "SEDA - Recipient List";
        getAssignedAlarm()
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        getSiteLocations(userDetails)
        // eslint-disable-next-line
    }, [userDetails]);

    const handleSubmitEx = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/notification/assign`, AssignAlarmEx, { withCredentials: true })
        if (response) {
            setIsLoading(false)
            setSuccessMessage("Alarm Assign Successfully")
            getAssignedAlarm()
            setAssignAlarmEx({
                name: "",
                email: "",
                role: "external",
                site: "",
                alarm: "",
                isActive: true
            })
            setTimeout(() => {
                setSuccessMessage()
                window.location.reload(false);
            }, 2000)
        }
    }

    return (
        <div className='settings'>
            <div className="container-fluid">
                <div className="row my-5 vh60">
                    <div className="col-md-2">
                        <NotificationSidebar />
                    </div>
                    <div className="col-md-10">
                        <div className="card p-3 mb-3">
                            <div className="row">
                                <div className="col-md-6">
                                    <h3>Notification Recipient List</h3>
                                    <div className='d-flex justify-content-center'>
                                        {isLoading && <Spinner animation="border" variant="dark" />}
                                    </div>
                                    {SuccessMessage && <div className="alert alert-success" role="alert">{SuccessMessage} </div>}
                                </div>
                                <div className="col-md-6 ">
                                    <Link className='btn btn-secondary float-end'>Back</Link>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-6 border-end">
                                    <h5>Assign Existing System User Accounts</h5>
                                    <form onSubmit={handleSubmitEx}>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <label htmlFor="site" className="form-label">Site Location</label>
                                                <select name="site" id="site" defaultValue={site} className='form-select' onChange={onInputChange}>
                                                    <option> Select site</option>
                                                    {siteLocations && siteLocations.length > 0 && siteLocations.map((item, index) => (
                                                        <option value={item._id} key={index}>{item.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-md-4">
                                                <label htmlFor="role" className="form-label">User Type</label>
                                                <select name="role" id="role" defaultValue={role} className='form-select' onChange={onInputChange}>
                                                    <option label='Select role'></option>
                                                    <option value="admin">Admin</option>
                                                    <option value="installer">Installer</option>
                                                    <option value="user">Site User</option>
                                                    <option value="public">Site Public</option>
                                                </select>
                                            </div>
                                            <div className="col-md-4">
                                                <label htmlFor="user" className="form-label">Site User</label>
                                                <select name="user" id="user" className='form-select' onChange={handleUserChange}>
                                                    <option> Select user</option>
                                                    {users && users.length > 0 && users.map((item, index) => (
                                                        <option value={item._id} key={index}>{item.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col-md-4">
                                                <label htmlFor="alarm" className="form-label">Alarm Name</label>
                                                <select name="alarm" id="alarm" defaultValue={alarm} className='form-select' onChange={onInputChange}>
                                                    <option> Select alarm</option>
                                                    {notifications && notifications.length > 0 && notifications.map((item, index) => (
                                                        <option value={item._id} key={index}>{item.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-md-8">
                                                <button type='submit' className='btn btn-warning mt-4 float-end'>Assign</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-md-6">
                                    <h5>Assign Email Address (External Accounts)</h5>
                                    <form onSubmit={handleSubmitEx}>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <label htmlFor="site" className="form-label">Site Location</label>
                                                <select name="site" id="site" defaultValue={site} className='form-select' onChange={onInputChange}>
                                                    <option> Select site</option>
                                                    {siteLocations && siteLocations.length > 0 && siteLocations.map((item, index) => (
                                                        <option value={item._id} key={index}>{item.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-md-4">
                                                <label htmlFor="name" className="form-label">Full Name</label>
                                                <input type="text" className='form-control' name='name' placeholder='Enter full name' onChange={onInputChange} />
                                            </div>
                                            <div className="col-md-4">
                                                <label htmlFor="email" className="form-label">Email Address</label>
                                                <input type="email" className='form-control' name='email' placeholder='Enter email address' onChange={onInputChange} />
                                            </div>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col-md-4">
                                                <label htmlFor="alarm" className="form-label">Alarm Name</label>
                                                <select name="alarm" id="alarm" defaultValue={alarm} className='form-select' onChange={onInputChange}>
                                                    <option> Select alarm</option>
                                                    {notifications && notifications.length > 0 && notifications.map((item, index) => (
                                                        <option value={item._id} key={index}>{item.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-md-8">
                                                <button type='submit' className='btn btn-warning mt-4 float-end'>Assign</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <hr />

                            <RecipientListTable data={assignedAlarm} getAssignedAlarm={getAssignedAlarm}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecipientList;
