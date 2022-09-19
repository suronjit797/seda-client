import React from 'react';
import { Link } from 'react-router-dom';

const Installers = () => {
    return (
        <div className='installer'>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <h3 className='mt-2'>Manage Installer</h3>
                        <ul className="list-group mb-3">
                            <li className='list-group-item'><Link to='/installers' className='text-dark text-decoration-none'>All Installer</Link></li>
                            <li className='list-group-item'><Link to='/add-installer' className='text-dark text-decoration-none'>Add New Installer</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-10">
                        <div className="card mt-5 p-3 mb-3">
                            <h3>Installers</h3>

                            <p>Installer table will show here</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Installers;
