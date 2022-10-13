import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import AdminSidebarNav from '../../Components/Admins/AdminSidebarNav';

const AddAdmin = () => {
    const [SuccessMessage, setSuccessMessage] = useState();
    const [ErrorMessage, setErrorMessage] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    const [adminData, setAdminData] = useState({
        name: "",
        email: "",
        password: "",
        reenterPassword: "",
        companyName: "",
        companyAddress: "",
        phone: "",
        fax: "",
        role: "admin"
    });
    const { name, email, password, reenterPassword, phone, fax, companyAddress, companyName } = adminData
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
        if (password === reenterPassword) {
            setIsLoading(true)
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/users`, adminData, { withCredentials: true }).catch(function (error) {
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
        } else {
            setErrorMessage("Both Passwords Are Not Matching")
            setTimeout(() => {
                setErrorMessage()
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
                            <h3 className='mb-4'>Add New Admin</h3>
                            <div className='d-flex justify-content-center'>
                                {isLoading && <Spinner animation="border" variant="dark" />}
                            </div>
                            {SuccessMessage && <div className="alert alert-success" role="alert">{SuccessMessage} </div>}
                            {ErrorMessage && <div className="alert alert-danger" role="alert">{ErrorMessage} </div>}
                            <form onSubmit={submitHandler}>
                                <div class="row mb-3">
                                    <div className="col-md-6">
                                        <label for="name" class="form-label">Full Name</label>
                                        <input type="text" name='name' value={name} onChange={onInputChange} class="form-control" id="name" placeholder='Enter full name' required />
                                    </div>
                                    <div className="col-md-6">
                                        <label for="email" class="form-label">Email Address</label>
                                        <input type="email" name='email' value={email} onChange={onInputChange} class="form-control" id="email" placeholder='Enter email address' required />
                                    </div>
                                </div>

                                <div class="row mb-3">
                                    <div className="col-md-6">
                                        <label for="password" class="form-label">Password</label>
                                        <input type="password" name='password' value={password} onChange={onInputChange} class="form-control" id="password" minlength="6" placeholder='&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;' required />
                                    </div>
                                    <div className="col-md-6">
                                        <label for="reenterPassword" class="form-label">Reenter Password</label>
                                        <input type="password" name='reenterPassword' value={reenterPassword} minlength="6" onChange={onInputChange} class="form-control" id="reenterPassword" placeholder='&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;' required />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label for="cname" class="form-label">Company  Name</label>
                                        <input type="text" name='companyName' value={companyName} onChange={onInputChange} class="form-control" id="cname" placeholder='Enter company name' />
                                    </div>
                                    <div className="col-md-6">
                                        <label for="companyAddress" class="form-label">Company Address</label>
                                        <input type="text" name='companyAddress' value={companyAddress} onChange={onInputChange} class="form-control" id="companyAddress" placeholder='Enter company address' />
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div className="col-md-6">
                                        <label for="phone" class="form-label">Phone Number</label>
                                        <div className='input-group'>
                                            <span class="input-group-text" id="basic-addon1">+6</span>
                                            <input type="number" name='phone' value={phone} onChange={onInputChange} class="form-control" id="phone" placeholder='Enter phone number' />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label for="fax" class="form-label">Fax Number</label>
                                        <div className='input-group'>
                                            <span class="input-group-text" id="basic-addon1">+6</span>
                                            <input type="number" name='fax' value={fax} onChange={onInputChange} class="form-control" id="fax" placeholder='Enter fax number' />
                                        </div>
                                    </div>
                                </div>

                                <div class="mb-3">
                                    <label for="bname" class="form-label">Profile Photo</label>
                                    {imageUrl ? (
                                        <div mt={2} textAlign="center">
                                            <div>Preview:</div>
                                            <img src={imageUrl} alt="avatar" height="100px" />
                                        </div>
                                    )
                                        :
                                        <>
                                            <input className='form-control' accept="image/*" type="file" id="select-image" style={{ display: 'none' }} onChange={e => handleFileUpload(e.target.files[0])} />
                                            <label for="select-image">
                                                <img src="/images/avatar.png" alt="" height="100px" className='rounded-3 border p-2 ms-2' />
                                            </label>
                                        </>
                                    }
                                </div>
                                <div className='float-end'>
                                    <button type="submit" class="btn btn-success me-2">Create Admin</button>
                                    <Link to="/admins" class="btn btn-secondary">Cancel</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddAdmin;
