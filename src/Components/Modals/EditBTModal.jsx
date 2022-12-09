import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

const EditBTModal = (props) => {
    const { btDataToEdit, getBuildingTypes, setModalShow } = props;
    const [SuccessMessage, setSuccessMessage] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [buildingTypeData, setBuildingTypeData] = useState({
        name: ""
    });
    const { name } = buildingTypeData;
    const onInputChange = e => {
        setBuildingTypeData({ ...buildingTypeData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/building-type/` + btDataToEdit._id, buildingTypeData, { withCredentials: true })
        if (response) {
            setIsLoading(false)
            setSuccessMessage("Building Type Information Update Successfully")
            getBuildingTypes()
            setTimeout(() => {
                setSuccessMessage()
                setModalShow(false)
            }, 2000)
        }
    }
    useEffect(() => {
        setBuildingTypeData({name: btDataToEdit?.name})
    }, [btDataToEdit]);
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <h4 className='text-center'>Update Building Type</h4>
                <div className='d-flex justify-content-center'>
                    {isLoading && <Spinner animation="border" variant="dark" />}
                </div>
                {SuccessMessage && <div className="alert alert-success" role="alert">{SuccessMessage} </div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" name='name' value={name} onChange={onInputChange} className="form-control" id="name" placeholder='Enter a name' required />
                    </div>
                    <div className='float-end'>
                        <button type="submit" className="btn btn-success me-2">Save</button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default EditBTModal;
