import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const SettingSidebarNav = () => {
    const userDetails = useSelector((state) => state.user.userDetails);
    return (
        <div>
            <h3 className='mb-4'>Settings</h3>
            {(() => {
                switch (userDetails.role) {
                    case 'superAdmin':
                        return (
                            <ul className="list-group mb-3">
                                <li className='list-group-item'><Link to='/settings' className='text-dark text-decoration-none'>Change Password</Link></li>
                                <li className='list-group-item'><Link to='/electricity-tariff' className='text-dark text-decoration-none'>Electricity Tariff</Link></li>
                                <li className='list-group-item'><Link to='/parameters' className='text-dark text-decoration-none'>Manage Parameters</Link></li>
                                <li className='list-group-item'><Link to='/formulas' className='text-dark text-decoration-none'>Manage Formulas</Link></li>
                                <li className='list-group-item'><Link to='/dashboard-settings' className='text-dark text-decoration-none'>Dashboard Settings</Link></li>
                                <li className='list-group-item'><Link to='/building-background-types' className='text-dark text-decoration-none'>Building Background Types</Link></li>
                            </ul>
                        )
                    case 'installer':
                        return (
                            <ul className="list-group mb-3">
                                <li className='list-group-item'><Link to='/settings' className='text-dark text-decoration-none'>Change Password</Link></li>
                            </ul>
                        )
                    case 'admin':
                        return (
                            <ul className="list-group mb-3">
                                <li className='list-group-item'><Link to='/settings' className='text-dark text-decoration-none'>Change Password</Link></li>
                                <li className='list-group-item'><Link to='/electricity-tariff' className='text-dark text-decoration-none'>Electricity Tariff</Link></li>
                                <li className='list-group-item'><Link to='/system-computation' className='text-dark text-decoration-none'>System Computation</Link></li>
                                <li className='list-group-item'><Link to='/dashboard-settings' className='text-dark text-decoration-none'>Dashboard Settings</Link></li>
                            </ul>
                        )
                    case 'user':
                        return (
                            <ul className="list-group mb-3">
                                <li className='list-group-item'><Link to='/settings' className='text-dark text-decoration-none'>Change Password</Link></li>
                                <li className='list-group-item'><Link to='/electricity-tariff' className='text-dark text-decoration-none'>Electricity Tariff</Link></li>
                            </ul>
                        )
                    case 'public':
                        return (
                            <ul className="list-group mb-3">
                                <li className='list-group-item'><Link to='/settings' className='text-dark text-decoration-none'>Change Password</Link></li>
                                <li className='list-group-item'><Link to='/electricity-tariff' className='text-dark text-decoration-none'>Electricity Tariff</Link></li>
                            </ul>
                        )
                    default:
                        return
                }
            })
                ()}

        </div>
    );
}

export default SettingSidebarNav;
