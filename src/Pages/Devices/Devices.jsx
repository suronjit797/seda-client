import React, {useState, useEffect} from 'react';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DevicesSidebar from '../../Components/Devices/DevicesSidebar';

const Devices = () => {
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
       document.title= "SEDA - Devices"
    }, []);
    return (
        <div className='devices'>
        <div className="container-fluid">
            <div className="row my-5">
                <div className="col-md-2">
                    <DevicesSidebar/>
                </div>
                <div className="col-md-10">
                    <div className="card p-3 mb-3">
                        <div className="row">
                            <div className="col-md-6"><h3>All Devices</h3></div>
                            <div className="col-md-6 d-flex justify-content-end"><Link to="/" className="btn btn-secondary">Back</Link></div>
                        </div>
                        <div className='d-flex justify-content-center'>
                            {isLoading && <Spinner animation="border" variant="dark" />}
                        </div>
                        {/* <DataTable
                            columns={columns}
                            data={users}
                            pagination
                            striped
                            paginationPerPage={10}
                            paginationRowsPerPageOptions={[10, 20, 50]}
                        /> */}
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Devices;
