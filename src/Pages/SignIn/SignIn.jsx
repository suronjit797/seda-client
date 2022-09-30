import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setIsLogged, setUserDetails } from '../../redux/userSlice';
import './signin.css';
const SignIn = () => {
    const [ErrorMessage, setErrorMessage] = useState();
    const [login, setLogin] = useState({
        email: "",
        password: ""
    });
    const { email, password } = login
    const onInputChange = e => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    };
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const SubmitHandler = async (e) => {
        e.preventDefault();
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, login, { withCredentials: true }).catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                if (error.response.status === 401 || 500) {
                    setErrorMessage("Credentials information wrong!")
                    setTimeout(() => {
                        setErrorMessage()
                    }, 2000)
                }
                console.log(error.response.headers);
            }
        });
        const data = response.data
        if (data) {
            dispatch(setIsLogged(true))
            const userResponse = await axios.get(`${process.env.REACT_APP_API_URL}/users/me`, { withCredentials: true })
            if (userResponse) {
                console.log(userResponse.data)
                dispatch(setUserDetails(userResponse.data))
                navigate("/")
            }
        } else {

        }
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
                            <h3 className='mt-sm-3 mb-3'>Welcome Back</h3>
                            {ErrorMessage && <div className="alert alert-danger" role="alert">{ErrorMessage} </div>}
                            <form onSubmit={SubmitHandler}>
                                <div className="row mb-3">
                                    <label for="email" className="col-sm-4 col-md-3 col-form-label">Email</label>
                                    <div className="col-sm-6 col-md-9">
                                        <input type="email" name='email' value={email} onChange={e => onInputChange(e)} className="form-control" id="email" placeholder="Enter Your Email Address" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label for="password" className="col-sm-4 col-md-3 col-form-label">Password</label>
                                    <div className="col-sm-6 col-md-9">
                                        <input type="password" name='password' value={password} onChange={e => onInputChange(e)} className="form-control" id="password" placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;" />
                                        <Link to="/forgot-password"><label htmlFor="forgot" className='float-end'><u>Forgot Password?</u></label></Link>
                                    </div>
                                </div>
                                <div className=" mb-3">
                                    <button className='btn btn-primary px-5' type='submit'>Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="row bg-light py-2">
                        <div className="col-md-6 col-md-6 d-flex justify-content-center justify-content-md-start">
                            <h6 className='ms-2 fw-bolder' style={{color:"#00205b"}}>SEDA MALAYSIA</h6>
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

export default SignIn;
