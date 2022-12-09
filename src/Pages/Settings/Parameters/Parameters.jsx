import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import SettingSidebarNav from '../../../Components/Settings/SettingSidebarNav';
import ParametersTable from './ParametersTable';

const Parameters = () => {
    const [SuccessMessage, setSuccessMessage] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const userDetails = useSelector((state) => state.user.userDetails);
    const [parameters, setParameters] = useState([]);
    const [parameterData, setParameterData] = useState({
        name: "",
        type: "",
        value: ""
    });
    const { name, type, value } = parameterData;

    const onInputChange = e => {
        setParameterData({ ...parameterData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/parameters`, parameterData, { withCredentials: true })
        if (response) {
            setIsLoading(false)
            setParameterData({ name: "", type: "", value: "" })
            getParameters()
            setSuccessMessage("Parameter Created Successfully")
            setTimeout(() => {
                setSuccessMessage()
            }, 2000)
        }
        e.target.reset();
    }

    const getParameters = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/parameters`, { withCredentials: true })
        if (response) {
            setParameters(response.data)
        }
    }
    useEffect(() => {
        getParameters()
    }, []);
    return (
        <div className='settings'>
            <div className="container-fluid">
                <div className="row my-5 vh60">
                    <div className="col-md-2">
                        <SettingSidebarNav />
                    </div>
                    <div className="col-md-10">
                        <div className="card p-3 mb-3">
                            <h3>Manage Parameter</h3>
                            {(() => {
                                switch (userDetails.role) {
                                    case 'superAdmin':
                                        return (
                                            <div className="row mt-4">
                                                <div className="col-md-4">
                                                    <h4 className='mb-3'>Add New Parameter</h4>
                                                    <div className='d-flex justify-content-center'>
                                                        {isLoading && <Spinner animation="border" variant="dark" />}
                                                    </div>
                                                    {SuccessMessage && <div className="alert alert-success" role="alert">{SuccessMessage} </div>}
                                                    <form onSubmit={handleSubmit}>
                                                        <div className="mb-3">
                                                            <label htmlFor="name" className="form-label">Parameter Name</label>
                                                            <input type="text" name='name' value={name} onChange={onInputChange} className="form-control" id="name" placeholder='Enter parameter name' required />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="type" className="form-label">Parameter Type</label>
                                                            <select name="type" id="type" className='form-select' value={type} onChange={onInputChange}>
                                                                <option >Select parameter type</option>
                                                                <option value="Measured Value">Measured Value</option>
                                                                <option value="Computation Action">Computation Action</option>
                                                                <option >Default Value</option>
                                                            </select>
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="value" className="form-label">Unit / Value</label>
                                                            <input type="text" name='value' value={value} onChange={onInputChange} className="form-control" id="value" placeholder='Enter Parameter Value' required />
                                                        </div>
                                                        <div className='float-end'>
                                                            <button type="submit" className="btn btn-success me-2">Create New Parameter</button>
                                                        </div>
                                                    </form>
                                                </div>
                                                <div className="col-md-8">
                                                    <ParametersTable data={parameters} getParameters={getParameters} />
                                                </div>
                                            </div>
                                        );
                                    default:
                                        return (
                                            <div className="row mt-4">
                                                <div className="col-md-12">
                                                    {/* <ElectricityTariffTable data={parameters} getParameters={getParameters} /> */}
                                                </div>
                                            </div>
                                        )
                                }
                            })
                                ()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Parameters;
