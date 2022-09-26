import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebarNav = () => {
    return (
        <div>
            <h3 className='mb-4'>Manage Admins</h3>
            <ul className="list-group mb-3">
                <li className='list-group-item'><Link to='/admins' className='text-dark text-decoration-none'>All Site Admins</Link></li>
                <li className='list-group-item'><Link to='/add-admins' className='text-dark text-decoration-none'>Add New Admin</Link></li>
                <li className='list-group-item'><Link to='/site-locations' className='text-dark text-decoration-none'>Site Locations</Link></li>
                <li className='list-group-item'><Link to='/add-location' className='text-dark text-decoration-none'>Add A Site Location</Link></li>
            </ul>
        </div>
    );
}

export default AdminSidebarNav;
