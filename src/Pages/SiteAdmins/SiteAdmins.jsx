import React, {useState} from 'react';
import { Spinner } from 'react-bootstrap';
import SiteAdminSidebarNav from '../../Components/SiteAdmins/SiteAdminSidebarNav';

const SiteAdmins = () => {
    const [admins, setAdmins] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [SuccessMessage, setSuccessMessage] = useState();

    return (
        <div className='site-admins'>
            <div className="container-fluid">
                <div className="row my-5">
                    <div className="col-md-2">
                        <SiteAdminSidebarNav />
                    </div>
                    <div className="col-md-10">
                        <div className="card p-3 mb-3">
                            <h3>Site Admins</h3>
                            <div className='d-flex justify-content-center'>
                                {isLoading && <Spinner animation="border" variant="dark" />}
                            </div>
                            {SuccessMessage && <div className="alert alert-success" role="alert">{SuccessMessage} </div>}
                            {/* <DataTable
                                columns={columns}
                                data={installers}
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

export default SiteAdmins;
