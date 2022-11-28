import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsEye, BsEyeSlash } from "react-icons/bs"
import axios from 'axios';

const InstallerSignUp = () => {
    const [ErrorMessage, setErrorMessage] = useState();
    const [SuccessMessage, setSuccessMessage] = useState();
    const navigate = useNavigate()
    const [PasswordShown, setPasswordShown] = useState(false);
    const togglePassword = () => { setPasswordShown(!PasswordShown); };
    const [installerData, setInstallerData] = useState({
        name: "",
        role:"installer",
        email: "",
        password: "",
        phone: "",
        companyName: "",
        companyAddress: "",
        isActive: false
    });
    const { name, email, password, phone, fax, companyName, companyAddress } = installerData

    const onInputChange = e => {
        setInstallerData({ ...installerData, [e.target.name]: e.target.value });
    };

    const SubmitHandler = async (e) => {
        e.preventDefault();
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/register`, installerData, { withCredentials: true }).catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                if (error.response.status === 401 || 500) {
                    setErrorMessage("Email Already Used!")
                    setTimeout(() => {
                        setErrorMessage()
                    }, 2000)
                }
                console.log(error.response.headers);
            }
        });
        const data = response.data
        if (data) {
            setSuccessMessage("Your registration is successful and pending approval by admin.")
            setTimeout(() => {
                setSuccessMessage()
                navigate('/')
            }, 2000)
        } else {
        }
    }
    let background = '/images/bg-3.jpg'
    return (
        <div className='content-wrapper' style={{ backgroundImage: `url(${background})` }}>
            <div className='SignIn-wrapper'>
                <div className="card-signIn">
                    <div className="row signIn-top">
                        <div className="col-md-12">
                            <h2 className='text-white mx-3 mt-2'>ONLINE ENERGY MONITORING CLOUD PLATFORM</h2>
                            <p className='text-white mx-3'>PIHAK BERKUASA PEMBANGUNAN TENAGA LESTARI SUSTAINABLE ENERGY DEVELOPMENT AUTHORITY (SEDA) MALAYSIA</p>
                        </div>
                    </div>
                    <div className="row d-flex algin-items-center mt-3 mt-xl-5 mb-auto mx-0 mx-xl-5">
                        <div className="col-md-4 col-lg-5 col-xl-4">
                            <div className="mb-5 d-flex justify-content-md-start login-logo">
                                <img src="/images/logo.png" alt="SEDA Logo" className='img-fluid' />
                            </div>
                        </div>
                        <div className="col-md-8 col-lg-7 col-xl-8">
                            <h3 className='mt-sm-3 mb-3'>Installer Registration</h3>
                            {ErrorMessage && <div className="alert alert-danger" role="alert">{ErrorMessage} </div>}
                            {SuccessMessage && <div className="alert alert-success" role="alert">{SuccessMessage} </div>}
                            <form onSubmit={SubmitHandler}>
                                <div className="row mb-3">
                                    <label for="name" className="col-sm-5 col-md-4 col-form-label">Full Name</label>
                                    <div className="col-sm-7 col-md-8">
                                        <input type="text" name='name' value={name} onChange={e => onInputChange(e)} className="form-control" id="name" placeholder="Enter Your Full Name" required />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label for="email" className="col-sm-5 col-md-4 col-form-label">Email</label>
                                    <div className="col-sm-7 col-md-8">
                                        <input type="email" name='email' value={email} onChange={e => onInputChange(e)} className="form-control" id="email" placeholder="Enter Your Email Address" required />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label for="password" className="col-sm-5 col-md-4 col-form-label">Password</label>
                                    <div className="col-sm-7 col-md-8">
                                        <div className="input-group">
                                            <input type={PasswordShown ? "text" : "password"} name='password' value={password} onChange={e => onInputChange(e)} className="form-control" id="password" placeholder="Enter Your Password" required />
                                            <span class="input-group-text" id="basic-addon1">{PasswordShown ? <BsEyeSlash onClick={() => togglePassword()} /> : <BsEye onClick={() => togglePassword()} />}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label for="phone" className="col-sm-5 col-md-4 col-form-label">Phone</label>
                                    <div className="col-sm-7 col-md-8">
                                        <input type="text" name='phone' value={phone} onChange={e => onInputChange(e)} className="form-control" id="phone" placeholder="Enter Your Phone Number" required />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label for="companyName" className="col-sm-5 col-md-4 col-form-label">Company Name</label>
                                    <div className="col-sm-7 col-md-8">
                                        <input type="text" name='companyName' value={companyName} onChange={e => onInputChange(e)} className="form-control" id="companyName" placeholder="Enter Your Company Name" required />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label for="companyAddress" className="col-sm-5 col-md-4 col-form-label">Company Address</label>
                                    <div className="col-sm-7 col-md-8">
                                        <input type="text" name='companyAddress' value={companyAddress} onChange={e => onInputChange(e)} className="form-control" id="companyAddress" placeholder="Enter Your Company Address" required />
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

export default InstallerSignUp;
