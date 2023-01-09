import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import DevicesSidebar from '../../Components/Devices/DevicesSidebar';
import DeviceParameters from './DeviceParameters';
import { FiTrash } from "react-icons/fi"
import { Spinner } from 'react-bootstrap';
import Swal from "sweetalert2";


const DeviceView = () => {
    const Params = useParams()
    const deviceId = Params.deviceId
    const [isLoading, setIsLoading] = useState(false);
    const [deviceDetails, setDeviceDetails] = useState();
    const [deviceParameters, setDeviceParameters] = useState();
    const [formulas, setFormulas] = useState([]);
    const [deviceFormulas, setDeviceFormulas] = useState([]);
    const [selectedFormula, setSelectedFormula] = useState();
    const [assignFormula, setAssignFormula] = useState({
        device: deviceId,
        formulaList: ""
    });
    const [formulaData, setFormulaData] = useState({
        name: "",
        unit: "",
        formula: "",
        device: deviceId,
        type: "device",
        formulaParts: {
            selectOne: "",
            valueOne: "",
            selectTwo: "",
            valueTwo: "",
            selectThree: "",
            valueThree: "",
            selectFour: "",
            valueFour: "",
            selectFive: "",
            valueFive: "",
        }
    });
    const { name, unit, formula } = formulaData
    const { selectOne, valueOne, selectTwo, valueTwo, selectThree, valueThree, selectFour, valueFour, selectFive, valueFive } = formulaData.formulaParts
    function handleChange(value, name) {
        if (Object.keys(formulaData.formulaParts).includes(name)) {
            setFormulaData({
                ...formulaData,
                formulaParts: { ...formulaData.formulaParts, [name]: value },
            });
        } else {
            setFormulaData({
                ...formulaData,
                [name]: value,
            });
        }
        console.log(formulaData)
    }

    const { formulaList } = assignFormula
    const [SuccessMessage, setSuccessMessage] = useState();

    const onInputChange = e => {
        setAssignFormula({ ...assignFormula, [e.target.name]: e.target.value });
    };
    useEffect(() => {
        let filter = formulas.filter(item => formulaList === item._id)
        setSelectedFormula(filter[0])
    }, [formulaList, formulas]);

    useEffect(() => {
        if (selectedFormula) {
            setFormulaData({
                ...formulaData,
                name: `${deviceDetails?.name} - ${selectedFormula?.name}`,
                unit: selectedFormula?.unit,
                formulaParts: {
                    ...formulaData.formulaParts,
                    selectOne: selectedFormula?.formulaParts?.selectOne,
                    valueOne: selectedFormula?.formulaParts?.valueOne,
                    selectTwo: selectedFormula?.formulaParts?.selectTwo,
                    valueTwo: selectedFormula?.formulaParts?.valueTwo,
                    selectThree: selectedFormula?.formulaParts?.selectThree,
                    valueThree: selectedFormula?.formulaParts?.valueThree,
                    selectFour: selectedFormula?.formulaParts?.selectFour,
                    valueFour: selectedFormula?.formulaParts?.valueFour,
                    selectFive: selectedFormula?.formulaParts?.selectFive,
                    valueFive: selectedFormula?.formulaParts?.valueFive,
                },
            });
        }
        // eslint-disable-next-line
    }, [selectedFormula, deviceDetails]);

    useEffect(() => {
        if (formulaData) {
            setFormulaData({
                ...formulaData,
                formula: `${valueOne} ${valueTwo} ${valueThree} ${valueFour} ${valueFive}`,
            });
        }
        // eslint-disable-next-line
    }, [valueOne, valueTwo, valueThree, valueFour, valueFive]);

    const getDevice = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/device/` + deviceId, { withCredentials: true })
        if (response) {
            setDeviceDetails(response.data)
        }
    }
    const getDeviceParameters = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/device/device-parameters/` + deviceId, { withCredentials: true })
        if (response) {
            setDeviceParameters(response.data.sort((a, b) => a._id > b._id ? 1 : -1))
        }
    }

    const getFormulas = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/formula`, { withCredentials: true })
        if (response) {
            setFormulas(response.data)
        }
    }
    const getDeviceFormulas = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/formula/device/` + deviceId, { withCredentials: true })
        if (response) {
            setDeviceFormulas(response.data)
        }
    }

    useEffect(() => {
        document.title= "Seda - Device Information"
        getDeviceParameters()
        getDevice()
        getFormulas()
        getDeviceFormulas()
        // eslint-disable-next-line
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/formula`, formulaData, { withCredentials: true })
        if (response) {
            setIsLoading(false)
            setFormulaData({
                name: "",
                unit: "",
                formula: "",
                type: "system",
                formulaParts: {
                    selectOne: "",
                    valueOne: "",
                    selectTwo: "",
                    valueTwo: "",
                    selectThree: "",
                    valueThree: "",
                    selectFour: "",
                    valueFour: "",
                    selectFive: "",
                    valueFive: "",
                }
            });
            getDeviceFormulas();
            setSuccessMessage("Formula Created Successfully");
            setTimeout(() => {
                setSuccessMessage();
            }, 2000)
        }
    }

    const UnassignFormula = async (Id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to unassign formula?",
            //icon: "warning",
            dangerMode: true,
            showCancelButton: true,
            confirmButtonText: 'Confirm'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${process.env.REACT_APP_API_URL}/formula/` + Id, { withCredentials: true })
                    .then(res => {
                        getDeviceFormulas();
                        Swal.fire({
                            title: "Done!",
                            text: "Formula unassigned successfully",
                            icon: "success",
                            timer: 2000,
                            button: false
                        })

                    });
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {

            }
        })
    }
    return (
        <div className='installer-view'>
            <div className="container-fluid">
                <div className="row my-5 vh60">
                    <div className="col-md-2">
                        <DevicesSidebar />
                    </div>
                    <div className="col-md-10">
                        <div className="card p-3 mb-3">
                            <h3>Device Information</h3>
                            <div className="row mt-4">
                                <div className="col-md-12">
                                    <h4 className='mb-4'>General Description</h4>
                                    <div className="row mb-2">
                                        <div className="col-3">Device Name</div>
                                        <div className="col-9">: {deviceDetails?.name}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-3">Device Type</div>
                                        <div className="col-9">: {deviceDetails?.deviceType?.name}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-3">Serial No.</div>
                                        <div className="col-9">: {deviceDetails?.serial}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-3">API Key</div>
                                        <div className="col-9">: {deviceDetails?.apiKey}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-3">Site Location</div>
                                        <div className="col-9">: {deviceDetails?.site?.name}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-3">Installer</div>
                                        <div className="col-9">: {deviceDetails?.site?.installer?.name}</div>
                                    </div>

                                </div>
                                <div className="col-md-6">

                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 d-flex justify-content-end">
                                    <Link to="/devices" className="btn btn-success me-2">Edit</Link>
                                    <Link to="/devices" className="btn btn-secondary">Back</Link>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="row mb-2">
                                    <h4>Assign Formula to Device</h4>
                                    <div className='d-flex justify-content-center'>
                                        {isLoading && <Spinner animation="border" variant="dark" />}
                                    </div>
                                    {SuccessMessage && <div className="alert alert-success" role="alert">{SuccessMessage} </div>}
                                    <div className="row me-3">
                                        <div className="col-md-4">
                                            <label htmlFor="formula">Assign Formula</label>
                                            <select name="formulaList" id='formula' className='form-select' onChange={onInputChange}>
                                                <option>Select a formula</option>
                                                {formulas && formulas.length > 0 && formulas.map((item, index) => (
                                                    <option value={item?._id} key={index}>{item.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="formula">Formula Preview</label>
                                            {selectedFormula ?
                                                <input type="text" className='form-control' value={selectedFormula.formula} disabled />
                                                :
                                                <input type="text" className='form-control' value="" disabled />
                                            }
                                        </div>
                                        <div className="col-md-3">
                                            <label htmlFor="formula">Formula Unit/Value</label>
                                            {selectedFormula ?
                                                <input type="text" className='form-control' value={unit} onChange={e => handleChange(e.target.value, 'unit')} disabled />
                                                :
                                                <input type="text" className='form-control' value="" disabled />
                                            }
                                        </div>
                                        {/* <div className="col-md-1">
                                            <label htmlFor="" className='mb-2'></label>
                                            <button type='submit' className='btn btn-warning'>Select</button>
                                        </div> */}
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-2">
                                            {selectedFormula ?
                                                <input type="text" className='form-control' value={selectedFormula?.formulaParts?.valueOne} disabled />
                                                :
                                                <input type="text" className='form-control' value="" disabled />
                                            }
                                        </div>
                                        <div className="col-md-2">
                                            {selectedFormula ?
                                                <input type="text" className='form-control' value={selectedFormula?.formulaParts?.valueTwo} disabled />
                                                :
                                                <input type="text" className='form-control' value="" disabled />
                                            }
                                        </div>
                                        <div className="col-md-2">
                                            {selectedFormula ?
                                                <input type="text" className='form-control' value={selectedFormula?.formulaParts?.valueThree} disabled />
                                                :
                                                <input type="text" className='form-control' value="" disabled />
                                            }
                                        </div>
                                        <div className="col-md-2">
                                            {selectedFormula ?
                                                <input type="text" className='form-control' value={selectedFormula?.formulaParts?.valueFour} disabled />
                                                :
                                                <input type="text" className='form-control' value="" disabled />
                                            }
                                        </div>
                                        <div className="col-md-2">
                                            {selectedFormula ?
                                                <input type="text" className='form-control' value={selectedFormula?.formulaParts?.valueFive} disabled />
                                                :
                                                <input type="text" className='form-control' value="" disabled />
                                            }
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <label>Select Device Parameters</label>
                                        <div className="col-md-2">
                                            {selectedFormula ?
                                                (
                                                    <div>
                                                        {(() => {
                                                            switch (selectOne) {
                                                                case 'parameter':
                                                                    return (
                                                                        <select name="valueOne" id="valueOne" value={valueOne} onChange={e => handleChange(e.target.value, 'valueOne')} className='form-select'>
                                                                            <option>Select Parameter</option>
                                                                            {deviceParameters && deviceParameters.length > 0 && deviceParameters.map((item, index) => (
                                                                                <option value={item._id} key={index}>{item._id}</option>
                                                                            ))}
                                                                        </select>
                                                                    );
                                                                case 'operator':
                                                                    return (
                                                                        <input type="text" name="valueOne" id="valueOne" value={valueOne} onChange={e => handleChange(e.target.value, 'valueOne')} className='form-control' placeholder='Enter a value' disabled />
                                                                    );
                                                                case 'formula':
                                                                    return (
                                                                        <select name="valueOne" id="valueOne" value={valueOne} onChange={e => handleChange(e.target.value, 'valueOne')} className='form-select'>
                                                                            <option>Select Formula</option>
                                                                        </select>
                                                                    );
                                                                default:
                                                                    return (
                                                                        <input type="text" name="valueOne" id="valueOne" value={valueOne} onChange={e => handleChange(e.target.value, 'valueOne')} className='form-control' placeholder='Enter a value' disabled />
                                                                    )
                                                            }
                                                        })
                                                            ()}
                                                    </div>

                                                )
                                                :
                                                <input type="text" className='form-control' value="" disabled />
                                            }
                                        </div>
                                        <div className="col-md-2">
                                            {selectedFormula ?
                                                (
                                                    <div>
                                                        {(() => {
                                                            switch (selectTwo) {
                                                                case 'parameter':
                                                                    return (
                                                                        <select name="valueTwo" id="valueTwo" value={valueTwo} onChange={e => handleChange(e.target.value, 'valueTwo')} className='form-select'>
                                                                            <option>Select Parameter</option>
                                                                            {deviceParameters && deviceParameters.length > 0 && deviceParameters.map((item, index) => (
                                                                                <option value={item._id} key={index}>{item._id}</option>
                                                                            ))}
                                                                        </select>
                                                                    );
                                                                case 'operator':
                                                                    return (
                                                                        <input type="text" name="valueTwo" id="valueTwo" value={valueTwo} onChange={e => handleChange(e.target.value, 'valueTwo')} className='form-control' placeholder='Enter a value' disabled />
                                                                    );
                                                                case 'formula':
                                                                    return (
                                                                        <select name="valueTwo" id="valueTwo" value={valueTwo} onChange={e => handleChange(e.target.value, 'valueTwo')} className='form-select'>
                                                                            <option>Select Formula</option>
                                                                        </select>
                                                                    );
                                                                default:
                                                                    return (
                                                                        <input type="text" name="valueTwo" id="valueTwo" value={valueTwo} onChange={e => handleChange(e.target.value, 'valueTwo')} className='form-control' placeholder='Enter a value' disabled />
                                                                    )
                                                            }
                                                        })
                                                            ()}
                                                    </div>

                                                )
                                                :
                                                <input type="text" className='form-control' value="" disabled />
                                            }
                                        </div>
                                        <div className="col-md-2">
                                            {selectedFormula ?
                                                (
                                                    <div>
                                                        {(() => {
                                                            switch (selectThree) {
                                                                case 'parameter':
                                                                    return (
                                                                        <select name="valueThree" id="valueThree" value={valueThree} onChange={e => handleChange(e.target.value, 'valueThree')} className='form-select'>
                                                                            <option>Select Parameter</option>
                                                                            {deviceParameters && deviceParameters.length > 0 && deviceParameters.map((item, index) => (
                                                                                <option value={item._id} key={index}>{item._id}</option>
                                                                            ))}
                                                                        </select>
                                                                    );
                                                                case 'operator':
                                                                    return (
                                                                        <input type="text" name="valueThree" id="valueThree" value={valueThree} onChange={e => handleChange(e.target.value, 'valueThree')} className='form-control' placeholder='Enter a value' disabled />
                                                                    );
                                                                case 'formula':
                                                                    return (
                                                                        <select name="valueThree" id="valueThree" value={valueThree} onChange={e => handleChange(e.target.value, 'valueThree')} className='form-select'>
                                                                            <option>Select Formula</option>
                                                                        </select>
                                                                    );
                                                                default:
                                                                    return (
                                                                        <input type="text" name="valueThree" id="valueThree" value={valueThree} onChange={e => handleChange(e.target.value, 'valueThree')} className='form-control' placeholder='Enter a value' disabled />
                                                                    )
                                                            }
                                                        })
                                                            ()}
                                                    </div>

                                                )
                                                :
                                                <input type="text" className='form-control' value="" disabled />
                                            }
                                        </div>
                                        <div className="col-md-2">
                                            {selectedFormula ?
                                                (
                                                    <div>
                                                        {(() => {
                                                            switch (selectFour) {
                                                                case 'parameter':
                                                                    return (
                                                                        <select name="valueFour" id="valueFour" value={valueFour} onChange={e => handleChange(e.target.value, 'valueFour')} className='form-select'>
                                                                            <option>Select Parameter</option>
                                                                            {deviceParameters && deviceParameters.length > 0 && deviceParameters.map((item, index) => (
                                                                                <option value={item._id} key={index}>{item._id}</option>
                                                                            ))}
                                                                        </select>
                                                                    );
                                                                case 'operator':
                                                                    return (
                                                                        <input type="text" name="valueFour" id="valueFour" value={valueFour} onChange={e => handleChange(e.target.value, 'valueFour')} className='form-control' placeholder='Enter a value' disabled />
                                                                    );
                                                                case 'formula':
                                                                    return (
                                                                        <select name="valueFour" id="valueFour" value={valueFour} onChange={e => handleChange(e.target.value, 'valueFour')} className='form-select'>
                                                                            <option>Select Formula</option>
                                                                        </select>
                                                                    );
                                                                default:
                                                                    return (
                                                                        <input type="text" name="valueFour" id="valueFour" value={valueFour} onChange={e => handleChange(e.target.value, 'valueFour')} className='form-control' placeholder='Enter a value' disabled />
                                                                    )
                                                            }
                                                        })
                                                            ()}
                                                    </div>

                                                )
                                                :
                                                <input type="text" className='form-control' value="" disabled />
                                            }
                                        </div>
                                        <div className="col-md-2">
                                            {selectedFormula ?
                                                (
                                                    <div>
                                                        {(() => {
                                                            switch (selectFive) {
                                                                case 'parameter':
                                                                    return (
                                                                        <select name="valueFive" id="valueFive" value={valueFive} onChange={e => handleChange(e.target.value, 'valueFive')} className='form-select'>
                                                                            <option>Select Parameter</option>
                                                                            {deviceParameters && deviceParameters.length > 0 && deviceParameters.map((item, index) => (
                                                                                <option value={item._id} key={index}>{item._id}</option>
                                                                            ))}
                                                                        </select>
                                                                    );
                                                                case 'operator':
                                                                    return (
                                                                        <input type="text" name="valueFive" id="valueFive" value={valueFive} onChange={e => handleChange(e.target.value, 'valueFive')} className='form-control' placeholder='Enter a value' disabled />
                                                                    );
                                                                case 'formula':
                                                                    return (
                                                                        <select name="valueFive" id="valueFive" value={valueFive} onChange={e => handleChange(e.target.value, 'valueFive')} className='form-select'>
                                                                            <option>Select Formula</option>
                                                                        </select>
                                                                    );
                                                                default:
                                                                    return (
                                                                        <input type="text" name="valueFive" id="valueFive" value={valueFive} onChange={e => handleChange(e.target.value, 'valueFive')} className='form-control' placeholder='Enter a value' disabled />
                                                                    )
                                                            }
                                                        })
                                                            ()}
                                                    </div>

                                                )
                                                :
                                                <input type="text" className='form-control' value="" disabled />
                                            }
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <b>Device Formula Preview: {formula}</b>
                                            </div>
                                        </div>
                                        <div className="row mt-2 mb-3">
                                            <form onSubmit={handleSubmit}>
                                                <div className="col-md-6">
                                                    <div className='mb-3'>
                                                        <label htmlFor="name">Formula Name</label>
                                                        <input type="text" id='name' name='name' value={name} onChange={e => handleChange(e.target.value, 'name')} className='form-control' placeholder='Enter formula name' required disabled />
                                                    </div>
                                                    <div>
                                                        <button className='btn btn-success me-2' type='submit'>Save Formula</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-5">
                                <div className="col-md-6">
                                    <DeviceParameters data={deviceParameters}  device={deviceDetails} getDevice={getDevice} getDeviceParameters={getDeviceParameters}/>
                                </div>
                                <div className="col-md-6">
                                    <h4 className='mt-3'>Assigned Device Formulas</h4>
                                    <div className="row me-2">
                                        <div className="card ms-2 me-3">
                                            <div className="row py-1">
                                                <div className="col-md-2 text-center"><b>No.</b></div>
                                                <div className="col-md-8 text-center"><b>Formula</b></div>
                                                <div className="col-md-2 text-center"><b>Action</b></div>
                                            </div>
                                            <hr className='m-1' />
                                            {deviceFormulas && deviceFormulas.length > 0 && deviceFormulas.map((item, index) => (
                                                <div className="row py-2 border-bottom" key={index}>
                                                    <div className="col-md-2 text-center">{index + 1}</div>
                                                    <div className="col-md-8 text-center">{item?.name}</div>
                                                    <div className="col-md-2 text-center"><button className='btn btn-danger' onClick={() => UnassignFormula(item._id)}><FiTrash /></button></div>
                                                </div>
                                            ))}

                                        </div>
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

export default DeviceView;
