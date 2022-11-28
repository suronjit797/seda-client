import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SettingSidebarNav from '../../Components/Settings/SettingSidebarNav';
import { setUserDetails } from '../../redux/userSlice';

const DashboardSettings = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [template, setTemplate] = useState(1);
    const userDetails = useSelector(state => state.user?.userDetails)
    const [SuccessMessage, setSuccessMessage] = useState();
    const [IsLoading, setIsLoading] = useState(false);

    useEffect(() => {
        document.title= "Dashboard Settings"
        if (userDetails) {
            setTemplate(userDetails?.dashboard || 1)
        }
    }, [userDetails]);

    const handleChangeTemplate = async () => {
        setIsLoading(true)
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/users/me`, { dashboard: template }, { withCredentials: true }).catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                if (error.response.status === 400 || 500) {
                    console.log(error)
                }
                console.log(error.response.headers);
            }
        });
        const data = response.data
        if (data) {
            setIsLoading(false)
            dispatch(setUserDetails(response.data))
            setSuccessMessage("Dashboard updated successfully")
            setTimeout(() => {
                setSuccessMessage()
                navigate("/")
            }, 3000)
            
        }
    }

    return (
        <div className='settings'>
            <div className="container-fluid">
                <div className="row my-5 vh60">
                    <div className="col-md-2">
                        <SettingSidebarNav />
                    </div>
                    <div className="col-md-10">
                        <div className="card p-3 mb-3">
                            <h3>Dashboard Settings</h3>
                            <h5>Choose a Template</h5>
                            <div className='d-flex justify-content-center'>
                                {IsLoading && <Spinner animation="border" variant="success" />}
                            </div>
                            {SuccessMessage && <div className="alert alert-success" role="alert">{SuccessMessage} </div>}
                            <div className="row mt-3">
                                <div className="col-md-3">
                                    <input class="form-check-input d-none" type="radio" value={1} name="dashboard" id="option1" onChange={() => setTemplate(1)} />
                                    <label class="form-check-label" for="option1">
                                        <div className={`${template === 1 ? 'text-center border border-3 border-success' : 'text-center'}`}>
                                            <img src="/images/1.png" alt="Dashboard 1" height={130} />
                                            <p>Dashboard 1</p>
                                        </div>
                                    </label>
                                </div>
                                <div className={`${userDetails?.role==="superAdmin" ? 'col-md-3' : 'd-none'}`}>
                                    <input class="form-check-input d-none" type="radio" value={2} name="dashboard" id="option2" onChange={() => setTemplate(2)} />
                                    <label class="form-check-label" for="option2">
                                        <div className={`${template === 2 ? 'text-center border border-3 border-success' : 'text-center'}`}>
                                            <img src="/images/2.png" alt="Dashboard 2" height={130} />
                                            <p>Dashboard 2 (Super Admin)</p>
                                        </div>
                                    </label>
                                </div>
                                <div className="col-md-3">
                                    <input class="form-check-input d-none" type="radio" value={3} name="dashboard" id="option3" onChange={() => setTemplate(3)} />
                                    <label class="form-check-label" for="option3">
                                        <div className={`${template === 3 ? 'text-center border border-3 border-success' : 'text-center'}`}>
                                            <img src="/images/3.png" alt="Dashboard 3" height={130} />
                                            <p>Dashboard 3</p>
                                        </div>
                                    </label>
                                </div>
                                <div className="col-md-3">
                                    <input class="form-check-input d-none" type="radio" value={4} name="dashboard" id="option4" onChange={() => setTemplate(4)} />
                                    <label class="form-check-label" for="option4">
                                        <div className={`${template === 4 ? 'text-center border border-3 border-success' : 'text-center'}`}>
                                            <img src="/images/4.png" alt="Dashboard 4" height={130} />
                                            <p>Dashboard 4</p>
                                        </div>
                                    </label>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12 d-flex justify-content-end">
                                    <button className='btn btn-success' onClick={handleChangeTemplate}>Change Dashboard</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardSettings;
