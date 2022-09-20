import React from 'react';
import { Link } from 'react-router-dom';

const InstallerSidebarNav = () => {
    return (
        <div>
            <h3 className='mb-4'>Manage Installer</h3>
            <ul className="list-group mb-3">
                <li className='list-group-item'><Link to='/installers' className='text-dark text-decoration-none'>All Installer</Link></li>
                <li className='list-group-item'><Link to='/add-installer' className='text-dark text-decoration-none'>Add New Installer</Link></li>
            </ul>
        </div>
    );
}

export default InstallerSidebarNav;
