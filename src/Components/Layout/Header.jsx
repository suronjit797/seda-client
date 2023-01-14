import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import axios from 'axios';
import { setCurrentSite, setSiteDetails, setCurrentDevice, setUserDetails, setIsLogged } from '../../redux/userSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { BsFillSunFill, BsMoonFill } from 'react-icons/bs';


const Header = ({ handle, isDark, setIsDark }) => {
    const navigate = useNavigate()
    const [devices, setDevices] = useState([]);
    const userDetails = useSelector((state) => state?.user?.userDetails);
    let userSites = useSelector((state) => state?.user?.userSites);
    const [template, setTemplate] = useState(1);
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
            dispatch(setCurrentDevice(response.data[0]))
        }
    }

    useEffect(() => {
        getSiteLocations(userDetails)
        setTemplate(userDetails?.dashboard || 1)
        // eslint-disable-next-line
    }, [userDetails]);
    useEffect(() => {
        if (userSites) {
            dispatch(setCurrentSite(userSites[0]))
            getDevices(userSites[0]?._id)
        }
        // eslint-disable-next-line
    }, [userSites]);

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
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/device/` + deviceId, { withCredentials: true })
        if (response) {
            dispatch(setCurrentDevice(response.data))
        }
    }

    const handleDashboardChange = async (e) => {
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/users/me`, { dashboard: e.target.value }, { withCredentials: true });
        if (response) {
            dispatch(setUserDetails(response.data))
        }
    }

    const logOut = async () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to logout.",
            //icon: "warning",
            dangerMode: true,
            showCancelButton: true,
            confirmButtonText: 'Confirm'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.get(`${process.env.REACT_APP_API_URL}/users/logout`, { withCredentials: true })
                    .then(res => {
                        dispatch(setIsLogged(false))
                        dispatch(setUserDetails({}))
                        dispatch(setCurrentSite({}))
                        dispatch(setSiteDetails({}))
                        dispatch(setCurrentDevice({}))
                        window.localStorage.clear()
                        navigate("/")
                    });
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {

            }
        })
    }

    let darkHandler = () => {
        setIsDark(!isDark)
        localStorage.setItem("isDark", !isDark)
    }



    let background = '/images/bg-3.jpg'
    return (
        <div className='header' style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover' }}>
            <div className="container-fluid py-2 text-white">
                <div className="row d-flex align-items-center">
                    <div className="col-sm-12 col-md-1">
                        <div className='d-flex justify-content-center justify-content-lg-end  py-0 py-sm-3'>
                            <img src="/images/logo.png" alt="SEDA logo" style={{ maxHeight: "100px" }} className="img-fluid" />
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-3">
                        <h5 className='mt-3'>Welcome, {userDetails?.name}</h5>
                        <h6 className='text-capitalize'>{userDetails?.role === "superAdmin" ? "Super Admin" : userDetails?.role}</h6>
                        <p>{moment(new Date()).format("DD/MM/YYYY hh:mm A")}</p>
                    </div>
                    <div className="col-md-2">
                        {(location.pathname === "/") && (() => {
                            switch (userDetails.role) {
                                case 'superAdmin':
                                    return (
                                        <select className="form-select bg-success border-0 text-white" id='site-locations' defaultValue={template} name='dashboard' onChange={handleDashboardChange} aria-label="Select Dashboard">
                                            {template === 1 ? <option value="1" selected>Dashboard 1</option> : <option value="1">Dashboard 1</option>}
                                            {template === 2 ? <option value="2" selected>Dashboard 2</option> : <option value="2">Dashboard 2</option>}
                                            {template === 3 ? <option value="3" selected>Dashboard 3</option> : <option value="3">Dashboard 3</option>}
                                            {template === 4 ? <option value="4" selected>Dashboard 4</option> : <option value="4">Dashboard 4</option>}
                                        </select>
                                    )
                                default:
                                    return (
                                        <select className="form-select bg-success border-0 text-white" id='site-locations' name='siteLocations' onChange={handleSiteChange} aria-label="Select an admin">
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
                    <div className="col-md-2">
                        <div>
                            {(location.pathname === "/" || location.pathname === "/analysis-reporting") && (() => {
                                switch (userDetails.role) {
                                    case 'user':
                                        return (
                                            <select className="form-select bg-success border-0 text-white" id='site-locations' name='siteLocations' onChange={handleSiteChange} aria-label="Select an admin" disabled>
                                                <option value={userDetails?.site?._id}>{userDetails?.site?.name}</option>
                                            </select>
                                        )
                                    case 'public':
                                        return (
                                            <select className="form-select bg-success border-0 text-white" id='site-locations' name='siteLocations' onChange={handleSiteChange} aria-label="Select an admin" disabled>
                                                <option value={userDetails?.site?._id}>{userDetails?.site?.name}</option>
                                            </select>
                                        )
                                    default:
                                        return (
                                            <select className="form-select bg-success border-0 text-white" id='site-locations' name='siteLocations' onChange={handleSiteChange} aria-label="Select an admin">
                                                <option disabled label='Site Selector'></option>
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
                        <div className="d-flex">
                            {location.pathname === "/" &&
                                <select className="form-select bg-success border-0 text-white me-3" name='device' onChange={handleDeviceChange}>
                                    <option disabled>Device Selector</option>
                                    {devices && devices.length > 0 && devices.map((item, index) => (
                                        <option value={item._id} key={index}>{item.name}</option>
                                    ))}
                                </select>
                            }

                        </div>
                    </div>
                    <div className="col-md-2 d-flex justify-content-end align-items-center">
                        {location.pathname === "/" && <button className='btn btn-warning me-5' onClick={handle.enter}>Display</button>}
                        <div>
                            <img src={userDetails?.avatar} alt="" className='img-fluid rounded-circle' style={{ height: "60px", width: "60px" }} />
                            <div className='text-center mt-2'>
                                <button className='btn btn-danger btn-sm' onClick={() => logOut()}>Logout</button>
                            </div>
                        </div>

                        <div className='ms-3 fs-5' onClick={darkHandler} style={{ cursor: 'pointer', userSelect: 'none' }}>
                            {
                                !!isDark ? <BsMoonFill /> : <BsFillSunFill />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
