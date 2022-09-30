import React from 'react';
import { Link } from 'react-router-dom';

const SettingSidebarNav = () => {
    return (
        <div>
            <h3 className='mb-4'>Settings</h3>
            <ul className="list-group mb-3">
                <li className='list-group-item'><Link to='/settings' className='text-dark text-decoration-none'>Change Password</Link></li>
                <li className='list-group-item'><Link to='/electricity-tariff' className='text-dark text-decoration-none'>Electricity Tariff</Link></li>
                <li className='list-group-item'><Link to='/system-computation' className='text-dark text-decoration-none'>System Computation</Link></li>
                <li className='list-group-item'><Link to='/dashboard-settings' className='text-dark text-decoration-none'>Dashboard Settings</Link></li>
                <li className='list-group-item'><Link to='/alarm-management' className='text-dark text-decoration-none'>Alarm Management</Link></li>
                <li className='list-group-item'><Link to='/building-background-types' className='text-dark text-decoration-none'>Building Background Types</Link></li>
            </ul>
        </div>
    );
}

export default SettingSidebarNav;
