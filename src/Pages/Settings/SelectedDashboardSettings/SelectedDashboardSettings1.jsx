import axios from 'axios';
import React, { memo, useState, useEffect } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import './SelectedDashboardSettings.css'
import { setUserDetails } from '../../../redux/userSlice';
import { Spinner } from 'react-bootstrap';

const SelectedDashboardSettings1 = memo((props) => {
    // const startOfMonth = moment('11,11,2022').startOf('month').format('yyyy-MM-DDThh:mm:ss');
    // const endOfMonth = moment('11,11,2022').endOf('month').format('yyyy-MM-DDThh:mm:ss');

    const dispatch = useDispatch()

    // redux
    let userDetails = useSelector((state) => state?.user?.userDetails);
    let currentDevice = useSelector((state) => state?.user?.currentDevice);

    // important variables
    const startOfDay = moment().startOf('day').format('yyyy-MM-DDThh:mm:ss');
    const endOfDay = moment().endOf('day').format('yyyy-MM-DDThh:mm:ss');

    // states
    const [isLoading, setIsLoading] = useState(true)
    const [templateData, setTemplateData] = useState()
    const [formulas, setFormulas] = useState([])
    const [parameters, setParameters] = useState([])
    const [pieKey, setPieKey] = useState([{
        value: 1,
        name: "No data to show"
    }])

    // data 1
    const [settingData, setSettingData] = useState({
        name: '',
        counter: [],
        graphs: {},
        userId: userDetails._id
    })

    // data 2
    let [counter, setCounter] = useState([
        {
            name: '',
            formula: '',
            isToday: false,
            from: '',
            to: ''
        },
        {
            name: '',
            formula: '',
            isToday: false,
            from: '',
            to: ''
        },
        {
            name: '',
            formula: '',
            isToday: false,
            from: '',
            to: ''
        },
        {
            name: '',
            formula: '',
            isToday: false,
            from: '',
            to: ''
        }
    ])

    // data 3
    let [graphs, setGraphs] = useState({
        graph1: {
            name: '',
            yAxis: '',
            isToday: false,
            from: '',
            to: ''
        },
        graph2: {
            name: '',
            yAxis: '',
            isToday: false,
            from: '',
            to: ''
        },
        pieChart: {
            name: '',
            device: [],
            isToday: false,
            from: '',
            to: ''
        },

    })

    useEffect(() => {
        // get formula
        axios.get(`${process.env.REACT_APP_API_URL}/formula`, { withCredentials: true })
            .then(res => {
                if (res.data) {
                    setFormulas(res.data)
                }
            })
            .catch(error => console.log(error))

        // get pie key
        axios.get(`${process.env.REACT_APP_API_URL}/device`, { withCredentials: true })
            .then(response => {
                if (response.data.length > 0) {
                    setPieKey(response.data)
                }
            })
            .catch(error => console.log(error))

        // get parameters
        axios.get(`${process.env.REACT_APP_API_URL}/device/device-parameters/${currentDevice._id}`, { withCredentials: true })
            .then(response => {
                if (response.data.length > 0) {
                    setParameters(response.data)
                }
            })
            .catch(error => console.log(error))

        //get template by setting id
        axios.get(`${process.env.REACT_APP_API_URL}/dashboardSetting/${userDetails?.dashboardSetting?._id}`, { withCredentials: true })
            .then(response => {
                if (response.data) {
                    setTemplateData(response.data)
                    setIsLoading(false)
                }
            })
            .catch(error => {
                console.log(error)
                setIsLoading(false)
            })



    }, [props, settingData, currentDevice, userDetails])

    const submitHandler = e => {
        e.preventDefault();
        setIsLoading(true)

        const data = { ...settingData }
        data.counter = counter
        data.graphs = graphs

        const d1 = {
            dashboard1: data,
            userId: userDetails._id,
            dashboardId: userDetails?.dashboardSetting?._id,
            dashboardType: userDetails.dashboard
        }

        console.log(d1)

        axios.put(`${process.env.REACT_APP_API_URL}/dashboardSetting`, d1, { withCredentials: true })
            .then(res => {
                // console.log(res.data.userResult)
                if (res.data.userResult) {
                    dispatch(setUserDetails(res.data.userResult))
                }
            })
            .catch(err => console.log(err))

        setIsLoading(false)

        setCounter([
            {
                name: '',
                formula: '',
                isToday: false,
                from: '',
                to: ''
            },
            {
                name: '',
                formula: '',
                isToday: false,
                from: '',
                to: ''
            },
            {
                name: '',
                formula: '',
                isToday: false,
                from: '',
                to: ''
            },
            {
                name: '',
                formula: '',
                isToday: false,
                from: '',
                to: ''
            }
        ])

        setGraphs({
            graph1: {
                name: '',
                yAxis: '',
                isToday: false,
                from: '',
                to: ''
            },
            graph2: {
                name: '',
                yAxis: '',
                isToday: false,
                from: '',
                to: ''
            },
            pieChart: {
                name: '',
                device: [],
                isToday: false,
                from: '',
                to: ''
            },

        })

        setSettingData({
            name: '',
            counter: [],
            graphs: {},
            userId: userDetails._id
        })
    }

    if(isLoading) {
        return (
            <div className="d-flex align-items-center justify-content-center" style={{minHeight: '200px'}}>
                <Spinner animation="border" variant="dark" />
            </div>
        )
    }

    return (
        <div className='selectedDashboardSettings border-success'>
            <h3 className='fw-bold mb-4'> {templateData?.dashboard1?.name || 'Dashboard 1'} </h3>
            <h4> Template Settings </h4>
            <hr className='mt-0' />

            <form onSubmit={submitHandler}>

                {/* for template setting */}
                {/* data 1 */}
                <div className="row">
                    <div className="col-lg-3 col-md-6">
                        <div className="mb-3">
                            <label htmlFor="templateName" className="form-label">Name</label>
                            <input
                                type="text"
                                value={settingData.name}
                                onChange={(e) => setSettingData({ ...settingData, name: e.target.value })}
                                className="form-control"
                                name='name'
                                id="templateName"
                                placeholder="Enter template name"
                            />
                        </div>
                    </div>
                    {/* 
                    <div className="col-lg-3 col-md-6">
                        <label htmlFor="userType" className="form-label"> User Type </label>
                        <select className="form-select" id='userType' aria-label="Default select example">
                            <option value='' selected disabled> Select roll </option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div> */}
                </div>


                {/* for counter setting */}
                {/* data 2 */}
                <div>
                    <h4 className='mt-4'> Counter Settings </h4>
                    <hr className='mt-0' />
                    {/* name */}
                    <div className="row">
                        {/* option 1 */}
                        <div className="col-lg-3 col-md-6">
                            {/* name */}
                            <div className="mb-3">
                                {/* <label htmlFor="counterName1" className="form-label">{templateData?.dashboard1?.counter[0].name || 'Counter 1'} </label> */}
                                <label htmlFor="counterName1" className="form-label">Option 1</label>
                                <input
                                    type="text"
                                    name='option1'
                                    value={counter[0].name}
                                    onChange={(e) => setCounter([...counter], counter[0].name = e.target.value)}
                                    className="form-control"
                                    id="counterName1"
                                    placeholder="Enter counter name"
                                />
                            </div>
                            {/* value */}
                            <div className="mb-3">
                                <label htmlFor="formula1" className="form-label"> Formula </label>
                                <select
                                    className="form-select"
                                    name='displayedValue1'
                                    id='formula1'
                                    aria-label="Default select example"
                                    value={counter[0].formula}
                                    onChange={(e) => setCounter([...counter], counter[0].formula = e.target.value)}
                                >
                                    <option value='' selected disabled> Select Formula </option>
                                    {
                                        formulas.length > 0 ? (
                                            formulas.map(formula => <option key={formula._id} value={formula?.name?.trim()}>{formula.name} </option>)
                                        ) : ''
                                    }
                                </select>
                            </div>
                            {/* time  */}
                            <div className="mt-3">
                                <input
                                    className="form-check-input me-3"
                                    type="checkbox"
                                    checked={counter[0].isToday}
                                    id="flexCheckDefault"
                                    onChange={(e) => {
                                        setCounter([...counter], counter[0].isToday = !counter[0].isToday);
                                        if (e.target.checked) {
                                            setCounter([...counter], counter[0].from = startOfDay)
                                            setCounter([...counter], counter[0].to = endOfDay)
                                        } else {
                                            setCounter([...counter], counter[0].from = '')
                                            setCounter([...counter], counter[0].to = '')
                                        }
                                    }}
                                />
                                <label className="form-check-label" htmlFor="flexCheckDefault" style={{ userSelect: 'none' }}>
                                    Today's data
                                </label>
                            </div>

                            <div className="row align-items-end">
                                <div className="col-xxl-6 mt-2">
                                    <label htmlFor="from1" className="form-label">From</label>
                                    <input
                                        type="datetime-local"
                                        value={counter[0].from}
                                        onChange={(e) => setCounter([...counter], counter[0].from = e.target.value)}
                                        className='form-control' id="from1" name="from1"
                                    />
                                </div>
                                <div className="col-xxl-6 mt-2">
                                    <label htmlFor="to1" className="form-label">To</label>
                                    <input
                                        type="datetime-local"
                                        value={counter[0].to}
                                        onChange={(e) => setCounter([...counter], counter[0].to = e.target.value)}
                                        className='form-control' id="to1" name="to1"
                                    />
                                </div>
                            </div>
                        </div>
                        {/* option 2 */}
                        <div className="col-lg-3 col-md-6">
                            {/* name */}
                            <div className="mb-3">
                                <label htmlFor="counterName2" className="form-label">Option 2</label>
                                <input
                                    type="text"
                                    name='option1'
                                    value={counter[1].name}
                                    onChange={(e) => setCounter([...counter], counter[1].name = e.target.value)}
                                    className="form-control"
                                    id="counterName2"
                                    placeholder="Enter counter name"
                                />
                            </div>
                            {/* value */}
                            <div className="mb-3">
                                <label htmlFor="formula2" className="form-label"> Formula </label>
                                <select
                                    className="form-select"
                                    name='displayedValue2'
                                    id='formula2'
                                    value={counter[1].formula}
                                    onChange={(e) => setCounter([...counter], counter[1].formula = e.target.value)}
                                >
                                    <option value='' selected disabled> Select Formula </option>
                                    {
                                        formulas.length > 0 ? (
                                            formulas.map(formula => <option key={formula._id} value={formula?.name?.trim()}>{formula.name}</option>)
                                        ) : ''
                                    }
                                </select>
                            </div>
                            {/* time  */}
                            <div className="mt-3">
                                <input
                                    className="form-check-input me-3"
                                    type="checkbox"
                                    checked={counter[1].isToday}
                                    id="time2"
                                    onChange={(e) => {
                                        setCounter([...counter], counter[1].isToday = !counter[1].isToday);
                                        if (e.target.checked) {
                                            setCounter([...counter], counter[1].from = startOfDay)
                                            setCounter([...counter], counter[1].to = endOfDay)
                                        } else {
                                            setCounter([...counter], counter[1].from = '')
                                            setCounter([...counter], counter[1].to = '')
                                        }
                                    }}
                                />
                                <label className="form-check-label" htmlFor="time2" style={{ userSelect: 'none' }}>
                                    Today's data
                                </label>

                            </div>
                            <div className="row align-items-end">
                                <div className="col-xxl-6 mt-2">
                                    <label htmlFor="from2" className="form-label">From</label>
                                    <input
                                        type="datetime-local"
                                        value={counter[1].from}
                                        onChange={(e) => setCounter([...counter], counter[1].from = e.target.value)}
                                        className='form-control' id="from2" name="from2"
                                    />
                                </div>
                                <div className="col-xxl-6 mt-2">
                                    <label htmlFor="to2" className="form-label">To</label>
                                    <input
                                        type="datetime-local"
                                        value={counter[1].to}
                                        onChange={(e) => setCounter([...counter], counter[1].to = e.target.value)}
                                        className='form-control' id="to2" name="to2"
                                    />
                                </div>
                            </div>
                        </div>
                        {/* option 3 */}
                        <div className="col-lg-3 col-md-6">
                            {/* name */}
                            <div className="mb-3">
                                <label htmlFor="counterName3" className="form-label">Option 3</label>
                                <input
                                    type="text"
                                    name='option3'
                                    value={counter[2].name}
                                    onChange={(e) => setCounter([...counter], counter[2].name = e.target.value)}
                                    className="form-control"
                                    id="counterName3"
                                    placeholder="Enter counter name"
                                />
                            </div>
                            {/* value */}
                            <div className="mb-3">
                                <label htmlFor="formula3" className="form-label"> Formula </label>
                                <select
                                    className="form-select"
                                    name='displayedValue3'
                                    id='formula3'
                                    value={counter[2].formula}
                                    onChange={(e) => setCounter([...counter], counter[2].formula = e.target.value)}
                                >
                                    <option value='' selected disabled> Select Formula </option>
                                    {
                                        formulas.length > 0 ? (
                                            formulas.map(formula => <option key={formula._id} value={formula?.name?.trim()}>{formula.name}</option>)
                                        ) : ''
                                    }
                                </select>
                            </div>
                            {/* time  */}
                            <div className="mt-3">
                                <input
                                    className="form-check-input me-3"
                                    type="checkbox"
                                    checked={counter[2].isToday}
                                    id="time3"
                                    onChange={(e) => {
                                        setCounter([...counter], counter[2].isToday = !counter[2].isToday);
                                        if (e.target.checked) {
                                            setCounter([...counter], counter[2].from = startOfDay)
                                            setCounter([...counter], counter[2].to = endOfDay)
                                        } else {
                                            setCounter([...counter], counter[2].from = '')
                                            setCounter([...counter], counter[2].to = '')
                                        }
                                    }}
                                />
                                <label className="form-check-label" htmlFor="time3" style={{ userSelect: 'none' }}>
                                    Today's data
                                </label>

                            </div>
                            <div className="row align-items-end">
                                <div className="col-xxl-6 mt-2">
                                    <label htmlFor="from3" className="form-label">From</label>
                                    <input
                                        type="datetime-local"
                                        value={counter[2].from}
                                        onChange={(e) => setCounter([...counter], counter[2].from = e.target.value)}
                                        className='form-control' id="from3" name="from3"
                                    />
                                </div>
                                <div className="col-xxl-6 mt-2">
                                    <label htmlFor="to3" className="form-label">To</label>
                                    <input
                                        type="datetime-local"
                                        value={counter[2].to}
                                        onChange={(e) => setCounter([...counter], counter[2].to = e.target.value)}
                                        className='form-control' id="to3" name="to3"
                                    />
                                </div>
                            </div>
                        </div>
                        {/* option 4 */}
                        <div className="col-lg-3 col-md-6">
                            {/* name */}
                            <div className="mb-3">
                                <label htmlFor="counterName4" className="form-label">Option 4</label>
                                <input
                                    type="text"
                                    name='option1'
                                    value={counter[3].name}
                                    onChange={(e) => setCounter([...counter], counter[3].name = e.target.value)}
                                    className="form-control"
                                    id="counterName4"
                                    placeholder="Enter counter name"
                                />
                            </div>
                            {/* value */}
                            <div className="mb-3">
                                <label htmlFor="formula4" className="form-label"> Formula </label>
                                <select
                                    className="form-select"
                                    name='displayedValue3'
                                    id='formula4'
                                    value={counter[3].formula}
                                    onChange={(e) => setCounter([...counter], counter[3].formula = e.target.value)}
                                >
                                    <option value='' selected disabled> Select Formula </option>
                                    {
                                        formulas.length > 0 ? (
                                            formulas.map(formula => <option key={formula._id} value={formula?.name?.trim()}>{formula.name}</option>)
                                        ) : ''
                                    }
                                </select>
                            </div>
                            {/* time  */}
                            <div className="mt-3">
                                <input
                                    className="form-check-input me-3"
                                    type="checkbox"
                                    checked={counter[3].isToday}
                                    id="time4"
                                    onChange={(e) => {
                                        setCounter([...counter], counter[3].isToday = !counter[3].isToday);
                                        if (e.target.checked) {
                                            setCounter([...counter], counter[3].from = startOfDay)
                                            setCounter([...counter], counter[3].to = endOfDay)
                                        } else {
                                            setCounter([...counter], counter[3].from = '')
                                            setCounter([...counter], counter[3].to = '')
                                        }
                                    }}
                                />
                                <label className="form-check-label" htmlFor="time4" style={{ userSelect: 'none' }}>
                                    Today's data
                                </label>

                            </div>
                            <div className="row align-items-end">
                                <div className="row align-items-end">
                                    <div className="col-xxl-6 mt-2">
                                        <label htmlFor="from4" className="form-label">From</label>
                                        <input
                                            type="datetime-local"
                                            value={counter[3].from}
                                            onChange={(e) => setCounter([...counter], counter[3].from = e.target.value)}
                                            className='form-control' id="from4" name="from4"
                                        />
                                    </div>
                                    <div className="col-xxl-6 mt-2">
                                        <label htmlFor="to4" className="form-label">To</label>
                                        <input
                                            type="datetime-local"
                                            value={counter[3].to}
                                            onChange={(e) => setCounter([...counter], counter[3].to = e.target.value)}
                                            className='form-control' id="to4" name="to4"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

                {/* for graph */}
                {/* data 3 */}

                {/* <h4 className='mt-4'> Graph Settings </h4>
                <hr className='mt-0' /> */}

                <div className="row">
                    {/* graph 1 */}
                    <div className="col-xxl-4 col-md-6">
                        <h4 className='mt-4'> {templateData?.dashboard1?.graphs?.graph1?.name || 'Graph 1 Setting'} </h4>
                        <hr className='mt-0' />

                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="graph1" className="form-label">Graph Name</label>
                                    <input
                                        type="text"
                                        name='graph1'
                                        value={graphs.graph1.name}
                                        onChange={(e) => setGraphs({ ...graphs, graph1: { ...graphs.graph1, name: e.target.value } })}
                                        className="form-control"
                                        id="graph1"
                                        placeholder="Enter graph name"
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="yAxisValue1" className="form-label"> Select y-Axis Value</label>
                                <select
                                    className="form-select"
                                    name='yAxisValue1'
                                    id='yAxisValue1'
                                    value={graphs.graph1.yAxis}
                                    onChange={(e) => setGraphs({ ...graphs, graph1: { ...graphs.graph1, yAxis: e.target.value } })}
                                >
                                    <option value='' disabled selected> Select value </option>
                                    {
                                        parameters.map(parameter => <option value={parameter._id} key={parameter._id}>{parameter._id}</option>)
                                    }
                                </select>
                            </div>

                            <div className="col-md-6">
                                <div className="mt-3">
                                    <input
                                        className="form-check-input me-3"
                                        type="checkbox"
                                        checked={graphs.graph1.isToday}
                                        id="graphToday1"
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setGraphs({ ...graphs, graph1: { ...graphs.graph1, from: startOfDay, to: endOfDay, isToday: true } });
                                            } else {
                                                setGraphs({ ...graphs, graph1: { ...graphs.graph1, from: '', to: '', isToday: false } });
                                            }
                                        }}
                                    />
                                    <label className="form-check-label" htmlFor="graphToday1" style={{ userSelect: 'none' }}>
                                        Today's data
                                    </label>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mt-2">
                                    <label htmlFor="from1" className="form-label">From</label>
                                    <input
                                        type="datetime-local"
                                        value={graphs.graph1.from}
                                        onChange={(e) => setGraphs({ ...graphs, graph1: { ...graphs.graph1, from: e.target.value } })}
                                        className='form-control' id="from1" name="from1"
                                    />
                                </div>
                                <div className="col-md-6 mt-2">
                                    <label htmlFor="to1" className="form-label">To</label>
                                    <input
                                        type="datetime-local"
                                        value={graphs.graph1.to}
                                        onChange={(e) => setGraphs({ ...graphs, graph1: { ...graphs.graph1, to: e.target.value } })}
                                        className='form-control' id="to1" name="to1"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* graph 2 */}
                    <div className="col-xxl-4 col-md-6">
                        <h4 className='mt-4'> {templateData?.dashboard1?.graphs?.graph2?.name || 'Graph 2 Setting'} </h4>
                        <hr className='mt-0' />

                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="graph2" className="form-label">Graph Name</label>
                                    <input
                                        type="text"
                                        name='graph2'
                                        value={graphs.graph2.name}
                                        onChange={(e) => setGraphs({ ...graphs, graph2: { ...graphs.graph2, name: e.target.value } })}
                                        className="form-control"
                                        id="graph2"
                                        placeholder="Enter graph name"
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="yAxisValue2" className="form-label"> Select Y-Axis Value</label>
                                <select
                                    className="form-select"
                                    name='yAxisValue2'
                                    id='yAxisValue2'
                                    value={graphs.graph2.yAxis}
                                    onChange={(e) => setGraphs({ ...graphs, graph2: { ...graphs.graph2, yAxis: e.target.value } })}
                                >
                                    <option value='' disabled selected> Select value </option>
                                    {
                                        parameters.map(parameter => <option value={parameter._id} key={parameter._id}>{parameter._id}</option>)
                                    }
                                </select>
                            </div>

                            <div className="col-md-6">
                                <div className="mt-3">
                                    <input
                                        className="form-check-input me-3"
                                        type="checkbox"
                                        checked={graphs.graph2.isToday}
                                        id="graphToday2"
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setGraphs({ ...graphs, graph2: { ...graphs.graph2, from: startOfDay, to: endOfDay, isToday: true } });
                                            } else {
                                                setGraphs({ ...graphs, graph2: { ...graphs.graph2, from: '', to: '', isToday: false } });
                                            }
                                        }}
                                    />
                                    <label className="form-check-label" htmlFor="graphToday2" style={{ userSelect: 'none' }}>
                                        Today's data
                                    </label>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mt-2">
                                    <label htmlFor="from2" className="form-label">From</label>
                                    <input
                                        type="datetime-local"
                                        value={graphs.graph2.from}
                                        onChange={(e) => setGraphs({ ...graphs, graph2: { ...graphs.graph2, from: e.target.value } })}
                                        className='form-control' id="from2" name="from2"
                                    />
                                </div>
                                <div className="col-md-6 mt-2">
                                    <label htmlFor="to1" className="form-label">To</label>
                                    <input
                                        type="datetime-local"
                                        value={graphs.graph2.to}
                                        onChange={(e) => setGraphs({ ...graphs, graph2: { ...graphs.graph2, to: e.target.value } })}
                                        className='form-control' id="to1" name="to1"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* pie chart */}
                    <div className="col-xxl-4 col-md-6">
                        <h4 className='mt-4'> {templateData?.dashboard1?.graphs?.pieChart?.name || 'Pie Chart Settings'} </h4>
                        <hr className='mt-0' />

                        <div className="row">
                            <div className=" col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="pieChart" className="form-label">Graph Name</label>
                                    <input
                                        type="text"
                                        name='pieChart'
                                        value={graphs.pieChart.name}
                                        onChange={e => setGraphs({ ...graphs, pieChart: { ...graphs.pieChart, name: e.target.value } })}
                                        className="form-control"
                                        id="pieChart"
                                        placeholder="Enter graph name"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div>
                                    <input
                                        className="form-check-input me-3"
                                        type="checkbox"
                                        checked={graphs.pieChart.isToday}
                                        id="graphToday3"
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setGraphs({ ...graphs, pieChart: { ...graphs.pieChart, from: startOfDay, to: endOfDay, isToday: true } });
                                            } else {
                                                setGraphs({ ...graphs, pieChart: { ...graphs.pieChart, from: '', to: '', isToday: false } });
                                            }
                                        }}
                                    />
                                    <label className="form-check-label" htmlFor="graphToday3" style={{ userSelect: 'none' }}>
                                        Today's data
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mt-2">
                                <label htmlFor="from2" className="form-label">From</label>
                                <input
                                    type="datetime-local"
                                    value={graphs.pieChart.from}
                                    onChange={(e) => setGraphs({ ...graphs, pieChart: { ...graphs.pieChart, from: e.target.value } })}
                                    className='form-control' id="from2" name="from2"
                                />
                            </div>
                            <div className="col-md-6 mt-2">
                                <label htmlFor="to1" className="form-label">To</label>
                                <input
                                    type="datetime-local"
                                    value={graphs.pieChart.to}
                                    onChange={(e) => setGraphs({ ...graphs, pieChart: { ...graphs.pieChart, to: e.target.value } })}
                                    className='form-control' id="to1" name="to1"
                                />
                            </div>
                        </div>

                        <div className="row mt-3">

                            <div className='mb-2'> Select device </div>

                            {
                                pieKey.map(key => (
                                    <div key={key._id} className="col-md-6">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value={key.name}
                                                id={key._id}
                                                checked={graphs.pieChart.device.includes(key.name)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setGraphs({ ...graphs, pieChart: { ...graphs.pieChart, device: [...graphs.pieChart.device, e.target.value] } })
                                                    } else {
                                                        let filter = graphs.pieChart.device.filter(d => d !== e.target.value)
                                                        setGraphs({ ...graphs, pieChart: { ...graphs.pieChart, device: filter } })
                                                    }

                                                }}
                                            />
                                            <label className="form-check-label" htmlFor={key._id}>
                                                {key.name}
                                            </label>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="text-end mt-3">
                    <button type='submit' className="btn btn-success me-2"> update </button>
                    <button className="btn btn-secondary"> cancel </button>
                </div>
            </form >
        </div >
    );
});

export default SelectedDashboardSettings1;