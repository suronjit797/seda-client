import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ElectricityTariffTable from '../../Components/Settings/ElectricityTariffTable';
import SettingSidebarNav from '../../Components/Settings/SettingSidebarNav';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';

const ElectricityTariff = () => {
    const [SuccessMessage, setSuccessMessage] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const userDetails = useSelector((state) => state.user.userDetails);
    const [eTariff, setETariff] = useState([]);
    const [electricityTariffData, setElectricityTariffData] = useState({
        name: "",
        description: ""
    });
    const { name, description } = electricityTariffData;

    const handleChange = (value, bodyContent) => {
        setElectricityTariffData({
            ...electricityTariffData,
            [bodyContent]: value
        });
    }
    const onInputChange = e => {
        setElectricityTariffData({ ...electricityTariffData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/electricity-tariff`, electricityTariffData, { withCredentials: true })
        if (response) {
            setIsLoading(false)
            setElectricityTariffData({ name: "", description: "" })
            getElectricityTariff()
            setSuccessMessage("Electricity Tariff Created Successfully")
            setTimeout(() => {
                setSuccessMessage()
            }, 2000)
        }
        e.target.reset();
    }
    const getElectricityTariff = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/electricity-tariff`, { withCredentials: true })
        if (response) {
            setETariff(response.data)
        }
    }
    useEffect(() => {
        getElectricityTariff()
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
                            <h3>Electricity Tariff</h3>
                            {(() => {
                                switch (userDetails.role) {
                                    case 'superAdmin':
                                        return (
                                            <div className="row mt-4">
                                                <div className="col-md-4">
                                                    <h4 className='mb-3'>Add Tariff Category</h4>
                                                    <div className='d-flex justify-content-center'>
                                                        {isLoading && <Spinner animation="border" variant="dark" />}
                                                    </div>
                                                    {SuccessMessage && <div className="alert alert-success" role="alert">{SuccessMessage} </div>}
                                                    <form onSubmit={handleSubmit}>
                                                        <div className="mb-3">
                                                            <label for="name" class="form-label">Tariff Category</label>
                                                            <input type="text" name='name' value={name} onChange={onInputChange} class="form-control" id="name" placeholder='Enter a tariff category' required />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label for="description" class="form-label">Description</label>
                                                            <ReactQuill theme="snow" className='mb-5' id="description" name='description' value={description} onChange={(value) => handleChange(value, 'description')} style={{ height: "200px" }} />
                                                        </div>
                                                        <div className='float-end'>
                                                            <button type="submit" class="btn btn-success me-2">Create</button>
                                                        </div>
                                                    </form>
                                                </div>
                                                <div className="col-md-8">
                                                    <ElectricityTariffTable data={eTariff} getElectricityTariff={getElectricityTariff} />
                                                </div>
                                            </div>
                                        );
                                    default:
                                        return (
                                            <div className="row mt-4">
                                                <div className="col-md-12">
                                                    <ElectricityTariffTable data={eTariff} getElectricityTariff={getElectricityTariff} />
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

export default ElectricityTariff;
