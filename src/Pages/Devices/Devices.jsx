import axios from 'axios';
import moment from 'moment/moment';
import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import DevicesSidebar from '../../Components/Devices/DevicesSidebar';
import { FiEye, FiEdit, FiTrash } from "react-icons/fi"
import Swal from "sweetalert2";

const Devices = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [devices, setDevices] = useState([]);
    const getDevices = async () => {
        setIsLoading(true)
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/device`, { withCredentials: true })
        if (response) {
            setDevices(response.data.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1))
            setIsLoading(false)
        }
    }
    const columns = [
        {
            name: "No.",
            cell: (row, index, column, id) => <div>{index + 1}</div>,
            selector: row => (console.log(row)),
            width: "60px",
            center: true
        },
        {
            name: 'Device Name',
            selector: row => (row?.name),
        },
        {
            name: 'Device Type',
            cell: row => <div className='text-wrap'>{row?.deviceType?.name}</div>,
            selector: row => (row.deviceType),
        },
        {
            name: 'Site Name',
            cell: row => <div className='text-wrap'>{row?.site?.name}</div>,
            selector: row => (row.site),
        },
        {
            name: 'Installer',
            cell: row => <div className='text-wrap'>{row?.site?.installer?.name}</div>,
            selector: row => (row.site),
        },
        {
            name: 'Site Admin',
            cell: row => <div className='text-wrap'>{row?.site?.admin?.name}</div>,
            selector: row => (row.site),
        },
        {
            name: 'Date Installed',
            selector: row => (moment(row.createdAt).format("DD/MM/YYYY")),
            width: "130px",
            center: true
        },
        {
            name: 'Action',
            cell: row => <div>
                <Link to={`/device/` + row._id} className='btn btn-info me-1'><FiEye /></Link>
                <Link to={`/edit-device/` + row._id} className='btn btn-success me-1'><FiEdit /></Link>
                <button className='btn btn-danger' onClick={() => deleteDevice(row._id)}><FiTrash/></button>
            </div>,
            center: 'yes'
        },
    ];
    useEffect(() => {
        document.title = "SEDA - Devices"
        getDevices()
    }, []);

    const deleteDevice = async (deviceId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this device?",
            //icon: "warning",
            dangerMode: true,
            showCancelButton: true,
            confirmButtonText: 'Confirm'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${process.env.REACT_APP_API_URL}/device/` + deviceId, { withCredentials: true })
                    .then(res => {
                        getDevices()
                        Swal.fire({
                            title: "Done!",
                            text: "Device Deleted Successfully",
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
        <div className='devices'>
            <div className="container-fluid">
                <div className="row my-5 vh60">
                    <div className="col-md-2">
                        <DevicesSidebar />
                    </div>
                    <div className="col-md-10">
                        <div className="card p-3 mb-3">
                            <div className="row">
                                <div className="col-md-6"><h3>All Devices</h3></div>
                                <div className="col-md-6 d-flex justify-content-end"><Link to="/" className="btn btn-secondary">Back</Link></div>
                            </div>
                            <div className='d-flex justify-content-center'>
                                {isLoading && <Spinner animation="border" variant="dark" />}
                            </div>
                            <DataTable
                                columns={columns}
                                data={devices}
                                pagination
                                striped
                                paginationPerPage={10}
                                paginationRowsPerPageOptions={[10, 20, 50]}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Devices;
