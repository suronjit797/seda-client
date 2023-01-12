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
    const startOfDay = moment().startOf('day').format('YYYY-MM-DD');
    const endOfDay = moment().endOf('day').format('YYYY-MM-DD');

    // redux
    let currentDevice = useSelector((state) => state?.user?.currentDevice);
    let template = useSelector((state) => state?.user?.userDetails?.dashboardSetting?.dashboard1);

    // state
    const [showFilter, setShowFilter] = useState(false);
    const [showFilterData, setShowFilterData] = useState(false);
    const [from, setFrom] = useState(startOfMonth);
    const [to, setTo] = useState(endOfMonth);
    const [lineData, setLineData] = useState([])
    const [value, setValue] = useState({})   //this is consumption value (value.dailyEmissions)

    // counter
    const [counter1, setCounter1] = useState({})
    const [counter2, setCounter2] = useState({})
    const [counter3, setCounter3] = useState({})
    const [counter4, setCounter4] = useState({})
    // chart 
    const [deviceData, setDeviceData] = useState([]);    //graph 1
    const [graph2, setGraph2] = useState([])
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

    const getMonthlyEmissions = async (deviceId) => {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/formula/formulaResult`, {
            formulaName: "K3 LV Room - Energy Consumption",
            isMonthly: true,
            deviceId,
        }, { withCredentials: true })
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
        const getCounter = async (body, setCounter) => {
            await axios.post(`${process.env.REACT_APP_API_URL}/formula/formulaResult`, body, { withCredentials: true })
                .then(response => {
                    if (response.data) {
                        setCounter(response.data)
                    }
                }).catch(err => console.log(err))
        }

        const counter1 = {
            formulaName: template?.counter[0]?.formula || 'Energy Consumption',
            deviceId: currentDevice?._id,
            from: template?.counter[0]?.from || startOfDay,
            to: template?.counter[0]?.to || endOfDay
        }
        const counter2 = {
            formulaName: template?.counter[1].formula || 'CO2 Emission',
            deviceId: currentDevice._id,
            from: template?.counter[1].from || startOfDay,
            to: template?.counter[1].to || endOfDay
        }
        const counter3 = {
            formulaName: template?.counter[2]?.formula || `Energy Consumption`,
            deviceId: currentDevice?._id,
            from: template?.counter[2]?.from || startOfMonth,
            to: template?.counter[2]?.to || endOfMonth
        }
        const counter4 = {
            formulaName: template?.counter[3]?.formula || `CO2 Emission`,
            deviceId: currentDevice?._id,
            from: template?.counter[3]?.from || startOfMonth,
            to: template?.counter[3]?.to || endOfMonth
        }

        if (!!currentDevice._id) {
            getLineData(currentDevice._id, currentDevice?.parameter || 'KWH')
            getPieData()
            getCounter(counter1, setCounter1)
            getCounter(counter2, setCounter2)
            getCounter(counter3, setCounter3)
            getCounter(counter4, setCounter4)
        }

        // eslint-disable-next-line
    }, [currentDevice, showFilterData])

    useEffect(() => {
        if (currentDevice) {
            getDeviceData(currentDevice._id, currentDevice?.parameter || 'current')
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
                                            <h4 className='text-success'>
                                                {template?.counter[0].name || <>Today <br />Consumption</>}
                                            </h4>
                                            <h2> {counter1?.result || 0} </h2>
                                            <p> {counter1?.unit || 'kWh'} </p>
                                        </div>
                                    </div>
                                    <div className="consumption text-center">
                                        <div className="card text-center mb-2 p-2">
                                            <h4 className='text-success'>{template?.counter[1].name || <>Today <br />CO<sub>2</sub> emissions</>} </h4>

                                            <h3>
                                                {counter2?.result || 0}
                                            </h3>
                                            <p>{counter2?.unit || <>kgCO<sub>2</sub></>}</p>
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
                                            <h4 className='text-success'>
                                                {template?.counter[2].name || <>Consumption <br />this month</>}
                                            </h4>
                                            <h2> {counter3?.result || 0} </h2>
                                            <p> {counter3?.unit || 'kWh'} </p>
                                        </div>
                                    </div>
                                    <div className="consumption text-center">
                                        <div className="card text-center mb-2 p-2">
                                            <h4 className='text-success'>{template?.counter[2].name || <>This month <br />CO<sub>2</sub> emissions</>} </h4>
                                            <h3>
                                                {counter4?.result || 0}
                                            </h3>
                                            <p>{counter4?.unit || <>kgCO<sub>2</sub></>}</p>
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
