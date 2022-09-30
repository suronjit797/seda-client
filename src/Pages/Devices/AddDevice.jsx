import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import DevicesSidebar from '../../Components/Devices/DevicesSidebar';
import axios from 'axios';

const AddDevice = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [SuccessMessage, setSuccessMessage] = useState();
    const navigate = useNavigate()
    const [buildingTypes, setBuildingTypes] = useState([]);
    const [adminData, setAdminData] = useState({
        name: "",
        email: "",
        password: "",
        companyName: "",
        phone: "",
        fax: "",
        role: "admin"
    });
    const { name, email, password, phone, fax, companyName } = adminData
    const onInputChange = e => {
        setAdminData({ ...adminData, [e.target.name]: e.target.value });
    };

    //Profile Photo 
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const handleFileUpload = file => {
        setImageUrl(URL.createObjectURL(file));
        let form = new FormData()
        form.append('avatar', file)
        setSelectedImage(form);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/users`, adminData, { withCredentials: true }).catch(function (error) {
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
            if (selectedImage === null) {
                setIsLoading(false)
                setSuccessMessage("Admin Created Successfully")
                setTimeout(() => {
                    setSuccessMessage()
                    navigate('/admins')
                }, 2000)

            } else {
                const addImageResponse = await axios.put(`${process.env.REACT_APP_API_URL}/users/${data._id}/avatarUpload/`, selectedImage, { withCredentials: true })
                if (addImageResponse) {
                    setIsLoading(false)
                    setSuccessMessage("Admin Created Successfully")
                    setTimeout(() => {
                        setSuccessMessage()
                        navigate('/admins')
                    }, 2000)
                }
            }
        }
    }
    return (
        <div className='devices'>
            <div className="container-fluid">
                <div className="row my-5">
                    <div className="col-md-2">
                        <DevicesSidebar />
                    </div>
                    <div className="col-md-10">
                        <div className="card p-3 mb-3">
                            <div className="row">
                                <div className="col-md-6"><h3 className='mb-4'>Add New Device</h3></div>
                            </div>
                            <div className='d-flex justify-content-center'>
                                {isLoading && <Spinner animation="border" variant="dark" />}
                            </div>
                            {SuccessMessage && <div className="alert alert-success" role="alert">{SuccessMessage} </div>}
                            <form onSubmit={submitHandler}>
                                <div class="row mb-3">
                                    <div className="col-md-6">
                                        <label for="name" class="form-label">Device Name</label>
                                        <input type="text" name='name'  onChange={onInputChange} class="form-control" id="name" placeholder='Enter full name' required />
                                    </div>
                                </div>
                                <div className='float-end'>
                                    <button type="submit" class="btn btn-success me-2">Save</button>
                                    <Link to="/devices" class="btn btn-secondary">Cancel</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddDevice;
