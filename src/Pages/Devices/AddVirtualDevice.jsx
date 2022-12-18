import React from 'react';
import DevicesSidebar from '../../Components/Devices/DevicesSidebar';

const AddVirtualDevice = () => {
    return (
        <div className='devices'>
            <div className="container-fluid">
                <div className="row my-5">
                    <div className="col-md-2">
                        <DevicesSidebar />
                    </div>
                    <div className="col-md-10">
                        <div className="card p-3 mb-3" style={{minHeight: "550px"}}>
                            <div className="row">
                                <div className="col-md-6"><h3 className='mb-4'>Add New Virtual Device</h3></div>
                            </div>
                            
                            coming soon
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddVirtualDevice;
