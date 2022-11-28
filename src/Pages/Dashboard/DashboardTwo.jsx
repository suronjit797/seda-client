import React from 'react';
import { useSelector } from 'react-redux';
import { FullScreen } from "react-full-screen";
import LineChart from '../../Components/Charts/LineChart';

const DashboardTwo = ({ handle }) => {
    let currentDevice = useSelector((state) => state?.user?.currentDevice);
    let data = [82, 15, 80, 57, 11, 21, 26, 97, 15, 10, 37, 55]
    let data2 = [33, 96, 58, 56, 23, 100, 51, 86, 97, 90, 71, 73]
    let data3 = [31, 34, 60, 28, 97, 66, 89, 83, 61, 8, 83, 62]
    return (
        <div className='dashboard'>
            <div className="container-fluid">
                <FullScreen handle={handle}>
                    <div className="row  mt-4">
                        <div className="col-md-4">
                            <div className="card p-3 text-center">
                                <h3>Total Power by Building, kW</h3>
                                <h6>(Monthly)</h6>
                                <LineChart type="bar" data={data} color="#198754" name="kW" title="Total Power by Building" />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card p-3 text-center">
                                <h3>Total Consumption by Building, kWh</h3>
                                <h6>(Monthly)</h6>
                                <LineChart type="bar" data={data2} color="#00205b" name="kWh" title="Total Consumption by Building" />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card p-3 text-center">
                                <h3>Energy Sources by Percentage</h3>
                                <h6>(Total No. Of Building/Sites)</h6>
                                <LineChart type="bar" data={data3} color="#875419" name="kWh" title="Energy Sources by Percentage" />
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-12">
                            <div className="card p-3">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <h6>Location Name</h6>
                                            </div>
                                            <div className="col-md-8">
                                                <p>: Menara Kuala Lumpur</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <h6>Building Name</h6>
                                            </div>
                                            <div className="col-md-8">
                                                <p>: Menara Kuala Lumpur (Office)</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <h6>Building Type</h6>
                                            </div>
                                            <div className="col-md-8">
                                                <p>: Commercial</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <h6>Installer</h6>
                                            </div>
                                            <div className="col-md-8">
                                                <p>: Reneon Technologies</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <h6>Total Number of Devices</h6>
                                            </div>
                                            <div className="col-md-8">
                                                <p>: 5</p>
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
