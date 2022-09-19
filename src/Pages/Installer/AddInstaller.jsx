import axios from 'axios';
import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const AddInstaller = () => {
    const [createInstallerData, setCreateInstallerData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        companyName: "",
        buildingName: "",
        role: "installer"
    });
    const { name, email,password, phone, companyName, buildingName } = createInstallerData;

    const onInputChange = e => {
        setCreateInstallerData({ ...createInstallerData, [e.target.name]: e.target.value });
    };

    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [SuccessMessage, setSuccessMessage] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    const handleFileUpload = file => {
        setImageUrl(URL.createObjectURL(file));
        let form = new FormData()
        form.append('logo', file)
        setSelectedImage(form);
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/users`, createInstallerData, { withCredentials: true }).catch(function (error) {
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
                setSuccessMessage("Installer created successfully")
                setTimeout(() => {
                    setSuccessMessage()
                    navigate('/installers')
                }, 2000)

            } else {
                const addImageResponse = await axios.put(`${process.env.REACT_APP_API_URL}/users/${data._id}/logoUpload/`, selectedImage, { withCredentials: true })
                if (addImageResponse) {
                    setIsLoading(false)
                    setSuccessMessage("Installer created successfully")
                    setTimeout(() => {
                        setSuccessMessage()
                        navigate('/installers')
                    }, 2000)
                }
            }
        }
    }
    return (
        <div className='add-installer'>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <h3 className='mt-2'>Manage Installer</h3>
                        <ul className="list-group mb-3">
                            <li className='list-group-item'><Link to='/installers' className='text-dark text-decoration-none'>All Installer</Link></li>
                            <li className='list-group-item'><Link to='/add-installer' className='text-dark text-decoration-none'>Add New Installer</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-10">
                        <div className="card p-3 my-3">
                            <h3>Add New Installer</h3>
                            <div className='d-flex justify-content-center'>
                                {isLoading && <Spinner animation="border" variant="dark" />}
                            </div>
                            {SuccessMessage && <div className="alert alert-success" role="alert">{SuccessMessage} </div>}
                            <form onSubmit={submitHandler}>
                                <div class="mb-3">
                                    <label for="name" class="form-label">Full Name</label>
                                    <input type="text" name='name' value={name} onChange={onInputChange} class="form-control" id="name" placeholder='Enter full name' required />
                                </div>
                                <div class="mb-3">
                                    <label for="email" class="form-label">Email</label>
                                    <input type="email" name='email' value={email} onChange={onInputChange} class="form-control" id="email" placeholder='Enter email address' required />
                                </div>
                                <div class="mb-3">
                                    <label for="password" class="form-label">Password</label>
                                    <input type="password" name='password' value={password} onChange={onInputChange} class="form-control" id="password" placeholder='&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;' required />
                                </div>
                                <div class="mb-3">
                                    <label for="phone" class="form-label">Phone</label>
                                    <input type="text" name='phone' value={phone} onChange={onInputChange} class="form-control" id="phone" placeholder='Enter phone number' />
                                </div>
                                <div class="mb-3">
                                    <label for="cname" class="form-label">Company  Name</label>
                                    <input type="text" name='companyName' value={companyName} onChange={onInputChange} class="form-control" id="cname" placeholder='Enter company name' />
                                </div>
                                <div class="mb-3">
                                    <label for="bname" class="form-label">Building Name</label>
                                    <input type="text" name='buildingName' value={buildingName} onChange={onInputChange} class="form-control" id="bname" placeholder='Enter building name' />
                                </div>
                                <div class="mb-3">
                                    <label for="bname" class="form-label">Logo</label>
                                    {imageUrl && selectedImage ? (
                                        <div mt={2} textAlign="center">
                                            <div>Preview:</div>
                                            <img src={imageUrl} alt={selectedImage.name} height="100px" />
                                        </div>
                                    )
                                        :
                                        <>
                                            <input className='form-control' accept="image/*" type="file" id="select-image" style={{ display: 'none' }} onChange={e => handleFileUpload(e.target.files[0])} />
                                            <label for="select-image">
                                                <img src="/images/upload.png" alt="" height="100px" className='rounded-3 border p-2 ms-2' />
                                            </label>
                                        </>
                                    }
                                </div>
                                <div className='float-end'>
                                    <button type="submit" class="btn btn-success me-2">Submit</button>
                                    <Link to="/" class="btn btn-secondary">Cancel</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddInstaller;
