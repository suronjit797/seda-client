import axios from 'axios';
import React, {useState} from 'react';
import { Spinner } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { FiTrash, FiEdit, } from "react-icons/fi"
import EditParameterModal from '../../../Components/Modals/EditParameterModal';

const ParametersTable = ({data, getParameters}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [SuccessMessage, setSuccessMessage] = useState();
    const [modalShow, setModalShow] = useState(false);
    const [parameterToEdit, setParameterToEdit] = useState();
    const columns = [
        {
            name: "No",
            cell: (row, index, column, id) => <div>{index + 1}</div>,
            selector: row => (console.log(row)),
            width: "60px"
        },
        {
            name: 'Name',
            selector: row => (row?.name),
        },
        {
            name: 'Type',
            selector: row => (row?.type),
        },
        {
            name: 'Value',
            selector: row => (row?.value),
        },
        {
            name: 'Action',
            cell: row => <div>
                <button className='btn btn-info me-1' onClick={() => editParameter(row)}> <FiEdit/>   </button>
                <button className='btn btn-danger' onClick={()=>deleteParameter(row._id)}><FiTrash/></button>
            </div>,
            grow: 2,
            center: 'yes'
        },
    ];
    const editParameter = (data) => {
        setParameterToEdit(data)
        setModalShow(true)
    }

    const deleteParameter = async (parameterId) => {
        setIsLoading(true)
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/parameters/` + parameterId, { withCredentials: true })
        if (response) {
            setIsLoading(false)
            setSuccessMessage("Parameter Deleted Successfully")
            getParameters()
            setTimeout(() => {
                setSuccessMessage()
            }, 2000)
        }
    }
    return (
        <div>
            <h4 className='mb-2'>Parameters list</h4>
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
            <EditParameterModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                parameterToEdit={parameterToEdit}
                setModalShow={setModalShow}
                getParameters={getParameters}
            />
        </div>
    );
}

export default ParametersTable;
