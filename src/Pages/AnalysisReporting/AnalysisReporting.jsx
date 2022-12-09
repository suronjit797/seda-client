import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AnalysisReportingSidebar from '../../Components/AnalysisReporting/AnalysisReportingSidebar';
import ReportTable from '../../Components/Reports/ReportTable';
import Select from 'react-select';
import SplineChart from '../../Components/Charts/SplineChart';
import { useMemo } from 'react';

const AnalysisReporting = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [reportTypeGraph, setReportTypeGraph] = useState(true);
    const [devices, setDevices] = useState([]);
    const [deviceData, setDeviceData] = useState([]);
    const [deviceTableData, setDeviceTableData] = useState([]);
    const [deviceParameters, setDeviceParameters] = useState();
    const userDetails = useSelector((state) => state?.user?.userDetails);
    const currentSite = useSelector((state) => state?.user?.currentSite);
    const [queryData, setQueryData] = useState({
        interval: "",
        device: "",
        from: "",
        to: "",
        parameter: ""
    });
    const { interval, device, from, to, parameter } = queryData;
    const options = useMemo(() => [], []);
    useEffect(() => {
        if (deviceParameters) {
            // eslint-disable-next-line
            deviceParameters.map((item) => {
                options.push({ value: item._id, label: item._id })
            })
        }
        // eslint-disable-next-line
    }, [deviceParameters, options]);

    const onInputChange = e => {
        setQueryData({ ...queryData, [e.target.name]: e.target.value });
    };
    const handleChange = (value, name) => {
        setQueryData({ ...queryData, [name]: value });
    }
    const getDeviceParameters = async (deviceId) => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/device/device-parameters/` + deviceId, { withCredentials: true })
        if (response) {
            setDeviceParameters(response.data.sort((a, b) => a._id > b._id ? 1 : -1))
        }
    }
    useEffect(() => {
        if (device) {
            getDeviceParameters(device)
        }
    }, [device]);

    const getDevices = async (locationId) => {
        if(locationId){
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/device/site/` + locationId, { withCredentials: true })
            if (response) {
                setDevices(response.data)
            }
        }
    }
    useEffect(() => {
        if (userDetails?.site) {
            getDevices(userDetails?.site?._id)
        }
        if (currentSite) {
            getDevices(currentSite?._id)
        }
    }, [userDetails, currentSite]);
    useEffect(() => {
        document.title = "SEDA - Analysis & Reporting"
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/report/ParameterComparison`, queryData, { withCredentials: true })
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
                                    <h3>Parameter Comparison</h3>
                                </div>
                                <div className="col-md-6 d-flex justify-content-end">
                                    <Link to="/" className='btn btn-secondary'>Back</Link>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <button className='btn btn-success me-2' onClick={() => setReportTypeGraph(true)}>Graph</button>
                                    <button className='btn btn-info' onClick={() => setReportTypeGraph(false)}>Table</button>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="row mt-4">
                                    <div className="col-md-2">
                                        <select className="form-select" name='interval' defaultValue={interval} onChange={onInputChange}>
                                            <option >Select Interval</option>
                                            <option value="1">Default</option>
                                            <option value="30">30 Min</option>
                                            <option value="60">1 Hour</option>
                                            <option value="1440">24 Hours</option>

                                        </select>
                                    </div>
                                    <div className="col-md-2">
                                        <select className="form-select" name='device' onChange={onInputChange}>
                                            <option >Select Device</option>
                                            {devices && devices.length > 0 && devices.map((item, index) => (
                                                <option value={item._id} key={index}>{item.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-2">
                                        <input type="text" name='from' value={from} className='form-control' placeholder='Select Start Date' onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} onChange={onInputChange} />
                                    </div>
                                    <div className="col-md-2">
                                        <input type="text" name='to' value={to} min={from} className='form-control' placeholder='Select End Date' onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} onChange={onInputChange} />
                                    </div>
                                    <div className="col-md-3">
                                        <Select
                                            isMulti
                                            defaultInputValue={parameter}
                                            onChange={(value) => handleChange(value, 'parameter')}
                                            options={options}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            isSearchable={true}
                                            placeholder="Select Parameters"
                                        />
                                    </div>
                                    <div className="col-md-1"> <button className='btn btn-success' type='submit'>Generate</button></div>
                                </div>
                            </form>
                            <div className='d-flex justify-content-center'>
                                {isLoading && <Spinner animation="border" variant="dark" />}
                            </div>
                            <div className="row" style={{ minHeight: "400px" }}>
                                <div className="col-md-12">
                                    <div className='mt-3'>
                                        {deviceData.length > 0 && reportTypeGraph && <SplineChart title="Parameter Comparison" data={deviceData} from={from} to={to} />}
                                        {deviceData.length > 0 && !reportTypeGraph && <ReportTable title="Parameter Comparison" data={deviceTableData} />}
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

export default AnalysisReporting;
