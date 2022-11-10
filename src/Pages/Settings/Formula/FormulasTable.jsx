import axios from 'axios';
import React from 'react';
import DataTable from 'react-data-table-component';
import { FiTrash } from "react-icons/fi"
import Swal from "sweetalert2";

const FormulasTable = ({ formulas, getFormulas }) => {
    const columns = [
        {
            name: "No",
            cell: (row, index, column, id) => <div>{index + 1}</div>,
            selector: row => (console.log(row)),
            width: "60px"
        },
        {
            name: 'Formula Name',
            selector: row => (row?.name),
        },
        {
            name: 'Unit / Value',
            selector: row => (row?.unit),
        },
        {
            name: 'Formula',
            selector: row => (row?.formula),
        },
        {
            name: 'Action',
            cell: row => <div>
                <button className='btn btn-danger' onClick={() => deleteFormula(row._id)}><FiTrash /></button>
            </div>,
            center: 'yes'
        },
    ];

    const deleteFormula = async (formulaId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete formula?",
            //icon: "warning",
            dangerMode: true,
            showCancelButton: true,
            confirmButtonText: 'Confirm'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${process.env.REACT_APP_API_URL}/formula/` + formulaId, { withCredentials: true })
                    .then(res => {
                        getFormulas()
                        Swal.fire({
                            title: "Done!",
                            text: "Formula Deleted Successfully",
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
            <h4 className='mb-2'>List of All Formulas</h4>
            <DataTable
                columns={columns}
                data={formulas}
                pagination
                striped
                paginationPerPage={10}
                paginationRowsPerPageOptions={[10, 20, 50]}
            />
        </div>
    );
}

export default FormulasTable;
