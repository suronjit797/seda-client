import React from 'react';
import { useSelector } from 'react-redux';
import { FullScreen } from "react-full-screen";
import LineChart from '../../Components/Charts/LineChart';

const DashboardTwo = ({ handle }) => {
    let currentDevice = useSelector((state) => state?.user?.currentDevice);
    return (
        <div className='dashboard'>
            <div className="container-fluid">
                <FullScreen handle={handle}>
                    <div className="row  mt-4">
                        <div className="col-md-4">
                            <div className="card p-3 text-center">
                                <h3>Total Power by Building, kW</h3>
                                <h6>(Monthly)</h6>
                                <LineChart type="bar" name="kW" title="Total Power by Building" />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card p-3 text-center">
                                <h3>Total Consumptions by Building, kWh</h3>
                                <h6>(Monthly)</h6>
                                <LineChart type="bar" name="kWh" title="Total Consumptions by Building" />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card p-3 text-center">
                                <h3>Energy Sources by Percentage</h3>
                                <h6>(Total No. Of Building/Sites)</h6>
                                <LineChart type="bar" name="kWh" title="Energy Sources by Percentage" />
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-12">
                            <div className="card p-3">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <h6>Location Name</h6>
                                            </div>
                                            <div className="col-md-6">
                                                <p>Menara Kuala Lumpur</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <h6>Building Name</h6>
                                            </div>
                                            <div className="col-md-6">
                                                <p>Menara Kuala Lumpur (Office)</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <h6>Building Type</h6>
                                            </div>
                                            <div className="col-md-6">
                                                <p>Commercial</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <h6>Installer</h6>
                                            </div>
                                            <div className="col-md-6">
                                                <p>Reneon Technologies</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <h6>Total Number of Devices</h6>
                                            </div>
                                            <div className="col-md-6">
                                                <p>5</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </FullScreen>
            </div>
        </div>
    );
}

export default DashboardTwo;
