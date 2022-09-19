import React from 'react';
import { useSelector } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';

const Header = () => {
    const userDetails = useSelector((state) => state.user.userDetails);
    return (
        <div className='header'>
            <div className="container-fluid bg-warning py-2 ">
                <div className="row d-flex align-items-center">
                    <div className="col-md-2">
                        <img src="/images/logo.png" alt="SEDA logo" style={{ maxHeight: "100px" }} />
                    </div>
                    <div className="col-md-4">
                        <h4>Welcome, {userDetails?.name}</h4>
                        <h6>{userDetails?.role === "superAdmin" ? "Super Admin" : userDetails?.role}</h6>
                        <p>{new Date().getDate()}/{new Date().getMonth()}/{new Date().getFullYear()} - {new Date().getHours()}:{new Date().getMinutes()}</p>
                    </div>
                    <div className="col-md-2">
                        <Dropdown className=''>
                            <Dropdown.Toggle variant="success" id="dropdown-basic" className='w-100'>
                                Site Selector
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
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
