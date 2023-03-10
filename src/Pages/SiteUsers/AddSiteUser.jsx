import { Spinner } from 'react-bootstrap';
import SiteUserSidebar from '../../Components/SiteUsers/SiteUserSidebar';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';


const AddSiteUser = () => {
    const [SuccessMessage, setSuccessMessage] = useState();
    const [ErrorMessage, setErrorMessage] = useState();
    const userDetails = useSelector((state) => state?.user?.userDetails);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        reenterPassword: "",
        phone: "",
        fax: "",
        site: "",
        parent: "",
        role: "user"
    });
    const { name, email, password, reenterPassword, phone, fax, site } = userData
    const onInputChange = e => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
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
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/users`, userData, { withCredentials: true }).catch(function (error) {
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
                    setSuccessMessage("Site User Created Successfully")
                    setTimeout(() => {
                        setSuccessMessage()
                        navigate('/site-users')
                    }, 2000)

                } else {
                    const addImageResponse = await axios.put(`${process.env.REACT_APP_API_URL}/users/${data._id}/avatarUpload/`, selectedImage, { withCredentials: true })
                    if (addImageResponse) {
                        setIsLoading(false)
                        setSuccessMessage("Site User Created Successfully")
                        setTimeout(() => {
                            setSuccessMessage()
                            navigate('/site-users')
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

    const [siteLocations, setSiteLocations] = useState([]);
    const getSiteLocations = async () => {
        if (userDetails.role === "superAdmin") {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/site-location`, { withCredentials: true })
            if (response) {
                setSiteLocations(response.data.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1))
            }
        } else if (userDetails.role === "admin") {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/site-location/admin-sites/` + userDetails._id, { withCredentials: true })
            if (response) {
                setSiteLocations(response.data.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1))
            }
        }
    }
    useEffect(() => {
        getSiteLocations()
        // eslint-disable-next-line
    }, []);
    useEffect(() => {
        setUserData({ ...userData, site: siteLocations[0]?._id })
        // eslint-disable-next-line
    }, [siteLocations]);
    return (
        <div className='add-admin'>
            <div className="container-fluid">
                <div className="row my-5">
                    <div className="col-md-2">
                        <SiteUserSidebar />
                    </div>
                    <div className="col-md-10">
                        <div className="card p-3">
                            <h3 className='mb-4'>Add New Site User</h3>
                            <div className='d-flex justify-content-center'>
                                {isLoading && <Spinner animation="border" variant="dark" />}
                            </div>
                            {SuccessMessage && <div className="alert alert-success" role="alert">{SuccessMessage} </div>}
                            {ErrorMessage && <div className="alert alert-danger" role="alert">{ErrorMessage} </div>}
                            <form onSubmit={submitHandler}>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="name" className="form-label">Full Name</label>
                                        <input type="text" name='name' value={name} onChange={onInputChange} className="form-control" id="name" placeholder='Enter full name' required />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="site" className="form-label">Assigned Site</label>
                                        <select className="form-select" id='site' name='site' value={site} onChange={onInputChange} aria-label="Select a site location">
                                            {siteLocations && siteLocations.length > 0 && siteLocations.map((item, index) => (
                                                <option value={item._id} key={index}>{item.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="email" className="form-label">Email Address</label>
                                        <input type="email" name='email' value={email} onChange={onInputChange} className="form-control" id="email" placeholder='Enter email address' required />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password" name='password' value={password} minLength="6" onChange={onInputChange} className="form-control" id="password" placeholder='&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;' required />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="reenterPassword" className="form-label">Reenter Password</label>
                                        <input type="password" name='reenterPassword' value={reenterPassword} minLength="6" onChange={onInputChange} className="form-control" id="reenterPassword" placeholder='&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;' required />
                                    </div>

                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="phone" className="form-label">Phone Number</label>
                                        <div className='input-group'>
                                            <span className="input-group-text" id="basic-addon1">+6</span>
                                            <input type="number" name='phone' value={phone} onChange={onInputChange} className="form-control" id="phone" placeholder='Enter phone number' />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="fax" className="form-label">Fax Number</label>
                                        <div className='input-group'>
                                            <span className="input-group-text" id="basic-addon1">+6</span>
                                            <input type="number" name='fax' value={fax} onChange={onInputChange} className="form-control" id="fax" placeholder='Enter fax number' />
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="bname" className="form-label">Profile Photo</label>
                                    {imageUrl ? (
                                        <div mt={2} textAlign="center">
                                            <div>Preview:</div>
                                            <img src={imageUrl} alt="avatar" height="100px" />
                                        </div>
                                    )
                                        :
                                        <>
                                            <input className='form-control' accept="image/*" type="file" id="select-image" style={{ display: 'none' }} onChange={e => handleFileUpload(e.target.files[0])} />
                                            <label htmlFor="select-image">
                                                <img src="/images/avatar.png" alt="" height="100px" className='rounded-3 border p-2 ms-2' />
                                            </label>
                                        </>
                                    }
                                </div>
                                <div className='float-end'>
                                    <button type="submit" className="btn btn-success me-2">Create Site User</button>
                                    <Link to="/site-users" className="btn btn-secondary">Cancel</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddSiteUser;
