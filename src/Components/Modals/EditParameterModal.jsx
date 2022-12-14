import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

const EditParameterModal = (props) => {
    const { parameterToEdit, getParameters, setModalShow } = props;
    const [SuccessMessage, setSuccessMessage] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [parameterData, setParameterData] = useState({
        name: "",
        type: "",
        value: ""
    });
    const { name, type, value } = parameterData;

    const onInputChange = e => {
        setParameterData({ ...parameterData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/parameters/` + parameterToEdit._id, parameterData, { withCredentials: true })
        if (response) {
            setIsLoading(false)
            setSuccessMessage("Parameter Updated Successfully")
            getParameters()
            setTimeout(() => {
                setSuccessMessage()
                setModalShow(false)
            }, 2000)
        }
    }
    useEffect(() => {
        setParameterData({ name: parameterToEdit?.name, type: parameterToEdit?.type, value: parameterToEdit?.value })
    }, [parameterToEdit]);
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <h4 className='text-center'>Update Parameter</h4>
                <div className='d-flex justify-content-center'>
                    {isLoading && <Spinner animation="border" variant="dark" />}
                </div>
                {SuccessMessage && <div className="alert alert-success" role="alert">{SuccessMessage} </div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Parameter Name</label>
                        <input type="text" name='name' value={name} onChange={onInputChange} className="form-control" id="name" placeholder='Enter a parameter name' required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="type" className="form-label">Parameter Type</label>
                        <select name="type" id="type" className='form-select' value={type} onChange={onInputChange}>
                            <option >Select parameter type</option>
                            <option value="Measured Value">Measured Value</option>
                            <option value="Computation Action">Computation Action</option>
                            <option >Default Value</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="value" className="form-label">Unit / Value</label>
                        <input type="text" name='value' value={value} onChange={onInputChange} className="form-control" id="value" placeholder='Enter a unite/ value' required />
                    </div>
                    <div className='float-end'>
                        <button type="submit" className="btn btn-success me-2">Update</button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default EditParameterModal;
