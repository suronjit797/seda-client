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
import Swal from "sweetalert2";

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
    const [SuccessSDMessage, setSuccessSDMessage] = useState();
    const [ErrorSDMessage, setErrorSDMessage] = useState();
    const [isLoadingSD, setIsLoadingSD] = useState(false);
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
                    setEBDocumentData({ ...EBDocumentData, name: "" })
                    setEBImageUrl()
                    getEBDocuments()
                    setTimeout(() => {
                        setSuccessMessage()
                    }, 2000)
                }
            }
        }

    }
    const handleSDSubmit = async (e) => {
        e.preventDefault()
        setIsLoadingSD(true)
        if (SDSelectedImage === null) {
            //show a Error Message here
            setIsLoadingSD(false)
            setErrorSDMessage("Please select a Schematic Diagram!")
            setTimeout(() => {
                setErrorSDMessage()
            }, 2000)
        } else {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/documents`, SDDocumentData, { withCredentials: true })
            if (response) {
                const data = response.data
                const addImageResponse = await axios.put(`${process.env.REACT_APP_API_URL}/documents/${data._id}`, SDSelectedImage, { withCredentials: true })
                if (addImageResponse) {
                    setIsLoadingSD(false)
                    setSuccessSDMessage("Schematic Diagram Uploaded Successfully")
                    setSDDocumentData({ ...SDDocumentData, name: "" })
                    setSDImageUrl()
                    getSDDocuments()
                    setTimeout(() => {
                        setSuccessSDMessage()
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
    const [SDDocuments, setSDDocuments] = useState();
    const getSDDocuments = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/documents/` + siteLocationId + `/SchematicDiagram`, { withCredentials: true })
        if (response.data) {
            setSDDocuments(response.data)
        }
    }
    useEffect(() => {
        getEBDocuments()
        getSDDocuments()
    }, []);
    
    const download = (file, name) => {
        var filename = file.substring(file.lastIndexOf('/')+1);
        console.log(filename, "filename")
        var fileExtension = filename.split('.').pop();
        console.log(fileExtension, "fileExtension")
        fetch(file, {
            method: "GET",
            headers: {}
        })
            .then(response => {
                response.arrayBuffer().then(function (buffer) {
                    const url = window.URL.createObjectURL(new Blob([buffer]));
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute("download", `${name}.${fileExtension}`); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                });
            })
            .catch(err => {
                console.log(err);
            });
    };


    const deleteDocument=async(documentId)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this document?",
            //icon: "warning",
            dangerMode: true,
            showCancelButton: true,
            confirmButtonText: 'Confirm'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${process.env.REACT_APP_API_URL}/documents/`+documentId, { withCredentials: true })
                        .then(res => {
                            getEBDocuments()
                            getSDDocuments()
                            Swal.fire({
                                title: "Done!",
                                text: "Document Successfully Deleted",
                                icon: "success",
                                timer: 2000,
                                button: false
                            })
                         
                        });
            } else if (
              result.dismiss === Swal.DismissReason.cancel
            ) {
               
            }
          })
    }

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
                                                <input type="text" name='name' value={EBDocumentData.name} onChange={onEBInputChange} class="form-control" id="name" placeholder='Enter bill name' required />
                                            </div>
                                            <div className="col-md-3 text-center">

                                                {EBImageUrl && EBSelectedImage ? (
                                                    <div mt={2} textAlign="center">
                                                        <img src={EBImageUrl} alt={EBSelectedImage.name} height="100px" />
                                                    </div>
                                                )
                                                    :
                                                    <>
                                                        <input className='form-control' accept="image/*" type="file" id="select-image" style={{ display: 'none' }} onChange={e => handleEBFileUpload(e.target.files[0])} />
                                                        <label htmlFor='select-image'>
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
                                                    <p className='text-muted p-0 mb-1' style={{ fontSize: "15px" }}>Uploaded By: {item?.uploadBy?.name}</p>
                                                    <p className='text-muted p-0' style={{ fontSize: "15px" }}>Uploaded On: {moment(item.createdAt).format("DD/MM/YYYY HH:MM A")}</p>
                                                </div>
                                                <div className="col-md-3"> <img src={item?.media} alt="" onClick={() => { setCurrentSelectedImage(item?.media); setIsOpen(true) }} id='lightbox-img' height="80px" className='rounded-3 border p-2 ms-2' /></div>
                                                <div className="col-md-3">
                                                    <div className="icons d-flex algin-items-center justify-content-end pe-3">
                                                        <GrDownload size="2em" className='me-2' onClick={(e) => download(item?.media, item.name)} />
                                                        <RiDeleteBinLine size="2em" onClick={()=>deleteDocument(item._id)}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="col-md-1"></div>
                                <div className="col-md-5">
                                    <h5 className='mb-3'>Upload Electric Schematic Diagram</h5>
                                    <div className='d-flex justify-content-center'>
                                        {isLoadingSD && <Spinner animation="border" variant="dark" />}
                                    </div>
                                    {ErrorSDMessage && <div className="alert alert-danger" role="alert">{ErrorSDMessage} </div>}
                                    {SuccessSDMessage && <div className="alert alert-success" role="alert">{SuccessSDMessage} </div>}
                                    <form onSubmit={handleSDSubmit}>
                                        <div className="row d-flex align-items-center">
                                            <div className="col-md-6">
                                                <label for="name" class="form-label">Diagram Name</label>
                                                <input type="text" name='name' value={SDDocumentData.name} onChange={onSDInputChange} class="form-control" id="name" placeholder='Enter diagram name' required />
                                            </div>
                                            <div className="col-md-3 text-center">

                                                {SDImageUrl && SDSelectedImage ? (
                                                    <div mt={2} textAlign="center">
                                                        <img src={SDImageUrl} alt={SDSelectedImage.name} height="100px" />
                                                    </div>
                                                )
                                                    :
                                                    <>
                                                        <input className='form-control' accept="image/*" type="file" id="select-image1" style={{ display: 'none' }} onChange={e => handleSDFileUpload(e.target.files[0])} />
                                                        <label htmlFor="select-image1">
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
                                    {SDDocuments && SDDocuments.length > 0 && SDDocuments.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1).map((item, index) => (
                                        <div className="card p-2 mb-2" key={index}>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <b>Diagram Name: {item.name}</b>
                                                    <p className='text-muted p-0 mb-1' style={{ fontSize: "15px" }}>Uploaded By: {item?.uploadBy?.name}</p>
                                                    <p className='text-muted p-0' style={{ fontSize: "15px" }}>Uploaded On: {moment(item.createdAt).format("DD/MM/YYYY HH:MM A")}</p>
                                                </div>
                                                <div className="col-md-3"> <img src={item?.media} alt="" onClick={() => { setCurrentSelectedImage(item?.media); setIsOpen(true) }} id='lightbox-img' height="80px" className='rounded-3 border p-2 ms-2' /></div>
                                                <div className="col-md-3">
                                                    <div className="icons d-flex algin-items-center justify-content-end pe-3">
                                                        <GrDownload size="2em" className='me-2' onClick={(e) => download(item?.media, item.name)} />
                                                        <RiDeleteBinLine size="2em" onClick={()=>deleteDocument(item._id)}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {IsOpen && (
                <Lightbox image={CurrentSelectedImage} onClose={() => setIsOpen(false)} />
            )}
        </div>
    );
}

export default SiteDocuments;
