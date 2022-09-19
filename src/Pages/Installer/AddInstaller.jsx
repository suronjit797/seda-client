import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AddInstaller = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    const handleFileUpload = file => {
        setImageUrl(URL.createObjectURL(file));
        let form = new FormData()
        form.append('logo', file)
        setSelectedImage(form);
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
                            <form>
                                <div class="mb-3">
                                    <label for="name" class="form-label">Full Name</label>
                                    <input type="text" class="form-control" id="name" />
                                </div>
                                <div class="mb-3">
                                    <label for="email" class="form-label">Email</label>
                                    <input type="email" class="form-control" id="email" />
                                </div>
                                <div class="mb-3">
                                    <label for="phone" class="form-label">Phone</label>
                                    <input type="text" class="form-control" id="phone" />
                                </div>
                                <div class="mb-3">
                                    <label for="cname" class="form-label">Company  Name</label>
                                    <input type="text" class="form-control" id="cname" />
                                </div>
                                <div class="mb-3">
                                    <label for="bname" class="form-label">Building Name</label>
                                    <input type="text" class="form-control" id="bname" />
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
                                    <Link to="/" class="btn btn-secondary me-2">Cancel</Link>
                                    <button type="submit" class="btn btn-success">Submit</button>
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
