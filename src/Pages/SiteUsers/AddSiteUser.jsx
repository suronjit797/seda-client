import { Spinner } from 'react-bootstrap';
import SiteUserSidebar from '../../Components/SiteUsers/SiteUserSidebar';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const AddSiteUser = () => {
    const [SuccessMessage, setSuccessMessage] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        fax: "",
        site: "",
        parent: "",
        role: "user"
    });
    const { name, email, password, phone, fax, site } = userData
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
        setIsLoading(true)
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/users`, userData, { withCredentials: true }).catch(function (error) {
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
    }

    const [siteLocations, setSiteLocations] = useState([]);
    const getSiteLocations = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/site-location`, { withCredentials: true })
        if (response) {
            setSiteLocations(response.data.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1))
        }
    }
    useEffect(() => {
        getSiteLocations()
    }, []);
    useEffect(() => {
        setUserData({ ...userData, site: siteLocations[0]?._id })
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
                            <form onSubmit={submitHandler}>
                                <div class="row mb-3">
                                    <div className="col-md-6">
                                        <label for="name" class="form-label">Full Name</label>
                                        <input type="text" name='name' value={name} onChange={onInputChange} class="form-control" id="name" placeholder='Enter full name' required />
                                    </div>
                                    <div className="col-md-6">
                                        <label for="site" class="form-label">Assigned Site</label>
                                        <select class="form-select" id='site' name='site' value={site} onChange={onInputChange} aria-label="Select a site location">
                                            {siteLocations && siteLocations.length > 0 && siteLocations.map((item, index) => (
                                                <option value={item._id} key={index}>{item.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div class="row mb-3">
                                    <div className="col-md-6">
                                        <label for="email" class="form-label">Email Address</label>
                                        <input type="email" name='email' value={email} onChange={onInputChange} class="form-control" id="email" placeholder='Enter email address' required />
                                    </div>
                                    <div className="col-md-6">
                                        <label for="password" class="form-label">Password</label>
                                        <input type="password" name='password' value={password} minlength="6" onChange={onInputChange} class="form-control" id="password" placeholder='&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;' required />
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
                                    <button type="submit" class="btn btn-success me-2">Create Site User</button>
                                    <Link to="/site-users" class="btn btn-secondary">Cancel</Link>
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