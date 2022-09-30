import React from 'react';
import { Link } from 'react-router-dom';

const PublicUserSidebar = () => {
    return (
        <div>
            <h3 className='mb-4'>Manage Public Users</h3>
            <ul className="list-group mb-3">
                <li className='list-group-item'><Link to='/public-users' className='text-dark text-decoration-none'>All Public Users</Link></li>
                <li className='list-group-item'><Link to='/add-public-user' className='text-dark text-decoration-none'>Add Public User</Link></li>
            </ul>
        </div>
    );
}

export default PublicUserSidebar;
