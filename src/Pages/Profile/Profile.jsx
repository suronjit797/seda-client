import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Profile = () => {
    const userDetails = useSelector(state => state.user?.userDetails)

    useEffect(() => {
        document.title = "SEDA - Profile"
    }, []);
    return (
        <div className='profile'>
            <div className="container-fluid">
                <div className="row my-5 vh60">
                    <div className="col-md-2">

                    </div>
                    <div className="col-md-10">
                        <div className="card p-3 mb-3">
                            <h3 className='mb-4'>Profile</h3>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="row mb-2">
                                        <div className="col-4">Full Name</div>
                                        <div className="col-8">: {userDetails?.name}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-4">Email</div>
                                        <div className="col-8">: {userDetails?.email}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-4">Phone Number</div>
                                        <div className="col-8">: +6{userDetails?.phone}</div>
                                    </div>
{/*                                     <div className="row mb-2">
                                        <div className="col-4">Fax Number</div>
                                        <div className="col-8">: +6{userDetails?.fax}</div>
                                    </div> */}
                                    <div className="row mb-2 mt-3">
                                        <div className="col-4">Profile Photo</div>
                                        <div className="col-8">
                                            {userDetails?.avatar &&
                                                <img src={userDetails?.avatar} alt="logo" className='rounded' style={{ height: "150px" }} />
                                            }
                                        </div>
                                    </div>
                                    <div className="float-end">
                                        <Link to="/edit-profile" className='btn btn-success me-1'>Edit</Link>
                                        <Link to="/" className='btn btn-secondary'>Back</Link>
                                    </div>
                                </div>
                                <div className="col-md-6"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default Profile;
