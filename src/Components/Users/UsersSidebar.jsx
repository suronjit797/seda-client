import React from 'react';
import { Link } from 'react-router-dom';

const UsersSidebar = () => {
    return (
        <div>
            <h3 className='mb-4'>Manage All Users</h3>
            <ul className="list-group mb-3">
                <li className='list-group-item'><Link to='/users' className='text-dark text-decoration-none'>All Users</Link></li>
            </ul>
        </div>
    );
}

export default UsersSidebar;
