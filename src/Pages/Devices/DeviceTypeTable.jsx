import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import EditDTModel from '../../Components/Modals/EditDTModel';
import { FiTrash, FiEdit, } from "react-icons/fi"
import { ThemeContext } from '../../App.js'

const DeviceTypeTable = ({ data, getDeviceTypes }) => {
    let { isDark } = useContext(ThemeContext)

    const [isLoading, setIsLoading] = useState(false);
    const [SuccessMessage, setSuccessMessage] = useState();
    const [modalShow, setModalShow] = useState(false);
    const [deviceTypeDataToEdit, setDeviceTypeDataToEdit] = useState();
    const columns = [
        {
            name: "No.",
            cell: (row, index, column, id) => <div>{index + 1}</div>,
            selector: row => (console.log(row)),
            width: "60px"
        },
        {
            name: 'Name',
            selector: row => (row.name),

        },
        {
            name: 'Description',
            selector: row => (row?.description),

        },
        {
            name: 'Action',
            cell: row => <div>
                <button className='btn btn-info me-1' onClick={() => editType(row)}><FiEdit /></button>
                <button className='btn btn-danger' onClick={() => deleteType(row._id)}><FiTrash /></button>
            </div>,
            right: 'yes'
        },
    ];
    const editType = (data) => {
        setDeviceTypeDataToEdit(data)
        setModalShow(true)
    }
    const deleteType = async (typeId) => {
        setIsLoading(true)
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/device-type/` + typeId, { withCredentials: true })
        if (response) {
            setIsLoading(false)
            setSuccessMessage("Device Type deleted successfully.")
            getDeviceTypes()
            setTimeout(() => {
                setSuccessMessage()
            }, 2000)
        }
    }
    return (
        <div>
            <h4>Device Types</h4>
            <div className='d-flex justify-content-center'>
                {isLoading && <Spinner animation="border" variant="dark" />}
            </div>
            {SuccessMessage && <div className="alert alert-success" role="alert">{SuccessMessage} </div>}
            <DataTable
                columns={columns}
                data={data}
                pagination
                striped={!isDark}
                theme={isDark ? 'dark' : 'light '}
                paginationPerPage={10}
                paginationRowsPerPageOptions={[10, 20, 50]}
            />
            <EditDTModel
                show={modalShow}
                onHide={() => setModalShow(false)}
                deviceTypeDataToEdit={deviceTypeDataToEdit}
                setModalShow={setModalShow}
                getDeviceTypes={getDeviceTypes}
            />
        </div>
    );
}

export default DeviceTypeTable;
