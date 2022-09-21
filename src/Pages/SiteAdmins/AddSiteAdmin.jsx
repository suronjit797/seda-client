import React from 'react';
import SiteAdminSidebarNav from '../../Components/SiteAdmins/SiteAdminSidebarNav';

const AddSiteAdmin = () => {
    return (
        <div className='add-installer'>
            <div className="container-fluid">
                <div className="row my-5">
                    <div className="col-md-2">
                        <SiteAdminSidebarNav/>
                    </div>
                    <div className="col-md-10">
                        <div className="card p-3">
                            <h3>Add New Site Admin</h3>
                            {/* <div className='d-flex justify-content-center'>
                                {isLoading && <Spinner animation="border" variant="dark" />}
                            </div>
                            {SuccessMessage && <div className="alert alert-success" role="alert">{SuccessMessage} </div>} */}
                            <form>
                               form will show here
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddSiteAdmin;
