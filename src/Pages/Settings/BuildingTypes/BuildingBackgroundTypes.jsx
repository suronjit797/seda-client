import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import SettingSidebarNav from '../../../Components/Settings/SettingSidebarNav';
import BuildingTypeTable from './BuildingTypeTable';

const BuildingBackgroundTypes = () => {
    const [SuccessMessage, setSuccessMessage] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [buildingTypes, setBuildingTypes] = useState([]);
    const [buildingTypeData, setBuildingTypeData] = useState({
        name: ""
    });
    const { name } = buildingTypeData;
    const onInputChange = e => {
        setBuildingTypeData({ ...buildingTypeData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/building-type`, buildingTypeData, { withCredentials: true })
        if (response) {
            setIsLoading(false)
            setBuildingTypeData({name: ""})
            getBuildingTypes()
            setSuccessMessage("Building Type Created Successfully")
            setTimeout(() => {
                setSuccessMessage()
            }, 2000)
        }
    }
    const getBuildingTypes=async()=>{
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/building-type`, { withCredentials: true })
        if (response) {
            setBuildingTypes(response.data)
        }
    }
    useEffect(() => {
        getBuildingTypes()
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
                            <h3>Manage Building Background Types</h3>
                            <div className='d-flex justify-content-center'>
                                {isLoading && <Spinner animation="border" variant="dark" />}
                            </div>
                            {SuccessMessage && <div className="alert alert-success" role="alert">{SuccessMessage} </div>}
                            <div className="row mt-3">
                                <div className="col-md-6">
                                    <h4 className='mb-2'>Add New Building Type</h4>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Name</label>
                                            <input type="text" name='name' value={name} onChange={onInputChange} className="form-control" id="name" placeholder='Enter a name' required />
                                        </div>
                                        <div className='float-end'>
                                            <button type="submit" className="btn btn-success me-2">Create</button>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-md-6">
                                    <BuildingTypeTable data={buildingTypes} getBuildingTypes={getBuildingTypes}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BuildingBackgroundTypes;
