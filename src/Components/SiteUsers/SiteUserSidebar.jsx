import React from 'react';
import { Link } from 'react-router-dom';

const SiteUserSidebar = () => {
    return (
        <div>
            <div>
                <h3 className='mb-4'>Manage Site Users</h3>
                <ul className="list-group mb-3">
                    <li className='list-group-item'><Link to='/site-users' className='text-dark text-decoration-none'>All Site Users</Link></li>
                    <li className='list-group-item'><Link to='/add-site-user' className='text-dark text-decoration-none'>Add Site User</Link></li>
                </ul>
            </div>
        </div>
    );
}

export default SiteUserSidebar;
