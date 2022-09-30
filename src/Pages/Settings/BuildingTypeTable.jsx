import axios from 'axios';
import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import EditBTModal from '../../Components/Modals/EditBTModal';

const BuildingTypeTable = ({ data, getBuildingTypes }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [SuccessMessage, setSuccessMessage] = useState();
    const [modalShow, setModalShow] = useState(false);
    const [btDataToEdit, setBtDataToEdit] = useState();
    const columns = [
        {
            name: "#",
            cell: (row, index, column, id) => <div>{index + 1}</div>,
            selector: row => (console.log(row)),
            width: "50px"
        },
        {
            name: 'Name',
            selector: row => (row.name),

        },
        {
            name: 'Action',
            cell: row => <div>
                <button className='btn btn-info me-1' onClick={() => editType(row)}>Edit</button>
                <button className='btn btn-danger' onClick={() => deleteType(row._id)}>Delete</button>
            </div>,
            grow: 2,
            center: 'yes'
        },
    ];
    const editType = (data) => {
        setBtDataToEdit(data)
        setModalShow(true)
    }
    const deleteType = async (typeId) => {
        setIsLoading(true)
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/building-type/` + typeId, { withCredentials: true })
        if (response) {
            setIsLoading(false)
            setSuccessMessage("Building Type deleted successfully.")
            getBuildingTypes()
            setTimeout(() => {
                setSuccessMessage()
            }, 2000)
        }
    }
    return (
        <div>
            <h3>Building Types</h3>
            <div className='d-flex justify-content-center'>
                {isLoading && <Spinner animation="border" variant="dark" />}
            </div>
            {SuccessMessage && <div className="alert alert-success" role="alert">{SuccessMessage} </div>}
            <DataTable
                columns={columns}
                data={data}
                pagination
                striped
                paginationPerPage={10}
                paginationRowsPerPageOptions={[10, 20, 50]}
            />
            <EditBTModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                btDataToEdit={btDataToEdit}
                setModalShow={setModalShow}
                getBuildingTypes={getBuildingTypes}
            />
        </div>
    );
}

export default BuildingTypeTable;
