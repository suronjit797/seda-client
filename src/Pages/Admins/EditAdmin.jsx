import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AdminSidebarNav from '../../Components/Admins/AdminSidebarNav';
import { useSelector } from 'react-redux';
import ChangePasswordModal from '../../Components/Modals/ChangePasswordModal';

const EditAdmin = () => {
    const Params = useParams()
    const adminId = Params.adminId
    const userDetails = useSelector((state) => state.user.userDetails);
    const [SuccessMessage, setSuccessMessage] = useState();
    const [modalShow, setModalShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    const [adminData, setAdminData] = useState({
        name: "",
        email: "",
        phone: "",
        fax: "",
        companyName: "",
        companyAddress: ""
    });
    const { name, email, phone, fax, companyName, companyAddress } = adminData
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
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/users/` + adminId, adminData, { withCredentials: true }).catch(function (error) {
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
                setSuccessMessage("Admin Edited Successfully")
                setTimeout(() => {
                    setSuccessMessage()
                    navigate('/admins')
                }, 2000)

            } else {
                const addImageResponse = await axios.put(`${process.env.REACT_APP_API_URL}/users/${data._id}/avatarUpload`, selectedImage, { withCredentials: true })
                if (addImageResponse) {
                    setIsLoading(false)
                    setSuccessMessage("Admin Edited Successfully")
                    setTimeout(() => {
                        setSuccessMessage()
                        navigate('/admins')
                    }, 2000)
                }
            }
        }
    }
    const getAdmin = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/` + adminId, { withCredentials: true })
        if (response) {
            const data = response.data
            setAdminData({
                name: data?.name,
                email: data?.email,
                phone: data?.phone,
                fax: data?.fax,
                companyName: data?.companyName,
                companyAddress: data?.companyAddress
            })
            setImageUrl(data?.avatar)
        }
    }
    useEffect(() => {
        getAdmin()
        // eslint-disable-next-line
    }, []);


    return (
        <div className='add-admin'>
            <div className="container-fluid">
                <div className="row my-5">
                    <div className="col-md-2">
                        <AdminSidebarNav />
                    </div>
                    <div className="col-md-10">
                        <div className="card p-3">
                            <h3 className='mb-4'>Update Admin Information</h3>
                            <div className='d-flex justify-content-center'>
                                {isLoading && <Spinner animation="border" variant="dark" />}
                            </div>
                            {SuccessMessage && <div className="alert alert-success" role="alert">{SuccessMessage} </div>}
                            <form onSubmit={submitHandler}>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="name" className="form-label">Full Name</label>
                                        <input type="text" name='name' value={name} onChange={onInputChange} className="form-control" id="name" placeholder='Enter full name' required />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="email" className="form-label">Email Address</label>
                                        <input type="email" name='email' value={email} onChange={onInputChange} className="form-control" id="email" placeholder='Enter email address' required />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="cname" className="form-label">Company  Name</label>
                                        <input type="text" name='companyName' value={companyName} onChange={onInputChange} className="form-control" id="cname" placeholder='Enter company name' />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="companyAddress" className="form-label">Company Address</label>
                                        <input type="text" name='companyAddress' value={companyAddress} onChange={onInputChange} className="form-control" id="companyAddress" placeholder='Enter company address' />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="fax" className="form-label">Fax Number</label>
                                        <div className='input-group'>
                                            <span className="input-group-text" id="basic-addon1">+6</span>
                                            <input type="number" name='fax' value={fax} onChange={onInputChange} className="form-control" id="fax" placeholder='Enter fax number' />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="phone" className="form-label">Phone Number</label>
                                        <div className='input-group'>
                                            <span className="input-group-text" id="basic-addon1">+6</span>
                                            <input type="number" name='phone' value={phone} onChange={onInputChange} className="form-control" id="phone" placeholder='Enter phone number' />
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="bname" className="form-label">Profile Photo</label>
                                    {imageUrl && selectedImage ? (
                                        <div mt={2} textAlign="center">
                                            <img src={imageUrl} alt="avatar" height="100px" />
                                        </div>
                                    )
                                        :
                                        <>
                                            <input className='form-control' accept="image/*" type="file" id="select-image" style={{ display: 'none' }} onChange={e => handleFileUpload(e.target.files[0])} />
                                            <label htmlFor="select-image">
                                                <img src={imageUrl} alt="" height="100px" className='rounded-3 border p-2 ms-2' />
                                            </label>
                                        </>
                                    }
                                </div>
                                <div className='float-end'>
                                    <button type="submit" className="btn btn-success me-2">Update</button>
                                    {userDetails?.role === "superAdmin" && <button type='button' className='btn btn-info me-2' onClick={() => setModalShow(true)}>Change Password</button>}
                                    <Link to="/admins" className="btn btn-secondary">Cancel</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ChangePasswordModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                setModalShow={setModalShow}
                userId={adminId}
            />
        </div>
    );
}

export default EditAdmin;
