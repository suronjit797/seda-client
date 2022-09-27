import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdminSidebarNav from '../../Components/Admins/AdminSidebarNav';
import axios from 'axios';
import { GrDownload } from 'react-icons/gr';
import { FaRegEye } from 'react-icons/fa';
import { RiDeleteBinLine } from 'react-icons/ri';
import { Spinner } from 'react-bootstrap';
import moment from 'moment';
import Lightbox from "react-awesome-lightbox";


const SiteDocuments = () => {
    const Params = useParams()
    const siteLocationId = Params.siteLocationId
    const [IsOpen, setIsOpen] = useState(false);
    const [CurrentSelectedImage, setCurrentSelectedImage] = useState('');
    const [siteLocationDetails, setSiteLocationData] = useState();
    const getSiteLocation = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/site-location/` + siteLocationId, { withCredentials: true })
        if (response) {
            setSiteLocationData(response.data)
        }
    }
    useEffect(() => {
        getSiteLocation()
    }, []);

    //EB related 
    const [SuccessMessage, setSuccessMessage] = useState();
    const [ErrorMessage, setErrorMessage] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [EBDocumentData, setEBDocumentData] = useState({
        name: "",
        type: "ElectricBill",
        site: siteLocationId
    });

    const onEBInputChange = e => {
        setEBDocumentData({ ...EBDocumentData, [e.target.name]: e.target.value });
    };
    const [EBSelectedImage, setEBSelectedImage] = useState(null);
    const [EBImageUrl, setEBImageUrl] = useState(null);
    const handleEBFileUpload = file => {
        setEBImageUrl(URL.createObjectURL(file));
        let form = new FormData()
        form.append('media', file)
        setEBSelectedImage(form);
    }

    //SD related states
    const [SDDocumentData, setSDDocumentData] = useState({
        name: "",
        type: "SchematicDiagram",
        site: siteLocationId
    });

    const onSDInputChange = e => {
        setSDDocumentData({ ...SDDocumentData, [e.target.name]: e.target.value });
    };

    const [SDSelectedImage, setSDSelectedImage] = useState(null);
    const [SDImageUrl, setSDImageUrl] = useState(null);
    const handleSDFileUpload = file => {
        setSDImageUrl(URL.createObjectURL(file));
        let form = new FormData()
        form.append('media', file)
        setSDSelectedImage(form);
    }

    const handleEBSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        if (EBSelectedImage === null) {
            //show a Error Message here
            setIsLoading(false)
            setErrorMessage("Please select a Electric Bill!")
            setTimeout(() => {
                setErrorMessage()
            }, 2000)
        } else {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/documents`, EBDocumentData, { withCredentials: true })
            if (response) {
                const data = response.data
                const addImageResponse = await axios.put(`${process.env.REACT_APP_API_URL}/documents/${data._id}`, EBSelectedImage, { withCredentials: true })
                if (addImageResponse) {
                    setIsLoading(false)
                    setSuccessMessage("Electric Bill Uploaded Successfully")
                    getEBDocuments()
                    setTimeout(() => {
                        setEBDocumentData({ ...EBDocumentData, name: "" })
                        setSDImageUrl()
                        setSuccessMessage()
                    }, 2000)
                }
            }
        }

    }
    //code for get bills
    const [EBDocuments, setEBDocuments] = useState();
    const getEBDocuments = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/documents/` + siteLocationId + `/ElectricBill`, { withCredentials: true })
        if (response.data) {
            setEBDocuments(response.data)
        }
    }
    useEffect(() => {
        getEBDocuments()
    }, []);
    console.log(EBDocuments)
    return (
        <div className='site-admins'>
            <div className="container-fluid">
                <div className="row my-5">
                    <div className="col-md-2">
                        <AdminSidebarNav />
                    </div>
                    <div className="col-md-10">
                        <div className="card p-3 mb-3">
                            <h3>Reference Document of {siteLocationDetails?.name}</h3>
                            <div className="row mt-5 d-flex justify-content-center">
                                <div className="col-md-5">
                                    <h5 className='mb-3'>Upload Electric Bill</h5>
                                    <div className='d-flex justify-content-center'>
                                        {isLoading && <Spinner animation="border" variant="dark" />}
                                    </div>
                                    {ErrorMessage && <div className="alert alert-danger" role="alert">{ErrorMessage} </div>}
                                    {SuccessMessage && <div className="alert alert-success" role="alert">{SuccessMessage} </div>}
                                    <form onSubmit={handleEBSubmit}>
                                        <div className="row d-flex align-items-center">
                                            <div className="col-md-6">
                                                <label for="name" class="form-label">Bill Name</label>
                                                <input type="text" name='name' onChange={onEBInputChange} class="form-control" id="name" placeholder='Enter bill name' required />
                                            </div>
                                            <div className="col-md-3 text-center">

                                                {EBImageUrl && EBSelectedImage ? (
                                                    <div mt={2} textAlign="center">
                                                        <div>Preview:</div>
                                                        <img src={EBImageUrl} alt={EBSelectedImage.name} height="100px" />
                                                    </div>
                                                )
                                                    :
                                                    <>
                                                        <input className='form-control' accept="image/*" type="file" id="select-image" style={{ display: 'none' }} onChange={e => handleEBFileUpload(e.target.files[0])} />
                                                        <label for="select-image">
                                                            <img src="/images/upload.png" alt="" height="100px" className='rounded-3 border p-2 ms-2' />
                                                        </label>
                                                    </>
                                                }
                                            </div>
                                            <div className="col-md-3 d-flex justify-content-end">
                                                <button className='btn btn-success' type='submit'>Upload</button>
                                            </div>
                                        </div>
                                    </form>
                                    <h5 className='mt-2 mb-3'>Electric Bills</h5>
                                    {EBDocuments && EBDocuments.length > 0 && EBDocuments.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1).map((item, index) => (
                                        <div className="card p-2 mb-2" key={index}>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <b>Bill Name: {item.name}</b>
                                                    <p className='text-muted p-0 mb-1' style={{fontSize:"15px"}}>Uploaded By: {item?.uploadBy?.name}</p>
                                                    <p className='text-muted p-0' style={{fontSize:"15px"}}>Uploaded On: {moment(item.createdAt).format("DD/MM/YYYY HH:MM A")}</p>
                                                </div>
                                                <div className="col-md-3"> <img src={item?.media} alt="" onClick={() => { setCurrentSelectedImage(item?.media); setIsOpen(true) }} id='lightbox-img' height="80px" className='rounded-3 border p-2 ms-2' /></div>
                                                <div className="col-md-3">
                                                    <div className="icons d-flex algin-items-center justify-content-end pe-3">
                                                        <GrDownload size="2em" className='me-2' />
                                                        <RiDeleteBinLine size="2em" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="col-md-1"></div>
                                <div className="col-md-5">
                                    <h5 className='mb-3'>Upload Electric Schematic Diagram</h5>
                                    <form>
                                        <div className="row d-flex align-items-center">
                                            <div className="col-md-6">
                                                <label for="name" class="form-label">Diagram Name</label>
                                                <input type="text" name='name' onChange={onSDInputChange} class="form-control" id="name" placeholder='Enter diagram name' required />
                                            </div>
                                            <div className="col-md-3 text-center">

                                                {SDImageUrl && SDSelectedImage ? (
                                                    <div mt={2} textAlign="center">
                                                        <div>Preview:</div>
                                                        <img src={SDImageUrl} alt={SDSelectedImage.name} height="100px" />
                                                    </div>
                                                )
                                                    :
                                                    <>
                                                        <input className='form-control' accept="image/*" type="file" id="select-image" style={{ display: 'none' }} onChange={e => handleSDFileUpload(e.target.files[0])} />
                                                        <label for="select-image">
                                                            <img src="/images/upload.png" alt="" height="100px" className='rounded-3 border p-2 ms-2' />
                                                        </label>
                                                    </>
                                                }
                                            </div>
                                            <div className="col-md-3  d-flex justify-content-end">
                                                <button className='btn btn-success'>Upload</button>
                                            </div>
                                        </div>
                                    </form>
                                    <h5 className='mt-2  mb-3'>Electric Schematic Diagrams</h5>
                                    <div className="card p-2">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <b>Diagram Name: September 2022</b>
                                                <p className='text-muted p-0 mb-1'>Uploaded By: Super Admin</p>
                                                <p className='text-muted p-0'>Uploaded On: 26/09/2022 10:15 AM</p>
                                            </div>
                                            <div className="col-md-3"> <img src="https://wcs.smartdraw.com/wiring-diagram/img/wiring_diagram_example.jpg" alt="" height="100px" className='rounded-3 border p-2 ms-2' /></div>
                                            <div className="col-md-3">
                                                <div className="icons d-flex algin-items-center justify-content-end pe-3">
                                                    <FaRegEye size="2em" className='me-2' />
                                                    <GrDownload size="2em" className='me-2' />
                                                    <RiDeleteBinLine size="2em" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {IsOpen && (
                <Lightbox image={CurrentSelectedImage} onClose={()=>setIsOpen(false)}/>
            )}
        </div>
    );
}

export default SiteDocuments;
