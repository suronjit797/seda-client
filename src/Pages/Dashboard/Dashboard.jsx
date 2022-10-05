import React, {useEffect} from 'react';
import LineChart from '../../Components/Charts/LineChart';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { FiMaximize } from "react-icons/fi"
const Dashboard = ({handle}) => {
    useEffect(() => {
       document.title="SEDA - Dashboard"
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
                                <LineChart type="line" name="Power (kW)" title="Monthly (kW)"/>
                            </div>
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
                        </div>
                        <div className="row mt-4">
                            <div className="col-md-2">

                            </div>
                            <div className="col-md-8">
                                <LineChart type="bar" name="kWh" title="Energy Consumption Monthly (kWh)"/>
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
