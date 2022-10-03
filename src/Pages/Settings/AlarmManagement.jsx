import React from 'react';
import SettingSidebarNav from '../../Components/Settings/SettingSidebarNav';

const AlarmManagement = () => {
    return (
        <div className='settings'>
            <div className="container-fluid">
                <div className="row my-5 vh60">
                    <div className="col-md-2">
                        <SettingSidebarNav />
                    </div>
                    <div className="col-md-10">
                        <div className="card p-3 mb-3">
                            <h3>Alarm Management</h3>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AlarmManagement;
