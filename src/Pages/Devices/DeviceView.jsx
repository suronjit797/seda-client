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
    const [selectedFormula, setSelectedFormula] = useState();
    const [assignedFormulas, setAssignedFormulas] = useState([]);
    const [assignFormula, setAssignFormula] = useState({
        device: deviceId,
        formula: ""
    });
    const {formula} = assignFormula
    const [SuccessMessage, setSuccessMessage] = useState();
    const [ErrorMessage, setErrorMessage] = useState();
    const onInputChange = e => {
        setAssignFormula({ ...assignFormula, [e.target.name]: e.target.value });
    };
    useEffect(() => {
      let filter = formulas.filter(item=> formula === item._id) 
      setSelectedFormula(filter[0])
    }, [formula, formulas]);
    console.log(selectedFormula, "selectedFormula")
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
                                <div className="col-md-6">
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
                                    <div className="row mb-2 mt-5">
                                        <div className="">Assign Formula</div>
                                        <div className='d-flex justify-content-center'>
                                            {isLoading && <Spinner animation="border" variant="dark" />}
                                        </div>
                                        {SuccessMessage && <div className="alert alert-success" role="alert">{SuccessMessage} </div>}
                                        {ErrorMessage && <div className="alert alert-danger" role="alert">{ErrorMessage} </div>}
                                        <form onSubmit={handleSubmit}>
                                            <div className="row me-3">
                                                <div className="col-md-10">
                                                    <select name="formula" className='form-select' onChange={onInputChange}>
                                                        <option>Select a formula</option>
                                                        {formulas && formulas.length > 0 && formulas.map((item, index) => (
                                                            <option value={item?._id} key={index}>{item.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="col-md-2">
                                                    <button type='submit' className='btn btn-warning'>Assign</button>
                                                </div>
                                            </div>
                                            <div className="row mt-1">
                                                <div className="col">
                                                   <b> Preview: {selectedFormula && selectedFormula.formula}</b>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
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
                                <div className="col-md-6">
                                    <DeviceParameters data={deviceParameters} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 d-flex justify-content-end">
                                    <Link to={`/edit-device/` + deviceId} className="btn btn-success me-1">Edit</Link>
                                    <Link to={`/devices`} className="btn btn-secondary">Back</Link>
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
