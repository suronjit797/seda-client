import axios from 'axios';
import moment from 'moment/moment';
import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { Link, useParams } from 'react-router-dom';
import DevicesSidebar from '../../Components/Devices/DevicesSidebar';

const DeviceData = () => {
    const Params = useParams()
    const deviceId = Params.deviceId
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const getDeviceData = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/device/device-data/` + deviceId, { withCredentials: true })
        if (response) {
            setData(response.data)
        }
    }
    useEffect(() => {
        getDeviceData()
    }, []);
    const columns = [
        {
            name: "No.",
            cell: (row, index, column, id) => <div>{index + 1}</div>,
            selector: row => (console.log(row)),
            width: "60px",
            center: true
        },
        {
            name: 'Parameter Name',
            selector: row => (row?.name),
        },

        {
            name: 'Value',
            selector: row => (row?.value),
        },
        {
            name: 'Date',
            selector: row => (moment(row.createdAt).format("DD/MM/YYYY hh:mm:ss a")),
            center: true
        }
    ];
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
                                <div className="col-md-6"><h3>Device Data Received</h3></div>
                                <div className="col-md-6 d-flex justify-content-end"><Link to="/devices" className="btn btn-secondary">Back</Link></div>
                            </div>
                            <div className='d-flex justify-content-center'>
                                {isLoading && <Spinner animation="border" variant="dark" />}
                            </div>
                            <DataTable
                                columns={columns}
                                data={data}
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

export default DeviceData;
