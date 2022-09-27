import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import moment from 'moment';
import axios from 'axios';

const Header = () => {
    const userDetails = useSelector((state) => state.user.userDetails);
    const [siteLocations, setSiteLocations] = useState([]);
    const getSiteLocations = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/site-location`, { withCredentials: true })
        if (response) {
            setSiteLocations(response.data.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1))
        }
    }
    useEffect(() => {
        getSiteLocations()
    }, []);
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
                        <p>{moment(new Date()).format("DD/MM/YYYY hh:MM A")}</p>
                    </div>
                    <div className="col-md-2">
                        <select class="form-select bg-success border-0 text-white" id='site-locations' name='siteLocations' aria-label="Select an admin">
                            <option >Site Selector</option>
                            {siteLocations && siteLocations.length > 0 && siteLocations.map((item, index) => (
                                <option value={item._id} key={index}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-2">
                        <Dropdown className='mt-2 mt-md-0'>
                            <Dropdown.Toggle variant="success" id="dropdown-basic" className='w-100'>
                                Device Selector
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="col-md-2 d-flex justify-content-end">
                        <img src={userDetails?.avatar} alt="" className='img-fluid rounded-circle' style={{ maxHeight: "200px" }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
