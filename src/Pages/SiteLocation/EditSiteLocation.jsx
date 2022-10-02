import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AdminSidebarNav from '../../Components/Admins/AdminSidebarNav';
import { Spinner } from 'react-bootstrap';

const EditSiteLocation = () => {
    const Params = useParams()
    const siteLocationId = Params.siteLocationId
    const [SuccessMessage, setSuccessMessage] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    const [buildingTypes, setBuildingTypes] = useState([]);
    const [Admins, setAdmins] = useState([]);
    const [Installers, setInstallers] = useState([]);
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
        buildingBackground: ""
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
    useEffect(() => {
        getInstaller()
        getAdmins()
        getBuildingTypes()
    }, []);

    const getSiteLocation = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/site-location/` + siteLocationId, { withCredentials: true })
        if (response) {
            const data = response.data
            setSiteLocationData({
                name: data?.name,
                admin: data?.admin?._id,
                installer: data?.installer?._id || Installers[0]?._id,
                buildingName: data?.buildingName,
                buildingType: data?.buildingType,
                buildingAddress1: data?.buildingAddress1,
                buildingAddress2: data?.buildingAddress2,
                buildingPostalCode: data?.buildingPostalCode,
                buildingOwnerName: data?.buildingOwnerName,
                buildingOwnerEmail: data?.buildingOwnerEmail,
                contactPersonName: data?.contactPersonName,
                contactPersonPhone: data?.contactPersonPhone,
                localAuthority: data?.localAuthority,
                netFloorArea: data?.netFloorArea,
                tariffElectricity: data?.tariffElectricity,
                remark: data?.remark,
                buildingBackground: data?.buildingBackground?._id
            })
        }
    }
    useEffect(() => {
        getSiteLocation()
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/site-location/` + siteLocationId, siteLocationData, { withCredentials: true }).catch(function (error) {
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
            setSuccessMessage("Site Location Edited Successfully")
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
                            <h3 className='mb-4'>Update Site Location Information</h3>
                            <div className='d-flex justify-content-center'>
                                {isLoading && <Spinner animation="border" variant="dark" />}
                            </div>
                            {SuccessMessage && <div className="alert alert-success" role="alert">{SuccessMessage} </div>}
                            <form onSubmit={submitHandler}>
                                <div class="row mb-3">
                                    <div className="col-md-6">
                                        <label for="name" class="form-label">Site Name</label>
                                        <input type="text" name='name' value={name} onChange={onInputChange} class="form-control" id="name" placeholder='Enter full name' required />
                                    </div>
                                    <div className="col-md-6">
                                        <label for="email" class="form-label">Admin</label>
                                        <select class="form-select" id='admin' name='admin' value={admin} onChange={onInputChange} aria-label="Select an admin">
                                            {Admins && Admins.length > 0 && Admins.map((item, index) => (
                                                admin === item._id ? <option value={item._id} key={index} selected>{item.name}</option> : <option value={item._id} key={index}>{item.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label for="installer" class="form-label">Assign Installer</label>
                                        <select class="form-select" id='installer' name='installer' value={installer} onChange={onInputChange} aria-label="Select an admin">
                                            {Installers && Installers.length > 0 && Installers.map((item, index) => (
                                                installer === item._id ? <option value={item._id} key={index} selected>{item.name}</option> : <option value={item._id} key={index}>{item.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <h5 className='mt-4'>Building Information</h5>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label for="bname" class="form-label">Building Name</label>
                                        <input type="text" name='buildingName' value={buildingName} onChange={onInputChange} class="form-control" id="bname" placeholder='Enter building name' />
                                    </div>
                                    <div className="col-md-6">
                                        <label for="buildingType" class="form-label">Building Type</label>
                                        <input type="text" name='buildingType' value={buildingType} onChange={onInputChange} class="form-control" id="buildingType" placeholder='Enter building type' />
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div className="col-md-6">
                                        <label for="buildingAddress1" class="form-label">Building Address Line 1</label>
                                        <input type="text" name='buildingAddress1' value={buildingAddress1} onChange={onInputChange} class="form-control" id="buildingAddress1" placeholder='Enter building address line 1' />
                                    </div>
                                    <div className="col-md-6">
                                        <label for="buildingAddress2" class="form-label">Building Address Line 2</label>
                                        <input type="text" name='buildingAddress2' value={buildingAddress2} onChange={onInputChange} class="form-control" id="buildingAddress2" placeholder='Enter building address line 2' />
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div className="col-md-6">
                                        <label for="buildingPostalCode" class="form-label">Building Postal Code</label>
                                        <input type="number" name='buildingPostalCode' value={buildingPostalCode} onChange={onInputChange} class="form-control" id="buildingPostalCode" placeholder='Enter building postal code' />
                                    </div>
                                    <div className="col-md-6">
                                        <label for="localAuthority" class="form-label">Local Authority</label>
                                        <input type="text" name='localAuthority' value={localAuthority} onChange={onInputChange} class="form-control" id="localAuthority" placeholder='Enter local authority' />
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div className="col-md-6">
                                        <label for="buildingOwnerName" class="form-label">Building Owner Name</label>
                                        <input type="text" name='buildingOwnerName' value={buildingOwnerName} onChange={onInputChange} class="form-control" id="buildingOwnerName" placeholder='Enter building owner name' />
                                    </div>
                                    <div className="col-md-6">
                                        <label for="buildingOwnerEmail" class="form-label">Building Owner Email</label>
                                        <input type="email" name='buildingOwnerEmail' value={buildingOwnerEmail} onChange={onInputChange} class="form-control" id="buildingOwnerEmail" placeholder='Enter building owner email' />
                                    </div>
                                </div>
                                <h5 className='mt-4'>Contact Person Information</h5>
                                <div class="row mb-3">
                                    <div className="col-md-6">
                                        <label for="contactPersonName" class="form-label">Contact Person Name</label>
                                        <input type="text" name='contactPersonName' value={contactPersonName} onChange={onInputChange} class="form-control" id="contactPersonName" placeholder='Enter contact person name' />
                                    </div>
                                    <div className="col-md-6">
                                        <label for="contactPersonPhone" class="form-label">Contact Person Phone</label>
                                        <div className='input-group'>
                                            <span class="input-group-text" id="basic-addon1">+6</span>
                                            <input type="number" name='contactPersonPhone' value={contactPersonPhone} onChange={onInputChange} class="form-control" id="contactPersonPhone" placeholder='Enter contact person phone' />
                                        </div>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div className="col-md-6">
                                        <label for="netFloorArea" class="form-label">Nett Floor Area (sq ft)</label>
                                        <input type="number" name='netFloorArea' value={netFloorArea} onChange={onInputChange} class="form-control" id="netFloorArea" placeholder='Enter nett floor area (sq ft)' />
                                    </div>
                                    <div className="col-md-6">
                                        <label for="tariffElectricity" class="form-label">Tariff Electricity (sen/kWh)</label>
                                        <input type="number" name='tariffElectricity' value={tariffElectricity} onChange={onInputChange} class="form-control" id="tariffElectricity" placeholder='Enter tariff electricity (sen/kWh)' />
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div className="col-md-6">
                                        <label for="remark" class="form-label">Remark</label>
                                        <input type="text" name='remark' value={remark} onChange={onInputChange} class="form-control" id="remark" placeholder='Enter remark' />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="buildingBackground">Physical Building Background</label>
                                        <select class="form-select" id='buildingBackground' name='buildingBackground' value={buildingBackground} onChange={onInputChange} aria-label="Select a Building Background">
                                            {buildingTypes && buildingTypes.length > 0 && buildingTypes.map((item, index) => (
                                                buildingBackground === item._id ? <option value={item._id} key={index} selected>{item.name}</option> : <option value={item._id} key={index}>{item.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className='float-end'>
                                    <button type="submit" class="btn btn-success me-2">Update</button>
                                    <Link to="/site-locations" class="btn btn-secondary">Cancel</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditSiteLocation;
