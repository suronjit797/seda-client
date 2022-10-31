import axios from 'axios';
import React, {useState} from 'react';
import { Spinner } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { FiTrash, FiEdit, } from "react-icons/fi"

const FormulasTable = ({formulas, getFormulas}) => {
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
            name: 'Unit',
            selector: row => (row?.unit),
        },
        {
            name: 'Formula',
            selector: row => (row?.formula),
        },
        {
            name: 'Action',
            cell: row => <div>
                <button className='btn btn-danger' onClick={()=>deleteFormula(row._id)}><FiTrash/></button>
            </div>,
            center: 'yes'
        },
    ];

    const deleteFormula= async (formulaId) => {
        setIsLoading(true)
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/formula/` + formulaId, { withCredentials: true })
        if (response) {
            setIsLoading(false)
            setSuccessMessage("Formula Deleted Successfully")
            getFormulas()
            setTimeout(() => {
                setSuccessMessage()
            }, 2000)
        }
    }
    return (
        <div>
            <h4 className='mb-2'>Formula list</h4>
            <div className='d-flex justify-content-center'>
                {isLoading && <Spinner animation="border" variant="dark" />}
            </div>
            {SuccessMessage && <div className="alert alert-success" role="alert">{SuccessMessage} </div>}
            <DataTable
                columns={columns}
                data={formulas}
                pagination
                striped
                paginationPerPage={10}
                paginationRowsPerPageOptions={[10, 20, 50]}
            />
            {/* <EditParameterModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                parameterToEdit={parameterToEdit}
                setModalShow={setModalShow}
                getParameters={getParameters}
            /> */}
        </div>
    );
}

export default FormulasTable;
