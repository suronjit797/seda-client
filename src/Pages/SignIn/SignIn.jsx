import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setIsLogged, setUserDetails } from '../../redux/userSlice';
import './signin.css';
const SignIn = () => {
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
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, login, { withCredentials: true });
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
                    <div className="row d-flex algin-items-center mt-5 mb-auto mx-sm-0 mx-md-5">
                        <div className="col-md-6">
                            <div className="mb-5 d-flex justify-content-md-start login-logo">
                                <img src="/images/logo.png" alt="SEDA Logo" className='img-fluid' />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <h3 className='mt-sm-3'>Welcome Back</h3>
                            <form onSubmit={SubmitHandler}>
                                <div className="row mb-3">
                                    <label for="email" className="col-sm-2 col-form-label">Email</label>
                                    <div className="col-sm-10">
                                        <input type="email" name='email' value={email} onChange={e => onInputChange(e)} className="form-control" id="email" placeholder="Enter Your Email Address" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label for="password" className="col-sm-2 col-form-label">Password</label>
                                    <div className="col-sm-10">
                                        <input type="password" name='password' value={password} onChange={e => onInputChange(e)} className="form-control" id="password" placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;" />
                                        <label htmlFor="forgot" className='float-end'><u>Forgot Password?</u></label>
                                    </div>
                                </div>
                                <div className=" mb-3">
                                    <button className='btn btn-primary px-5' type='submit'>Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
