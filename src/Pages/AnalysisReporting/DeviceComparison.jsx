import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AnalysisReportingSidebar from '../../Components/AnalysisReporting/AnalysisReportingSidebar';
import SplineChart from '../../Components/Charts/SplineChart';
import ReportTable from '../../Components/Reports/ReportTable';

const DeviceComparison = () => {
    useEffect(() => {
        document.title = "SEDA - Device Comparison"
    }, []);
    const [isLoading, setIsLoading] = useState(false);
    const [reportTypeGraph, setReportTypeGraph] = useState(true);
    const [devices, setDevices] = useState([]);
    let devices2 = []
    const userDetails = useSelector((state) => state?.user?.userDetails);
    const currentSite = useSelector((state) => state?.user?.currentSite);
    const [deviceParameters, setDeviceParameters] = useState();
    const [deviceParameters2, setDeviceParameters2] = useState();
    const [deviceData, setDeviceData] = useState([]);
    const [deviceTableData, setDeviceTableData] = useState([]);
    const [queryData, setQueryData] = useState({
        interval: "",
        from: "",
        to: "",
        device1: "",
        parameter1: "",
        device2: "",
        parameter2: "",
    });

    const { interval, from, to, device1, parameter1, device2, parameter2 } = queryData;
    const onInputChange = e => {
        setQueryData({ ...queryData, [e.target.name]: e.target.value });
    };

    const getDevices = async (locationId) => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/device/site/` + locationId, { withCredentials: true })
        if (response) {
            setDevices(response.data)
        }
    }

    useEffect(() => {
        if (device1) {
            const filtered = devices.filter((device) => {
                return !device._id.includes(device1)
            });
            devices2.push(filtered)
        }
    }, [device1, devices, devices2]);

    const getDeviceParameters = async (deviceId) => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/device/device-parameters/` + deviceId, { withCredentials: true })
        if (response) {
            setDeviceParameters(response.data.sort((a, b) => a._id > b._id ? 1 : -1))
        }
    }
    const getDeviceParameters2 = async (deviceId) => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/device/device-parameters/` + deviceId, { withCredentials: true })
        if (response) {
            setDeviceParameters2(response.data.sort((a, b) => a._id > b._id ? 1 : -1))
        }
    }

    useEffect(() => {
        if (device1) {
            getDeviceParameters(device1)
        }
    }, [device1]);

    useEffect(() => {
        if (device2) {
            getDeviceParameters2(device2)
        }
    }, [device2]);

    useEffect(() => {
        if (userDetails?.site) {
            getDevices(userDetails?.site?._id)
        }
        if (currentSite) {
            getDevices(currentSite?._id)
        }
    }, [userDetails, currentSite]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/report/DeviceComparison`, queryData, { withCredentials: true })
        if (response) {
            setDeviceData(response.data?.result)
            setDeviceTableData(response.data?.data)
            setIsLoading(false)
        }
    }

    return (
        <div className='analysis'>
            <div className="container-fluid">
                <div className="row my-5 vh60">
                    <div className="col-md-2">
                        <AnalysisReportingSidebar />
                    </div>
                    <div className="col-md-10">
                        <div className="card p-3 mb-3">
                            <div className="row">
                                <div className="col-md-6">
                                    <h3>Device Comparison</h3>
                                </div>
                                <div className="col-md-6 d-flex justify-content-end">
                                    <Link to="/" className='btn btn-secondary'>Back</Link>
                                </div>
                            </div>
                            <div className="row my-3">
                                <div className="col-md-12">
                                    <button className='btn btn-success me-2' onClick={() => setReportTypeGraph(true)}>Graph</button>
                                    <button className='btn btn-info' onClick={() => setReportTypeGraph(false)}>Table</button>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="row d-flex align-items-center">
                                    <div className="col-md-2">
                                        <select className="form-select" name='interval' defaultValue={interval} onChange={onInputChange}>
                                            <option >Select Interval</option>
                                            <option value="1">Default</option>
                                            <option value="30">30 Min</option>
                                            <option value="60">1 Hour</option>
                                            <option value="1440">24 Hours</option>
                                        </select>
                                    </div>
                                    <div className="col-md-3">
                                        <input type="text" name='from' value={from} className='form-control mb-2' placeholder='Select Start Date' onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} onChange={onInputChange} />
                                        <input type="text" name='to' value={to} min={from} className='form-control' placeholder='Select End Date' onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} onChange={onInputChange} />
                                    </div>
                                    <div className="col-md-3">
                                        <select className="form-select mb-2" name='device1' defaultValue={device1} onChange={onInputChange}>
                                            <option >Select Device 1</option>
                                            {devices && devices.length > 0 && devices.map((item, index) => (
                                                <option value={item._id} key={index}>{item.name}</option>
                                            ))}
                                        </select>
                                        <select className="form-select" name='device2' defaultValue={device2} onChange={onInputChange}>
                                            <option >Select Device 2</option>
                                            {devices && devices.length > 0 && devices.filter((device) => { return !device._id.includes(device1) }).map((item, index) => (
                                                <option value={item._id} key={index}>{item.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-3">
                                        <select className="form-select mb-2" name='parameter1' defaultValue={parameter1} onChange={onInputChange}>
                                            <option >Select Device 1 Parameter</option>
                                            {deviceParameters && deviceParameters.length > 0 && deviceParameters.map((item, index) => (
                                                <option value={item._id} key={index}>{item._id}</option>
                                            ))}
                                        </select>
                                        <select className="form-select" name='parameter2' defaultValue={parameter2} onChange={onInputChange}>
                                            <option >Select Device 2  Parameter</option>
                                            {deviceParameters2 && deviceParameters2.length > 0 && deviceParameters2.map((item, index) => (
                                                <option value={item._id} key={index}>{item._id}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-1">
                                        <button className='btn btn-success' type='submit'>Generate</button>
                                    </div>
                                </div>
                            </form>
                            <div className='d-flex justify-content-center'>
                                {isLoading && <Spinner animation="border" variant="dark" />}
                            </div>
                            <div className="row" style={{ minHeight: "350px" }}>
                                <div className="col-md-12">
                                    <div className='mt-3'>
                                        {deviceData.length > 0 && reportTypeGraph && <SplineChart title="Device Comparison" data={deviceData} from={from} to={to} />}
                                        {deviceData.length > 0 && !reportTypeGraph && <ReportTable title="Device Comparison" data={deviceTableData} />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeviceComparison;
