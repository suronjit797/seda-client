import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { FullScreen } from "react-full-screen";
import LineChart from '../../Components/Charts/LineChart';

const DashboardTwo = ({ handle }) => {
    let currentDevice = useSelector((state) => state?.user?.currentDevice);
    let data = [82, 15, 80, 57, 11, 21, 26, 97, 15, 10, 37, 55]
    let data2 = [33, 96, 58, 56, 23, 100, 51, 86, 97, 90, 71, 73]
    let data3 = [31, 34, 60, 28, 97, 66, 89, 83, 61, 8, 83, 62]

    useEffect(() => {
        document.title = "SEDA - Dashboard"
    }, []);
    
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
                                    <h5>Site Locations Summary</h5>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <h6>Total No. Building/Site</h6>
                                            </div>
                                            <div className="col-md-8">
                                                <p className='m-0'>: 2</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <h6>Total No. Installer</h6>
                                            </div>
                                            <div className="col-md-8">
                                                <p className='m-0'>: 3</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <h6>Total No. Devices</h6>
                                            </div>
                                            <div className="col-md-8">
                                                <p className='m-0'>: 6</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <h5>Solar Thermal</h5>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <h6>Total No. Building/Site</h6>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <p className='m-0'>: 2</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <h6>Total No. Installer</h6>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <p className='m-0'>: 3</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <h6>Total No. Devices</h6>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <p className='m-0'>: 6</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <h6>Total Capacity (kWp)</h6>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <p className='m-0'>: 6</p>
                                                    </div>
                                                </div>
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
