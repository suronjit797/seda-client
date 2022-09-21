import React from 'react';
import { Link } from 'react-router-dom';

const SiteAdminSidebarNav = () => {
    return (
        <div>
            <h3 className='mb-4'>Manage Site Admins</h3>
            <ul className="list-group mb-3">
                <li className='list-group-item'><Link to='/admins' className='text-dark text-decoration-none'>All Site Admins</Link></li>
                <li className='list-group-item'><Link to='/add-admins' className='text-dark text-decoration-none'>Add New Admin</Link></li>
            </ul>
        </div>
    );
}

export default SiteAdminSidebarNav;
