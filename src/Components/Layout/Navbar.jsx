import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setIsLogged, setUserDetails } from '../../redux/userSlice';
import Dropdown from 'react-bootstrap/Dropdown';
import "./Layout.css"

const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [ToggleNav, setToggleNav] = useState(false);
    const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
    const logOut = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/logout`, { withCredentials: true })
            if (response.statusText === 'OK') {
                dispatch(setIsLogged(false))
                dispatch(setUserDetails({}))
                window.localStorage.clear()
                navigate("/")
            } else {

            }
        } catch (error) {
            console.log(error)
        }
    }
    const toggleDropdown = () => setDropdownIsOpen(!dropdownIsOpen)
    console.log(dropdownIsOpen)
    return (
        <nav class="navbar navbar-expand-lg navbar-bg p-0">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" onClick={(e) => setToggleNav(!ToggleNav)} data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div className={ToggleNav ? "collapse navbar-collapse show" : "collapse navbar-collapse"} id="navbarNavDropdown">
                    <ul class="navbar-nav top-nav">
                        <li class="nav-item">
                            <Link to='/' className="nav-link active">Main</Link>
                        </li>
                        <li class="nav-item dropdown">
                            <Dropdown show={dropdownIsOpen}>
                                <Dropdown.Toggle id="dropdown-basic" className='bg-transparent text-dark border-0 fw-semibold' onClick={(e)=>toggleDropdown()}>
                                    Users
                                </Dropdown.Toggle>
                                <Dropdown.Menu onClick={(e)=>toggleDropdown()}>
                                    <Link to='/installers' className='dropdown-item'>Manage Installers</Link>
                                    <Link to="/admins" className='dropdown-item'>Manage Admins</Link>
                                    <Link className='dropdown-item'>Manage Users</Link>
                                    <Link className='dropdown-item'>Manage Public</Link>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Devices</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Analysis &amp; Reporting</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Display</a>
                        </li>
                        <li class="nav-item">
                            <Link to="/settings" class="nav-link">Settings</Link>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Profile</a>
                        </li>
                        <li class="nav-item">
                            <button className='nav-link border-0 bg-transparent' onClick={() => logOut()}>Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
