import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
    const Params = useParams()
    const token = Params.token
    const [ErrorMessage, setErrorMessage] = useState();
    const [SuccessMessage, setSuccessMessage] = useState();
    const [resetPasswordData, setResetPasswordData] = useState({
        password: "",
        repeatPassword:""
    });
    const { password, repeatPassword } = resetPasswordData
    const onInputChange = e => {
        setResetPasswordData({ ...resetPasswordData, [e.target.name]: e.target.value });
    };
    const SubmitHandler = async (e) => {
        e.preventDefault();
        // const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/reset-password`, resetPasswordData, { withCredentials: true }).catch(function (error) {
        //     if (error.response) {
        //         console.log(error.response.data);
        //         console.log(error.response.status);
        //         if (error.response.status === 401 || 500) {
        //             setErrorMessage("Email Not Found!")
        //             setTimeout(() => {
        //                 setErrorMessage()
        //             }, 2000)
        //         }
        //         console.log(error.response.headers);
        //     }
        // });
        // const data = response.data
        // if (data) {
        //     setSuccessMessage("A password reset link sent to your email account")
        // } else {

        // }
    }

    return (
        <div className='content-wrapper'>
            <div className='SignIn-wrapper'>
                <div className="card-signIn">
                    <div className="row signIn-top">
                        <div className="col-md-12">
                            <h2 className='text-white mx-3 mt-2'>ONLINE ENERGY MONITORING CLOUD PLATFORM</h2>
                            <p className='text-white mx-3'>PIHAK BERKUASA PEMBANGUNAN TENAGA LESTARI SUSTAINABLE ENERGY DEVELOPMENT AUTHORITY (SEDA) MALAYSIA</p>
                        </div>
                    </div>
                    <div className="row d-flex algin-items-center mt-3 mt-xl-5 mb-auto mx-0 mx-xl-5">
                        <div className="col-md-6 col-lg-5 col-xl-6">
                            <div className="mb-5 d-flex justify-content-md-start login-logo">
                                <img src="/images/logo.png" alt="SEDA Logo" className='img-fluid' />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-7 col-xl-6">
                            <h3 className='mt-sm-3 mb-3'>Reset Password</h3>
                            {/* {ErrorMessage && <div className="alert alert-danger" role="alert">{ErrorMessage} </div>}
                            {SuccessMessage && <div className="alert alert-success" role="alert">{SuccessMessage} </div>} */}
                            <form onSubmit={SubmitHandler}>
                                <div className="row mb-3">
                                    <label for="password" className="col-sm-4 col-md-4 col-form-label">New Password</label>
                                    <div className="col-sm-6 col-md-8">
                                        <input type="password" name='password' value={password} onChange={e => onInputChange(e)} className="form-control" id="password" placeholder="Enter New Password" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label for="repeatPassword" className="col-sm-4 col-md-4 col-form-label">Repeat Password</label>
                                    <div className="col-sm-6 col-md-8">
                                        <input type="password" name='repeatPassword' value={repeatPassword} onChange={e => onInputChange(e)} className="form-control" id="repeatPassword" placeholder="Repeat New Password" />
                                    </div>
                                </div>
                                <div className="mb-3 float-end">
                                    <button className='btn btn-primary px-5 me-2' type='submit'>Submit</button>
                                    <Link to="/" className='btn btn-secondary'>Cancel</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="row bg-light py-2">
                        <div className="col-md-6 col-md-6 d-flex justify-content-center justify-content-md-start">
                            <h6 className='ms-2 fw-bolder' style={{ color: "#00205b" }}>SEDA MALAYSIA</h6>
                        </div>
                        <div className="col-md-6 d-flex justify-content-center justify-content-md-end">
                            <p className='me-2 mb-0 fw-bolder'>Version 1.0 | {new Date().getFullYear()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
