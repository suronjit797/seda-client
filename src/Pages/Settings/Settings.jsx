import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SettingSidebarNav from '../../Components/Settings/SettingSidebarNav';
import { BsEye, BsEyeSlash } from "react-icons/bs"
import axios from 'axios';
import Swal from "sweetalert2";

const Settings = () => {
    const [ErrorMessageNotMatch, setErrorMessageNotMatch] = useState();
    const [isActive, setIsActive] = useState(false);
    const [currentPasswordShown, setCurrentPasswordShown] = useState(false);
    const toggleCurrentPassword = () => { setCurrentPasswordShown(!currentPasswordShown); };
    const [newPasswordShown, setNewPasswordShown] = useState(false);
    const toggleNewPasswordShown = () => { setNewPasswordShown(!newPasswordShown); };
    const [repeatPasswordShown, setRepeatPasswordShown] = useState(false);
    const toggleRepeatPasswordShown = () => { setRepeatPasswordShown(!repeatPasswordShown); };
    const [userData, setUserData] = useState({
        currentPassword: "",
        password: "",
        repeatPassword: ""
    });
    const { currentPassword, password, repeatPassword } = userData;
    const onInputChange = e => {
        if (e.target.name === "repeatPassword") {
            setUserData({ ...userData, [e.target.name]: e.target.value });
            if (password === e.target.value) {
                setErrorMessageNotMatch()
                setIsActive(true)
            } else {
                setErrorMessageNotMatch("Both Passwords Are Not Matching")
            }
        } else {
            setUserData({ ...userData, [e.target.name]: e.target.value });
        }
    };
    useEffect(() => {
        document.title = "SEDA - Settings"
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Are you sure?",
            text: "You want to update password?",
            //icon: "warning",
            dangerMode: true,
            showCancelButton: true,
            confirmButtonText: 'Confirm'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(`${process.env.REACT_APP_API_URL}/users/me/change-password`, userData, { withCredentials: true }).then(res => {
                    Swal.fire({
                        title: "Done!",
                        text: "Password Updated Successfully",
                        icon: "success",
                        timer: 2000,
                        button: false
                    })
                    setUserData({});
                }).catch(function (error) {
                    if(error){
                     Swal.fire({
                         title: "Cancelled!",
                         text: "Current password not matched",
                         icon: "error",
                         timer: 2000,
                         button: false
                     })
                    }
                 });
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {

            }
        })


    }

    return (
        <div className='settings'>
            <div className="container-fluid">
                <div className="row my-5">
                    <div className="col-md-2">
                        <SettingSidebarNav />
                    </div>
                    <div className="col-md-10">
                        <div className="card p-3 mb-3">
                            <h3>Change Password</h3>
                            <div className="row mt-4">
                                <div className="col-md-6">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label for="currentPassword" class="form-label">Current Password</label>
                                            <div className="input-group">
                                                <input type={currentPasswordShown ? "text" : "password"} name='currentPassword' value={currentPassword} minlength="6" onChange={onInputChange} class="form-control" id="currentPassword" placeholder='Enter your current password' required />
                                                <span class="input-group-text" id="basic-addon1">{currentPasswordShown ? <BsEyeSlash onClick={() => toggleCurrentPassword()} /> : <BsEye onClick={() => toggleCurrentPassword()} />}</span>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label for="password" class="form-label">New Password</label>
                                            <div className="input-group">
                                                <input type={newPasswordShown ? "text" : "password"} name='password' value={password} onChange={onInputChange} minlength="6" class="form-control" id="password" placeholder='Enter a new password' required />
                                                <span class="input-group-text" id="basic-addon1">{newPasswordShown ? <BsEyeSlash onClick={() => toggleNewPasswordShown()} /> : <BsEye onClick={() => toggleNewPasswordShown()} />}</span>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label for="repeatPassword" class="form-label">Retype New Password</label>
                                            <div className="input-group">
                                                <input type={repeatPasswordShown ? "text" : "password"} name='repeatPassword' value={repeatPassword} minlength="6"  onChange={onInputChange} class="form-control" id="repeatPassword" placeholder='Retype the new password' required />
                                                <span class="input-group-text" id="basic-addon1">{repeatPasswordShown ? <BsEyeSlash onClick={() => toggleRepeatPasswordShown()} /> : <BsEye onClick={() => toggleRepeatPasswordShown()} />}</span>
                                            </div>
                                            {ErrorMessageNotMatch && <div className="alert alert-danger" role="alert">{ErrorMessageNotMatch} </div>}
                                        </div>
                                        <div className='float-end'>
                                            {isActive ?
                                                <button type="submit" class="btn btn-success me-2">Update</button>
                                                :
                                                <button type="submit" class="btn btn-success me-2" disabled>Update</button>
                                            }
                                            <Link to="/" className='btn btn-secondary'>Cancel</Link>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-md-6">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;
