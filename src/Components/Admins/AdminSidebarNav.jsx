import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const AdminSidebarNav = () => {
    const userDetails = useSelector((state) => state.user.userDetails);
    return (
        <div>

            {(() => {
                switch (userDetails.role) {
                    case 'superAdmin':
                        return (
                            <>
                                <h3 className='mb-4'>Manage Site Admins</h3>
                                <ul className="list-group mb-3">
                                    <li className='list-group-item'><Link to='/admins' className='text-dark text-decoration-none'>All Site Admins</Link></li>
                                    <li className='list-group-item'><Link to='/add-admins' className='text-dark text-decoration-none'>Add New Admin</Link></li>
                                    <li className='list-group-item'><Link to='/site-locations' className='text-dark text-decoration-none'>All Site Locations</Link></li>
                                    <li className='list-group-item'><Link to='/add-location' className='text-dark text-decoration-none'>Add A Site Location</Link></li>
                                </ul>
                            </>
                        )
                    case 'installer':
                        return (
                            <>
                                <h3 className='mb-4'>Manage Site Locations</h3>
                                <ul className="list-group mb-3">
                                    <li className='list-group-item'><Link to='/site-locations' className='text-dark text-decoration-none'>All Site Locations</Link></li>
                                </ul>
                            </>
                        )
                    case 'admin':
                        return (
                            <ul className="list-group mb-3">
                                <li className='list-group-item'><Link to='/site-locations' className='text-dark text-decoration-none'>All Site Locations</Link></li>
                            </ul>
                        )
                    case 'user':
                        return (
                            <ul className="list-group mb-3">

                            </ul>
                        )
                    case 'public':
                        return (
                            <ul className="list-group mb-3">

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

export default AdminSidebarNav;
