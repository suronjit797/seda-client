import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const DevicesSidebar = () => {
    const userDetails = useSelector((state) => state.user.userDetails);
    return (

        <div>
            <h3 className='mb-4'>Manage Devices</h3>
            {(() => {
                switch (userDetails.role) {
                    case 'superAdmin':
                        return (
                            <ul className="list-group mb-3">
                                <li className='list-group-item'><Link to='/devices' className='text-dark text-decoration-none'>All Devices</Link></li>
                                <li className='list-group-item'><Link to='/device-types' className='text-dark text-decoration-none'>Manage Device Types</Link></li>
                                <li className='list-group-item'><Link to='/add-device' className='text-dark text-decoration-none'>Add New Device</Link></li>
                                <li className='list-group-item'><Link to='/add-virtual-device' className='text-dark text-decoration-none'>Add Virtual Device</Link></li>
                            </ul>
                        )
                    case 'installer':
                        return (
                            <ul className="list-group mb-3">
                                <li className='list-group-item'><Link to='/devices' className='text-dark text-decoration-none'>All Devices</Link></li>
                                <li className='list-group-item'><Link to='/add-device' className='text-dark text-decoration-none'>Add New Device</Link></li>
                                <li className='list-group-item'><Link to='/add-virtual-device' className='text-dark text-decoration-none'>Add Virtual Device</Link></li>
                            </ul>
                        )
                    case 'admin':
                        return (
                            <ul className="list-group mb-3">
                            <li className='list-group-item'><Link to='/devices' className='text-dark text-decoration-none'>All Devices</Link></li>
                            <li className='list-group-item'><Link to='/add-device' className='text-dark text-decoration-none'>Add New Device</Link></li>
                            <li className='list-group-item'><Link to='/add-virtual-device' className='text-dark text-decoration-none'>Add Virtual Device</Link></li>
                        </ul>
                        )
                    case 'user':
                        return (
                            <ul className="list-group mb-3">
                                <li className='list-group-item'><Link to='/devices' className='text-dark text-decoration-none'>All Devices</Link></li>
                            </ul>
                        )
                    case 'public':
                        return (
                            <ul className="list-group mb-3">
                                <li className='list-group-item'><Link to='/devices' className='text-dark text-decoration-none'>All Devices</Link></li>
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

export default DevicesSidebar;
