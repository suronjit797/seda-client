import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import NotificationSidebar from '../../Components/Notifications/NotificationSidebar';

const RecipientList = () => {
    const userDetails = useSelector((state) => state?.user?.userDetails);
    const [siteLocations, setSiteLocations] = useState([]);
    const [users, setUsers] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [AssignAlarmEx, setAssignAlarmEx] = useState({
        site: "",
        role: "",
        type:"existing",
        user: "",
        alarm: "",
    });
    const { site, role, user, alarm } = AssignAlarmEx

    const onInputChange = e => {
        setAssignAlarmEx({ ...AssignAlarmEx, [e.target.name]: e.target.value });
    };

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
    const getNotifications = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/notification`, { withCredentials: true })
        if (response) {
            setNotifications(response.data.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1))
        }
    }

    const getUsers = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/siteUser/${site}/${role}`, { withCredentials: true })
        if (response) {
            setUsers(response.data)
        }
    }
    useEffect(() => {
        getUsers()
        // eslint-disable-next-line
    }, [role]);

    useEffect(() => {
        document.title = "SEDA - Recipient List";
        getNotifications()
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        getSiteLocations(userDetails)

        // eslint-disable-next-line
    }, [userDetails]);

    const handleSubmitEx = async(e)=>{
        e.preventDefault();
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
                                <div className="col-md-6"> <h3>Notification Recipient List</h3></div>
                                <div className="col-md-6 ">
                                    <Link className='btn btn-secondary float-end'>Back</Link>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-6">
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
                                                    <option label='Select Role'></option>
                                                    <option value="admin">Admin</option>
                                                    <option value="installer">Installer</option>
                                                    <option value="user">Site User</option>
                                                    <option value="public">Site Public</option>
                                                </select>
                                            </div>
                                            <div className="col-md-4">
                                                <label htmlFor="user" className="form-label">Site User</label>
                                                <select name="user" id="user" defaultValue={user} className='form-select' onChange={onInputChange}>
                                                    <option> Select User</option>
                                                    {users && users.length > 0 && users.map((item, index) => (
                                                        <option value={item._id} key={index}>{item.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row">
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
                                                <label htmlFor="name" className="form-label">Full Name</label>
                                                <input type="text" className='form-control' name='name' placeholder='Enter full name' />
                                            </div>
                                            <div className="col-md-4">
                                                <label htmlFor="email" className="form-label">Email Address</label>
                                                <input type="email" className='form-control' name='email' placeholder='Enter email address' />
                                            </div>
                                            <div className="col-md-4">
                                            <label htmlFor="alarm" className="form-label">Alarm Name</label>
                                                <select name="alarm" id="alarm" defaultValue={alarm} className='form-select' onChange={onInputChange}>
                                                    <option> Select alarm</option>
                                                    {notifications && notifications.length > 0 && notifications.map((item, index) => (
                                                        <option value={item._id} key={index}>{item.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                
                                            </div>
                                            <div className="col-md-8">
                                                <button type='submit' className='btn btn-warning mt-4 float-end'>Assign</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecipientList;
