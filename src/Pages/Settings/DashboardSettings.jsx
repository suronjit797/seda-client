import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SettingSidebarNav from '../../Components/Settings/SettingSidebarNav';
import { setUserDetails } from '../../redux/userSlice';
import SelectedDashboardSettings1 from './SelectedDashboardSettings/SelectedDashboardSettings1';
import SelectedDashboardSettings2 from './SelectedDashboardSettings/SelectedDashboardSettings2';
import SelectedDashboardSettings3 from './SelectedDashboardSettings/SelectedDashboardSettings3';
import SelectedDashboardSettings4 from './SelectedDashboardSettings/SelectedDashboardSettings4';

const DashboardSettings = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userDetails = useSelector(state => state.user?.userDetails)
    // state
    const [template, setTemplate] = useState(1);
    const [SuccessMessage, setSuccessMessage] = useState();
    const [IsLoading, setIsLoading] = useState(false);


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/users/me`, { withCredentials: true })
            .then(res => dispatch(setUserDetails(res.data)))
            .catch(err => console.log(err))
    }, [])




    useEffect(() => {
        document.title = "Seda - Dashboard Settings"
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
                                    <input className="form-check-input d-none" type="radio" value={1} name="dashboard" id="option1" onChange={() => setTemplate(1)} />
                                    <label className="form-check-label" htmlFor="option1">
                                        <div className={`${template === 1 ? 'text-center border border-3 border-success' : 'text-center'}`}>
                                            <img src="/images/1.png" alt={userDetails?.dashboardSetting?.dashboard1?.name || "Dashboard 1"} height={130} />
                                            <p> {userDetails?.dashboardSetting?.dashboard1?.name || "Dashboard 1"} </p>
                                        </div>
                                    </label>
                                </div>
                                <div className={`${userDetails?.role === "superAdmin" ? 'col-md-3' : 'd-none'}`}>
                                    <input className="form-check-input d-none" type="radio" value={2} name="dashboard" id="option2" onChange={() => setTemplate(2)} />
                                    <label className="form-check-label" htmlFor="option2">
                                        <div className={`${template === 2 ? 'text-center border border-3 border-success' : 'text-center'}`}>
                                            <img src="/images/2.png" alt="Dashboard 2" height={130} />
                                            <p>Dashboard 2 (Super Admin)</p>
                                        </div>
                                    </label>
                                </div>
                                <div className="col-md-3">
                                    <input className="form-check-input d-none" type="radio" value={3} name="dashboard" id="option3" onChange={() => setTemplate(3)} />
                                    <label className="form-check-label" htmlFor="option3">
                                        <div className={`${template === 3 ? 'text-center border border-3 border-success' : 'text-center'}`}>
                                            <img src="/images/3.png" alt="Dashboard 3" height={130} />
                                            <p>Dashboard 3</p>
                                        </div>
                                    </label>
                                </div>
                                <div className="col-md-3">
                                    <input className="form-check-input d-none" type="radio" value={4} name="dashboard" id="option4" onChange={() => setTemplate(4)} />
                                    <label className="form-check-label" htmlFor="option4">
                                        <div className={`${template === 4 ? 'text-center border border-3 border-success' : 'text-center'}`}>
                                            <img src="/images/4.png" alt="Dashboard 4" height={130} />
                                            <p>Dashboard 4</p>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div className="my-4">
                                {template === 1 && <SelectedDashboardSettings1 template={template} />}
                                {template === 2 && <SelectedDashboardSettings2 template={template} />}
                                {template === 3 && <SelectedDashboardSettings3 template={template} />}
                                {template === 4 && <SelectedDashboardSettings4 template={template} />}

                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12 d-flex justify-content-end">
                                    <button className='btn btn-success' onClick={handleChangeTemplate}>Set Dashboard</button>
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
