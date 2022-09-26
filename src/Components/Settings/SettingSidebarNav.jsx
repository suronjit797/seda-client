import React from 'react';
import { Link } from 'react-router-dom';

const SettingSidebarNav = () => {
    return (
        <div>
            <h3 className='mb-4'>Settings</h3>
            <ul className="list-group mb-3">
                <li className='list-group-item'><Link to='/settings' className='text-dark text-decoration-none'>Basic Settings</Link></li>
                <li className='list-group-item'><Link to='/building-background-types' className='text-dark text-decoration-none'>Building Background Types</Link></li>
            </ul>
        </div>
    );
}

export default SettingSidebarNav;
