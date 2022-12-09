import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
    const [selectedFormula, setSelectedFormula] = useState();
    const [assignedFormulas, setAssignedFormulas] = useState([]);
    const [assignFormula, setAssignFormula] = useState({
        device: deviceId,
        formulaList: ""
    });
    const [formulaData, setFormulaData] = useState({
        name: "",
        unit: "",
        formula: "",
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
    }

    const { formulaList } = assignFormula
    const [SuccessMessage, setSuccessMessage] = useState();
    const [ErrorMessage, setErrorMessage] = useState();

    const onInputChange = e => {
        setAssignFormula({ ...assignFormula, [e.target.name]: e.target.value });
    };
    useEffect(() => {
        let filter = formulas.filter(item => formulaList === item._id)
        setSelectedFormula(filter[0])
    }, [formulaList, formulas]);

    useEffect(() => {
        if(selectedFormula){
            setFormulaData({
                ...formulaData,
                unit: selectedFormula?.unit,
                formulaParts: { ...formulaData.formulaParts, 
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
    }, [selectedFormula]);

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
    const getAssignedFormulas = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/assignFormula/` + deviceId, { withCredentials: true })
        if (response) {
            setAssignedFormulas(response.data)
        }
    }
    useEffect(() => {
        getDeviceParameters()
        getDevice()
        getFormulas()
        getAssignedFormulas()
        // eslint-disable-next-line
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/assignFormula`, assignFormula, { withCredentials: true }).catch(function (error) {
            if (error.response) {
                setIsLoading(false)
                setErrorMessage(error.response.data)
                setTimeout(() => {
                    setErrorMessage()
                }, 2000)
            }
        });
        const data = response.data
        if (data) {
            setIsLoading(false)
            getAssignedFormulas()
            setSuccessMessage("Formula assigned successfully")
            setTimeout(() => {
                setSuccessMessage()
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
                axios.delete(`${process.env.REACT_APP_API_URL}/assignFormula/` + Id, { withCredentials: true })
                    .then(res => {
                        getAssignedFormulas()
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
                                    <hr />

                                </div>
                                <div className="col-md-6">

                                </div>
                            </div>
                            <div className="row">
                                <div className="row mb-2">
                                    <h4>Assign Formula to Device</h4>
                                    <div className='d-flex justify-content-center'>
                                        {isLoading && <Spinner animation="border" variant="dark" />}
                                    </div>
                                    {SuccessMessage && <div className="alert alert-success" role="alert">{SuccessMessage} </div>}
                                    {ErrorMessage && <div className="alert alert-danger" role="alert">{ErrorMessage} </div>}
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
                                                <input type="text" className='form-control' value={selectedFormula.unit} onChange={e => handleChange(e.target.value, 'unit')} disabled />
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
                                                            switch (selectedFormula?.formulaParts?.selectOne) {
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
                                                            switch (selectedFormula?.formulaParts?.selectTwo) {
                                                                case 'parameter':
                                                                    return (
                                                                        <select name="valueTwo" id="valueTwo" value={selectedFormula?.formulaParts?.valueTwo} onChange={onInputChange} className='form-select'>
                                                                            <option>Select Parameter</option>
                                                                            {deviceParameters && deviceParameters.length > 0 && deviceParameters.map((item, index) => (
                                                                                <option value={item._id} key={index}>{item._id}</option>
                                                                            ))}
                                                                        </select>
                                                                    );
                                                                case 'operator':
                                                                    return (
                                                                        <input type="text" name="valueTwo" id="valueTwo" value={selectedFormula?.formulaParts?.valueTwo} onChange={onInputChange} className='form-control' placeholder='Enter a value' disabled />
                                                                    );
                                                                case 'formula':
                                                                    return (
                                                                        <select name="valueTwo" id="valueTwo" value={selectedFormula?.formulaParts?.valueTwo} onChange={onInputChange} className='form-select'>
                                                                            <option>Select Formula</option>
                                                                        </select>
                                                                    );
                                                                default:
                                                                    return (
                                                                        <input type="text" name="valueTwo" id="valueTwo" value={selectedFormula?.formulaParts?.valueTwo} onChange={onInputChange} className='form-control' placeholder='Enter a value' disabled />
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
                                                            switch (selectedFormula?.formulaParts?.selectThree) {
                                                                case 'parameter':
                                                                    return (
                                                                        <select name="valueThree" id="valueThree" value={selectedFormula?.formulaParts?.valueThree} onChange={onInputChange} className='form-select'>
                                                                            <option>Select Parameter</option>
                                                                            {deviceParameters && deviceParameters.length > 0 && deviceParameters.map((item, index) => (
                                                                                <option value={item._id} key={index}>{item._id}</option>
                                                                            ))}
                                                                        </select>
                                                                    );
                                                                case 'operator':
                                                                    return (
                                                                        <input type="text" name="valueThree" id="valueThree" value={selectedFormula?.formulaParts?.valueThree} onChange={onInputChange} className='form-control' placeholder='Enter a value' disabled />
                                                                    );
                                                                case 'formula':
                                                                    return (
                                                                        <select name="valueThree" id="valueThree" value={selectedFormula?.formulaParts?.valueThree} onChange={onInputChange} className='form-select'>
                                                                            <option>Select Formula</option>
                                                                        </select>
                                                                    );
                                                                default:
                                                                    return (
                                                                        <input type="text" name="valueThree" id="valueThree" value={selectedFormula?.formulaParts?.valueThree} onChange={onInputChange} className='form-control' placeholder='Enter a value' disabled />
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
                                                            switch (selectedFormula?.formulaParts?.selectFour) {
                                                                case 'parameter':
                                                                    return (
                                                                        <select name="valueFour" id="valueFour" value={selectedFormula?.formulaParts?.valueFour} onChange={onInputChange} className='form-select'>
                                                                            <option>Select Parameter</option>
                                                                            {deviceParameters && deviceParameters.length > 0 && deviceParameters.map((item, index) => (
                                                                                <option value={item._id} key={index}>{item._id}</option>
                                                                            ))}
                                                                        </select>
                                                                    );
                                                                case 'operator':
                                                                    return (
                                                                        <input type="text" name="valueFour" id="valueFour" value={selectedFormula?.formulaParts?.valueFour} onChange={onInputChange} className='form-control' placeholder='Enter a value' disabled />
                                                                    );
                                                                case 'formula':
                                                                    return (
                                                                        <select name="valueFour" id="valueFour" value={selectedFormula?.formulaParts?.valueFour} onChange={onInputChange} className='form-select'>
                                                                            <option>Select Formula</option>
                                                                        </select>
                                                                    );
                                                                default:
                                                                    return (
                                                                        <input type="text" name="valueFour" id="valueFour" value={selectedFormula?.formulaParts?.valueFour} onChange={onInputChange} className='form-control' placeholder='Enter a value' disabled />
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
                                                            switch (selectedFormula?.formulaParts?.selectFive) {
                                                                case 'parameter':
                                                                    return (
                                                                        <select name="valueFive" id="valueFive" value={selectedFormula?.formulaParts?.valueFive} onChange={onInputChange} className='form-select'>
                                                                            <option>Select Parameter</option>
                                                                            {deviceParameters && deviceParameters.length > 0 && deviceParameters.map((item, index) => (
                                                                                <option value={item._id} key={index}>{item._id}</option>
                                                                            ))}
                                                                        </select>
                                                                    );
                                                                case 'operator':
                                                                    return (
                                                                        <input type="text" name="valueFive" id="valueFive" value={selectedFormula?.formulaParts?.valueFive} onChange={onInputChange} className='form-control' placeholder='Enter a value' disabled />
                                                                    );
                                                                case 'formula':
                                                                    return (
                                                                        <select name="valueFive" id="valueFive" value={selectedFormula?.formulaParts?.valueFive} onChange={onInputChange} className='form-select'>
                                                                            <option>Select Formula</option>
                                                                        </select>
                                                                    );
                                                                default:
                                                                    return (
                                                                        <input type="text" name="valueFive" id="valueFive" value={selectedFormula?.formulaParts?.valueFive} onChange={onInputChange} className='form-control' placeholder='Enter a value' disabled />
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
                                                <b>New Formula Preview: {formula}</b>
                                            </div>
                                        </div>
                                        <div className="row mt-2 mb-3">
                                            <div className="col-md-6">
                                                <div className='mb-3'>
                                                    <label htmlFor="name">Formula Name</label>
                                                    <input type="text" id='name' name='name' onChange={e => handleChange(e.target.value, 'name')} className='form-control' placeholder='Enter formula name' required disabled />
                                                </div>
                                                <div>
                                                    <button className='btn btn-success'>Save Formula</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-5">
                                <div className="col-md-6">
                                    <DeviceParameters data={deviceParameters} />
                                </div>
                                <div className="col-md-6">
                                    <h5 className='mt-3'>Assigned Formulas</h5>
                                    <div className="row me-2">
                                        <div className="card ms-2 me-3">
                                            <div className="row py-1">
                                                <div className="col-md-2 text-center"><b>No.</b></div>
                                                <div className="col-md-8 text-center"><b>Formula</b></div>
                                                <div className="col-md-2 text-center"><b>Action</b></div>
                                            </div>
                                            <hr className='m-1' />
                                            {assignedFormulas && assignedFormulas.length > 0 && assignedFormulas.map((item, index) => (
                                                <div className="row py-2 border-bottom" key={index}>
                                                    <div className="col-md-2 text-center">{index + 1}</div>
                                                    <div className="col-md-8 text-center">{item?.formula?.name}</div>
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
