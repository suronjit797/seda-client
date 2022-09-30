import React from 'react';
import { Link } from 'react-router-dom';

const DevicesSidebar = () => {
    return (
        <div>
            <h3 className='mb-4'>Manage Devices</h3>
            <ul className="list-group mb-3">
                <li className='list-group-item'><Link to='/devices' className='text-dark text-decoration-none'>All Devices</Link></li>
                <li className='list-group-item'><Link to='/add-device' className='text-dark text-decoration-none'>Add New Device</Link></li>
                <li className='list-group-item'><Link to='/device-types' className='text-dark text-decoration-none'>All Device Types</Link></li>
            </ul>
        </div>
    );
}

export default DevicesSidebar;
