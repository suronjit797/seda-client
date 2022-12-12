import React from 'react';
import NotificationSidebar from '../../Components/Notifications/NotificationSidebar';

const RecipientList = () => {
    return (
        <div className='settings'>
            <div className="container-fluid">
                <div className="row my-5 vh60">
                    <div className="col-md-2">
                        <NotificationSidebar />
                    </div>
                    <div className="col-md-10">
                        <div className="card p-3 mb-3">
                            <h3>Notification Recipient List</h3>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecipientList;
