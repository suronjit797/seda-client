import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import ReactQuill from 'react-quill';

export default function EditETariffModal(props) {
  const { ETariffToEdit, getElectricityTariff, setModalShow } = props;
  const [SuccessMessage, setSuccessMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [electricityTariffData, setElectricityTariffData] = useState({
    name: "",
    description: ""
  });
  const { name, description } = electricityTariffData;
  const handleChange = (value, bodyContent) => {
    setElectricityTariffData({
      ...electricityTariffData,
      [bodyContent]: value
    });
  }
  const onInputChange = e => {
    setElectricityTariffData({ ...electricityTariffData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/electricity-tariff/` + ETariffToEdit._id, electricityTariffData, { withCredentials: true })
    if (response) {
      setIsLoading(false)
      getElectricityTariff()
      setSuccessMessage("Tariff Rates Updated Successfully")
      setTimeout(() => {
        setSuccessMessage()
        setModalShow(false)
      }, 2000)
    }
  }
  useEffect(() => {
    setElectricityTariffData({ name: ETariffToEdit?.name, description: ETariffToEdit?.description })
  }, [ETariffToEdit]);
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <h4 className='text-center'>Update Electricity Tariff</h4>
        <div className='d-flex justify-content-center'>
          {isLoading && <Spinner animation="border" variant="dark" />}
        </div>
        {SuccessMessage && <div className="alert alert-success" role="alert">{SuccessMessage} </div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Tariff Category</label>
            <input type="text" name='name' value={name} onChange={onInputChange} className="form-control" id="name" placeholder='Enter a tariff category' required />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <ReactQuill theme="snow" className='mb-5' id="description" name='description' value={description} onChange={(value) => handleChange(value, 'description')} style={{ height: "200px" }} />
          </div>
          <div className='float-end'>
            <button type="submit" className="btn btn-success me-2">Update</button>
            <button type="button" className="btn btn-secondary" onClick={() => setModalShow(false)}>Cancel</button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}
