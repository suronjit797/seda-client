import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import NotificationSidebar from '../../Components/Notifications/NotificationSidebar';

const AlarmView = () => {
    const Params = useParams()
    const alarmId = Params.alarmId
    const [alarmDetails, setAlarmDetails] = useState();
    const getNotification = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/notification/` + alarmId, { withCredentials: true })
        if (response) {
            setAlarmDetails(response.data)
        }
    }
    useEffect(() => {
        getNotification()
        // eslint-disable-next-line
    }, []);
    return (
        <div className='installer-view'>
            <div className="container-fluid">
                <div className="row my-5">
                    <div className="col-md-2">
                        <NotificationSidebar />
                    </div>
                    <div className="col-md-10">
                        <div className="card p-3 mb-3">
                            <h3>Admin Profile</h3>
                            <div className="row mt-4">
                                <div className="col-md-6">
                                    <div className="row mb-2">
                                        <div className="col-4">Alarm Name</div>
                                        <div className="col-8">: {alarmDetails?.name}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-4">Alarm Type</div>
                                        <div className="col-8 text-capitalize">: {alarmDetails?.type}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-4">Site Location</div>
                                        <div className="col-8">: {alarmDetails?.site?.name}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-4">Device</div>
                                        <div className="col-8">: {alarmDetails?.device?.name}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-4">Device Parameter</div>
                                        <div className="col-8">: {alarmDetails?.parameter}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-4">Alarm Notification Option</div>
                                        <div className="col-8">: {alarmDetails?.option}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-4">Value</div>
                                        <div className="col-8">: {alarmDetails?.value}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-4">Trigger Interval</div>
                                        <div className="col-8">: {alarmDetails?.interval}</div>
                                    </div>
                                </div>
                                <div className="col-md-6">

                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 d-flex justify-content-end">
                                    <Link to={`/edit-alarm/` + alarmId} className="btn btn-success me-1">Edit</Link>
                                    <Link to={`/alarm-summary`} className="btn btn-secondary">Cancel</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AlarmView;
