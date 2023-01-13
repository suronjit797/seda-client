import React, { useContext } from 'react';
import DataTable from 'react-data-table-component';
import { FiEdit } from "react-icons/fi"
import { BiStar } from "react-icons/bi"
import { AiFillStar } from "react-icons/ai"
import axios from 'axios';
import Swal from "sweetalert2";
import { ThemeContext } from '../../App.js'

const DeviceParameters = ({ data, device, getDevice, getDeviceParameters }) => {
    let { isDark } = useContext(ThemeContext)

    const columns = [
        {
            name: "No.",
            cell: (row, index, column, id) => <div>{index + 1}</div>,
            selector: row => (console.log(row)),
            width: "60px"
        },
        {
            name: 'Name',
            cell: row => <div className='text-capitalize'>{row?._id}</div>,
            selector: row => (row?._id),

        },
        {
            name: 'Count',
            selector: row => (row?.count),
            center: true

        },
        {
            name: 'Action',
            cell: row => <div>
                <button className='btn btn-info me-1'><FiEdit /></button>
                {device?.parameter === row?._id ? <button className='btn btn-warning'><AiFillStar /></button> : <button className='btn btn-warning' onClick={() => setParameter(row?._id)}><BiStar /></button>}

            </div>,
            right: 'yes'
        },
    ];

    const setParameter = async (parameter) => {
        let data = {
            parameter: parameter
        }
        Swal.fire({
            title: "Are you sure?",
            text: "You want to set this parameter as default?",
            //icon: "warning",
            dangerMode: true,
            showCancelButton: true,
            confirmButtonText: 'Confirm'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.put(`${process.env.REACT_APP_API_URL}/device/` + device._id, data, { withCredentials: true })
                    .then(res => {
                        getDevice()
                        getDeviceParameters()
                        Swal.fire({
                            title: "Done!",
                            text: "Set default parameter Successfully",
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
            <h4 className='mb-3'>Available Device Parameters </h4>
            <DataTable
                columns={columns}
                data={data}
                pagination
                striped={!isDark}
                theme={isDark ? 'dark' : 'light '}
                paginationPerPage={10}
                paginationRowsPerPageOptions={[10, 20, 50]}
            />
        </div>
    );
}

export default DeviceParameters;
