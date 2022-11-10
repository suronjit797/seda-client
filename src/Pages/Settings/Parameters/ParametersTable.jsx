import axios from 'axios';
import React, {useState} from 'react';
import DataTable from 'react-data-table-component';
import { FiTrash, FiEdit, } from "react-icons/fi"
import EditParameterModal from '../../../Components/Modals/EditParameterModal';
import Swal from "sweetalert2";

const ParametersTable = ({data, getParameters}) => {
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
            name: 'Parameter Name',
            selector: row => (row?.name),
        },
        {
            name: 'Parameter Type',
            selector: row => (row?.type),
        },
        {
            name: 'Unit / Value',
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
        Swal.fire({
            title: "Are you sure?",
            text: "You want delete this parameter?",
            //icon: "warning",
            dangerMode: true,
            showCancelButton: true,
            confirmButtonText: 'Confirm'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${process.env.REACT_APP_API_URL}/parameters/` + parameterId, { withCredentials: true })
                    .then(res => {
                        getParameters()
                        Swal.fire({
                            title: "Done!",
                            text: "Parameter Deleted Successfully",
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
        <div>
            <h4 className='mb-2'>List of All Parameters</h4>
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
