import React, { useEffect, useState } from 'react';
import LineChart from '../../Components/Charts/LineChart';
import { FullScreen } from "react-full-screen";
import AreaChart from '../../Components/Charts/AreaChart';
import { useSelector } from 'react-redux';
import axios from 'axios';
const Dashboard = ({ handle }) => {
    const [deviceData, setDeviceData] = useState();
    let currentDevice = useSelector((state) => state?.user?.currentDevice);
    const getDeviceData = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/chart/byParameter/`+currentDevice+`/KWH`, { withCredentials: true })
        if(response){
            setDeviceData(response.data)
        }
    }
    useEffect(() => {
        if (currentDevice) {
            getDeviceData()
        }
        // eslint-disable-next-line
    }, [currentDevice]);
    useEffect(() => {
        document.title = "SEDA - Dashboard"
    }, []);
    return (
        <div className='dashboard'>
            <div className="container-fluid">
                <FullScreen handle={handle}>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row mt-4">
                                <div className="col-md-2">
                                    <div className="consumption text-center">
                                        <div className="card text-center mb-2 p-2">
                                            <h3 className='text-success'>215</h3>
                                            <p>kWh</p>
                                        </div>
                                        <p>This Month Consumption</p>
                                    </div>
                                    <div className="emission text-center">
                                        <div className="card text-center p-2">
                                            <h3 className='text-success'>21</h3>
                                            <p>Kg CO<sub>2</sub></p>
                                        </div>
                                        <p>This Month <br />CO<sub>2</sub> <br />Emission </p>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    {/* <LineChart type="line" name="Power (kW)" title="Monthly (kW)"/> */}
                                    {currentDevice ? <AreaChart name="Power (kWh)" title="Monthly (kWh)" data={deviceData}/> :  <AreaChart name="Power (kWh)" title="Monthly (kWh)" />}
                                </div>
                                <div className="col-md-2">
                                    <div className="consumption text-center">
                                        <div className="card text-center mb-2 p-2">
                                            <h3 className='text-success'>215</h3>
                                            <p>kWh</p>
                                        </div>
                                        <p>Today Consumption</p>
                                    </div>
                                    <div className="emission text-center">
                                        <div className="card text-center p-2">
                                            <h3 className='text-success'>21</h3>
                                            <p>Kg CO<sub>2</sub></p>
                                        </div>
                                        <p>Today <br />CO<sub>2</sub> <br />Emission </p>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-md-2">

                                </div>
                                <div className="col-md-8">
                                    <LineChart type="bar" name="kWh" title="Energy Consumption Monthly (kWh)" />
                                </div>
                                <div className="col-md-2">
                                </div>
                            </div>
                        </div>
                    </div>
                </FullScreen>
            </div>
        </div>
    );
}

export default Dashboard;
