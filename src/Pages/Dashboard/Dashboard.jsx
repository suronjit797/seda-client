import { memo } from 'react';
import React, { useEffect, useState } from 'react';
import LineChart from '../../Components/Charts/LineChart';
import { FullScreen } from "react-full-screen";
import AreaChart from '../../Components/Charts/AreaChart';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BsFilterLeft } from "react-icons/bs"
import PieChart from '../../Components/Charts/PieChart';
import moment from 'moment'

const Dashboard = memo(({ handle }) => {
    let month = new Date().getMonth()
    const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
    const endOfMonth = moment().endOf('month').format('YYYY-MM-DD');
    
    let currentDevice = useSelector((state) => state?.user?.currentDevice);
    let userDetails = useSelector((state) => state?.user?.userDetails);
    
    const [deviceData, setDeviceData] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const [showFilterData, setShowFilterData] = useState(false);
    const [from, setFrom] = useState(startOfMonth);
    const [to, setTo] = useState(endOfMonth);
    const [lineData, setLineData] = useState([])
    const [dailyData, setDailyData] = useState({})
    const [value, setValue] = useState({})   //this is consumption value (value.dailyEmissions)
    const [pieChartData, setPieChartData] = useState([{
        value: 1,
        name: "No data to show"
    }]);

    const getDeviceData = async (deviceId, parameter) => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/chart/byParameter/${deviceId}/${parameter}/`, { withCredentials: true })
        if (response) {
            setDeviceData(response.data)
        }
    }

    const getDailyConsumption = async (deviceId, parameter) => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/chart/dailyConsumption/${deviceId}/${parameter}`, { withCredentials: true })
        if (response) {
            setDailyData(response.data)
        }
    }
    const getDailyEmissions = async (deviceId) => {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/formula/formulaResult`, {
            formulaName: "K3 LV Room - Energy Consumption",
            isMonthly: false,
            deviceId,
        })
        if (response) {
            setValue({ dailyEmission: response.data.result })
        }
    }
    const getMonthlyEmissions = async (deviceId) => {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/formula/formulaResult`, {
            formulaName: "K3 LV Room - Energy Consumption",
            isMonthly: true,
            deviceId,
        })
        if (response) {
            setValue({ monthlyEmission: response.data.result })
        }
    }

    // line data 
    useEffect(() => {
        const getLineData = async (deviceId, parameter) => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/chart/monthlyKWH/${deviceId}/${parameter}/${from}/${to}`, { withCredentials: true })
            if (response) {
                setLineData(response.data)
            }
        }
        const getPieData = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/chart/device/${from}/${to}`, { withCredentials: true })
            if (response.data.length > 0) {
                console.log(response.data)
                setPieChartData(response.data)
            } 
        }

        if (!!currentDevice._id) {
            getLineData(currentDevice._id, currentDevice?.parameter || 'KWH')
            getDailyConsumption(currentDevice._id, currentDevice?.parameter || 'KWH')
            getPieData()
        }

        // eslint-disable-next-line
    }, [currentDevice, showFilterData])

    useEffect(() => {
        if (currentDevice) {
            getDeviceData(currentDevice._id, currentDevice?.parameter || 'current')
            getDailyEmissions(currentDevice._id)
            getMonthlyEmissions(currentDevice._id)
        }
        // eslint-disable-next-line
    }, [currentDevice]);

    useEffect(() => {
        document.title = "SEDA - Dashboard"
    }, [])

    const handleFilter = async (e) => {
        e.preventDefault();
        setShowFilterData(true)
    }

    let allNumber = [...deviceData.map(data => data[1])]
    let min = deviceData.length ? Math.min(...deviceData.map(data => data[1])) : 0
    let max = deviceData.length ? Math.max(...deviceData.map(data => data[1])) : 0
    let average = allNumber.length > 0 ? (allNumber.reduce((a, b) => Number(a) + Number(b))) / allNumber.length : 0

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
                                            <h2> {(dailyData.value || 0).toFixed(2)} </h2>
                                            <p>kWh</p>
                                        </div>
                                    </div>
                                    <div className="consumption text-center">
                                        <div className="card text-center mb-2 p-2">
                                            <h4 className='text-success'>Today <br />CO<sub>2</sub> emissions </h4>

                                            <h3>
                                                {(!!value?.dailyEmission ? value?.dailyEmission : 0).toFixed(2)}
                                            </h3>
                                            <p>kgCO<sub>2</sub></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="row mb-2">
                                        <div className="col-md-9">
                                            <form onSubmit={handleFilter} className={`${!showFilter && 'd-none'}`}>
                                                <div className="row d-flex align-items-end">
                                                    <div className="col-md-4">
                                                        <label htmlFor="from" className="form-label">From</label>
                                                        <input type="datetime-local" value={from} onChange={(e) => setFrom(e.target.value)} className='form-control' id="from" name="from" required />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label htmlFor="from" className="form-label">To</label>
                                                        <input type="datetime-local" value={to} onChange={(e) => setTo(e.target.value)} className='form-control' id="from" name="to" required />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="actions d-flex">
                                                            <button className='btn btn-warning me-2' type='submit'>View</button>
                                                            <button className='btn btn-secondary' type='button' onClick={() => { setFrom(startOfMonth); setTo(endOfMonth); setShowFilterData(false) }}>Clear</button>
                                                        </div>
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
                                            {deviceData.length > 0 && showFilterData ? <AreaChart name="Power (kWh)" title="Monthly (kW)" data={deviceData} from={from} to={to} /> : <AreaChart data={deviceData} name="Power (kW)" title="Monthly (kW)" />}
                                        </div>
                                        <div className="col-md-2">
                                            <div className="minmax bg-success bg-opacity-50">
                                                <div className="row">
                                                    <div className="col-6"> Min : </div>
                                                    <div className="col-6 d-flex justify-content-end">{min.toFixed(2)}</div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-6">Max : </div>
                                                    <div className="col-6 d-flex justify-content-end">{max.toFixed(2)}</div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-6">Average: </div>
                                                    <div className="col-6 d-flex justify-content-end">{average.toFixed(2)}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                                <div className="col-md-2">
                                    <div className="consumption text-center">
                                        <div className="card text-center mb-2 p-2">
                                            <h4 className='text-success'>Consumption <br />this month</h4>
                                            <h2> {(lineData.length > 0 ? lineData[month] : 0).toFixed(2)} </h2>
                                            <p>kWh</p>
                                        </div>
                                    </div>
                                    <div className="consumption text-center">
                                        <div className="card text-center mb-2 p-2">
                                            <h4 className='text-success'>This month <br />CO<sub>2</sub> emissions </h4>
                                            <h3>
                                                {(!!value?.monthlyEmission ? value?.monthlyEmission : 0).toFixed(2)}
                                            </h3>
                                            <p>kgCO<sub>2</sub></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-md-8">
                                    {
                                        deviceData.length > 0 && showFilterData ? <LineChart type="bar" from={from} to={to} name="kWh" data={deviceData} color="#1fb35b" title="Energy Consumption Monthly (kWh)" /> : <LineChart type="bar" name="kWh" data={deviceData} color="#1fb35b" title="Energy Consumption Monthly (kWh)" />
                                    }
                                </div>

                                <div className="col-md-4">
                                    {/* <h6 className='text-center mb-3'>Device (kWh)</h6> */}
                                    <PieChart data={pieChartData} />
                                </div>
                            </div>
                        </div>
                    </div>
                </FullScreen>
            </div>
        </div>
    );
})

export default Dashboard;
