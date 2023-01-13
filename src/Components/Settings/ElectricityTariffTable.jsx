import React, { useState, useEffect, useContext } from 'react'
import { FiTrash, FiEdit, } from "react-icons/fi"
import { Spinner } from 'react-bootstrap';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import EditETariffModal from '../Modals/EditETariffModal';
import { useSelector } from 'react-redux';
import { ThemeContext } from '../../App.js'

export default function ElectricityTariffTable({ data, getElectricityTariff }) {
    let { isDark } = useContext(ThemeContext)

    const [isLoading, setIsLoading] = useState(false);
    const userDetails = useSelector((state) => state.user.userDetails);
    const [SuccessMessage, setSuccessMessage] = useState();
    const [colShow, setColShow] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [ETariffToEdit, setETariffToEdit] = useState({});
    const columns = [
        {
            name: "No.",
            cell: (row, index, column, id) => <div>{index + 1}</div>,
            selector: row => (console.log(row)),
            width: "60px",
            center: true
        },
        {
            name: 'Category',
            selector: row => (row.name),
            width: "100px"

        },
        {
            name: 'Description',
            cell: row => <div className='text-warp p-1 description' dangerouslySetInnerHTML={{ __html: row?.description }}></div>,
            selector: row => (row?.description),
            grow: 3

        },
        {
            name: 'Action',
            cell: row => <div>
                {(() => {
                    switch (userDetails.role) {
                        case 'superAdmin':
                            return (
                                <div className="actions">
                                    <button className='btn btn-info me-1' onClick={() => editETariff(row)}><FiEdit /></button>
                                    <button className='btn btn-danger' onClick={() => deleteETariff(row._id)}><FiTrash /></button>
                                </div>
                            )
                        default:
                            return
                    }
                })
                    ()}
            </div>,
            center: true,
            omit: colShow
        },
    ];
    const editETariff = (etData) => {
        setETariffToEdit(etData)
        setModalShow(true)
    }
    const deleteETariff = async (etId) => {
        setIsLoading(true)
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/electricity-tariff/` + etId, { withCredentials: true })
        if (response) {
            setIsLoading(false)
            setSuccessMessage("Electricity Tariff deleted successfully.")
            getElectricityTariff()
            setTimeout(() => {
                setSuccessMessage()
            }, 2000)
        }
    }
    useEffect(() => {
        if (userDetails?.role === "superAdmin") {

        } else {
            setColShow(true)
        }
    }, [userDetails]);


    return (
        <div>
            <h4 className='mb-3'>Tariff Categories</h4>
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
                paginationPerPage={3}
                paginationRowsPerPageOptions={[10, 20, 50]}
            />
            <EditETariffModal
                show={modalShow}
                onHide={() => { setModalShow(false); setETariffToEdit({}) }}
                ETariffToEdit={ETariffToEdit}
                setModalShow={setModalShow}
                getElectricityTariff={getElectricityTariff}
            />
        </div>
    )
}
