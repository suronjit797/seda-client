import React, { useEffect, useState } from 'react';
import LineChart from '../../Components/Charts/LineChart';
import { FullScreen } from "react-full-screen";
import AreaChart from '../../Components/Charts/AreaChart';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BsFilterLeft } from "react-icons/bs"
import PieChart from '../../Components/Charts/PieChart';
const Dashboard = ({ handle }) => {
    const [deviceData, setDeviceData] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const [showFilterData, setShowFilterData] = useState(false);
    const [from, setFrom] = useState();
    const [to, setTo] = useState();
    let data = [10, 41, 35, 51, 49, 62, 69, 91, 130, 20, 44, 80]
    let currentDevice = useSelector((state) => state?.user?.currentDevice);
    const getDeviceData = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/chart/byParameter/` + currentDevice + `/KWH`, { withCredentials: true })
        if (response) {
            setDeviceData(response.data)
        }
    }
    useEffect(() => {
        if (currentDevice) {
            console.log(currentDevice)
            getDeviceData()
        }
        // eslint-disable-next-line
    }, [currentDevice]);
    useEffect(() => {
        document.title = "SEDA - Dashboard"
    }, []);

    const handleFilter = async (e) => {
        e.preventDefault();
        setShowFilterData(true)
    }

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
                                            <h4 className='text-success'>Today <br />Consumption</h4>
                                            <h2>215</h2>
                                            <p>kWh</p>
                                        </div>
                                    </div>
                                    <div className="consumption text-center">
                                        <div className="card text-center mb-2 p-2">
                                            <h4 className='text-success'>Today <br />CO<sub>2</sub> emissions </h4>
                                            <h2>215</h2>
                                            <p>kgCO<sub>2</sub></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="row mb-2">
                                        <div className="col-md-9">
                                            <form onSubmit={handleFilter} className={`${!showFilter && 'd-none'}`}>
                                                <div className="row d-flex align-items-end">
                                                    <div className="col-md-5">
                                                        <label htmlFor="from" className="form-label">From</label>
                                                        <input type="datetime-local" value={from} onChange={(e) => setFrom(e.target.value)} className='form-control' id="from" name="from" required />
                                                    </div>
                                                    <div className="col-md-5">
                                                        <label htmlFor="from" className="form-label">To</label>
                                                        <input type="datetime-local" value={to} onChange={(e) => setTo(e.target.value)} className='form-control' id="from" name="to" required />
                                                    </div>
                                                    <div className="col-md-2">
                                                        <button className='btn btn-warning' type='submit'>View</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="col-md-3 ">
                                            <button className='btn btn-light float-end' onClick={() => setShowFilter(!showFilter)}>
                                                Filter: Time Range <BsFilterLeft />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-10">
                                        {deviceData.length > 0 && showFilterData ? <AreaChart name="Power (kWh)" title="Monthly (kWh)" data={deviceData} from={from} to={to} /> : <AreaChart name="Power (kWh)" title="Monthly (kWh)" />}
                                        </div>
                                        <div className="col-md-2">
                                            <div className="minmax bg-success bg-opacity-50">
                                        <div className="row">
                                            <div className="col-6">Min</div>
                                            <div className="col-6 d-flex justify-content-end">xx</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">Max</div>
                                            <div className="col-6 d-flex justify-content-end">xx</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">Average</div>
                                            <div className="col-6 d-flex justify-content-end">xx</div>
                                        </div>
                                    </div>
                                    </div>
                                    </div>
                                    
                                    
                                </div>
                                <div className="col-md-2">
                                    <div className="consumption text-center">
                                        <div className="card text-center mb-2 p-2">
                                            <h4 className='text-success'>This month <br />Consumption</h4>
                                            <h2>215</h2>
                                            <p>kWh</p>
                                        </div>
                                    </div>
                                    <div className="consumption text-center">
                                        <div className="card text-center mb-2 p-2">
                                            <h4 className='text-success'>This month <br />CO<sub>2</sub> emissions </h4>
                                            <h2>215</h2>
                                            <p>kgCO<sub>2</sub></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-md-8">
                                    <LineChart type="bar" name="kWh" data={data} color="#1fb35b" title="Energy Consumption Monthly (kWh)" />
                                </div>
                                <div className="col-md-4">
                                    <h6 className='text-center mb-3'>Device (kWh)</h6>
                                    <PieChart />
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
