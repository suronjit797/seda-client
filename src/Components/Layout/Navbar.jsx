import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setIsLogged, setUserDetails } from '../../redux/userSlice';
import Dropdown from 'react-bootstrap/Dropdown';
import "./Layout.css"
import Swal from "sweetalert2";

const Navbar = ({ handle }) => {
    const ref = useRef()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [ToggleNav, setToggleNav] = useState(false);
    const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
    const userDetails = useSelector((state) => state.user.userDetails);
    const toggleDropdown = () => setDropdownIsOpen(!dropdownIsOpen)

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
                        window.localStorage.clear()
                        navigate("/")
                    });
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {

            }
        })
    }
    useEffect(() => {
        const checkIfClickedOutside = e => {
            // If the menu is open and the clicked target is not within the menu,
            // then close the menu
            if (dropdownIsOpen && ref.current && !ref.current.contains(e.target)) {
                setDropdownIsOpen(false)
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [dropdownIsOpen])
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
                        {(() => {
                            switch (userDetails.role) {
                                case 'superAdmin':
                                    return (
                                        <li class="nav-item dropdown">
                                            <Dropdown show={dropdownIsOpen}>
                                                <Dropdown.Toggle id="dropdown-basic" className='bg-transparent text-dark border-0 fw-semibold' onClick={(e) => toggleDropdown()}>
                                                    Users
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu onClick={(e) => toggleDropdown()} ref={ref}>
                                                    <Link to='/users' className='dropdown-item'>Manage All Users</Link>
                                                    <Link to='/installers' className='dropdown-item'>Manage Installers</Link>
                                                    <Link to="/admins" className='dropdown-item'>Manage Admins</Link>
                                                    <Link to="/site-users" className='dropdown-item'>Manage Site Users</Link>
                                                    <Link to="/public-users" className='dropdown-item'>Manage Public Users</Link>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </li>
                                    )
                                case 'installer':
                                    return (
                                        <li class="nav-item">
                                            <Link to='/site-locations' className='nav-link'>Site Locations</Link>
                                        </li>
                                    )
                                case 'admin':
                                    return (
                                        <li class="nav-item dropdown">
                                            <Dropdown show={dropdownIsOpen}>
                                                <Dropdown.Toggle id="dropdown-basic" className='bg-transparent text-dark border-0 fw-semibold' onClick={(e) => toggleDropdown()}>
                                                    Users
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu onClick={(e) => toggleDropdown()} ref={ref}>
                                                    <Link to='/users' className='dropdown-item'>Manage All Users</Link>
                                                    <Link to='/installers' className='dropdown-item'>Manage Installers</Link>
                                                    <Link to='/site-locations' className='dropdown-item'>Manage Site Locations</Link>
                                                    <Link to="/site-users" className='dropdown-item'>Manage Site Users</Link>
                                                    <Link to="/public-users" className='dropdown-item'>Manage Public Users</Link>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </li>
                                    );
                                case 'user':
                                    return
                                case 'public':
                                    return
                            }
                        })
                            ()}
                        <li class="nav-item">
                            <Link to='/devices' className='nav-link'>Devices</Link>
                        </li>
                        <li class="nav-item">
                            <Link to='/analysis-reporting' className='nav-link'>Analysis &amp; Reporting</Link>
                        </li>
                        <li class="nav-item">
                            {handle.active ? <button class="nav-link border-0 bg-transparent" onClick={handle.exit}>Exit</button> : <button class="nav-link border-0 bg-transparent" onClick={handle.enter}>Display</button>}
                        </li>
                        <li class="nav-item">
                            <Link to="/settings" class="nav-link">Settings</Link>
                        </li>
                        <li class="nav-item">
                            <Link to='/profile' className='nav-link'>Profile</Link>
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
