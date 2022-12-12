import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NotificationSidebar from '../../Components/Notifications/NotificationSidebar';
import { FiTrash, FiEye, FiEdit } from "react-icons/fi"
import moment from 'moment/moment';
import DataTable from 'react-data-table-component';

const AlarmSummary = () => {
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const getNotifications = async () => {
        setIsLoading(true)
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/notification`, { withCredentials: true })
        if (response) {
            setNotifications(response.data.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1))
            setIsLoading(false)
        }
    }
    useEffect(() => {
        document.title="SEDA - System Alarm Summary"
        getNotifications()
    }, []);

    const columns = [
        {
            name: "No.",
            cell: (row, index, column, id) => <div>{index + 1}</div>,
            selector: row => (console.log(row)),
            width: "60px",
            center:true
        },
        {
            name: 'Alarm Name',
            cell:(row)=><div>{row.name}</div>,
            selector: row => (row),
        },
        {
            name: 'Device Name',
            selector: row => (row.device.name),
        },
        {
            name: 'Device Type',
            selector: row => (row.device.deviceType.name),
        },
        {
            name: 'Site Name',
            cell: row => <>{row.site.name}</>,
            selector: row => (row.site),
        },
        {
            name: 'Installer',
            cell: row => <>{row.site.installer.name}</>,
            selector: row => (row.site),
        },
        {
            name: 'Site Admin',
            cell: row => <>{row.site.admin.name}</>,
            selector: row => (row.site),
        },
        {
            name: 'Date Installed',
            selector: row => (moment(row.device.createdAt).format("DD/MM/YYYY")),
        },
        {
            name: 'Action',
            cell: row => <div>
                <Link to={`/admin/`+ row._id} className='btn btn-success me-1'><FiEye title="View"/></Link>
                <Link to={`/edit-admin/`+ row._id} className='btn btn-info me-1'><FiEdit title="Edit"/></Link>
                <button className='btn btn-danger'><FiTrash title="Delete"/></button>
            </div>,
            grow:2,
            center:'yes'
        },
    ];







    return (
        <div className='settings'>
            <div className="container-fluid">
                <div className="row my-5 vh60">
                    <div className="col-md-2">
                        <NotificationSidebar />
                    </div>
                    <div className="col-md-10">
                        <div className="card p-3 mb-3">
                            <h3>System Alarm Summary</h3>
                            <div className='d-flex justify-content-center'>
                                {isLoading && <Spinner animation="border" variant="dark" />}
                            </div>
                            <DataTable
                                columns={columns}
                                data={notifications}
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

export default AlarmSummary;
