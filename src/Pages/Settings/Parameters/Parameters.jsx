import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import SettingSidebarNav from '../../../Components/Settings/SettingSidebarNav';

const Parameters = () => {
    const [SuccessMessage, setSuccessMessage] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const userDetails = useSelector((state) => state.user.userDetails);
    const [parameters, setParameters] = useState([]);
    const [parameterData, setParameter] = useState({
        name: "",
        description: ""
    });
    const { name, description } = parameterData;

    const handleChange = (value, bodyContent) => {
        setParameter({
            ...parameterData,
            [bodyContent]: value
        });
    }
    const onInputChange = e => {
        setParameter({ ...parameterData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/electricity-tariff`, parameterData, { withCredentials: true })
        if (response) {
            setIsLoading(false)
            setParameter({ name: "", description: "" })
            // getElectricityTariff()
            setSuccessMessage("Electricity Tariff Created Successfully")
            setTimeout(() => {
                setSuccessMessage()
            }, 2000)
        }
        e.target.reset();
    }
    // const getElectricityTariff = async () => {
    //     const response = await axios.get(`${process.env.REACT_APP_API_URL}/electricity-tariff`, { withCredentials: true })
    //     if (response) {
    //         setParameters(response.data)
    //     }
    // }
    // useEffect(() => {
    //     getElectricityTariff()
    // }, []);
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
                                                            <label for="name" class="form-label">Parameter Name</label>
                                                            <input type="text" name='name' value={name} onChange={onInputChange} class="form-control" id="name" placeholder='Enter a Parameter Name' required />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label for="name" class="form-label">Parameter Type</label>
                                                            <select name="" id="" className='form-select'>
                                                                <option >Select parameter type</option>
                                                                <option >Measured Value</option>
                                                                <option >Computation Action</option>
                                                                <option >Default Value</option>
                                                            </select>
                                                        </div>
                                                        <div className='float-end'>
                                                            <button type="submit" class="btn btn-success me-2">Create</button>
                                                        </div>
                                                    </form>
                                                </div>
                                                <div className="col-md-8">
                                                    {/* <ElectricityTariffTable data={parameters} getElectricityTariff={getElectricityTariff} /> */}
                                                </div>
                                            </div>
                                        );
                                    default:
                                        return (
                                            <div className="row mt-4">
                                                <div className="col-md-12">
                                                    {/* <ElectricityTariffTable data={parameters} getElectricityTariff={getElectricityTariff} /> */}
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
