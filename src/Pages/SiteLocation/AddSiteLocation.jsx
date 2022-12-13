import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import AdminSidebarNav from '../../Components/Admins/AdminSidebarNav';

const AddSiteLocation = () => {
    const [SuccessMessage, setSuccessMessage] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    const [buildingTypes, setBuildingTypes] = useState([]);
    const userDetails = useSelector((state) => state.user.userDetails);
    const [Admins, setAdmins] = useState([]);
    const [Installers, setInstallers] = useState([]);
    const [ElectricityTariff, setElectricityTariff] = useState([]);
    const [siteLocationData, setSiteLocationData] = useState({
        name: "",
        admin: "",
        installer: "",
        buildingName: "",
        buildingType: "",
        buildingAddress1: "",
        buildingAddress2: "",
        buildingPostalCode: "",
        buildingOwnerName: "",
        buildingOwnerEmail: "",
        contactPersonName: "",
        contactPersonPhone: "",
        localAuthority: "",
        netFloorArea: "",
        tariffElectricity: "",
        remark: "",
        buildingBackground: "",
    });
    const { name, admin, installer, buildingName, buildingType, buildingAddress1, buildingAddress2, buildingPostalCode, buildingOwnerName, buildingOwnerEmail, contactPersonName, contactPersonPhone, localAuthority, netFloorArea, tariffElectricity, remark, buildingBackground } = siteLocationData
    const onInputChange = e => {
        setSiteLocationData({ ...siteLocationData, [e.target.name]: e.target.value });
    };

    const getBuildingTypes = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/building-type`, { withCredentials: true })
        if (response) {
            setBuildingTypes(response.data)
        }
    }
    const getAdmins = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/role/admin`, { withCredentials: true })
        if (response) {
            setAdmins(response.data)

        }
    }
    const getInstaller = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/role/installer`, { withCredentials: true })
        if (response) {
            setInstallers(response.data)

        }
    }
    const getElectricityTariff = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/electricity-tariff`, { withCredentials: true })
        if (response) {
            setElectricityTariff(response.data)

        }
    }
    useEffect(() => {
        document.title="SEDA - Add A Site Location"
        getElectricityTariff()
        getInstaller()
        getAdmins()
        getBuildingTypes()
        // eslint-disable-next-line
    }, []);
    useEffect(() => {
        if (userDetails.role === "admin") {
            setSiteLocationData({ ...siteLocationData, admin: userDetails?._id })
        }
        // eslint-disable-next-line
    }, [userDetails]);
    const submitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/site-location`, siteLocationData, { withCredentials: true }).catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                if (error.response.status === 400 || 500) {
                    console.log(error)
                }
                console.log(error.response.headers);
            }
        });
        const data = response.data
        if (data) {
            setIsLoading(false)
            setSuccessMessage("Site Location Created Successfully")
            setTimeout(() => {
                setSuccessMessage()
                navigate('/site-locations')
            }, 2000)
        }
    }
    return (
        <div className='add-admin'>
            <div className="container-fluid">
                <div className="row my-5">
                    <div className="col-md-2">
                        <AdminSidebarNav />
                    </div>
                    <div className="col-md-10">
                        <div className="card p-3">
                            <h3 className='mb-4'>Add A Site Location</h3>
                            <div className='d-flex justify-content-center'>
                                {isLoading && <Spinner animation="border" variant="dark" />}
                            </div>
                            {SuccessMessage && <div className="alert alert-success" role="alert">{SuccessMessage} </div>}
                            <form onSubmit={submitHandler}>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="name" className="form-label">Site Name</label>
                                        <input type="text" name='name' value={name} onChange={onInputChange} className="form-control" id="name" placeholder='Enter full name' required />
                                    </div>
                                    {userDetails.role === "admin" ? '' :
                                        <div className="col-md-6">
                                            <label htmlFor="email" className="form-label">Admin</label>
                                            <select className="form-select" id='admin' name='admin' value={admin} onChange={onInputChange} aria-label="Select an admin">
                                                <option label='Select an admin'>Select an admin</option>
                                                {Admins && Admins.length > 0 && Admins.map((item, index) => (
                                                    <option value={item._id} key={index}>{item.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    }

                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="installer" className="form-label">Assign Installer</label>
                                        <select className="form-select" id='installer' name='installer' value={installer} onChange={onInputChange} aria-label="Select an admin">
                                            <option label='Select an installer'>Select an installer</option>
                                            {Installers && Installers.length > 0 && Installers.map((item, index) => (
                                                <option value={item._id} key={index}>{item.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <h5 className='mt-4'>Building Information</h5>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="bname" className="form-label">Building Name</label>
                                        <input type="text" name='buildingName' value={buildingName} onChange={onInputChange} className="form-control" id="bname" placeholder='Enter building name' />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="buildingType" className="form-label">Building Type</label>
                                        <input type="text" name='buildingType' value={buildingType} onChange={onInputChange} className="form-control" id="buildingType" placeholder='Enter building type' />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="buildingAddress1" className="form-label">Building Address Line 1</label>
                                        <input type="text" name='buildingAddress1' value={buildingAddress1} onChange={onInputChange} className="form-control" id="buildingAddress1" placeholder='Enter building address line 1' />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="buildingAddress2" className="form-label">Building Address Line 2</label>
                                        <input type="text" name='buildingAddress2' value={buildingAddress2} onChange={onInputChange} className="form-control" id="buildingAddress2" placeholder='Enter building address line 2' />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="buildingPostalCode" className="form-label">Building Postal Code</label>
                                        <input type="number" name='buildingPostalCode' value={buildingPostalCode} onChange={onInputChange} className="form-control" id="buildingPostalCode" placeholder='Enter building postal code' />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="localAuthority" className="form-label">Local Authority</label>
                                        <input type="text" name='localAuthority' value={localAuthority} onChange={onInputChange} className="form-control" id="localAuthority" placeholder='Enter local authority' />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="buildingOwnerName" className="form-label">Building Owner Name</label>
                                        <input type="text" name='buildingOwnerName' value={buildingOwnerName} onChange={onInputChange} className="form-control" id="buildingOwnerName" placeholder='Enter building owner name' />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="buildingOwnerEmail" className="form-label">Building Owner Email</label>
                                        <input type="email" name='buildingOwnerEmail' value={buildingOwnerEmail} onChange={onInputChange} className="form-control" id="buildingOwnerEmail" placeholder='Enter building owner email' />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="netFloorArea" className="form-label">Nett Floor Area (sq ft)</label>
                                        <input type="number" name='netFloorArea' value={netFloorArea} onChange={onInputChange} className="form-control" id="netFloorArea" placeholder='Enter nett floor area (sq ft)' />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="tariffElectricity" className="form-label">Tariff Electricity (sen/kWh)</label>
                                        <select className="form-select" id='tariffElectricity' name='tariffElectricity' value={tariffElectricity} onChange={onInputChange}>
                                            <option label='Select tariff Electricity'>Select tariff Electricity</option>
                                            {ElectricityTariff && ElectricityTariff.length > 0 && ElectricityTariff.map((item, index) => (
                                                <option value={item._id} key={index}>{item.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="remark" className="form-label">Remark</label>
                                        <input type="text" name='remark' value={remark} onChange={onInputChange} className="form-control" id="remark" placeholder='Enter remark' />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="buildingBackground">Physical Building Background</label>
                                        <select className="form-select" id='buildingBackground' name='buildingBackground' value={buildingBackground} onChange={onInputChange} aria-label="Select a Building Background">
                                            <option label='Select a Building Background'>Select a Building Background</option>
                                            {buildingTypes && buildingTypes.length > 0 && buildingTypes.map((item, index) => (
                                                <option value={item._id} key={index}>{item.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <h5 className='mt-4'>Contact Person Information</h5>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="contactPersonName" className="form-label">Contact Person Name</label>
                                        <input type="text" name='contactPersonName' value={contactPersonName} onChange={onInputChange} className="form-control" id="contactPersonName" placeholder='Enter contact person name' />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="contactPersonPhone" className="form-label">Contact Person Phone</label>
                                        <div className='input-group'>
                                            <span className="input-group-text" id="basic-addon1">+6</span>
                                            <input type="number" name='contactPersonPhone' value={contactPersonPhone} onChange={onInputChange} className="form-control" id="contactPersonPhone" placeholder='Enter contact person phone' />
                                        </div>
                                    </div>
                                </div>
                                <div className='float-end'>
                                    <button type="submit" className="btn btn-success me-2">Create Site Location</button>
                                    <Link to="/site-locations" className="btn btn-secondary">Cancel</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddSiteLocation;
