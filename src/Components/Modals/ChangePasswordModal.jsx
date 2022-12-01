import axios from 'axios';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import Swal from "sweetalert2";

const ChangePasswordModal = (props) => {
    const { userId, setModalShow } = props
    const [Data, setData] = useState({
        password: "",
        reenterPassword: "",
    });
    const { password, reenterPassword } = Data
    const [ErrorMessage, setErrorMessage] = useState();
    const onInputChange = e => {
        setData({ ...Data, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password === reenterPassword) {
            Swal.fire({
                title: "Are you sure?",
                text: "You want to change the password?",
                //icon: "warning",
                dangerMode: true,
                showCancelButton: true,
                confirmButtonText: 'Confirm'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.put(`${process.env.REACT_APP_API_URL}/users/` + userId, Data, { withCredentials: true })
                        .then(res => {
                            setModalShow(false)
                            Swal.fire({
                                title: "Done!",
                                text: "Password has been changed successfully",
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

        } else {
            setErrorMessage("Both Passwords Are Not Matching")
            setTimeout(() => {
                setErrorMessage()
            }, 2000)
        }
    }
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <h4 className='text-center'>Change Password</h4>
                {ErrorMessage && <div className="alert alert-danger" role="alert">{ErrorMessage} </div>}
                <form onSubmit={submitHandler}>
                    <div class="row mb-3">
                        <div className="col-md-6">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" name='password' value={password} onChange={onInputChange} class="form-control" id="password" minlength="6" placeholder='&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;' required />
                        </div>
                        <div className="col-md-6">
                            <label for="reenterPassword" class="form-label">Reenter Password</label>
                            <input type="password" name='reenterPassword' value={reenterPassword} minlength="6" onChange={onInputChange} class="form-control" id="reenterPassword" placeholder='&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;' required />
                        </div>
                    </div>
                    <div className='float-end'>
                        <button type="submit" class="btn btn-success me-2">Change</button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default ChangePasswordModal;
