import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import axios from 'axios';
import { setCurrentSite, setSiteDetails, setCurrentDevice } from '../../redux/userSlice';
import { useLocation } from 'react-router-dom';

const Header = () => {
    const [devices, setDevices] = useState([]);
    const userDetails = useSelector((state) => state?.user?.userDetails);
    let userSites = useSelector((state) => state?.user?.userSites);
    const dispatch = useDispatch()
    const location = useLocation()
    const getSiteLocations = async (userDetails) => {
        if (userDetails.role === "superAdmin") {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/site-location`, { withCredentials: true })
            if (response) {
                dispatch(setSiteDetails(response.data.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1)))
            }
        } else if (userDetails.role === "admin") {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/site-location/admin-sites/` + userDetails._id, { withCredentials: true })
            if (response) {
                dispatch(setSiteDetails(response.data.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1)))
            }
        } else if (userDetails.role === "installer") {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/site-location/installer-sites/` + userDetails._id, { withCredentials: true })
            if (response) {
                dispatch(setSiteDetails(response.data.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1)))
            }
        }

    }
    const getDevices = async (locationId) => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/device/site/` + locationId, { withCredentials: true })
        if (response) {
            setDevices(response.data)
        }
    }

    useEffect(() => {
        getSiteLocations(userDetails)
        // eslint-disable-next-line
    }, [userDetails]);

    useEffect(() => {
        if (userDetails?.site) {
            dispatch(setCurrentSite(userDetails?.site))
            getDevices(userDetails?.site?._id)
        }
        // eslint-disable-next-line
    }, [userDetails]);

    const handleSiteChange = async (e) => {
        const locationId = e.target.value
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/site-location/` + locationId, { withCredentials: true })
        if (response) {
            dispatch(setCurrentSite(response.data))
            if (locationId) {
                getDevices(locationId)
            } else {
                setDevices([])
            }
        }
    }
    const handleDeviceChange = async (e) => {
        const deviceId = e.target.value
        dispatch(setCurrentDevice(deviceId))
    }
    return (
        <div className='header'>
            <div className="container-fluid bg-warning py-2 ">
                <div className="row d-flex align-items-center">
                    <div className="col-sm-12 col-md-1">
                        <div className='d-flex justify-content-center justify-content-lg-end  py-0 py-sm-3'>
                            <img src="/images/logo.png" alt="SEDA logo" style={{ maxHeight: "100px" }} className="img-fluid" />
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-5">
                        <h4>Welcome, {userDetails?.name}</h4>
                        <h6 className='text-capitalize'>{userDetails?.role === "superAdmin" ? "Super Admin" : userDetails?.role}</h6>
                        <p>{moment(new Date()).format("DD/MM/YYYY hh:mm A")}</p>
                    </div>

                    <div className="col-md-2">
                        <div>
                            {(() => {
                                switch (userDetails.role) {
                                    case 'user':
                                        return (
                                            <select class="form-select bg-success border-0 text-white" id='site-locations' name='siteLocations' onChange={handleSiteChange} aria-label="Select an admin" disabled>
                                                <option value={userDetails?.site?._id}>{userDetails?.site?.name}</option>
                                            </select>
                                        )
                                    case 'public':
                                        return (
                                            <select class="form-select bg-success border-0 text-white" id='site-locations' name='siteLocations' onChange={handleSiteChange} aria-label="Select an admin" disabled>
                                                <option value={userDetails?.site?._id}>{userDetails?.site?.name}</option>
                                            </select>
                                        )
                                    default:
                                        return (
                                            <select class="form-select bg-success border-0 text-white" id='site-locations' name='siteLocations' onChange={handleSiteChange} aria-label="Select an admin">
                                                <option label='Site Selector'></option>
                                                {userSites && userSites.length > 0 && userSites.map((item, index) => (
                                                    <option value={item._id} key={index}>{item.name}</option>
                                                ))}
                                            </select>
                                        )

                                }
                            })
                                ()}
                        </div>
                    </div>
                    <div className="col-md-2">
                        {location.pathname === "/" &&
                            <select class="form-select bg-success border-0 text-white" name='device' onChange={handleDeviceChange}>
                                <option >Device Selector</option>
                                {devices && devices.length > 0 && devices.map((item, index) => (
                                    <option value={item._id} key={index}>{item.name}</option>
                                ))}
                            </select>
                        }
                    </div>
                    <div className="col-md-2 d-flex justify-content-end align-items-center">
                        <img src={userDetails?.avatar} alt="" className='img-fluid rounded-circle' style={{ height: "80px", width: "80px" }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
