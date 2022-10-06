import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setUserDetails } from '../../redux/userSlice';

const EditProfile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userDetails = useSelector(state => state.user?.userDetails)
    const [SuccessMessage, setSuccessMessage] = useState();
    const [IsLoading, setIsLoading] = useState(false);
    const [UpdateProfileData, setUpdateProfileData] = useState({
        name: "",
        email: "",
        phone: "",
        fax: ""
    });
    const { name, email, phone, fax } = UpdateProfileData
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    useEffect(() => {
        if (userDetails) {
            setUpdateProfileData({ name: userDetails.name, email: userDetails.email, phone: userDetails.phone, fax: userDetails.fax })
        }
    }, [userDetails]);

    const handleFileUpload = file => {
        setImageUrl(URL.createObjectURL(file));
        let form = new FormData()
        form.append('avatar', file)
        setSelectedImage(form);
    }

    const onInputChange = e => {
        setUpdateProfileData({ ...UpdateProfileData, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/users/me`, UpdateProfileData, { withCredentials: true }).catch(function (error) {
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
                dispatch(setUserDetails(response.data))
                setIsLoading(false)
                setSuccessMessage("Profile Updated Successfully")
                setTimeout(() => {
                    setSuccessMessage()
                    navigate("/profile")
                }, 3000)

            } else {
                const addImageResponse = await axios.put(`${process.env.REACT_APP_API_URL}/users/me/avatarUpload`, selectedImage, { withCredentials: true })
                if (addImageResponse) {
                    dispatch(setUserDetails(addImageResponse.data))
                    setIsLoading(false)
                    setSuccessMessage("Profile Updated Successfully")
                    setTimeout(() => {
                        setSuccessMessage()
                        navigate("/profile")
                    }, 3000)
                }
            }
        }
    }
    useEffect(() => {
        document.title = "SEDA - Profile"
    }, []);
    return (
        <div className='profile'>
            <div className="container-fluid">
                <div className="row my-5">
                    <div className="col-md-2">

                    </div>
                    <div className="col-md-10">
                        <div className="card p-3 mb-3">
                            <h3 className="mb-4">Profile</h3>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className='d-flex justify-content-center'>
                                        {IsLoading && <Spinner animation="border" variant="light" />}
                                    </div>
                                    {SuccessMessage && <div className="alert alert-success" role="alert">{SuccessMessage} </div>}
                                    <form onSubmit={submitHandler}>
                                        <div class="mb-3">
                                            <label for="name" class="form-label">Name</label>
                                            <input type="text" class="form-control" name='name' value={name} onChange={onInputChange} id="name" placeholder='Enter your name' />
                                        </div>
                                        <div class="mb-3">
                                            <label for="email" class="form-label">Email address</label>
                                            <input type="email" class="form-control" name='email' value={email} onChange={onInputChange} id="email" placeholder='Enter your email' />
                                        </div>
                                        <div class="mb-3">
                                            <label for="phone" class="form-label">Phone Number</label>
                                            <div className='input-group'>
                                                <span class="input-group-text" id="basic-addon1">+6</span>
                                                <input type="number" name='phone' value={phone} onChange={onInputChange} class="form-control" id="phone" placeholder='Enter phone number' />
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <label for="fax" class="form-label">Fax Number</label>
                                            <div className='input-group'>
                                                <span class="input-group-text" id="basic-addon1">+6</span>
                                                <input type="number" name='fax' value={fax} onChange={onInputChange} class="form-control" id="fax" placeholder='Enter fax number' />
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <label htmlFor="avatar" className="form-label d-block">Profile Photo</label>

                                            {imageUrl && selectedImage ? (
                                                <div mt={2} textAlign="center">
                                                    <div>Image Preview:</div>
                                                    <img src={imageUrl} alt={selectedImage.name} height="100px" />
                                                </div>
                                            )
                                                :
                                                <>
                                                    <input className='form-control' accept="image/*" type="file" id="select-image" style={{ display: 'none' }} onChange={e => handleFileUpload(e.target.files[0])} />
                                                    <label for="select-image">
                                                        {userDetails?.avatar ?
                                                            <img src={userDetails?.avatar} alt="" height="100px" className='rounded-3' />
                                                            :
                                                            <img src="assets/images/avatar.png" alt="" height="100px" className='rounded-3' />
                                                        }
                                                    </label>
                                                </>
                                            }
                                        </div>
                                        <div className="float-end">
                                            <button type="submit" class="btn btn-success me-1">Update</button>
                                            <Link to="/profile" className='btn btn-secondary'>Cancel</Link>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-md-6"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;
